// hooks/useUTMTracker.ts

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUTMParams, storeUTMData, getStoredUTMData, UTMData, hasUTMParams } from '@/lib/utmTracker';
import { CMSUTMCampaign, getUTMFromCMS } from '@/lib/cms-utm';

export function useUTMTracker() {
    const pathname = usePathname();
    const [utmData, setUtmData] = useState<UTMData>({});
    const [hasUtm, setHasUtm] = useState(false);
    const [campaign, setCampaign] = useState<CMSUTMCampaign | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const hasUtmParams = hasUTMParams();
            setHasUtm(hasUtmParams);

            if (hasUtmParams) {
                const newUtmData = getUTMParams();
                storeUTMData(newUtmData);
                setUtmData(newUtmData);

                try {
                    const campaignData = await getUTMFromCMS(newUtmData);
                    if (campaignData) setCampaign(campaignData);
                } catch (error) {
                    console.error('Error fetching campaign from CMS:', error);
                }
            } else {
                const storedData = getStoredUTMData();
                if (Object.keys(storedData).length > 0) {
                    setUtmData(storedData);
                    try {
                        const campaignData = await getUTMFromCMS(storedData);
                        if (campaignData) setCampaign(campaignData);
                    } catch (error) {
                        console.error('Error fetching campaign from CMS:', error);
                    }
                }
            }
        };

        fetchData();
    }, [pathname]);

    return { utmData, hasUtm, campaign };
}

export function useUTMData() {
    const [utmData, setUtmData] = useState<UTMData>({});
    const [campaign, setCampaign] = useState<CMSUTMCampaign | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = getStoredUTMData();
            setUtmData(data);

            if (Object.keys(data).length > 0) {
                try {
                    const campaignData = await getUTMFromCMS(data);
                    if (campaignData) {
                        setCampaign(campaignData);
                    }
                } catch (error) {
                    console.error('Error fetching campaign from CMS:', error);
                }
            }
        };

        fetchData();
    }, []);

    return { utmData, campaign };
}