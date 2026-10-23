import { redirect } from 'next/navigation';
import { redirectToRegister } from '@/lib/registrationRoutes';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';


type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = PAGE_META.brochure;

export default async function BrochurePage({ searchParams }: PageProps) {
    redirect(redirectToRegister('brochure', await searchParams));
}
