import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/pageMetadata';
import { fetchIndexableExhibitors, fetchPublicExhibitor } from '@/lib/publicExhibitors';
import ExhibitorDetailClient from './ExhibitorDetailClient';

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;
export const maxDuration = 90;

export async function generateStaticParams() {
  return (await fetchIndexableExhibitors()).map((company) => ({ slug: company.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await fetchPublicExhibitor(slug);
  if (!company) notFound();
  const description = company.description?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
    || 'Meet ' + company.company + ' at DIEMEX, the international die and mould exhibition.';
  return pageMeta(company.company + ' | DIEMEX Exhibitor', description, '/exhibition-directory/' + company.id);
}
export default async function ExhibitorDetailPage({ params }: Props) {
  const { slug } = await params;
  const company = await fetchPublicExhibitor(slug);
  if (!company) notFound();
  return <ExhibitorDetailClient key={company.id} company={company} />;
}
