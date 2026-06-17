// components/UTMDebugger.tsx

'use client';

import { useEffect, useState } from 'react';
import { getStoredUTMData, UTMData } from '@/lib/utmTracker';

export function UTMDebugger() {
    const [utmData, setUtmData] = useState<UTMData>({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show in development
        if (process.env.NODE_ENV === 'development') {
            const data = getStoredUTMData();
            setUtmData(data);

            // Auto-show if UTM data exists
            if (Object.keys(data).length > 0) {
                setIsVisible(true);
            }

            // Listen for UTM data changes
            const handleStorageChange = () => {
                const newData = getStoredUTMData();
                setUtmData(newData);
            };

            window.addEventListener('storage', handleStorageChange);
            return () => window.removeEventListener('storage', handleStorageChange);
        }
    }, []);

    if (!isVisible || process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-sm text-xs">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold">📊 UTM Data</span>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-gray-400 hover:text-white"
                >
                    ✕
                </button>
            </div>
            <div className="space-y-1">
                {utmData.utm_source && (
                    <div><span className="text-gray-400">Source:</span> {utmData.utm_source}</div>
                )}
                {utmData.utm_medium && (
                    <div><span className="text-gray-400">Medium:</span> {utmData.utm_medium}</div>
                )}
                {utmData.utm_campaign && (
                    <div><span className="text-gray-400">Campaign:</span> {utmData.utm_campaign}</div>
                )}
                {utmData.utm_term && (
                    <div><span className="text-gray-400">Term:</span> {utmData.utm_term}</div>
                )}
                {utmData.utm_content && (
                    <div><span className="text-gray-400">Content:</span> {utmData.utm_content}</div>
                )}
                {utmData.referrer && (
                    <div className="truncate"><span className="text-gray-400">Referrer:</span> {utmData.referrer}</div>
                )}
                {Object.keys(utmData).length === 0 && (
                    <div className="text-gray-400">No UTM data detected</div>
                )}
            </div>
        </div>
    );
}