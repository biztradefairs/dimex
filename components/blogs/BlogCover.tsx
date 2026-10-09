import Image from 'next/image';

export default function BlogCover({ image, title, priority = false }: { image: string | null; title: string; priority?: boolean }) {
  return image ? (
    <Image src={image} alt={title} width={1200} height={675} unoptimized priority={priority} className="aspect-video h-full w-full object-cover" />
  ) : (
    <div className="flex aspect-video h-full w-full items-center justify-center bg-gradient-to-br from-[#061b49] via-[#004A96] to-[#006dab] px-6 text-center">
      <div><span className="text-3xl font-black tracking-wider text-white sm:text-5xl">DIEMEX</span><p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-blue-100">Die &amp; Mould Industry Insights</p></div>
    </div>
  );
}
