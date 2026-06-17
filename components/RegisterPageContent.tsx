'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DiemexTabbedFormWrapper from '@/components/diemextabbedform';
import PartnersSlider from '@/components/section/PartnersSection';
import SectionContainer from '@/components/UI/SectionContainer';
import BackToTop from '@/app/exhibitor-resource-center/component/BackToTop';
import {
    REGISTRATION_HERO,
    RegistrationTab,
    buildRegisterUrl,
    isValidRegistrationTab,
} from '@/lib/registrationRoutes';

export default function RegisterPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<RegistrationTab>('enquiry');

    useEffect(() => {
        const tab = searchParams.get('t');

        if (!isValidRegistrationTab(tab)) {
            router.replace(buildRegisterUrl('enquiry', searchParams.toString()));
            setActiveTab('enquiry');
            return;
        }

        setActiveTab(tab);
    }, [searchParams, router]);

    const hero = useMemo(() => REGISTRATION_HERO[activeTab], [activeTab]);

    return (
        <main className="bg-white font-parabolica">
            <div className="bg-[#F4FAFF] pt-48 pb-10">
                <SectionContainer>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
                        {hero.title}
                    </h1>
                    <p className="mt-4 max-w-4xl text-lg text-gray-600">{hero.subtitle}</p>
                </SectionContainer>
            </div>

            <section className="py-16">
                <SectionContainer>
                    <div className="max-w-6xl mx-auto">
                        <DiemexTabbedFormWrapper defaultTab={activeTab} useRegisterRouting />
                    </div>
                </SectionContainer>
            </section>

            {activeTab === 'brochure' && (
                <section className="py-20 bg-gray-50">
                    <SectionContainer>
                        <PartnersSlider />
                    </SectionContainer>
                </section>
            )}

            <BackToTop />
        </main>
    );
}
