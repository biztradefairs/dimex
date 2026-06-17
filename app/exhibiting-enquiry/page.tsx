import { redirect } from 'next/navigation';
import { redirectToRegister } from '@/lib/registrationRoutes';

type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ExhibitorEnquiryPage({ searchParams }: PageProps) {
    redirect(redirectToRegister('exhibitor', await searchParams));
}
