import CompanyDirectory from "./company-directory"

export const metadata = {
  title: 'Company Directory - Logistics Exhibition',
  description: 'Browse participating companies in the logistics and transportation exhibition',
}

export default function Home() {
  return <CompanyDirectory />
}