import { PAGE_META } from '@/lib/pageMetadata';
import { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterPageContent from '@/components/RegisterPageContent';

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

export default function RegisterPage() {
    return (
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
    );
}
