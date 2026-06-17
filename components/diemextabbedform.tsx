// components/DiemexTabbedFormWrapper.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useUTMData } from '@/hooks/useUTMTracker';
import {
    buildRegisterUrl,
    isValidRegistrationTab,
    LEGACY_PATH_TO_TAB,
    RegistrationTab,
    TAB_TO_LEGACY_PATH,
} from '@/lib/registrationRoutes';
import EnquiryForm from './EnquiryForm';
import ExhibitorForm from './ExhibitorForm';
import SponsorForm from './SponsorForm';
import BrochureForm from './BrochureForm';

type TabKey = RegistrationTab;

interface TabConfig {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
    title: string;
    sub: string;
    rightHeadline: string;
    rightSub: string;
    path: string;
}

const TABS: TabConfig[] = [
    {
        key: 'enquiry',
        label: 'ENQUIRY',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        title: 'Register as a Visitor',
        sub: 'Please fill in the details below and our team will get in touch with you.',
        rightHeadline: 'Discover What\'s Next in Manufacturing',
        rightSub: 'Visit DIEMEX 2026 to explore innovations in die, mould, and precision manufacturing technologies.',
        path: TAB_TO_LEGACY_PATH.enquiry,
    },
    {
        key: 'exhibitor',
        label: 'EXHIBITOR',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: 'Enquire about exhibiting at our event',
        sub: 'Please fill in the details below and our team will get in touch with you.',
        rightHeadline: 'Be Part of a Global Business Platform',
        rightSub: 'Showcase your solutions, connect with buyers and grow your business.',
        path: TAB_TO_LEGACY_PATH.exhibitor,
    },
    {
        key: 'sponsor',
        label: 'SPONSOR',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: 'Become a Sponsor / Partner',
        sub: 'Partner with DIEMEX 2026 and put your brand in front of 10,000+ professionals.',
        rightHeadline: 'Amplify Your Brand at Scale',
        rightSub: 'Gain unmatched visibility with India\'s premier die & mould manufacturing exhibition.',
        path: TAB_TO_LEGACY_PATH.sponsor,
    },
    {
        key: 'brochure',
        label: 'BROCHURE',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        title: 'Download Event Brochure',
        sub: 'Fill in your details to receive the complete DIEMEX 2026 brochure.',
        rightHeadline: 'Your Roadmap to DIEMEX 2026',
        rightSub: 'Explore exhibitor opportunities, visitor demographics, and ROI insights.',
        path: TAB_TO_LEGACY_PATH.brochure,
    },
];

const PATH_TO_TAB = LEGACY_PATH_TO_TAB;

interface DiemexTabbedFormWrapperProps {
    defaultTab?: TabKey;
    showHeader?: boolean;
    headerTitle?: string;
    headerSubtitle?: string;
    className?: string;
    useRegisterRouting?: boolean;
}

export default function DiemexTabbedFormWrapper({
    defaultTab = 'exhibitor',
    showHeader = true,
    headerTitle,
    headerSubtitle,
    className = '',
    useRegisterRouting = false,
}: DiemexTabbedFormWrapperProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { utmData } = useUTMData();

    const getTabFromLocation = (): TabKey => {
        if (pathname === '/register' || useRegisterRouting) {
            const tab = searchParams?.get('t');
            if (isValidRegistrationTab(tab)) return tab;
            return defaultTab;
        }

        if (pathname) {
            for (const [route, tabKey] of Object.entries(PATH_TO_TAB)) {
                if (pathname === route || pathname.startsWith(route)) {
                    return tabKey;
                }
            }
        }

        return defaultTab;
    };

    const [activeTab, setActiveTab] = useState<TabKey>(() => getTabFromLocation());

    useEffect(() => {
        setActiveTab(getTabFromLocation());
    }, [pathname, searchParams, defaultTab, useRegisterRouting]);

    const activeConfig = TABS.find(t => t.key === activeTab)!;

    const formMap: Record<TabKey, React.ReactNode> = {
        enquiry: <EnquiryForm />,
        exhibitor: <ExhibitorForm />,
        sponsor: <SponsorForm />,
        brochure: <BrochureForm />,
    };

    const handleTabClick = (tab: TabConfig) => {
        const params = new URLSearchParams(searchParams?.toString() || '');

        if (utmData && Object.keys(utmData).length > 0) {
            Object.entries(utmData).forEach(([key, value]) => {
                if (value && key !== 'referrer' && key !== 'landingPage' && key !== 'timestamp') {
                    params.set(key, value);
                }
            });
        }

        const targetPath = buildRegisterUrl(tab.key, params);
        router.push(targetPath);
        setActiveTab(tab.key);
    };

    return (
        <div className={`w-full max-w-7xl mx-auto bg-white overflow-hidden shadow-lg rounded-2xl ${className}`}>
            <Toaster position="top-right" />

            <div className="grid grid-cols-4 gap-[2px] bg-slate-200 w-full px-1 py-1">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            onClick={() => handleTabClick(tab)}
                            className={`
                                relative flex items-center justify-center gap-3
                                h-[54px] w-full
                                font-semibold text-sm
                                transition-all
                                ${isActive
                                    ? "bg-[#002d86] text-white"
                                    : "bg-white text-[#1e2b52] hover:bg-slate-50"
                                }
                            `}
                        >
                            <span>{tab.icon}</span>
                            <span className="tracking-wide">{tab.label}</span>

                            {isActive && (
                                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[12px] w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#002d86]" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="flex-1 bg-white p-6 lg:p-8 min-w-0 overflow-y-auto">
                    {showHeader && (
                        <>
                            <h2 className="text-xl font-bold text-[#1e3a6e] mb-1">
                                {headerTitle || activeConfig.title}
                            </h2>
                            <p className="text-sm text-gray-500 mb-6">
                                {headerSubtitle || activeConfig.sub}
                            </p>
                        </>
                    )}
                    <div className="brochure-form-container">
                        {formMap[activeTab]}
                    </div>
                </div>

                <div className="hidden lg:block lg:w-[48%] relative overflow-hidden min-h-[500px]">
                    <img
                        src="/images/exbibitor-resource-center/image1.png"
                        alt="DIEMEX Exhibition"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#002b88]/95 via-[#0036a5]/85 to-[#0036a5]/40" />

                    <div className="relative z-10 flex flex-col h-full p-10">
                        <div className="mt-auto mb-auto max-w-sm">
                            <h3 className="text-white text-4xl font-bold leading-tight">
                                {activeConfig.rightHeadline}
                            </h3>

                            <div className="w-20 h-[2px] bg-white/50 my-8" />

                            <p className="text-white/85 text-base leading-relaxed">
                                {activeConfig.rightSub}
                            </p>
                        </div>

                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
                            <div className="grid grid-cols-3">
                                {[
                                    { num: '250+', lbl: 'Exhibitors' },
                                    { num: '50+', lbl: 'Countries' },
                                    { num: '10K+', lbl: 'Visitors' },
                                ].map(({ num, lbl }) => (
                                    <div
                                        key={lbl}
                                        className="text-center border-r border-white/20 last:border-r-0"
                                    >
                                        <p className="text-white text-3xl font-bold">
                                            {num}
                                        </p>
                                        <p className="text-white/80 text-sm mt-2">
                                            {lbl}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}