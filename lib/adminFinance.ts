const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://diemex-backend.onrender.com";

export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft" | "cancelled";

export type AdminInvoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: InvoiceStatus | string;
  issueDate?: string;
  dueDate?: string;
  paidDate?: string;
  paid_at?: string;
  created_at?: string;
  company?: string;
  items?: Array<{ description?: string; quantity?: number; unitPrice?: number; total?: number }>;
  metadata?: {
    exhibitorInfo?: {
      companyName?: string;
      name?: string;
      email?: string;
    };
    paymentInfo?: {
      paymentMode?: string;
      transactionId?: string;
    };
    totals?: {
      servicesTotal?: number;
      gst?: number;
      deposit?: number;
      total?: number;
    };
  };
};

export type FinancePayment = {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  method: "credit_card" | "bank_transfer" | "check" | "cash" | "online";
  date: string;
  dueDate?: string;
  processedBy: string;
};

export function getAdminAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token") || localStorage.getItem("admin_token");
}

function parseJson<T>(value: T | string | null | undefined): T | undefined {
  if (!value) return undefined;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return undefined;
    }
  }
  return value;
}

function roundMoney(value: number) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

export function getInvoiceCompany(invoice: AdminInvoice) {
  return (
    invoice.company ||
    invoice.metadata?.exhibitorInfo?.companyName ||
    invoice.metadata?.exhibitorInfo?.name ||
    "Unknown company"
  );
}

function mapPaymentMethod(invoice: AdminInvoice): FinancePayment["method"] {
  const mode = String(invoice.metadata?.paymentInfo?.paymentMode || "").toUpperCase();
  if (["CASH"].includes(mode)) return "cash";
  if (["CHEQUE", "CHECK", "DD"].includes(mode)) return "check";
  if (["RTGS", "NEFT", "IMPS", "BANK_TRANSFER"].includes(mode)) return "bank_transfer";
  if (["UPI", "CARD", "CREDIT_CARD", "ONLINE", "CASHFREE"].includes(mode)) return "online";
  return String(invoice.status).toLowerCase() === "paid" ? "online" : "online";
}

function mapPaymentStatus(status: string): FinancePayment["status"] {
  const value = String(status || "").toLowerCase();
  if (value === "paid") return "completed";
  if (value === "cancelled" || value === "failed") return "failed";
  if (value === "refunded") return "refunded";
  return "pending";
}

export function invoiceToPayment(invoice: AdminInvoice): FinancePayment {
  const metadata = parseJson<AdminInvoice["metadata"]>(invoice.metadata as never) || invoice.metadata;
  const normalized = { ...invoice, metadata };
  return {
    id: normalized.id,
    invoiceNumber: normalized.invoiceNumber || "—",
    company: getInvoiceCompany(normalized),
    amount: roundMoney(Number(normalized.amount) || 0),
    status: mapPaymentStatus(String(normalized.status)),
    method: mapPaymentMethod(normalized),
    date: normalized.paidDate || normalized.paid_at || normalized.issueDate || normalized.created_at || new Date().toISOString(),
    dueDate: normalized.dueDate,
    processedBy: String(normalized.status).toLowerCase() === "paid" ? "Cashfree / Online" : "Pending",
  };
}

export async function fetchAdminInvoices(token: string): Promise<AdminInvoice[]> {
  const response = await fetch(`${API_BASE_URL}/api/invoices/admin/all?page=1&limit=1000`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const error = new Error("unauthorized");
    throw error;
  }

  if (!response.ok) {
    throw new Error("Failed to load invoices");
  }

  const payload = await response.json();
  const rows: AdminInvoice[] = Array.isArray(payload.data) ? payload.data : [];

  return rows.map((invoice) => ({
    ...invoice,
    metadata: parseJson<AdminInvoice["metadata"]>(invoice.metadata as never) || invoice.metadata,
    items: parseJson<AdminInvoice["items"]>(invoice.items as never) || invoice.items || [],
    amount: roundMoney(Number(invoice.amount) || 0),
  }));
}

export type RevenueMonth = {
  month: string;
  year: number;
  key: string;
  revenue: number;
  exhibitors: number;
  growth: number;
};

export type RevenueSource = {
  category: string;
  amount: number;
  percentage: number;
  color: string;
};

const SOURCE_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-gray-500",
];

