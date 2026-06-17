// lib/utmTracker.ts

export interface UTMData {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    utm_id?: string;
    referrer?: string;
    landingPage?: string;
    timestamp?: string;
}

/**
 * Extract UTM parameters from URL
 */
export function getUTMParams(): UTMData {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: UTMData = {};

    // Extract all UTM parameters
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
    utmKeys.forEach(key => {
        const value = urlParams.get(key);
        if (value) utmParams[key as keyof UTMData] = value;
    });

    // Add referrer and landing page
    utmParams.referrer = document.referrer || '';
    utmParams.landingPage = window.location.href;
    utmParams.timestamp = new Date().toISOString();

    return utmParams;
}

/**
 * Store UTM data in localStorage for persistence across pages
 */
export function storeUTMData(data: UTMData) {
    if (typeof window === 'undefined') return;

    // Merge with existing UTM data
    const existing = getStoredUTMData();
    const merged = { ...existing, ...data };

    try {
        localStorage.setItem('utm_data', JSON.stringify(merged));
    } catch (error) {
        console.error('Error storing UTM data:', error);
    }
}

/**
 * Get stored UTM data from localStorage
 */
export function getStoredUTMData(): UTMData {
    if (typeof window === 'undefined') return {};

    try {
        const data = localStorage.getItem('utm_data');
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error retrieving UTM data:', error);
        return {};
    }
}

/**
 * Clear stored UTM data (useful after form submission)
 */
export function clearUTMData() {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem('utm_data');
    } catch (error) {
        console.error('Error clearing UTM data:', error);
    }
}

/**
 * Generate full UTM tracking URL
 */
export function generateUTMLink(baseUrl: string, utmData: UTMData): string {
    const url = new URL(baseUrl);
    const params = new URLSearchParams();

    Object.entries(utmData).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    url.search = params.toString();
    return url.toString();
}

/**
 * Check if URL has any UTM parameters
 */
export function hasUTMParams(url?: string): boolean {
    if (typeof window === 'undefined') return false;

    const search = url ? new URL(url).search : window.location.search;
    const params = new URLSearchParams(search);

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
    return utmKeys.some(key => params.has(key));
}