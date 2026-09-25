import SectionContainer from '@/components/UI/SectionContainer';

export default function ContactInformation() {
  return (
    <div>
      <h2 className="title-72 text-black mb-8">
        Contact Information
      </h2>

      <div className="rounded-2xl bg-[#E8F1F8] p-8 shadow-sm max-w-md">
        <p className="text-lg leading-relaxed text-black/80 mb-6">
          For stall design approvals of RAW Space Exhibitors, please
          contact our manager:
        </p>

        <p className="text-xl font-semibold text-black">
          Satish
        </p>

        <p className="text-base text-black/70 mb-5">
          Technical Manager
        </p>

        <p className="text-lg mb-3">
          <a
            href="mailto:info@diemex.in"
            className="underline hover:text-mainColor2"
          >
            info@diemex.in
          </a>
        </p>

        <p className="text-lg">
          <a
            href="tel:+916364936468"
            className="underline text-[#4D4D4D]"
          >
            +91 63649 36468
          </a>
        </p>
      </div>
    </div>
  );
}
