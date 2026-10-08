import PageFaq from '@/components/PageFaq';
import CompanyDirectory from "./company-directory"

export const metadata = {
  title: 'Exhibitor Directory - Diemex Exhibition',
  description: 'Browse participating companies in the Diemex 2027 exhibition',
}

export default function Home() {
  return (
    <>
      {<CompanyDirectory />}
      <PageFaq route="/exhibition-directory" />
    </>
  )
}