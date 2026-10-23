import PageFaq from '@/components/PageFaq';
import { resolveRegistrationTab } from '@/lib/registrationRoutes';
import { PAGE_META } from '@/lib/pageMetadata';
import { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterPageContent from '@/components/RegisterPageContent';
import { BECOME_EXHIBITOR_STRUCTURED_DATA, BROCHURE_STRUCTURED_DATA, VISITOR_STRUCTURED_DATA } from '@/lib/structuredData';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
    const { t } = await searchParams;
    if (t === 'exhibitor') return PAGE_META.exhibitorRegister;
    if (t === 'brochure') return PAGE_META.brochure;
    return PAGE_META.register;
}

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const { t } = await searchParams;
    const tab = resolveRegistrationTab(typeof t === 'string' ? t : null) || 'visitor';
    return (
        <>
            {tab === 'visitor' && (
                <script
                    id="diemex-visitor-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(VISITOR_STRUCTURED_DATA).replace(/</g, '\\u003c'),
                    }}
                />
            )}
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
