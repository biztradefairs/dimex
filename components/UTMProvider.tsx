// components/UTMProvider.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getUTMParams, storeUTMData, UTMData } from '@/lib/utmTracker';
import { getUTMFromCMS, trackUTMCampaignVisit, CMSUTMCampaign } from '@/lib/cms-utm';

export function UTMProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [campaignData, setCampaignData] = useState<CMSUTMCampaign | null>(null);

    useEffect(() => {
        const handleUTMDetection = async () => {
            if (!searchParams) return;

            const utmParams = getUTMParams();

            if (Object.keys(utmParams).length > 0) {
                console.log('✅ UTM parameters detected:', utmParams);

                // Store UTM data in localStorage
                storeUTMData(utmParams);

                // Try to check CMS, but don't fail if it doesn't work
                try {
                    const campaign = await getUTMFromCMS(utmParams);

                    if (campaign) {
                        setCampaignData(campaign);
                        console.log('✅ CMS Campaign found:', campaign.name);

                        // Track the visit in CMS (don't await, let it run in background)
                        trackUTMCampaignVisit(campaign.id, utmParams, pathname || '')
                            .catch(err => console.warn('Campaign tracking error:', err));
                    } else {
                        console.log('ℹ️ No matching CMS campaign found (this is fine)');
                    }
                } catch (error) {
                    // Don't show error to user, just log it
                    console.warn('CMS campaign check failed (campaigns may not be set up yet):', error);
                }
            }
        };

        handleUTMDetection();
    }, [searchParams, pathname]);

    return <>{children}</>;
}