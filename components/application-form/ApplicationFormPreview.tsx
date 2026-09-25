'use client'

import {
  APPLICATION_GST_PERCENT,
  APPLICATION_RULES,
  ADVANCE_PERCENT,
  BARE_RATE,
  SHELL_RATE,
  THREE_SIDE_PERCENT,
  TWO_SIDE_PERCENT,
  calculateApplicationTotals,
  formatINR,
  type ApplicationFormData,
} from '@/lib/applicationForm'

function Row({ label, value }: { label: string; value?: string | number | boolean }) {
  const display =
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value === 0 || value ? String(value) : '—'
  return (
    <div className="grid grid-cols-3 border-b border-gray-200 text-sm">
      <div className="bg-slate-50 px-3 py-2 font-medium text-gray-600">{label}</div>
      <div className="col-span-2 px-3 py-2 text-gray-900">{display}</div>
    </div>
  )
}

function MoneyRow({
  label,
  amount,
  highlight,
}: {
  label: string
  amount: number
  highlight?: boolean
}) {
  return (
    <div className={`flex items-center justify-between border-b border-gray-200 px-3 py-2 text-sm ${highlight ? 'bg-[#E8F1F8] font-semibold' : ''}`}>
      <span className={highlight ? 'text-[#004A96]' : 'text-gray-600'}>{label}</span>
      <span className={highlight ? 'text-[#004A96]' : 'text-gray-900'}>{formatINR(amount)}</span>
    </div>
  )
}

export default function ApplicationFormPreview({ form }: { form: ApplicationFormData }) {
  const totals = form.totals || calculateApplicationTotals(form)

  return (
    <div className="space-y-8 bg-white">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="bg-[#004A96] px-5 py-4 text-white">
          <p className="text-xs tracking-widest text-[#E0161D]">DIEMEX</p>
          <h2 className="text-lg font-semibold">Exhibition Application Form</h2>
        </div>

        <div className="p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Company Information
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Row label="GST No" value={form.gstNo} />
            <Row label="Name of the Company" value={form.companyName} />
            <Row label="Contact Person" value={form.contactPerson} />
            <Row label="Designation" value={form.designation} />
            <Row label="Address" value={form.address} />
            <Row label="City" value={form.city} />
            <Row label="Pincode" value={form.pincode} />
            <Row label="State" value={form.state} />
            <Row label="Telephone" value={form.telephone} />
            <Row label="Mobile" value={form.mobile} />
            <Row label="E-mail Address" value={form.email} />
          </div>
        </div>

        <div className="px-5 pb-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Participation Expenses
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <MoneyRow
              label={`${form.shellScheme ? '☑' : '☐'} Stall Type – Shell Scheme · ₹${SHELL_RATE.toLocaleString('en-IN')} / SQM${form.shellScheme ? ` · ${totals.shellSqm} SQ.M` : ''}`}
              amount={totals.shellAmount}
            />
            <MoneyRow
              label={`${form.bareSpace ? '☑' : '☐'} Stall Type – Bare Space · ₹${BARE_RATE.toLocaleString('en-IN')} / SQM${form.bareSpace ? ` · ${totals.bareSqm} SQ.M` : ''}`}
              amount={totals.bareAmount}
            />
            <MoneyRow
              label={`${form.twoSideOpen ? '☑' : '☐'} 2 Side Open @ ${TWO_SIDE_PERCENT}% of Space Charges`}
              amount={totals.twoSideAmount}
            />
            <MoneyRow
              label={`${form.threeSideOpen ? '☑' : '☐'} 3 Side Open @ ${THREE_SIDE_PERCENT}% of Space Charges`}
              amount={totals.threeSideAmount}
            />
            <MoneyRow label="Total" amount={totals.total} />
            <MoneyRow label={`GST @ ${APPLICATION_GST_PERCENT}%`} amount={totals.gstAmount} />
            <MoneyRow label="Total Amount Payable" amount={totals.totalPayable} highlight />
            <MoneyRow label={`Advance Payment (${ADVANCE_PERCENT}%)`} amount={totals.advance} />
            <MoneyRow label="Balance Amount Payable" amount={totals.balance} highlight />
          </div>
        </div>

        <div className="px-5 pb-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Office Use Only
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Row label="Stall No." value={form.stallNo} />
            <Row label="Booked By" value={form.bookedBy} />
            <Row label="Date" value={form.date} />
            <Row label="Place" value={form.place} />
            <Row label="Confirmation / Signature" value={form.confirmation} />
            <Row label="Signature with Rubber Stamp" value={form.rubberStamp} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="bg-[#004A96] px-5 py-4 text-white">
          <h2 className="text-lg font-semibold">Rules and Regulations</h2>
        </div>
        <ol className="space-y-3 p-5 text-sm leading-relaxed text-gray-700">
          {APPLICATION_RULES.map((rule, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-0.5 font-semibold text-gray-500">{index + 1}.</span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 gap-8 border-t border-gray-200 px-5 py-6 sm:grid-cols-2">
          <div>
            <div className="h-12 border-b border-gray-300" />
            <p className="mt-2 text-xs text-gray-500">Authorised Signatory</p>
          </div>
          <div>
            <div className="h-12 border-b border-gray-300" />
            <p className="mt-2 text-xs text-gray-500">Company Rubber Stamp</p>
          </div>
        </div>
      </div>
    </div>
  )
}
