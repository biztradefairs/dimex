// lib/tabConfig.ts
import React from 'react';

export type TabKey = 'enquiry' | 'exhibitor' | 'sponsor' | 'brochure';

export const TABS_CONFIG: {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
    title: string;
    sub: string;
}[] = [
        {
            key: 'enquiry',
            label: 'ENQUIRY',
            icon: React.createElement(
                'svg',
                { className: 'w-5 h-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' },
                React.createElement('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    d: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z',
                })
            ),
            title: 'Visitor Registration',
            sub: 'Register now to access India\'s premier die & mould manufacturing exhibition.',
        },
        {
            key: 'exhibitor',
            label: 'EXHIBITOR',
            icon: React.createElement(
                'svg',
                { className: 'w-5 h-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' },
                React.createElement('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                })
            ),
            title: 'Enquire about exhibiting at our event',
            sub: 'Please fill in the details below and our team will get in touch with you.',
        },
        {
            key: 'sponsor',
            label: 'SPONSOR',
            icon: React.createElement(
                'svg',
                { className: 'w-5 h-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' },
                React.createElement('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
                })
            ),
            title: 'Become a Sponsor / Partner',
            sub: 'Partner with DIEMEX 2026 and put your brand in front of 10,000+ professionals.',
        },
        {
            key: 'brochure',
            label: 'BROCHURE',
            icon: React.createElement(
                'svg',
                { className: 'w-5 h-5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' },
                React.createElement('path', {
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                })
            ),
            title: 'Download Event Brochure',
            sub: 'Fill in your details to receive the DIEMEX 2026 event brochure instantly.',
        },
    ];

export const RIGHT_PANEL: Record<TabKey, { headline: string; sub: string }> = {
    enquiry: {
        headline: 'Be Part of a Global Business Platform',
        sub: 'Connect with industry leaders and discover the latest innovations in die & mould manufacturing.',
    },
    exhibitor: {
        headline: 'Be Part of a Global Business Platform',
        sub: 'Showcase your solutions, connect with buyers and grow your business.',
    },
    sponsor: {
        headline: 'Amplify Your Brand at Scale',
        sub: 'Position your company as an industry leader in front of 10,000+ decision-makers from 50+ countries.',
    },
    brochure: {
        headline: 'Get the Full Event Guide',
        sub: 'Download the complete DIEMEX 2026 brochure with floor plans, speaker lineup and exhibitor list.',
    },
};