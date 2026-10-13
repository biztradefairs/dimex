import Link from 'next/link';
import { PAGE_FAQS } from '@/lib/pageFaqs';

export default function PageFaq({ route }: { route: string }) {
  const content = PAGE_FAQS[route];
  if (!content) return null;

  return (
    <section aria-labelledby="page-faq-heading" className="border-t border-slate-200 bg-slate-50 py-12 font-parabolica sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#004A96]">Help Center</p>
          <h2 id="page-faq-heading" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{content.subtitle}</p>
        </div>
        <div className="space-y-3" key={route}>
          {content.items.map((item, index) => (
            <details key={item.question} name="diemex-page-faq" open={index === 0} className="group overflow-hidden rounded-xl border border-slate-200 bg-white open:border-[#004A96]/30">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-slate-900 transition-colors hover:text-[#004A96] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#004A96] sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 text-[#004A96] transition-transform group-open:rotate-180 motion-reduce:transition-none">
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
                <p className="max-w-4xl text-base leading-7 text-slate-600">
                  {item.answer}
                  {item.link && (<> <Link href={item.link.href} className="font-semibold text-[#004A96] underline decoration-[#004A96]/30 underline-offset-4 hover:decoration-[#004A96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004A96]">{item.link.label}</Link>.</>)}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
