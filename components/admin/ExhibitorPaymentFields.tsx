"use client"

import { calculateStallPayment, formatINR, type PaymentPhaseStatus } from "@/lib/stallPayment"

export type PaymentFormValue = {
  stallCost: string
  gstPercent: string
  discount: string
  phases: Array<{ dueDate: string; status: PaymentPhaseStatus }>
}

const emptyPhases: PaymentFormValue["phases"] = [
  { dueDate: "", status: "pending" },
  { dueDate: "", status: "pending" },
  { dueDate: "", status: "pending" },
]

export const defaultPaymentFormValue: PaymentFormValue = {
  stallCost: "",
  gstPercent: "18",
  discount: "",
  phases: emptyPhases,
}

type Props = {
  value: PaymentFormValue
  onChange: (value: PaymentFormValue) => void
}

export default function ExhibitorPaymentFields({ value, onChange }: Props) {
  const calculated = calculateStallPayment({
    stallCost: value.stallCost,
    discount: value.discount,
    gstPercent: value.gstPercent || "18",
    paymentPhases: value.phases.map((phase, index) => ({
      phase: index + 1,
      dueDate: phase.dueDate,
      status: phase.status,
    })),
  })

  const update = (patch: Partial<PaymentFormValue>) => {
    onChange({ ...value, ...patch })
  }

  const updatePhase = (index: number, patch: Partial<PaymentFormValue["phases"][number]>) => {
    const phases = value.phases.map((phase, i) => (i === index ? { ...phase, ...patch } : phase))
    onChange({ ...value, phases })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
        Stall Cost & Payment Schedule
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stall Cost (INR)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={value.stallCost}
            onChange={(e) => update({ stallCost: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GST (%)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={value.gstPercent}
            onChange={(e) => update({ gstPercent: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Discount (INR)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={value.discount}
            onChange={(e) => update({ discount: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Stall cost − discount</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{formatINR(calculated.afterDiscount)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs text-slate-500">GST ({calculated.gstPercent}%)</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{formatINR(calculated.gstAmount)}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 md:col-span-2">
          <p className="text-xs text-blue-700">Final amount</p>
          <p className="mt-1 text-2xl font-bold text-blue-800">{formatINR(calculated.finalAmount)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Payment Remainders</h3>
        <div className="space-y-4">
          {calculated.paymentPhases.map((phase, index) => (
            <div key={phase.phase} className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-lg border border-gray-200 p-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{phase.label}</p>
                <p className="text-xs text-gray-500">{phase.percent}% · {formatINR(phase.amount)}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Due date</label>
                <input
                  type="date"
                  value={value.phases[index]?.dueDate || ""}
                  onChange={(e) => updatePhase(index, { dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={value.phases[index]?.status || "pending"}
                  onChange={(e) => updatePhase(index, { status: e.target.value as PaymentPhaseStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
