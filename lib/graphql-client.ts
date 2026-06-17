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

// GraphQL Queries for UTM Campaigns - Simplified
export const UTM_QUERIES = {
    getActiveCampaigns: `
    query GetActiveUTMCampaigns($projectId: String!) {
      utmCampaigns(projectId: $projectId, isActive: true) {
        id
        name
        utm_source
        utm_medium
        utm_campaign
        utm_term
        utm_content
        isActive
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  `,
    trackCampaignVisit: `
    mutation TrackCampaignVisit($projectId: String!, $campaignId: String!, $utmData: JSON!, $pagePath: String!) {
      trackCampaignVisit(
        projectId: $projectId
        campaignId: $campaignId
        utmData: $utmData
        pagePath: $pagePath
      ) {
        success
        message
        visitId
      }
    }
  `,
};

// GraphQL Queries for Forms
export const FORM_QUERIES = {
    submitContact: `
    mutation SubmitContact($projectId: String!, $input: ContactInput!) {
      submitContact(projectId: $projectId, input: $input) {
        success
        message
        contactId
      }
    }
  `,
};

export const PROJECT_ID_VAR = { projectId: PROJECT_ID };