import localFont from "next/font/local";
import { pageMeta } from "@/lib/pageMetadata";
import ExhibitLanding from "./ExhibitLanding";
import styles from "./exhibit.module.css";

const inter = localFont({
  src: "../../public/fonts/exhibit-2027/inter.woff2",
  weight: "400 700",
  variable: "--exhibit-inter",
  display: "swap",
});
const manrope = localFont({
  src: "../../public/fonts/exhibit-2027/manrope.woff2",
  weight: "600 800",
  variable: "--exhibit-manrope",
  display: "swap",
});
const jakarta = localFont({
  src: "../../public/fonts/exhibit-2027/plus-jakarta-sans.woff2",
  weight: "600 700",
  variable: "--exhibit-jakarta",
  display: "swap",
});

export const metadata = pageMeta(
  "Exhibit at DIEMEX 2027 | Book Your Stall in Pune",
  "Exhibit at the 3rd International Die & Mould Exhibition, 24-26 March 2027 at Auto Cluster, Pune. Enquire about stall availability, floor plans, and pricing.",
  "/exhibit-2027",
);

export default function Exhibit2027Page() {
  return (
    <div
      className={`${inter.variable} ${manrope.variable} ${jakarta.variable} ${styles.landing}`}
    >
      <ExhibitLanding />
    </div>
  );
}
