"use client";

import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import ExhibitorForm from "@/components/ExhibitorForm";

type ExhibitorEnquiryModalProps = {
  open: boolean;
  initialStandSize: string;
  onClose: () => void;
};

export default function ExhibitorEnquiryModal({
  open,
  initialStandSize,
  onClose,
}: ExhibitorEnquiryModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="exhibit-enquiry-title"
      aria-describedby="exhibit-enquiry-description"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onClose();
      }}
      className="fixed inset-0 m-auto w-[min(760px,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl border-0 bg-white p-0 text-[#1B2635] shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="flex max-h-[92dvh] flex-col border-t-4 border-[#004A96]">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#E3EAF2] px-5 py-5 sm:px-8">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#004A96]">
                DIEMEX 2027
              </p>
              <h2
                id="exhibit-enquiry-title"
                className="font-headline-md text-xl font-bold sm:text-2xl"
              >
                Enquire About Exhibiting
              </h2>
              <p
                id="exhibit-enquiry-description"
                className="mt-1 text-sm text-[#64748B]"
              >
                Share your details and our exhibition team will get in touch.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close exhibitor form"
              className="shrink-0 rounded-lg border border-[#E3EAF2] px-3 py-2 text-sm font-semibold text-[#004A96] hover:bg-[#EFF4FF]"
            >
              Close
            </button>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
            <ExhibitorForm
              variant="popup"
              initialStandSize={initialStandSize}
            />
          </div>
          <Toaster position="top-center" />
        </div>
      )}
    </dialog>
  );
}
