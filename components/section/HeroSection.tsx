import React from "react"
import Image from "next/image"

const HeroSection = () => {
  return (
    <div className="relative flex min-h-[80vh] flex-col justify-end bg-mainColor5 pt-96">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/image.png"
          alt="TransRussia©24"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-20 container pb-10 text-white">
        <h2 className="title-72">About TransRussia</h2>
        <p className="max-w-6xl py-5">
          Shaping Routes To A Seamless Supply Chain.
        </p>
      </div>
    </div>
  )
}

export default HeroSection
