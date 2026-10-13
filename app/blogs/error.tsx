'use client';

export default function BlogsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="mx-auto max-w-4xl px-6 py-20 text-center"><h1 className="text-2xl font-bold text-[#082856]">We couldn’t load the blogs</h1><p className="mt-3 text-slate-600">Please try again in a moment.</p><button onClick={reset} className="mt-6 rounded-lg bg-[#004A96] px-6 py-3 font-semibold text-white">Try again</button></section>;
}
