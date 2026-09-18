export const GST_PERCENT_DEFAULT = 18
export const PHASE_PERCENTS = [30, 40, 30] as const
export const PHASE_LABELS = ['Initial Payment', '2nd Payment', '3rd Payment'] as const

export type PaymentPhaseStatus = 'pending' | 'paid' | 'overdue'

export type PaymentPhase = {
  phase: number
  label: string
  percent: number
  amount: number
  dueDate: string
  status: PaymentPhaseStatus
}

export type StallPayment = {
  stallCost: number
  discount: number
  gstPercent: number
  gstAmount: number
  afterDiscount: number
  finalAmount: number
  paymentPhases: PaymentPhase[]
}

function round2(value: number | string | null | undefined) {
  return Math.round((Number(value) || 0) * 100) / 100
}

function normalizeStatus(status?: string): PaymentPhaseStatus {
  return status === 'paid' || status === 'overdue' || status === 'pending'
    ? status
    : 'pending'
}

export function calculateStallPayment(
  source: {
    stallCost?: number | string
    discount?: number | string
    gstPercent?: number | string
    paymentPhases?: Array<Partial<PaymentPhase>>
  } = {},
  existing: Partial<Omit<StallPayment, 'paymentPhases'>> & {
    paymentPhases?: Array<Partial<PaymentPhase>>
  } = {}
): StallPayment {
  const stallCost = round2(source.stallCost ?? existing.stallCost ?? 0)
  const discount = round2(source.discount ?? existing.discount ?? 0)
  const gstPercent = round2(source.gstPercent ?? existing.gstPercent ?? GST_PERCENT_DEFAULT)
  const afterDiscount = round2(Math.max(0, stallCost - discount))
  const gstAmount = round2((afterDiscount * gstPercent) / 100)
  const finalAmount = round2(afterDiscount + gstAmount)

  const incoming = Array.isArray(source.paymentPhases)
    ? source.paymentPhases
    : Array.isArray(existing.paymentPhases)
      ? existing.paymentPhases
      : []

  const first = round2(finalAmount * 0.3)
  const second = round2(finalAmount * 0.4)
  const third = round2(finalAmount - first - second)
  const amounts = [first, second, third]

  const paymentPhases = PHASE_PERCENTS.map((percent, index) => {
    const prev =
      incoming.find((phase) => Number(phase?.phase) === index + 1) ||
      incoming[index] ||
      {}
    return {
      phase: index + 1,
      label: PHASE_LABELS[index],
      percent,
      amount: amounts[index],
      dueDate: prev.dueDate || '',
      status: normalizeStatus(prev.status),
    }
  })

  return {
    stallCost,
    discount,
    gstPercent,
    gstAmount,
    afterDiscount,
    finalAmount,
    paymentPhases,
  }
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0)
}

export function toDateInputValue(value?: string) {
  if (!value) return ''
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value)
  return match ? match[1] : value.slice(0, 10)
}

export function formatPhaseDate(value?: string) {
  if (!value) return 'Date not set'
  const ymd = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  const date = ymd
    ? new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]))
    : new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
