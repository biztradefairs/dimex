// lib/cms-utm.ts

import { graphqlRequest, UTM_QUERIES, PROJECT_ID_VAR } from './graphql-client';
import { UTMData } from './utmTracker';

export interface CMSUTMCampaign {
    id: string;
    name: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term?: string;
    utm_content?: string;
    isActive: boolean;
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Fetch active UTM campaigns from CMS using GraphQL
 */
export async function fetchActiveUTMCampaigns(): Promise<CMSUTMCampaign[]> {
    try {
        const result = await graphqlRequest<{ utmCampaigns: CMSUTMCampaign[] }>(
            UTM_QUERIES.getActiveCampaigns,
            PROJECT_ID_VAR
        );

        if (result.errors) {
            console.warn('GraphQL errors (campaigns may not exist yet):', result.errors);
            return []; // Return empty array instead of failing
        }

        const campaigns = result.data?.utmCampaigns || [];

        // Filter active campaigns with date validation
        const now = new Date();
        return campaigns.filter(campaign => {
            if (!campaign.isActive) return false;
            if (campaign.startDate && new Date(campaign.startDate) > now) return false;
            if (campaign.endDate && new Date(campaign.endDate) < now) return false;
            return true;
        });
    } catch (error) {
        console.warn('Error fetching UTM campaigns from CMS (campaigns may not exist):', error);
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
        const campaigns = await fetchActiveUTMCampaigns();

        // If no campaigns found, return null
        if (!campaigns || campaigns.length === 0) {
            return null;
        }

        // Find matching campaign
        const matchingCampaign = campaigns.find(campaign => {
            const sourceMatch = !currentUtmData.utm_source ||
                campaign.utm_source === currentUtmData.utm_source;
            const campaignMatch = !currentUtmData.utm_campaign ||
                campaign.utm_campaign === currentUtmData.utm_campaign;
            const mediumMatch = !currentUtmData.utm_medium ||
                campaign.utm_medium === currentUtmData.utm_medium;

            return sourceMatch && campaignMatch && mediumMatch;
        });

        return matchingCampaign || null;
    } catch (error) {
        console.warn('Error matching UTM with CMS:', error);
        return null;
    }
}

/**
 * Track UTM campaign visit in CMS using GraphQL
 */
export async function trackUTMCampaignVisit(
    campaignId: string,
    utmData: any,
    pagePath: string
): Promise<boolean> {
    try {
        const result = await graphqlRequest<{ trackCampaignVisit: { success: boolean; message: string; visitId: string } }>(
            UTM_QUERIES.trackCampaignVisit,
            {
                projectId: PROJECT_ID_VAR.projectId,
                campaignId,
                utmData,
                pagePath,
            }
        );

        if (result.errors) {
            console.warn('GraphQL errors tracking visit:', result.errors);
            return false;
        }

        return result.data?.trackCampaignVisit?.success || false;
    } catch (error) {
        console.warn('Error tracking UTM campaign visit:', error);
        return false;
    }
}