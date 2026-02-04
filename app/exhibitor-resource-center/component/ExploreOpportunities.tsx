import SectionContainer from '@/components/UI/SectionContainer';
import Link from 'next/link';

export default function ExploreOpportunities() {
  return (
    <section className="py-16">
      <SectionContainer>
        <div className="flex flex-col gap-8">
          <h2 className="title-72 text-black">Explore Opportunities</h2>
          <p className="max-w-6xl whitespace-pre-line text-lg">
            As a participant at TransRussia, our team is dedicated to providing you with a variety of participation opportunities to make the most of your exhibition experience. From pre-event to post, we have created guides to really simplify the decision-making and onboarding process for you.
          </p>
          <Link
            href="https://cdn.itegroupnews.com/Exhibitor_Manual_Trans_Russia_Sklad_Tech_2026_eng_7dbe69d229.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#004D9F] px-10 py-3 font-jakarta text-[16px] font-semibold text-white transition-all duration-300 hover:bg-mainColor4">
              Download Guide
            </button>
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}