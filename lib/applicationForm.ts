export const SHELL_RATE = 11000
export const BARE_RATE = 10000
export const TWO_SIDE_PERCENT = 15
export const THREE_SIDE_PERCENT = 25
export const APPLICATION_GST_PERCENT = 18
export const ADVANCE_PERCENT = 30

export const APPLICATION_RULES = [
  'Space is allotted on a first-come, first-served basis and is subject to full payment as per the schedule on this form.',
  'Advance payment of 30% of the total amount payable is due on confirmation of space. The balance is payable as per the organiser’s payment schedule.',
  'All amounts are in Indian Rupees. GST @ 18% (or the rate applicable at the time of invoicing) will be charged extra on space and open-side charges.',
  'Shell scheme space is charged at ₹11,000 per sq.m. Bare space is charged at ₹10,000 per sq.m. Open-side charges are 15% of space charges for 2-side open and 25% for 3-side open.',
  'Stall numbers, location, and layout are assigned by the organiser and may be changed if required for overall floor-plan, safety, or operational reasons.',
  'The exhibitor shall not sublet, assign, or share the allotted space with any other company without prior written approval of the organiser.',
  'Cancellation, reduction of space, or withdrawal must be informed in writing. Refunds, if any, are as per the organiser’s cancellation policy and are not guaranteed.',
  'The exhibitor is responsible for the safety of its staff, exhibits, and visitors at the stall, and for compliance with venue, fire, electrical, and security regulations.',
  'Construction, branding, and height of bare-space stalls must follow the exhibitor manual. Shell-scheme exhibitors must not damage or alter standard booth fittings.',
  'The organiser is not liable for loss, damage, delay, or interruption caused by circumstances beyond its reasonable control.',
  'By downloading, signing, and uploading this application, the exhibitor confirms that the company information and participation details are correct and accepts these rules and regulations.',
  'Disputes, if any, shall be subject to the jurisdiction of the courts at the organiser’s registered office.',
]

export type SignedUpload = {
  fileName: string
  url: string
  mimeType?: string
  uploadedAt?: string
}

export type ApplicationFormData = {
  gstNo: string
  companyName: string
  contactPerson: string
  designation: string
  address: string
  city: string
  pincode: string
  state: string
  telephone: string
  mobile: string
  email: string
  shellScheme: boolean
  shellSqm: string | number
  bareSpace: boolean
  bareSqm: string | number
  twoSideOpen: boolean
  threeSideOpen: boolean
  stallNo: string
  bookedBy: string
  date: string
  place: string
  confirmation: boolean
  rubberStamp: boolean
  status?: 'draft' | 'sent'
  sentAt?: string | null
  signedUpload?: SignedUpload | null
  totals?: ApplicationTotals
}

export type ApplicationTotals = {
  shellSqm: number
  bareSqm: number
  shellAmount: number
  bareAmount: number
  spaceCharges: number
  twoSideAmount: number
  threeSideAmount: number
  openSideCharges: number
  total: number
  gstAmount: number
  totalPayable: number
  advance: number
  balance: number
}

function round2(value: number | string | null | undefined) {
  return Math.round((Number(value) || 0) * 100) / 100
}

export function emptyApplicationForm(): ApplicationFormData {
  return {
    gstNo: '',
    companyName: '',
    contactPerson: '',
    designation: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    telephone: '',
    mobile: '',
    email: '',
    shellScheme: false,
    shellSqm: '',
    bareSpace: false,
    bareSqm: '',
    twoSideOpen: false,
    threeSideOpen: false,
    stallNo: '',
    bookedBy: '',
    date: '',
    place: '',
    confirmation: false,
    rubberStamp: false,
    status: 'draft',
    sentAt: null,
    signedUpload: null,
  }
}

export function calculateApplicationTotals(form: Partial<ApplicationFormData> = {}): ApplicationTotals {
  const shellSqm = form.shellScheme ? round2(form.shellSqm) : 0
  const bareSqm = form.bareSpace ? round2(form.bareSqm) : 0
  const shellAmount = round2(shellSqm * SHELL_RATE)
  const bareAmount = round2(bareSqm * BARE_RATE)
  const spaceCharges = round2(shellAmount + bareAmount)
  const twoSideAmount = form.twoSideOpen ? round2((spaceCharges * TWO_SIDE_PERCENT) / 100) : 0
  const threeSideAmount = form.threeSideOpen ? round2((spaceCharges * THREE_SIDE_PERCENT) / 100) : 0
  const openSideCharges = round2(twoSideAmount + threeSideAmount)
  const total = round2(spaceCharges + openSideCharges)
  const gstAmount = round2((total * APPLICATION_GST_PERCENT) / 100)
  const totalPayable = round2(total + gstAmount)
  const advance = round2((totalPayable * ADVANCE_PERCENT) / 100)
  const balance = round2(totalPayable - advance)

  return {
    shellSqm,
    bareSqm,
    shellAmount,
    bareAmount,
    spaceCharges,
    twoSideAmount,
    threeSideAmount,
    openSideCharges,
    total,
    gstAmount,
    totalPayable,
    advance,
    balance,
  }
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0)
}
