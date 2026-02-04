import SectionContainer from '@/components/UI/SectionContainer';
import Image from 'next/image';
import Link from 'next/link';

export default function LogisticsMarketing() {
  return (
    <section className="py-16">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logistics Section */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col h-full">
            <h2 className="text-xl md:text-2xl lg:text-[30px] max-w-3xl text-[#4D4D4D] mb-6 leading-tight font-semibold">
  How to get your products/equipment to Moscow on time?
</h2>


              
            <div className="mb-8 flex-grow">
  <div className="prose prose-xl max-w-none text-[#4D4D4D]">
    <p className="text-[18px]">
      TransRussia partners with DMW EXPO for all freight handling requests from exhibitors.
    </p>

    <p className="text-[18px]">
      We recommend DMW EXPO for shipment of any products, stand equipment, marketing materials,
      machinery, and/or displays you plan to send for your stand.
    </p>

    <div className="mt-8 space-y-3">
      <p className="font-semibold">For any enquiries, contact:</p>

      <p>
        <strong>Marina Filippova</strong> — Head of Exhibition Department
      </p>

      <p>
        <strong>Phone:</strong> +7 (915) 224-47-27
      </p>

      <p>
        <strong>Email:</strong>{' '}
        <a
          href="mailto:marina.filippova@dmw-expo.ru"
          className="underline underline-offset-4 hover:text-gray-700"
        >
          marina.filippova@dmw-expo.ru
        </a>
      </p>
    </div>
  </div>
</div>

              
              <div className="mt-auto">
                <Link
                  href="https://dmw-expo.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#004D9F] px-10 py-3 font-jakarta text-[16px] font-semibold text-white transition-all duration-300 hover:bg-mainColor4">
                    DMW Expo
                  </button>
                </Link>
              </div>
            </div>
          </div>

<div className="relative h-[500px] lg:h-[540px] rounded-2xl overflow-hidden">
  {/* Background Image */}
  <img
    src="https://cdn.itegroupnews.com/TR_23_IMG_0029i_54b0b0806d.jpg"
    alt="TransRussia Exhibition"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Full Image Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Text Focus Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

  {/* Content */}
  <div className="relative z-10 h-full p-8 lg:p-12 flex items-center text-white">
    <div className="max-w-3xl">
      <h2 className="text-3xl lg:text-4xl font-semibold leading-tight mb-4">
        Let people know about your participation
      </h2>

      <p className="text-lg text-white/95 leading-relaxed mb-8">
        To increase the effectiveness of participation in the exhibition, take advantage
        of the partnership and additional advertising opportunities of TransRussia.
      </p>

      <Link
        href="/sponsorship-enquiry"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="inline-flex items-center justify-center rounded-full 
          bg-[#004D9F] px-8 py-3 text-[16px] font-semibold text-white
          shadow-lg shadow-black/30
          transition-all duration-300
          hover:bg-blue-700 hover:scale-105">
          Partnership Opportunities
        </button>
      </Link>
    </div>
  </div>
</div>


        </div>
      </SectionContainer>
    </section>
  );
}