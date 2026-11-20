import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/pageMetadata';
import { getMediaItemBySlug, mediaDetails } from '../data';
import MediaGalleryClient from './MediaGalleryClient';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return mediaDetails.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getMediaItemBySlug(slug);
  if (!item) notFound();
  const metadata = pageMeta(item.title + ' | DIEMEX', item.shortText, '/media-gallery/' + item.slug);
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: item.images[0].src, alt: item.title }] } };
}

export default async function MediaGalleryPage({ params }: Props) {
  const { slug } = await params;
  const item = getMediaItemBySlug(slug);
  if (!item) notFound();
  return <MediaGalleryClient key={item.slug} mediaItem={item} />;
}
