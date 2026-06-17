// components/UTMProvider.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getUTMParams, storeUTMData } from '@/lib/utmTracker';
import { getUTMFromCMS, createUTMInCMS, CMSUTMCampaign } from '@/lib/cms-utm';

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

                // Try to check/create in CMS, but don't fail if it doesn't work
                try {
                    let campaign = await getUTMFromCMS(utmParams);

                    if (!campaign) {
                        campaign = await createUTMInCMS(utmParams);
                    }

                    if (campaign) {
                        setCampaignData(campaign);
                        storeUTMData({
                            utm_id: campaign.id,
                            utm_url: campaign.url,
                        });
                        console.log('✅ CMS UTM record linked:', campaign.id);
                    } else {
                        console.log('ℹ️ No matching CMS UTM found and create failed');
                    }
                } catch (error) {
                    console.warn('CMS UTM check/create failed:', error);
                }
            }
        };

        handleUTMDetection();
    }, [searchParams, pathname]);

    return <>{children}</>;
}