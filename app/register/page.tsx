import PageFaq from '@/components/PageFaq';
import { redirectToRegister, resolveRegistrationTab } from '@/lib/registrationRoutes';
import { redirect } from 'next/navigation';
import { PAGE_META } from '@/lib/pageMetadata';
import { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterPageContent from '@/components/RegisterPageContent';
import { BECOME_EXHIBITOR_STRUCTURED_DATA, BROCHURE_STRUCTURED_DATA } from '@/lib/structuredData';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
    const { t } = await searchParams;
    const tab = resolveRegistrationTab(typeof t === 'string' ? t : null) || 'exhibitor';
    if (tab === 'exhibitor') return PAGE_META.exhibitorRegister;
    if (tab === 'brochure') return PAGE_META.brochure;
    return PAGE_META.register;
}

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;
    const tab = resolveRegistrationTab(typeof params.t === 'string' ? params.t : null) || 'exhibitor';
    if (tab === 'visitor') redirect(redirectToRegister('visitor', params));
    return (
        <>
            {tab === 'exhibitor' && (
                <script
                    id="diemex-become-exhibitor-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(BECOME_EXHIBITOR_STRUCTURED_DATA).replace(/</g, '\\u003c'),
                    }}
                />
            )}
            {tab === 'brochure' && (
                <script
                    id="diemex-brochure-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(BROCHURE_STRUCTURED_DATA).replace(/</g, '\\u003c'),
                    }}
                />
            )}
            <Suspense
                fallback={
                    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-10">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#004A96] border-t-transparent" />
                        <p className="text-lg font-semibold text-gray-700">Loading registration form...</p>
                    </div>
                }
            >
                <RegisterPageContent />
            </Suspense>
        </>
    );
}
