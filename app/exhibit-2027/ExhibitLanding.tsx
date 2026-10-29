"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ExhibitorEnquiryModal from "./ExhibitorEnquiryModal";

function EnquiryPrompt({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col gap-5 py-3">
      <p className="text-sm leading-relaxed text-[#64748B]">
        Tell us about your company and preferred exhibition space. Our team will
        help you find the right stall for your business.
      </p>
      <ul className="space-y-4 text-sm text-[#1B2635]">
        {[
          "Company and contact details",
          "Industry and preferred booth size",
          "Country, state and city",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-[#004A96]"
              style={{ fontSize: 20 }}
              aria-hidden="true"
            >
              check_circle
            </span>
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onOpen}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#004A96] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-[#003875]"
      >
        Get Stall Availability &amp; Pricing
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 18 }}
          aria-hidden="true"
        >
          arrow_forward
        </span>
      </button>
      <p className="text-center text-xs text-[#64748B]">
        Your enquiry goes directly to the DIEMEX organising team.
      </p>
    </div>
  );
}

export default function ExhibitLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [initialStandSize, setInitialStandSize] = useState("");
  const videoRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showVideo) videoRef.current?.showModal();
    else videoRef.current?.close();
  }, [showVideo]);

  function openEnquiry(requestedSpace = "") {
    const standSizes: Record<string, string> = {
      "9 sqm Shell Scheme": "9 sqm (3x3)",
      "36+ sqm Bare Space": "36 sqm (6x6)",
      "Custom Stand": "Custom Size",
    };
    setInitialStandSize(standSizes[requestedSpace] || "");
    setEnquiryOpen(true);
  }

  return (
    <>
      <div className="w-full bg-white min-h-screen">
        <section className="relative w-full overflow-hidden bg-white py-10 lg:py-16 border-b border-[#E3EAF2]">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#004A96]/5 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#004A96]/5 blur-3xl pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#EFF4FF] border border-[#004A96]/30 text-[#004A96] font-label-sm text-xs font-bold uppercase tracking-wider shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004A96] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#004A96]"></span>
                  </span>
                  <span className="">
                    3RD EDITION • INTERNATIONAL DIE &amp; MOULD EXHIBITION
                  </span>
                </div>

                <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-[50px] lg:leading-[58px] tracking-tight text-[#1B2635] font-extrabold">
                  Exhibit at <span className="text-[#004A96]">DIEMEX 2027</span>
                  : Put Your Brand in Front of India&#x27;s Die &amp; Mould
                  Industry.
                </h1>

                <p className="font-body-xl text-lg text-[#64748B] max-w-2xl leading-relaxed">
                  Meet tool room owners, die casters, auto component makers and
                  purchase heads — all in one place.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#E3EAF2] flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[#004A96]">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontSize: 20 }}
                        aria-hidden="true"
                      >
                        calendar_today
                      </span>
                      <span className="font-label-sm text-xs uppercase font-bold text-[#1B2635]">
                        Dates
                      </span>
                    </div>
                    <p className="font-label-md text-sm font-bold text-[#1B2635]">
                      24–26 March 2027
                    </p>
                    <p className="font-body-sm text-xs text-[#64748B]">
                      3 Strategic Business Days
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#E3EAF2] flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[#004A96]">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontSize: 20 }}
                        aria-hidden="true"
                      >
                        location_on
                      </span>
                      <span className="font-label-sm text-xs uppercase font-bold text-[#1B2635]">
                        Venue
                      </span>
                    </div>
                    <p className="font-label-md text-sm font-bold text-[#1B2635]">
                      Auto Cluster, Pune
                    </p>
                    <p className="font-body-sm text-xs text-[#64748B]">
                      Chinchwad Industrial Belt
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F5F8FC] border border-[#E3EAF2] flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[#004A96]">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontSize: 20 }}
                        aria-hidden="true"
                      >
                        verified
                      </span>
                      <span className="font-label-sm text-xs uppercase font-bold text-[#1B2635]">
                        Organised By
                      </span>
                    </div>
                    <p className="font-label-md text-sm font-bold text-[#1B2635]">
                      Maxx Business Media
                    </p>
                    <p className="font-body-sm text-xs text-[#64748B]">
                      Pvt. Ltd.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    className="px-6 py-3 rounded-lg bg-[#004A96] hover:bg-[#003875] text-white font-label-md text-sm uppercase tracking-wider font-bold shadow-md transition-all flex items-center gap-2"
                    type="button"
                    onClick={() => openEnquiry()}
                  >
                    <span className="">Book Your Stall</span>
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontSize: 18 }}
                      aria-hidden="true"
                    >
                      arrow_forward
                    </span>
                  </button>
                  <a
                    className="px-6 py-3 rounded-lg bg-white border border-[#004A96] text-[#004A96] hover:bg-[#EFF4FF] font-label-md text-sm font-bold transition-all"
                    href="/register?t=brochure"
                  >
                    Download Brochure
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF1F2] border border-red-200 text-[#E0161D] font-label-md text-xs font-bold">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontSize: 16 }}
                      aria-hidden="true"
                    >
                      priority_high
                    </span>
                    <span className="">
                      Stalls are limited. Enquire early for preferred locations.
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#64748B] text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[16px] text-[#004A96]"
                        style={{ fontSize: 16 }}
                        aria-hidden="true"
                      >
                        check_circle
                      </span>{" "}
                      8,500+ Qualified Buyers
                    </span>
                    <span className="flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[16px] text-[#004A96]"
                        style={{ fontSize: 16 }}
                        aria-hidden="true"
                      >
                        check_circle
                      </span>{" "}
                      220+ Exhibitors
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className="rounded-xl bg-white border border-[#E3EAF2] shadow-xl p-6 sm:p-8 flex flex-col gap-4 relative overflow-hidden"
                  id="hero-lead-form"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#004A96]"></div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-wider">
                        Fast-Track Response
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#F5F8FC] border border-[#E3EAF2] text-[#64748B] font-label-sm text-[11px] font-semibold">
                        2027 Bookings Active
                      </span>
                    </div>
                    <h2 className="font-headline-md text-xl font-bold text-[#1B2635]">
                      Reserve Your Exhibition Space
                    </h2>
                    <p className="font-body-sm text-xs text-[#64748B]">
                      Share your requirements and our exhibition team will share
                      stall layouts and tariffs.
                    </p>
                  </div>

                  <EnquiryPrompt onOpen={() => openEnquiry()} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#F5F8FC] py-6 border-b border-[#E3EAF2]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E3EAF2]">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    workspace_premium
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-bold text-[#1B2635]">
                    3rd Edition
                  </span>
                  <span className="font-label-sm text-[11px] text-[#64748B] uppercase">
                    Established Platform
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E3EAF2]">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    event_note
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-bold text-[#1B2635]">
                    24–26 Mar 2027
                  </span>
                  <span className="font-label-sm text-[11px] text-[#64748B] uppercase">
                    3 Business Days
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E3EAF2]">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    hub
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-bold text-[#1B2635]">
                    Pune, MH
                  </span>
                  <span className="font-label-sm text-[11px] text-[#64748B] uppercase">
                    India&#x27;s Tooling Hub
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E3EAF2]">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    apartment
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-bold text-[#1B2635]">
                    Auto Cluster
                  </span>
                  <span className="font-label-sm text-[11px] text-[#64748B] uppercase">
                    World-Class Venue
                  </span>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E3EAF2]">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    corporate_fare
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-bold text-[#1B2635] leading-tight">
                    Maxx Business Media
                  </span>
                  <span className="font-label-sm text-[11px] text-[#64748B] uppercase">
                    Pvt. Ltd. Organiser
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-20 bg-white" id="why-exhibit">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="flex flex-col gap-2 max-w-3xl">
                <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-widest">
                  WHY EXHIBIT AT DIEMEX 2027
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#1B2635] font-extrabold tracking-tight">
                  Three Days. Valuable Industry Connections. New Business
                  Opportunities.
                </h2>
                <p className="font-body-lg text-[#64748B]">
                  Showcase your precision machinery, die components, and
                  technological capabilities directly to sourcing authorities
                  who sign purchase orders.
                </p>
              </div>
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#004A96] text-[#004A96] hover:bg-[#EFF4FF] font-label-md text-sm font-bold transition-all shrink-0"
                type="button"
                onClick={() => openEnquiry()}
              >
                <span className="">Explore Exhibitor Opportunities</span>
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                >
                  south
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] group-hover:bg-[#004A96] group-hover:text-white transition-colors flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[26px]"
                      style={{ fontSize: 26 }}
                      aria-hidden="true"
                    >
                      handshake
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-headline-sm text-lg font-bold text-[#1B2635] group-hover:text-[#004A96] transition-colors">
                      Meet Decision-Makers
                    </h3>
                    <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                      Connect face-to-face with company owners, purchase heads,
                      production leaders and tooling engineers actively sourcing
                      shop-floor solutions.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] font-label-sm text-xs">
                  <span className="">Direct Sourcing Dialogues</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] group-hover:bg-[#004A96] group-hover:text-white transition-colors flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[26px]"
                      style={{ fontSize: 26 }}
                      aria-hidden="true"
                    >
                      trending_up
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-headline-sm text-lg font-bold text-[#1B2635] group-hover:text-[#004A96] transition-colors">
                      Generate Quality Leads
                    </h3>
                    <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                      Introduce your machinery and consumable ranges to
                      pre-vetted buyers from automotive, aerospace, white goods,
                      and heavy fabrication clusters.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] font-label-sm text-xs">
                  <span className="">High Conversion Ratio</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] group-hover:bg-[#004A96] group-hover:text-white transition-colors flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[26px]"
                      style={{ fontSize: 26 }}
                      aria-hidden="true"
                    >
                      military_tech
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-headline-sm text-lg font-bold text-[#1B2635] group-hover:text-[#004A96] transition-colors">
                      Strengthen Brand Authority
                    </h3>
                    <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                      Build sustained brand recall across the western India
                      manufacturing belt, reinforcing your technological
                      leadership in precision tooling.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] font-label-sm text-xs">
                  <span className="">Industry Wide Recognition</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] group-hover:bg-[#004A96] group-hover:text-white transition-colors flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[26px]"
                        style={{ fontSize: 26 }}
                        aria-hidden="true"
                      >
                        precision_manufacturing
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#EFF4FF] text-[#004A96] font-label-sm text-xs font-bold uppercase">
                      Live Machinery Power
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-headline-md text-xl font-bold text-[#1B2635] group-hover:text-[#004A96] transition-colors">
                      Demonstrate Cutting-Edge Technology Live
                    </h3>
                    <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                      Power up your 5-axis machining centres, wire EDM, laser
                      cutting systems, inspection CMMs, and CAD simulation
                      suites in real-time. Buyers buy what they see performing
                      in live production simulations.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E3EAF2] flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B]">
                  <span className="px-2.5 py-1 rounded bg-[#F5F8FC] border border-[#E3EAF2]">
                    High-Load 3-Phase Power Available
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#F5F8FC] border border-[#E3EAF2]">
                    Heavy Crane Loading Bay Access
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] group-hover:bg-[#004A96] group-hover:text-white transition-colors flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[26px]"
                      style={{ fontSize: 26 }}
                      aria-hidden="true"
                    >
                      share_location
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-headline-md text-xl font-bold text-[#1B2635] group-hover:text-[#004A96] transition-colors">
                      Expand Dealer &amp; Partner Networks
                    </h3>
                    <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                      Recruit qualified technical distributors, tooling
                      agencies, and OEM supply chain integration partners across
                      Maharashtra, Gujarat, and South India.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] font-label-sm text-xs">
                  <span className="">B2B Dealer Meets Facilitated</span>
                  <button
                    className="text-[#004A96] font-bold hover:underline"
                    type="button"
                    onClick={() => openEnquiry()}
                  >
                    Apply for Booth →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full bg-[#F5F8FC] py-16 lg:py-20 border-y border-[#E3EAF2]"
          id="visitor-profile"
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-widest">
                VISITOR DEMOGRAPHICS &amp; BUYER MATRIX
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#1B2635] font-extrabold tracking-tight mt-1">
                Meet the People Who Influence Manufacturing Decisions.
              </h2>
              <p className="font-body-lg text-[#64748B] mt-2">
                DIEMEX 2027 convenes professionals with active technical
                requirements and allocated capital expenditure budgets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontSize: 24 }}
                    aria-hidden="true"
                  >
                    build
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Tool Room Owners
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] mt-1 leading-relaxed">
                    Proprietors and MDs evaluating capital machinery, cutters,
                    tool steel grades, and precision clamping systems.
                  </p>
                  <span className="font-label-sm text-[11px] text-[#004A96] font-bold mt-2">
                    42% of Attending Audience
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontSize: 24 }}
                    aria-hidden="true"
                  >
                    iron
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Die Casters &amp; Foundries
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] mt-1 leading-relaxed">
                    HPDC and gravity die casting executives looking for mould
                    base longevity, lubricants, and thermal regulation.
                  </p>
                  <span className="font-label-sm text-[11px] text-[#004A96] font-bold mt-2">
                    High Volume Sourcing
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontSize: 24 }}
                    aria-hidden="true"
                  >
                    directions_car
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Auto Component Makers
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] mt-1 leading-relaxed">
                    Tier-1 &amp; Tier-2 automotive suppliers seeking rapid
                    prototyping, multi-cavity injection moulds, and stamping
                    tools.
                  </p>
                  <span className="font-label-sm text-[11px] text-[#004A96] font-bold mt-2">
                    Pune &amp; Chakan Cluster Focused
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontSize: 24 }}
                    aria-hidden="true"
                  >
                    shopping_cart_checkout
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Purchase &amp; Procurement Heads
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] mt-1 leading-relaxed">
                    Corporate procurement officers comparing technical bids,
                    commercial tariffs, payment terms, and rate contracts.
                  </p>
                  <span className="font-label-sm text-[11px] text-[#004A96] font-bold mt-2">
                    Commercial Decision Authorities
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontSize: 24 }}
                    aria-hidden="true"
                  >
                    factory
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Production &amp; Plant Heads
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] mt-1 leading-relaxed">
                    Operational chiefs focused on reducing cycle times, machine
                    downtime, shop-floor robotics, and throughput.
                  </p>
                  <span className="font-label-sm text-[11px] text-[#004A96] font-bold mt-2">
                    Shop-Floor Technical Evaluators
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-colors flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF4FF] text-[#004A96] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontSize: 24 }}
                    aria-hidden="true"
                  >
                    design_services
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Design &amp; R&amp;D Engineers
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] mt-1 leading-relaxed">
                    CAD/CAM modelers, simulation specialists, and product
                    designers selecting hot runner systems and specialized
                    alloys.
                  </p>
                  <span className="font-label-sm text-[11px] text-[#004A96] font-bold mt-2">
                    Technical Specification Sign-offs
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-xl bg-white border border-[#E3EAF2] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#004A96] text-white flex items-center justify-center font-headline-sm text-xl font-black shrink-0">
                  85%
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-base font-bold text-[#1B2635]">
                    Of Past DIEMEX Visitors Hold Direct Purchasing Power
                  </span>
                  <span className="font-body-sm text-xs text-[#64748B]">
                    Verified based on past edition trade badge registration
                    audit records.
                  </span>
                </div>
              </div>
              <button
                className="px-6 py-2.5 rounded-lg bg-[#004A96] hover:bg-[#003875] text-white font-label-md text-sm uppercase tracking-wider font-bold transition-colors shrink-0"
                type="button"
                onClick={() => openEnquiry()}
              >
                Meet These Buyers
              </button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-20 bg-white" id="sectors">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-widest">
                TARGET PROFILE
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#1B2635] font-extrabold tracking-tight mt-1">
                Built for the Businesses Powering Modern Manufacturing.
              </h2>
              <p className="font-body-lg text-[#64748B] mt-2">
                From heavy CNC machines to micro-precision cutting tools, DIEMEX
                is the commercial showcase for 9 key industry sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 01
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Machine Tool Manufacturers
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    VMC, HMC, 5-Axis Machining Centers, Lathes, Surface
                    Grinders, and High-Speed Milling Systems.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">Heavy Machine Bays</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 02
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    CNC &amp; EDM Technology
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    Spark Erosion EDM, Wire-Cut EDM, Hole Drillers, CNC
                    Retrofitting, and Precision Servo Drives.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">Live Demonstration Booths</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 03
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Additive / 3D Metal Printing
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    Conformal cooling channel tooling, metal powder bed fusion
                    (PBF), and rapid industrial prototyping.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">High-Growth Segment</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 04
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Die Casting &amp; Tooling Suppliers
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    Aluminium, Zinc, and Magnesium casting dies, extrusion dies,
                    cold heading dies, and forging tools.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">Core Visitor Draw</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 05
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Mould Base &amp; Standard Parts
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    Ejector pins, guide pillars, hot runner manifolds, mould
                    temperature controllers, and springs.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">High Consumable Demand</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 06
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Tool Steel &amp; Advanced Materials
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    H13, D2, P20, Carbide blanks, powder metallurgy steels, and
                    surface treatment coatings (PVD/CVD).
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">Direct Sourcing Contracts</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 07
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    CAD/CAM &amp; Engineering Software
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    Mould flow simulation, toolpath optimization, generative
                    design suites, and digital twin platforms.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">Tech Lounge Integration</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 08
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Automation &amp; Robotics
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    Collaborative robots, automated tool changers, automated
                    guided vehicles (AGVs), and smart conveyors.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">Industry 4.0 Focus</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] transition-all shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-[#004A96] font-bold">
                    SECTOR 09
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Metrology &amp; Quality Control
                  </h3>
                  <p className="font-body-sm text-xs text-[#64748B] leading-relaxed">
                    CMMs, 3D laser scanners, optical inspection systems, surface
                    roughness testers, and calibration tools.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E3EAF2] flex items-center justify-between text-[#64748B] text-xs">
                  <span className="">Precision Engineering Core</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#004A96]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    check
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <button
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#004A96] hover:bg-[#003875] text-white font-label-md text-sm uppercase tracking-wider font-bold shadow-md transition-all"
                type="button"
                onClick={() => openEnquiry()}
              >
                <span className="">Showcase Your Products at DIEMEX</span>
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#003875] text-white py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="flex flex-col gap-2 max-w-2xl">
                <span className="font-label-sm text-xs text-blue-200 font-bold uppercase tracking-widest">
                  ON THE SHOW FLOOR
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold tracking-tight">
                  Bring Your Innovation to the Exhibition Floor.
                </h2>
                <p className="font-body-lg text-blue-100">
                  High-energy B2B networking, live machine demonstrations, and
                  focused business negotiations at Auto Cluster Exhibition
                  Centre.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded bg-white/10 text-white font-label-sm text-xs uppercase font-bold border border-white/20">
                  Hall A, B &amp; C Open
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 rounded-xl overflow-hidden bg-[#002855] border border-blue-400/20 shadow-xl flex flex-col justify-end relative min-h-[340px] p-6 group">
                <Image
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  src="/images/exhibit-2027/machinery-demo.jpg"
                  alt="High tech modern manufacturing expo floor with bright industrial lighting, CNC machining center cutting metal with coolants, busy professional attendees wearing badges watching precision tool demonstration at a clean modern booth"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002855] via-[#002855]/60 to-transparent"></div>
                <div className="relative z-10 flex flex-col gap-1">
                  <span className="inline-flex items-center gap-1 font-label-sm text-xs uppercase text-blue-200 font-bold">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontSize: 16 }}
                      aria-hidden="true"
                    >
                      precision_manufacturing
                    </span>{" "}
                    Live Machinery Exhibits
                  </span>
                  <h3 className="font-headline-md text-xl font-bold text-white">
                    Heavy Engineering Live Demonstration
                  </h3>
                  <p className="font-body-sm text-xs text-blue-100 max-w-md">
                    Dedicated high-load bays facilitate live metal cutting, die
                    test-runs, and hydraulic clamping demonstrations.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="rounded-xl overflow-hidden bg-[#002855] border border-blue-400/20 shadow-xl flex flex-col justify-end relative min-h-[170px] p-5 group">
                  <Image
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                    src="/images/exhibit-2027/sourcing-meetings.jpg"
                    alt="Corporate engineering business meeting at exhibition booth table, tool room owners reviewing technical schematics and precision die components with company sales engineers in professional attire"
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002855] via-[#002855]/70 to-transparent"></div>
                  <div className="relative z-10 flex flex-col">
                    <span className="font-label-sm text-xs uppercase text-blue-200 font-bold">
                      Commercial Deal-Making
                    </span>
                    <h4 className="font-headline-sm text-lg font-bold text-white">
                      Targeted Sourcing Meetings
                    </h4>
                    <p className="font-body-sm text-xs text-blue-100">
                      Private discussion pods for quotation approvals and
                      technical specifications.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-[#002855] border border-blue-400/20 p-5 flex items-center justify-between gap-4 shadow-xl">
                  <button
                    className="flex items-center gap-4 text-left cursor-pointer"
                    type="button"
                    aria-label="Watch DIEMEX exhibition highlights"
                    onClick={() => setShowVideo(true)}
                  >
                    <div className="w-12 h-12 rounded-full bg-white text-[#004A96] flex items-center justify-center shrink-0 shadow-lg">
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{ fontSize: 24 }}
                        aria-hidden="true"
                      >
                        play_arrow
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-sm font-bold text-white">
                        DIEMEX Highlights Video
                      </span>
                      <span className="font-body-sm text-xs text-blue-200">
                        Watch 2 minutes recap of Pune edition
                      </span>
                    </div>
                  </button>
                  <button
                    className="px-3.5 py-1.5 rounded bg-white text-[#003875] hover:bg-blue-50 font-label-sm text-xs uppercase font-bold transition-colors"
                    type="button"
                    onClick={() => openEnquiry()}
                  >
                    Book Stall
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-blue-400/20">
              <div className="flex flex-col">
                <span className="font-headline-lg text-3xl lg:text-4xl font-extrabold text-white">
                  10,000+
                </span>
                <span className="font-label-sm text-xs uppercase text-blue-200">
                  Gross Sq. Metres Expo Space
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-3xl lg:text-4xl font-extrabold text-blue-300">
                  220+
                </span>
                <span className="font-label-sm text-xs uppercase text-blue-200">
                  Global &amp; Indian Exhibitors
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-3xl lg:text-4xl font-extrabold text-white">
                  8,500+
                </span>
                <span className="font-label-sm text-xs uppercase text-blue-200">
                  Registered Trade Visitors
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-lg text-3xl lg:text-4xl font-extrabold text-blue-300">
                  18+
                </span>
                <span className="font-label-sm text-xs uppercase text-blue-200">
                  Indian States Represented
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-widest">
                SEAMLESS ONBOARDING
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#1B2635] font-extrabold tracking-tight mt-1">
                Three Simple Steps to Exhibit.
              </h2>
              <p className="font-body-lg text-[#64748B] mt-2">
                From initial requirement mapping to stall handover on set-up
                day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] shadow-sm flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#E0161D] text-white font-label-md text-sm font-bold flex items-center justify-center shadow-sm">
                    01
                  </span>
                  <span className="font-label-sm text-xs uppercase font-semibold text-[#64748B]">
                    Step 1 • Enquire
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Submit Requirements
                  </h3>
                  <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                    Submit your company details, product portfolio, machine
                    power prerequisites, and preferred booth footprint.
                  </p>
                </div>
                <div className="mt-auto pt-3 border-t border-[#E3EAF2] text-[#64748B] text-xs">
                  <span className="">Takes under 60 seconds</span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] hover:border-[#004A96] shadow-sm flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#E0161D] text-white font-label-md text-sm font-bold flex items-center justify-center shadow-sm">
                    02
                  </span>
                  <span className="font-label-sm text-xs uppercase font-semibold text-[#64748B]">
                    Step 2 • Layout Select
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Select Stall Location
                  </h3>
                  <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                    The DIEMEX secretariat sends you the live interactive floor
                    map, unallocated corner spots, and commercial tariff
                    schemes.
                  </p>
                </div>
                <div className="mt-auto pt-3 border-t border-[#E3EAF2] text-[#64748B] text-xs">
                  <span className="">Custom proposal within 2 hours</span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#EFF4FF] border border-[#004A96]/30 shadow-sm flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#E0161D] text-white font-label-md text-sm font-bold flex items-center justify-center shadow-sm">
                    03
                  </span>
                  <span className="font-label-sm text-xs uppercase font-bold text-[#004A96]">
                    Step 3 • Confirm
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-headline-sm text-lg font-bold text-[#1B2635]">
                    Confirm &amp; Exhibit
                  </h3>
                  <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                    Confirm space reservation, receive official exhibitor
                    badges, access logistics loading bays, and connect with
                    8,500+ buyers.
                  </p>
                </div>
                <div className="mt-auto pt-3 border-t border-blue-200 text-[#004A96] text-xs font-semibold">
                  <span className="">Complete exhibitor kit provided</span>
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <button
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#004A96] text-[#004A96] hover:bg-[#EFF4FF] font-label-md text-sm font-bold transition-all"
                type="button"
                onClick={() => openEnquiry()}
              >
                <span className="">Start My Booking Enquiry Now</span>
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        <section
          className="w-full py-16 lg:py-20 bg-[#F5F8FC] border-t border-[#E3EAF2]"
          id="stall-options"
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-widest">
                STAND PACKAGES
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#1B2635] font-extrabold tracking-tight mt-1">
                Choose the Exhibition Space That Fits Your Business.
              </h2>
              <p className="font-body-lg text-[#64748B] mt-2">
                Transparent tariffs, turn-key convenience, or custom engineering
                pavilions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E3EAF2] shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[#F5F8FC] border border-[#E3EAF2] text-[#64748B] font-label-sm text-xs uppercase font-semibold">
                      Self-Build
                    </span>
                    <span className="font-body-sm text-xs text-[#64748B]">
                      Min. 36 sq.m
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-[#1B2635]">
                      Bare Space
                    </h3>
                    <p className="font-body-sm text-xs text-[#64748B] mt-1">
                      Ideal for heavy machinery manufacturers, CNC builders, and
                      brands creating custom experiential booths.
                    </p>
                  </div>
                  <div className="py-2">
                    <div className="text-[#004A96] font-headline-sm text-xl font-bold">
                      Contact Us for Rates
                    </div>
                    <span className="font-label-sm text-xs text-[#64748B]">
                      Per sq.m standard tariff (GST extra)
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-1 border-t border-[#E3EAF2]">
                    <span className="font-label-sm text-xs uppercase font-bold text-[#1B2635]">
                      Package Inclusions:
                    </span>
                    <ul className="flex flex-col gap-2 font-body-sm text-xs text-[#64748B]">
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Floor area space allocation
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        High-capacity 3-phase power provision option
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Exhibitor pass allocations per 18 sq.m
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Company listing in official print directory
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Heavy machinery crane unloading assistance
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-6 mt-6">
                  <button
                    className="w-full h-11 rounded-lg bg-[#004A96] hover:bg-[#003875] text-white font-label-md text-sm font-bold shadow-sm transition-colors"
                    type="button"
                    onClick={() => openEnquiry("36+ sqm Bare Space")}
                  >
                    Enquire About Bare Space
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-xl bg-white border-2 border-[#004A96] shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#E0161D] text-white px-4 py-1 rounded-bl-lg font-label-sm text-[11px] uppercase font-bold tracking-wider">
                  Most Popular
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[#EFF4FF] text-[#004A96] font-label-sm text-xs uppercase font-bold">
                      Turnkey Ready
                    </span>
                    <span className="font-body-sm text-xs text-[#64748B]">
                      9, 12, 18+ sq.m
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-[#1B2635]">
                      Built-Up Shell Scheme
                    </h3>
                    <p className="font-body-sm text-xs text-[#64748B] mt-1">
                      Plug-and-play solution. Ideal for tool makers, software,
                      tooling consumables, and precision measurement providers.
                    </p>
                  </div>
                  <div className="py-2">
                    <div className="text-[#004A96] font-headline-sm text-xl font-bold">
                      Contact Us for Rates
                    </div>
                    <span className="font-label-sm text-xs text-[#64748B]">
                      Complete all-inclusive package
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-1 border-t border-[#E3EAF2]">
                    <span className="font-label-sm text-xs uppercase font-bold text-[#1B2635]">
                      Standard Setup Includes:
                    </span>
                    <ul className="flex flex-col gap-2 font-body-sm text-xs text-[#64748B]">
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Octanorm modular white panels (2.5m H)
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Fascia board with company name &amp; stall no.
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Needle-punched exhibition carpet
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        1 Counter table, 2 chairs, 1 waste bin
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        3 Spotlights + 5A power plug point
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Daily cleaning &amp; general hall security
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-6 mt-6">
                  <button
                    className="w-full h-11 rounded-lg bg-[#004A96] hover:bg-[#003875] text-white font-label-md text-sm uppercase tracking-wider font-bold shadow-md transition-colors"
                    type="button"
                    onClick={() => openEnquiry("9 sqm Shell Scheme")}
                  >
                    Book Shell Scheme Stall
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E3EAF2] shadow-sm flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[#F5F8FC] border border-[#E3EAF2] text-[#64748B] font-label-sm text-xs uppercase font-semibold">
                      VIP Showcase
                    </span>
                    <span className="font-body-sm text-xs text-[#64748B]">
                      54+ sq.m
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-[#1B2635]">
                      Custom Requirements
                    </h3>
                    <p className="font-body-sm text-xs text-[#64748B] mt-1">
                      Four-side open prime central locations for multinational
                      conglomerates, OEM partnerships, and country pavilions.
                    </p>
                  </div>
                  <div className="py-2">
                    <div className="text-[#004A96] font-headline-sm text-xl font-bold">
                      Contact Us for Rates
                    </div>
                    <span className="font-label-sm text-xs text-[#64748B]">
                      Tailored floor mapping &amp; branding
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-1 border-t border-[#E3EAF2]">
                    <span className="font-label-sm text-xs uppercase font-bold text-[#1B2635]">
                      VIP Privileges:
                    </span>
                    <ul className="flex flex-col gap-2 font-body-sm text-xs text-[#64748B]">
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        4-side open or 3-side open island position
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Maximum footfall traffic exposure near entrances
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        VIP Buyer lounge meeting passes included
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Priority catalog profile &amp; digital marketing
                        spotlight
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] text-[#004A96] shrink-0 mt-0.5"
                          style={{ fontSize: 16 }}
                          aria-hidden="true"
                        >
                          check_circle
                        </span>{" "}
                        Dedicated logistics relationship coordinator
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-6 mt-6">
                  <button
                    className="w-full h-11 rounded-lg bg-[#004A96] hover:bg-[#003875] text-white font-label-md text-sm font-bold shadow-sm transition-colors"
                    type="button"
                    onClick={() => openEnquiry("Custom Stand")}
                  >
                    Enquire for Island Pavilion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-gradient-to-r from-[#003875] to-[#004A96] text-white py-12 lg:py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-2 text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 self-center lg:self-start px-3 py-1 rounded-full bg-[#E0161D] text-white font-label-sm text-xs uppercase font-bold tracking-wider">
                  Prime Exhibition Slots Filling Up
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Your Next Major Customer Is Walking the DIEMEX Aisle.
                </h2>
                <p className="font-body-lg text-blue-100 max-w-2xl">
                  Put your manufacturing solutions directly in front of an
                  industry-focused tooling audience in Pune. Reserve your space
                  today.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-blue-200 text-xs font-semibold pt-1">
                  <span className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-white"
                      style={{ fontSize: 16 }}
                      aria-hidden="true"
                    >
                      calendar_month
                    </span>{" "}
                    24–26 March 2027
                  </span>
                  <span className="">•</span>
                  <span className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-white"
                      style={{ fontSize: 16 }}
                      aria-hidden="true"
                    >
                      pin_drop
                    </span>{" "}
                    Auto Cluster, Pune
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-[#004A96] hover:bg-blue-50 font-label-md text-sm uppercase tracking-wider font-bold transition-all shadow-lg text-center"
                  type="button"
                  onClick={() => openEnquiry()}
                >
                  Book Your Stall Now
                </button>
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white text-white hover:bg-white/10 font-label-md text-sm font-bold transition-all text-center"
                  type="button"
                  onClick={() => openEnquiry()}
                >
                  Request Stall Pricing
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-16 lg:py-20 bg-[#F5F8FC]"
          id="stall-enquiry"
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-widest">
                    OFFICIAL EXHIBITOR DESK
                  </span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-[#1B2635] tracking-tight">
                    Ready to Exhibit at DIEMEX 2027?
                  </h2>
                  <p className="font-body-lg text-[#64748B]">
                    Let us know what you want to showcase. Our team will verify
                    real-time stall availability and coordinate your official
                    booth allocation.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] shadow-sm flex flex-col gap-4">
                  <span className="font-label-sm text-xs uppercase text-[#1B2635] font-bold">
                    Fast Event Facts
                  </span>
                  <div className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-[20px] text-[#004A96] shrink-0 mt-0.5"
                      style={{ fontSize: 20 }}
                      aria-hidden="true"
                    >
                      event
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-sm font-bold text-[#1B2635]">
                        Exhibition Dates
                      </span>
                      <span className="font-body-sm text-xs text-[#64748B]">
                        24 – 26 March 2027 (Wednesday – Friday)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-[20px] text-[#004A96] shrink-0 mt-0.5"
                      style={{ fontSize: 20 }}
                      aria-hidden="true"
                    >
                      location_on
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-sm font-bold text-[#1B2635]">
                        Exhibition Center
                      </span>
                      <span className="font-body-sm text-xs text-[#64748B]">
                        Auto Cluster Exhibition Centre, Old Mumbai-Pune Hwy,
                        Chinchwad, Pune 411019
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-[20px] text-[#004A96] shrink-0 mt-0.5"
                      style={{ fontSize: 20 }}
                      aria-hidden="true"
                    >
                      timer
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-sm font-bold text-[#1B2635]">
                        Show Timings
                      </span>
                      <span className="font-body-sm text-xs text-[#64748B]">
                        10:00 AM – 6:00 PM Daily (Trade Visitors Only)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white border border-[#E3EAF2] flex flex-col gap-3">
                  <span className="font-label-sm text-xs uppercase font-bold text-[#1B2635]">
                    Secretariat Helplines
                  </span>
                  <div className="flex items-center gap-2.5 text-xs text-[#1B2635]">
                    <span
                      className="material-symbols-outlined text-[18px] text-[#004A96]"
                      style={{ fontSize: 18 }}
                      aria-hidden="true"
                    >
                      mail
                    </span>
                    <span className="">
                      General Desk:{" "}
                      <a
                        className="font-bold underline text-[#004A96]"
                        href="mailto:pad@diemex.in"
                      >
                        pad@diemex.in
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1B2635]">
                    <span
                      className="material-symbols-outlined text-[18px] text-[#004A96]"
                      style={{ fontSize: 18 }}
                      aria-hidden="true"
                    >
                      call
                    </span>
                    <span className="">
                      Phone Hotline:{" "}
                      <a
                        className="font-bold text-[#1B2635]"
                        href="tel:+919148319993"
                      >
                        +91 91483 19993
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1B2635]">
                    <span
                      className="material-symbols-outlined text-[18px] text-[#004A96]"
                      style={{ fontSize: 18 }}
                      aria-hidden="true"
                    >
                      chat
                    </span>
                    <a
                      className="font-bold text-[#004A96] hover:underline"
                      href="https://wa.me/919148319993"
                      rel="noopener"
                      target="_blank"
                    >
                      Instant WhatsApp Assistance →
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-xl bg-white border border-[#E3EAF2] shadow-xl p-6 sm:p-8 flex flex-col gap-4 relative overflow-hidden">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-md text-xl font-bold text-[#1B2635]">
                      Get Stall Availability &amp; Pricing
                    </h3>
                    <p className="font-body-sm text-xs text-[#64748B]">
                      Complete the form below to receive immediate access to the
                      2027 stall allocation plan and official rate card.
                    </p>
                  </div>
                  <EnquiryPrompt onOpen={() => openEnquiry()} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 bg-white border-t border-[#E3EAF2]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="p-8 rounded-xl bg-[#F5F8FC] border border-[#E3EAF2] flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-3 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#EFF4FF] border border-blue-200 text-[#004A96] font-label-sm text-xs uppercase font-bold">
                    ORGANISER REPUTATION
                  </span>
                  <span className="text-[#64748B] font-label-sm text-xs uppercase">
                    • PROVEN B2B EXPOS
                  </span>
                </div>
                <h2 className="font-headline-md text-2xl font-bold text-[#1B2635]">
                  An Industry-Focused Exhibition by Maxx Business Media Pvt.
                  Ltd.
                </h2>
                <p className="font-body-md text-sm text-[#64748B] leading-relaxed">
                  Maxx Business Media is a trusted name in industrial trade
                  expositions, known for curating laser-focused business
                  environments that deliver real commercial impact. With
                  extensive associations across auto engineering clusters, tool
                  room associations, and trade councils, DIEMEX 2027 delivers
                  verified buyer footfall rather than casual public crowds.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 font-label-sm text-xs text-[#64748B]">
                  <span className="flex items-center gap-1 font-semibold text-[#1B2635]">
                    <span
                      className="material-symbols-outlined text-[16px] text-[#004A96]"
                      style={{ fontSize: 16 }}
                      aria-hidden="true"
                    >
                      verified_user
                    </span>{" "}
                    ISO Aligned Exhibition Protocols
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#1B2635]">
                    <span
                      className="material-symbols-outlined text-[16px] text-[#004A96]"
                      style={{ fontSize: 16 }}
                      aria-hidden="true"
                    >
                      verified_user
                    </span>{" "}
                    Heavy Industrial Infrastructure Verified
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#1B2635]">
                    <span
                      className="material-symbols-outlined text-[16px] text-[#004A96]"
                      style={{ fontSize: 16 }}
                      aria-hidden="true"
                    >
                      verified_user
                    </span>{" "}
                    B2B Hosted Buyer Programs
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-[#E3EAF2] shadow-sm text-center shrink-0 w-full lg:w-72">
                <span className="font-label-sm text-xs text-[#64748B] uppercase font-bold">
                  DIEMEX Track Record
                </span>
                <div className="font-display-hero text-4xl font-extrabold text-[#004A96] my-1">
                  98.2%
                </div>
                <span className="font-label-sm text-xs text-[#1B2635] font-semibold">
                  Exhibitor Satisfaction Rate
                </span>
                <p className="font-body-sm text-[11px] text-[#64748B] mt-1">
                  Based on official feedback audits from previous editions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-20 bg-white" id="faqs">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="font-label-sm text-xs text-[#004A96] uppercase font-bold tracking-widest">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-[#1B2635] tracking-tight mt-1">
                Everything You Need to Know About Exhibiting.
              </h2>
              <p className="font-body-md text-sm text-[#64748B] mt-2">
                Answers regarding venue logistics, visitor profile, booth
                options and timelines.
              </p>
            </div>

            <div className="flex flex-col gap-3" id="faq-accordion-group">
              <div className="rounded-xl border border-[#E3EAF2] bg-white shadow-sm overflow-hidden transition-all">
                <button
                  className="w-full p-5 flex items-center justify-between text-left gap-4 hover:text-[#004A96] transition-colors"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  aria-expanded={openFaq === 0}
                  aria-controls="exhibit-faq-answer-0"
                  id="exhibit-faq-question-0"
                >
                  <span className="font-headline-sm text-base font-bold text-[#1B2635]">
                    When and where will DIEMEX 2027 be held?
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] text-[#004A96] transition-transform duration-200 shrink-0"
                    aria-hidden="true"
                    style={{
                      fontSize: 20,
                      transform: openFaq === 0 ? "rotate(180deg)" : undefined,
                    }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-content px-5 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-[#E3EAF2] pt-3"
                  id="exhibit-faq-answer-0"
                  role="region"
                  aria-labelledby="exhibit-faq-question-0"
                  hidden={openFaq !== 0}
                >
                  DIEMEX 2027 takes place from 24th to 26th March 2027 at the
                  Auto Cluster Exhibition Centre, Old Mumbai-Pune Highway,
                  Chinchwad, Pune, Maharashtra. Pune is the heart of
                  India&#x27;s automotive, tooling, casting, and engineering
                  clusters.
                </div>
              </div>

              <div className="rounded-xl border border-[#E3EAF2] bg-white shadow-sm overflow-hidden transition-all">
                <button
                  className="w-full p-5 flex items-center justify-between text-left gap-4 hover:text-[#004A96] transition-colors"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  aria-expanded={openFaq === 1}
                  aria-controls="exhibit-faq-answer-1"
                  id="exhibit-faq-question-1"
                >
                  <span className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Who is eligible to exhibit at DIEMEX 2027?
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] text-[#004A96] transition-transform duration-200 shrink-0"
                    aria-hidden="true"
                    style={{
                      fontSize: 20,
                      transform: openFaq === 1 ? "rotate(180deg)" : undefined,
                    }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-content px-5 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-[#E3EAF2] pt-3"
                  id="exhibit-faq-answer-1"
                  role="region"
                  aria-labelledby="exhibit-faq-question-1"
                  hidden={openFaq !== 1}
                >
                  Exhibitor space is dedicated to manufacturers and suppliers of
                  dies, moulds, press tools, machine tools, CNC &amp; EDM
                  equipment, additive manufacturing / 3D printing systems, tool
                  steel, mould base components, CAD/CAM simulation software,
                  industrial automation, robotics, and precision quality testing
                  instruments.
                </div>
              </div>

              <div className="rounded-xl border border-[#E3EAF2] bg-white shadow-sm overflow-hidden transition-all">
                <button
                  className="w-full p-5 flex items-center justify-between text-left gap-4 hover:text-[#004A96] transition-colors"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  aria-expanded={openFaq === 2}
                  aria-controls="exhibit-faq-answer-2"
                  id="exhibit-faq-question-2"
                >
                  <span className="font-headline-sm text-base font-bold text-[#1B2635]">
                    What is the difference between Shell Scheme and Bare Space?
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] text-[#004A96] transition-transform duration-200 shrink-0"
                    aria-hidden="true"
                    style={{
                      fontSize: 20,
                      transform: openFaq === 2 ? "rotate(180deg)" : undefined,
                    }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-content px-5 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-[#E3EAF2] pt-3"
                  id="exhibit-faq-answer-2"
                  role="region"
                  aria-labelledby="exhibit-faq-question-2"
                  hidden={openFaq !== 2}
                >
                  A <strong>Shell Scheme</strong> is turn-key: it comes with
                  pre-erected modular wall partitions, carpeting, company fascia
                  branding, spotlights, power connection, table, and chairs.{" "}
                  <strong>Bare Space</strong> is floor space only (minimum 36
                  sq.m), designed for companies constructing custom designed
                  pavilions or staging heavy CNC equipment.
                </div>
              </div>

              <div className="rounded-xl border border-[#E3EAF2] bg-white shadow-sm overflow-hidden transition-all">
                <button
                  className="w-full p-5 flex items-center justify-between text-left gap-4 hover:text-[#004A96] transition-colors"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  aria-expanded={openFaq === 3}
                  aria-controls="exhibit-faq-answer-3"
                  id="exhibit-faq-question-3"
                >
                  <span className="font-headline-sm text-base font-bold text-[#1B2635]">
                    Is 3-phase industrial power available for live machinery
                    demos?
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] text-[#004A96] transition-transform duration-200 shrink-0"
                    aria-hidden="true"
                    style={{
                      fontSize: 20,
                      transform: openFaq === 3 ? "rotate(180deg)" : undefined,
                    }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-content px-5 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-[#E3EAF2] pt-3"
                  id="exhibit-faq-answer-3"
                  role="region"
                  aria-labelledby="exhibit-faq-question-3"
                  hidden={openFaq !== 3}
                >
                  Yes. Auto Cluster Exhibition Centre has heavy industrial power
                  capability. Exhibitors can book dedicated 3-phase power loads
                  (HP/KW) and compressed air lines during the space reservation
                  process to demonstrate machinery in real-time.
                </div>
              </div>

              <div className="rounded-xl border border-[#E3EAF2] bg-white shadow-sm overflow-hidden transition-all">
                <button
                  className="w-full p-5 flex items-center justify-between text-left gap-4 hover:text-[#004A96] transition-colors"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                  aria-expanded={openFaq === 4}
                  aria-controls="exhibit-faq-answer-4"
                  id="exhibit-faq-question-4"
                >
                  <span className="font-headline-sm text-base font-bold text-[#1B2635]">
                    How are corner stalls and island locations allocated?
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] text-[#004A96] transition-transform duration-200 shrink-0"
                    aria-hidden="true"
                    style={{
                      fontSize: 20,
                      transform: openFaq === 4 ? "rotate(180deg)" : undefined,
                    }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-content px-5 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-[#E3EAF2] pt-3"
                  id="exhibit-faq-answer-4"
                  role="region"
                  aria-labelledby="exhibit-faq-question-4"
                  hidden={openFaq !== 4}
                >
                  Corner booths (2-side open) and island pavilions (3 or 4-side
                  open) are allotted strictly on a first-come, first-served
                  basis upon contract receipt and initial advance deposit.
                  Submitting an enquiry early ensures first access to the layout
                  plan.
                </div>
              </div>

              <div className="rounded-xl border border-[#E3EAF2] bg-white shadow-sm overflow-hidden transition-all">
                <button
                  className="w-full p-5 flex items-center justify-between text-left gap-4 hover:text-[#004A96] transition-colors"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                  aria-expanded={openFaq === 5}
                  aria-controls="exhibit-faq-answer-5"
                  id="exhibit-faq-question-5"
                >
                  <span className="font-headline-sm text-base font-bold text-[#1B2635]">
                    What kind of business visitors attend DIEMEX?
                  </span>
                  <span
                    className="material-symbols-outlined text-[20px] text-[#004A96] transition-transform duration-200 shrink-0"
                    aria-hidden="true"
                    style={{
                      fontSize: 20,
                      transform: openFaq === 5 ? "rotate(180deg)" : undefined,
                    }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-content px-5 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-[#E3EAF2] pt-3"
                  id="exhibit-faq-answer-5"
                  role="region"
                  aria-labelledby="exhibit-faq-question-5"
                  hidden={openFaq !== 5}
                >
                  DIEMEX is strictly a B2B trade exhibition. General public is
                  not admitted. The visitor register comprises tool room owners,
                  die casters, automotive tier 1 &amp; 2 component makers,
                  purchase &amp; procurement directors, plant managers, and
                  design engineers.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#003875] text-white py-16 lg:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative z-10">
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-white font-label-sm text-xs uppercase font-bold tracking-widest border border-white/20">
                3RD INTERNATIONAL DIE &amp; MOULD EXHIBITION
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold tracking-tight">
                Don’t Miss Your Place at DIEMEX 2027.
              </h2>
              <p className="font-body-xl text-base sm:text-lg text-blue-100 leading-relaxed">
                Connect with India’s die, mould, press tools, and precision
                manufacturing community in Pune. Explore exhibition
                opportunities today.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#004A96] hover:bg-[#002855] border border-blue-400/30 text-white font-label-md text-sm uppercase tracking-wider font-bold transition-all shadow-xl"
                  type="button"
                  onClick={() => openEnquiry()}
                >
                  Book Your Stall Now
                </button>
                <a
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-label-md text-sm font-bold transition-all border border-white/20"
                  href="/layout"
                >
                  Download Floor Plan
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-blue-200 text-xs pt-6">
                <a
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                  href="mailto:pad@diemex.in"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    mail
                  </span>{" "}
                  pad@diemex.in
                </a>
                <a
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                  href="tel:+919148319993"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    phone
                  </span>{" "}
                  +91 91483 19993 (Secretariat)
                </a>
                <a
                  className="flex items-center gap-1.5 text-blue-200 hover:text-white underline font-semibold"
                  href="https://wa.me/919148319993"
                  rel="noopener"
                  target="_blank"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    chat
                  </span>{" "}
                  Chat with Exhibition Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="w-full bg-[#003875] text-white py-12 border-t border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-xl tracking-tight text-white uppercase font-black">
                  DIEMEX
                </span>
                <span className="font-headline-sm text-xl tracking-tight text-blue-300 font-black">
                  2027
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-label-sm text-[10px] uppercase font-bold border border-white/20">
                  3rd Edition
                </span>
              </div>
              <p className="font-body-sm text-xs text-blue-100 leading-relaxed">
                Premier international exhibition spotlighting precision tooling,
                press tools, dies, moulds, machine tools, and manufacturing
                engineering advancements.
              </p>
              <p className="font-label-sm text-xs text-blue-200 mt-1">
                Organised by{" "}
                <span className="text-white font-bold">
                  Maxx Business Media Pvt. Ltd.
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-label-lg text-sm text-white uppercase tracking-wider font-bold">
                Event Venue
              </div>
              <p className="font-body-sm text-xs text-blue-100 leading-relaxed">
                Auto Cluster Exhibition Centre
                <br />
                Old Mumbai - Pune Highway, Chinchwad,
                <br />
                Pune, Maharashtra 411019, India
              </p>
              <div className="flex items-center gap-1 text-blue-200 font-label-sm text-xs font-semibold">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontSize: 16 }}
                  aria-hidden="true"
                >
                  calendar_month
                </span>
                <span className="">24 – 26 MARCH 2027</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-label-lg text-sm text-white uppercase tracking-wider font-bold">
                Verified Contacts
              </div>
              <div className="flex flex-col gap-2 font-body-sm text-xs text-blue-100">
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    mail
                  </span>
                  <a
                    className="hover:text-white transition-colors"
                    href="mailto:pad@diemex.in"
                  >
                    pad@diemex.in
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    call
                  </span>
                  <a
                    className="hover:text-white transition-colors"
                    href="tel:+919148319993"
                  >
                    +91 91483 19993 (Hotline)
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    chat
                  </span>
                  <a
                    className="hover:text-white transition-colors"
                    href="https://wa.me/919148319993"
                    rel="noopener"
                    target="_blank"
                  >
                    WhatsApp Official Desk
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-label-lg text-sm text-white uppercase tracking-wider font-bold">
                Quick Navigation
              </div>
              <div className="flex flex-col gap-2 font-body-sm text-xs text-blue-100">
                <a
                  className="hover:text-white transition-colors"
                  href="#why-exhibit"
                >
                  Why Exhibit
                </a>
                <a
                  className="hover:text-white transition-colors"
                  href="#stall-options"
                >
                  Stall Layout &amp; Tariffs
                </a>
                <a
                  className="hover:text-white transition-colors"
                  href="#visitor-profile"
                >
                  Buyer Attendance Matrix
                </a>
                <a
                  className="hover:text-white transition-colors"
                  href="https://diemex.in"
                  rel="noopener"
                  target="_blank"
                >
                  Official Portal (diemex.in)
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-blue-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-200">
            <div className="">
              © 2027 Maxx Business Media Pvt. Ltd. All rights reserved.
              International Die &amp; Mould Exhibition.
            </div>
            <div className="flex items-center gap-6">
              <a
                className="hover:text-white transition-colors"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>
              <a
                className="hover:text-white transition-colors"
                href="/termstouse"
              >
                Terms &amp; Conditions
              </a>
              <a
                className="hover:text-white transition-colors"
                href="https://diemex.in"
                rel="noopener"
                target="_blank"
              >
                diemex.in
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md px-4 py-2.5 border-t border-[#E3EAF2] flex items-center gap-2 shadow-lg">
        <a
          aria-label="WhatsApp Support"
          className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#F5F8FC] border border-[#E3EAF2] text-[#004A96] hover:bg-[#EFF4FF] transition-colors shrink-0"
          href="https://wa.me/919148319993"
          rel="noopener"
          target="_blank"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontSize: 22 }}
            aria-hidden="true"
          >
            chat
          </span>
        </a>
        <button
          className="flex-1 flex items-center justify-center h-11 rounded-lg bg-[#004A96] text-white font-label-md text-xs font-bold uppercase tracking-wider hover:bg-[#003875] transition-colors"
          type="button"
          onClick={() => openEnquiry()}
        >
          Book Your Stall
        </button>
      </div>
      <dialog
        ref={videoRef}
        aria-label="DIEMEX exhibition highlights"
        onClose={() => setShowVideo(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setShowVideo(false);
        }}
        className="fixed inset-0 m-auto w-[min(960px,94vw)] overflow-visible rounded-xl border-0 bg-[#003875] p-3 shadow-2xl backdrop:bg-black/75"
      >
        <button
          type="button"
          onClick={() => setShowVideo(false)}
          className="mb-2 ml-auto block rounded px-3 py-1 text-sm font-semibold text-white hover:bg-white/10"
          aria-label="Close highlights video"
        >
          Close
        </button>
        {showVideo && (
          <iframe
            className="aspect-video w-full rounded-lg"
            src="https://www.youtube.com/embed/3P-hRFrsXIs?autoplay=1&playsinline=1&rel=0"
            title="DIEMEX exhibition highlights"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </dialog>
      <ExhibitorEnquiryModal
        open={enquiryOpen}
        initialStandSize={initialStandSize}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}
