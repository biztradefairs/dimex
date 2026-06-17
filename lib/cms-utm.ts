// lib/cms-utm.ts

import { graphqlRequest, UTM_QUERIES, PROJECT_ID_VAR } from './graphql-client';

interface CMSUtmRecord {
    id: string;
    source: string;
    medium: string;
    campaign: string;
    term?: string;
    content?: string;
    url: string;
    projectId: string;
    createdAt: string;
    updatedAt?: string;
}

/** Backend UTM shape with aliases used by existing forms */
export interface CMSUTMCampaign extends CMSUtmRecord {
    name: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term?: string;
    utm_content?: string;
}

function mapUtmRecord(record: CMSUtmRecord): CMSUTMCampaign {
    return {
        ...record,
        name: record.campaign,
        utm_source: record.source,
        utm_medium: record.medium,
        utm_campaign: record.campaign,
        utm_term: record.term,
        utm_content: record.content,
    };
}

/**
 * Fetch UTM records from CMS using GraphQL
 */
export async function fetchUTMByProject(): Promise<CMSUTMCampaign[]> {
    try {
        const result = await graphqlRequest<{ getUtmByProject: CMSUtmRecord[] }>(
            UTM_QUERIES.getUtmByProject,
            { id: PROJECT_ID_VAR.projectId }
        );

        if (result.errors) {
            console.warn('GraphQL errors fetching UTM records:', result.errors);
            return []; // Return empty array instead of failing
        }

        return (result.data?.getUtmByProject || []).map(mapUtmRecord);
    } catch (error) {
        console.warn('Error fetching UTM records from CMS:', error);
        return []; // Return empty array on error
    }
}

/**
 * Get UTM data from CMS campaign by matching URL parameters
 */
export async function getUTMFromCMS(currentUtmData: any): Promise<CMSUTMCampaign | null> {
    // If no UTM data, return null
    if (!currentUtmData?.utm_source && !currentUtmData?.utm_campaign) {
        return null;
    }

    try {
        const campaigns = await fetchUTMByProject();

        // If no campaigns found, return null
        if (!campaigns || campaigns.length === 0) {
            return null;
        }

        // Find matching campaign
        const matchingCampaign = campaigns.find(campaign => {
            const sourceMatch = !currentUtmData.utm_source ||
                campaign.source === currentUtmData.utm_source;
            const campaignMatch = !currentUtmData.utm_campaign ||
                campaign.campaign === currentUtmData.utm_campaign;
            const mediumMatch = !currentUtmData.utm_medium ||
                campaign.medium === currentUtmData.utm_medium;

            return sourceMatch && campaignMatch && mediumMatch;
        });

        return matchingCampaign || null;
    } catch (error) {
        console.warn('Error matching UTM with CMS:', error);
        return null;
    }
}

/**
 * Create a UTM record in CMS if one doesn't exist already
 */
export async function createUTMInCMS(utmData: any): Promise<CMSUTMCampaign | null> {
    if (!utmData?.utm_source || !utmData?.utm_medium || !utmData?.utm_campaign) {
        return null;
    }

    const normalized = {
        source: utmData.utm_source.toLowerCase(),
        medium: utmData.utm_medium.toLowerCase(),
        campaign: utmData.utm_campaign.toLowerCase(),
        term: utmData.utm_term?.toLowerCase() || null,
        content: utmData.utm_content?.toLowerCase() || null,
        url: (utmData.landingPage || '').toLowerCase(),
        projectId: PROJECT_ID_VAR.projectId,
    };

    try {
        const result = await graphqlRequest<{ createUtm: CMSUtmRecord }>(
            UTM_QUERIES.createUtm,
            { input: normalized }
        );

        if (result.errors) {
            console.warn('GraphQL errors creating UTM:', result.errors);
            return null;
        }

        return result.data?.createUtm ? mapUtmRecord(result.data.createUtm) : null;
    } catch (error) {
        console.warn('Error creating UTM in CMS:', error);
        return null;
    }
}