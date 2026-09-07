const DRAFT_PREFIX = "diemex_requirements_draft";

export type PendingRequirementsPayment = {
  invoiceId: string | null;
  requirementsId: string | null;
  amount: number;
};

export type RequirementsFormDraft = {
  version: 1;
  savedAt: string;
  currentStep: number;
  showPreview: boolean;
  generalInfo: unknown;
  boothDetails: unknown;
  securityDeposit: unknown;
  machines: unknown;
  personnel: unknown;
  companyDetails: unknown;
  electricalLoad: unknown;
  furnitureSelections: Array<{ id?: string; code: string; quantity: number }>;
  hostessRequirements: unknown;
  compressedAir: unknown;
  waterConnection: unknown;
  securityGuard: unknown;
  rentalSelections: Array<{ id: string; quantity: number }>;
  housekeepingStaff: unknown;
  paymentDetails: unknown;
  pendingPayment: PendingRequirementsPayment | null;
};

function storageKey() {
  if (typeof window === "undefined") return `${DRAFT_PREFIX}_anon`;
  const exhibitorId =
    localStorage.getItem("exhibitor_id") || localStorage.getItem("user_id") || "anon";
  return `${DRAFT_PREFIX}_${exhibitorId}`;
}

export function loadRequirementsDraft(): RequirementsFormDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RequirementsFormDraft;
    if (!parsed || parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveRequirementsDraft(draft: RequirementsFormDraft) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey(), JSON.stringify(draft));
  } catch (error) {
    console.warn("Could not save requirements draft:", error);
  }
}

export function clearRequirementsDraft() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(storageKey());
  } catch {
    // ignore
  }
}

export function formatDraftSavedAt(iso?: string) {
  if (!iso) return "";
  const saved = new Date(iso);
  if (Number.isNaN(saved.getTime())) return "";
  return saved.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
