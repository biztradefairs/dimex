// components/ConnectSection.tsx
export default function ConnectSection() {
  return (
    <section className="relative z-1 overflow-hidden bg-[#0E1C35] text-white py-32">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-24">
          <div className="flex flex-col gap-8 py-10 lg:col-span-2 lg:py-20">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.85] tracking-tight">
              Stay Connected
            </h2>
            
            <div className="space-y-6 max-w-3xl">
              <p className="text-lg md:text-xl leading-relaxed">
Experience continuous networking and collaboration with MOLDING TRENDS, our exclusive platform designed for die & mould, tooling, and precision manufacturing professionals. Connect with industry peers, buyers, and solution providers before, during, and after the exhibition—365 days a year.              </p>
            </div>
            
            {/* <a href="https://app.transrussia-connect.com/public/post?id=3f91096c0eb34ab0bf2a55762da78caa&vendorId=edce6a84-ed2f-455a-afd7-d7fbb0d16c00" className="block mt-8">
              <button className="flex items-center justify-center group gap-2 overflow-hidden rounded-full px-10 py-4 font-jakarta text-[16px] font-semibold transition-all duration-300 bg-white text-[#0092D7] hover:bg-[#0092D7] hover:text-white w-fit">
                Join TransRussia Connect
              </button>
            </a> */}
          </div>
          
          <div className="flex items-center justify-center relative z-[-1] my-10 lg:h-full lg:my-0">
            <img 
              src="/images/image.png" 
              alt="TransRussia Connect" 
              className="size-auto max-w-md"
            />
            <div className="absolute inset-0 flex items-center justify-center z-[-1] aspect-square w-full scale-150">
              <div className="absolute size-full rounded-full bg-[#0092D7] opacity-20" />
              <div className="absolute size-2/3 rounded-full bg-[#0092D7] opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}