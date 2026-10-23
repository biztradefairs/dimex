import { redirect } from 'next/navigation';
import { redirectToRegister } from '@/lib/registrationRoutes';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { BROCHURE_STRUCTURED_DATA } from '@/lib/structuredData';


type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = PAGE_META.brochure;

export default async function BrochurePage({ searchParams }: PageProps) {
    redirect(redirectToRegister('brochure', await searchParams));

    return (
        <>
            <script
                id="diemex-brochure-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(BROCHURE_STRUCTURED_DATA).replace(/</g, '\\u003c'),
                }}
            />
        </>
    )
}
