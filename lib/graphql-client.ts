// lib/graphql-client.ts

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT || 'https://business-cms-1aks.onrender.com/graphql';
const PROJECT_ID = process.env.NEXT_PUBLIC_CMS_PROJECT_ID || 'cmpmfgeer0000udikff7kofau';

interface GraphQLResponse<T = any> {
    data?: T;
    errors?: Array<{
        message: string;
        locations?: Array<{ line: number; column: number }>;
        path?: string[];
    }>;
}

export async function graphqlRequest<T = any>(
    query: string,
    variables?: Record<string, any>
): Promise<GraphQLResponse<T>> {
    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-project-id': PROJECT_ID,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        // If response is not OK, return error object instead of throwing
        if (!response.ok) {
            console.warn(`GraphQL HTTP error! status: ${response.status}`);
            return {
                errors: [{
                    message: `HTTP error! status: ${response.status}`
                }]
            };
        }

        const result = await response.json();

        if (result.errors) {
            console.warn('GraphQL Errors:', result.errors);
        }

        return result;
    } catch (error) {
        console.warn('GraphQL Request Error:', error);
        return {
            errors: [{
                message: error instanceof Error ? error.message : 'Unknown error'
            }]
        };
    }
}

// GraphQL Queries for Location Data
export const LOCATION_QUERIES = {
    getCountries: `
    query GetCountries($projectId: String!) {
      countries(projectId: $projectId) {
        id
        name
        code
      }
    }
  `,
    getStates: `
    query GetStates($projectId: String!, $countryId: String!) {
      states(projectId: $projectId, countryId: $countryId) {
        id
        name
        code
      }
    }
  `,
    getCities: `
    query GetCities($projectId: String!, $stateId: String!) {
      cities(projectId: $projectId, stateId: $stateId) {
        id
        name
        code
      }
    }
  `,
};

// GraphQL Queries for UTM
export const UTM_QUERIES = {
    getUtmByProject: `
    query GetUtmByProject($id: String!) {
      getUtmByProject(id: $id) {
        id
        source
        medium
        campaign
        term
        content
        url
        projectId
        createdAt
        updatedAt
      }
    }
  `,
    createUtm: `
    mutation CreateUtm($input: CreateUtmInput!) {
      createUtm(input: $input) {
        id
        source
        medium
        campaign
        term
        content
        url
        projectId
        createdAt
      }
    }
  `,
};

// GraphQL mutation for leads (cms-backend)
export const FORM_QUERIES = {
    createLead: `
    mutation CreateLead($input: CreateLeadInput!) {
      createLead(input: $input) {
        id
        name
        email
      }
    }
  `,
};

const FORM_TYPE_TO_LEAD_TYPE: Record<string, string> = {
    'visitor-registration': 'VISITOR',
    'exhibitor-enquiry': 'EXHIBITOR',
    'partner-registration': 'PARTNER',
    'brochure-request': 'BROCHURE',
};

function mapFormInputToCreateLead(projectId: string, input: Record<string, any>) {
    const name =
        input.name ||
        input.contactPerson ||
        [input.firstName, input.lastName].filter(Boolean).join(' ').trim();

    const utmUrl =
        input.landingPage ||
        input.utmUrl ||
        (typeof window !== 'undefined' ? window.location.href : 'https://diemex.in');

    return {
        name,
        email: input.email,
        phone: input.phone || input.mobile || undefined,
        jobTitle: input.jobTitle || input.designation || undefined,
        companyName: input.companyName || input.company || undefined,
        message: input.message || undefined,
        country: input.country || undefined,
        state: input.state || undefined,
        city: input.city || undefined,
        industry: input.industry || input.profile || undefined,
        projectId,
        leadType: FORM_TYPE_TO_LEAD_TYPE[input.formType] || 'ENQUIRY',
        utmSource: input.utmSource || undefined,
        utmMedium: input.utmMedium || undefined,
        utmCampaign: input.utmCampaign || undefined,
        utmTerm: input.utmTerm || undefined,
        utmContent: input.utmContent || undefined,
        utmId: input.utmId || input.cmsCampaignId || undefined,
        utmUrl,
    };
}

/** Drop-in replacement for old submitContact mutation — maps to cms-backend createLead */
export async function submitContactForm(
    projectId: string,
    input: Record<string, any>,
) {
    const result = await graphqlRequest<{ createLead: { id: string; name: string; email: string } }>(
        FORM_QUERIES.createLead,
        { input: mapFormInputToCreateLead(projectId, input) },
    );

    if (result.errors?.length) {
        return {
            errors: result.errors,
            data: {
                submitContact: {
                    success: false,
                    message: result.errors[0]?.message || 'Failed to submit',
                    contactId: '',
                },
            },
        };
    }

    const lead = result.data?.createLead;
    return {
        data: {
            submitContact: {
                success: !!lead?.id,
                message: lead?.id ? 'Submitted successfully' : 'Failed to submit',
                contactId: lead?.id || '',
            },
        },
    };
}

export const PROJECT_ID_VAR = { projectId: PROJECT_ID };