import { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterPageContent from '@/components/RegisterPageContent';

export const metadata: Metadata = {
    title: 'Register | DIEMEX 2026',
    description:
        'Register for DIEMEX 2026 — visitor registration, exhibitor enquiry, partnership, or brochure download.',
};

export default function RegisterPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-10">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#002d86] border-t-transparent" />
                    <p className="text-lg font-semibold text-gray-700">Loading registration form...</p>
                </div>
            }
        >
            <RegisterPageContent />
        </Suspense>
    );
}
