import ConferenceIntro from "@/components/section/ConferenceIntro"
import ConferenceOverview from "@/components/section/ConferenceOverview"
import ConferenceStats from "@/components/section/ConferenceStats"
import KeyTopics from "@/components/section/KeyTopics"
// import PartnersSection from "@/components/section/PartnersSection"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export default function ConferenceProgrammePage() {
  return (
    <>
      <ConferenceIntro />
      <ConferenceOverview />
      <ConferenceStats />
      <KeyTopics />
      {/* <PartnersSection/> */}
      <BackToTop/>
    </>
  )
}
