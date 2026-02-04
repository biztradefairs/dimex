import SectionContainer from '@/components/UI/SectionContainer';

export default function ContactInformation() {
  return (
    <section className="py-16 bg-white">
      <SectionContainer>
        <h2 className="title-72 text-black mb-12">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card */}
          <div className="rounded-2xl bg-[#F3F9FC] p-8">
            <p className="text-lg leading-relaxed text-black/80 mb-6">
              For questions related to ordering technical services, please
              contact the technical manager of the exhibition:
            </p>

            <p className="text-xl font-semibold text-black mb-4">
              Technical Manager
            </p>

            <p className="text-lg text-black">
              Tel:{' '}
              <a
                href="tel:+79684421480"
                className="underline font-medium hover:text-mainColor2"
              >
                +7 968 442 14 80
              </a>
            </p>
          </div>

          {/* Right Card */}
          <div className="rounded-2xl bg-[#F3F9FC] p-8 flex flex-col justify-between">
            <div>
              <p className="text-lg leading-relaxed text-black/80 mb-6">
                For questions related to ordering ceiling hangers, please
                contact our technical manager:
              </p>

              <p className="text-xl font-semibold text-black">
                Dmitry Shishanov
              </p>

              <p className="text-base text-black/70 mb-5">
                Technical Manager on suspended works
              </p>

              <p className="text-lg mb-3">
                <a
                  href="mailto:Dmitry.Shishanov@ite.group"
                  className="underline hover:text-mainColor2"
                >
                  Dmitry.Shishanov@ite.group
                </a>
              </p>

              <p className="text-lg">
                <a
                  href="tel:+74957995585"
                  className="underline text-[#4D4D4D]"
                >
                  +7 495 799 55 85
                </a>
              </p>
            </div>

            <img
              src="https://cdn-ite.prismetic.com/shishanov_new_30bcdae5ea.webp"
              alt="Dmitry Shishanov"
              className="mt-6 w-32 rounded-md object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