function categorizeItem(description?: string) {
  const text = String(description || "").toLowerCase();
  if (text.includes("deposit")) return "Security Deposit";
  if (text.includes("furniture")) return "Furniture";
  if (text.includes("electrical")) return "Electrical";
  if (text.includes("hostess")) return "Hostess";
  if (text.includes("rental") || text.includes("av/") || text.includes("it rental")) return "AV/IT Rentals";
  if (text.includes("water")) return "Water Connection";
  if (text.includes("compressed") || text.includes("air")) return "Compressed Air";
  if (text.includes("security guard") || text.includes("guard")) return "Security Guard";
  if (text.includes("housekeeping")) return "Housekeeping";
  return "Other services";
}

export function buildRevenueAnalytics(invoices: AdminInvoice[], year: number, range: "month" | "quarter" | "year" | "all") {
  const paid = invoices.filter((invoice) => String(invoice.status).toLowerCase() === "paid");
  const now = new Date();

  const inRange = paid.filter((invoice) => {
    const date = new Date(invoice.paidDate || invoice.paid_at || invoice.issueDate || invoice.created_at || "");
    if (Number.isNaN(date.getTime())) return false;
    if (range === "all") return true;
    if (range === "year") return date.getFullYear() === year;
    if (range === "quarter") {
      const start = new Date(now);
      start.setMonth(now.getMonth() - 3);
      return date >= start;
    }
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return date >= start && date.getFullYear() === now.getFullYear();
  });

  const monthMap = new Map<string, RevenueMonth & { companies: Set<string> }>();
  inRange.forEach((invoice) => {
    const date = new Date(invoice.paidDate || invoice.paid_at || invoice.issueDate || invoice.created_at || "");
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const month = date.toLocaleString("en-IN", { month: "short" });
    const existing = monthMap.get(key);
    const company = getInvoiceCompany(invoice);
    if (existing) {
      existing.revenue = roundMoney(existing.revenue + invoice.amount);
      existing.companies.add(company);
      existing.exhibitors = existing.companies.size;
    } else {
      monthMap.set(key, {
        month,
        year: date.getFullYear(),
        key,
        revenue: invoice.amount,
        exhibitors: 1,
        growth: 0,
        companies: new Set([company]),
      });
    }
  });

  const monthly = Array.from(monthMap.values())
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((row, index, list) => {
      const previous = list[index - 1];
      const growth = previous && previous.revenue > 0
        ? roundMoney(((row.revenue - previous.revenue) / previous.revenue) * 100)
        : 0;
      return {
        month: row.month,
        year: row.year,
        key: row.key,
        revenue: row.revenue,
        exhibitors: row.exhibitors,
        growth,
      };
    });

  const sourceTotals = new Map<string, number>();
  inRange.forEach((invoice) => {
    const items = invoice.items || [];
    if (items.length === 0) {
      sourceTotals.set("Invoice total", roundMoney((sourceTotals.get("Invoice total") || 0) + invoice.amount));
      return;
    }
    items.forEach((item) => {
      const category = categorizeItem(item.description);
      const amount = roundMoney(Number(item.total) || Number(item.unitPrice) * (item.quantity || 1) || 0);
      sourceTotals.set(category, roundMoney((sourceTotals.get(category) || 0) + amount));
    });
  });

  const sourceSum = Array.from(sourceTotals.values()).reduce((sum, value) => sum + value, 0) || 1;
  const sources: RevenueSource[] = Array.from(sourceTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount], index) => ({
      category,
      amount,
      percentage: roundMoney((amount / sourceSum) * 100),
      color: SOURCE_COLORS[index % SOURCE_COLORS.length],
    }));

  const totalRevenue = roundMoney(inRange.reduce((sum, invoice) => sum + invoice.amount, 0));
  const uniqueExhibitors = new Set(inRange.map(getInvoiceCompany)).size;
  const avgRevenue = monthly.length ? roundMoney(totalRevenue / monthly.length) : 0;
  const growthRate = monthly.length ? monthly[monthly.length - 1].growth : 0;

  const years = Array.from(
    new Set(
      invoices
        .map((invoice) => new Date(invoice.issueDate || invoice.created_at || "").getFullYear())
        .filter((value) => Number.isFinite(value))
    )
  ).sort((a, b) => b - a);

  return {
    monthly,
    sources,
    totalRevenue,
    uniqueExhibitors,
    avgRevenue,
    growthRate,
    paidCount: inRange.length,
    years: years.length ? years : [new Date().getFullYear()],
  };
}
