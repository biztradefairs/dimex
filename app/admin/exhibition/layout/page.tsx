"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import StallMap from "@/components/stall-layout/StallMap";
import HallButtons from "@/components/stall-layout/HallButtons";
import { stallLayoutAPI } from "@/lib/api/exhibitors";
import {
  ALL_HALLS_ID,
  STALL_PRESETS,
  defaultStallLayout,
  hallCounts,
  nextStallNo,
  normalizeStallLayout,
  stallListedTotals,
  type StallBox,
  type StallLayout,
  type StallStatus,
} from "@/lib/stallLayout";
import { formatINR } from "@/lib/stallPayment";

export default function AdminStallLayoutPage() {
  const [layout, setLayout] = useState<StallLayout>(defaultStallLayout());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preset, setPreset] = useState(STALL_PRESETS[0]);
  const [activeHallId, setActiveHallId] = useState(layout.halls[0]?.id || "hall-a");

  const selected = useMemo(
    () => layout.stalls.find((stall) => stall.id === selectedId) || null,
    [layout.stalls, selectedId]
  );
  const selectedTotals = useMemo(
    () => (selected ? stallListedTotals(selected) : null),
    [selected]
  );

  const counts = useMemo(() => hallCounts(layout), [layout]);
  const activeHall = layout.halls.find((hall) => hall.id === activeHallId) || layout.halls[0];
  const isFullHall = activeHallId === ALL_HALLS_ID;

  useEffect(() => {
    stallLayoutAPI
      .get()
      .then((data) => {
        const next = normalizeStallLayout({ ...defaultStallLayout(), ...data, stalls: data.stalls || [] });
        setLayout(next);
        setActiveHallId(next.halls[0]?.id || "hall-a");
      })
      .catch((error) => toast.error(error.message || "Failed to load layout"))
      .finally(() => setLoading(false));
  }, []);

  const addStall = () => {
    if (!activeHall || isFullHall) return;
    const id = `stall-${Date.now()}`;
    const hallStalls = layout.stalls.filter((stall) => stall.hallId === activeHall.id);
    const col = hallStalls.length % 8;
    const row = Math.floor(hallStalls.length / 8);
    const stall: StallBox = {
      id,
      stallNo: nextStallNo(layout.stalls, activeHall),
      hallId: activeHall.id,
      widthM: preset.widthM,
      heightM: preset.heightM,
      x: 24 + col * (preset.widthM * layout.scale + 16),
      y: 24 + row * (preset.heightM * layout.scale + 16),
      status: "available",
      companyName: "",
      price: 0,
      discount: 0,
      gstPercent: 18,
    };
    setLayout((prev) => ({ ...prev, stalls: [...prev.stalls, stall] }));
    setSelectedId(id);
  };

  const addHall = () => {
    const letter = String.fromCharCode(65 + layout.halls.length);
    const id = `hall-${letter.toLowerCase()}-${Date.now().toString(36)}`;
    const name = `Hall ${letter}`;
    setLayout((prev) => ({ ...prev, halls: [...prev.halls, { id, name }] }));
    setActiveHallId(id);
  };

  const updateSelected = (patch: Partial<StallBox>) => {
    if (!selectedId) return;
    setLayout((prev) => ({
      ...prev,
      stalls: prev.stalls.map((stall) => (stall.id === selectedId ? { ...stall, ...patch } : stall)),
    }));
  };

  const removeSelected = () => {
    if (!selectedId) return;
    setLayout((prev) => ({ ...prev, stalls: prev.stalls.filter((stall) => stall.id !== selectedId) }));
    setSelectedId(null);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload: StallLayout = {
        ...layout,
        halls: layout.halls,
        stalls: layout.stalls.map((stall) => ({
          ...stall,
          hallId: stall.hallId || layout.halls[0]?.id || "hall-a",
          price: Number(stall.price) || 0,
          discount: Number(stall.discount) || 0,
          gstPercent: Number(stall.gstPercent) > 0 ? Number(stall.gstPercent) : 18,
        })),
      };
      const saved = await stallLayoutAPI.save(payload);
      setLayout(normalizeStallLayout(saved));
      toast.success("Layout saved");
    } catch (error: any) {
      toast.error(error.message || "Failed to save layout");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stall Layout</h1>
          <p className="text-sm text-gray-500">
            Work hall by hall. Add stalls to Hall A, Hall B, Hall C — Full hall shows them together.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save layout"}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm">
        <HallButtons
          halls={layout.halls}
          value={activeHallId}
          onChange={(id) => {
            setActiveHallId(id);
            setSelectedId(null);
          }}
          counts={counts}
        />
        <button
          type="button"
          onClick={addHall}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus className="h-4 w-4" />
          Add hall
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-4 rounded-xl bg-white p-4 shadow-sm">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-gray-700">Available colour</span>
          <input
            type="color"
            value={layout.availableColor}
            onChange={(e) => setLayout((prev) => ({ ...prev, availableColor: e.target.value }))}
            className="h-10 w-16 cursor-pointer rounded border"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-gray-700">Booked colour</span>
          <input
            type="color"
            value={layout.bookedColor}
            onChange={(e) => setLayout((prev) => ({ ...prev, bookedColor: e.target.value }))}
            className="h-10 w-16 cursor-pointer rounded border"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-gray-700">Stall size</span>
          <select
            className="rounded-lg border border-gray-300 px-3 py-2"
            value={`${preset.widthM}x${preset.heightM}`}
            onChange={(e) => {
              const next = STALL_PRESETS.find((item) => `${item.widthM}x${item.heightM}` === e.target.value);
              if (next) setPreset(next);
            }}
          >
            {STALL_PRESETS.map((item) => (
              <option key={item.label} value={`${item.widthM}x${item.heightM}`}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={addStall}
          disabled={isFullHall}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add stall{activeHall && !isFullHall ? ` to ${activeHall.name}` : ""}
        </button>
        <div className="ml-auto flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: layout.availableColor }} />
            Available (
            {
              layout.stalls.filter(
                (s) =>
                  s.status === "available" &&
                  (isFullHall || s.hallId === activeHallId)
              ).length
            }
            )
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: layout.bookedColor }} />
            Booked (
            {
              layout.stalls.filter(
                (s) =>
                  s.status === "booked" &&
                  (isFullHall || s.hallId === activeHallId)
              ).length
            }
            )
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <StallMap
          layout={layout}
          onChange={setLayout}
          selectedId={selectedId}
          onSelect={setSelectedId}
          hallFilter={activeHallId}
          combineHalls={isFullHall}
          readOnly={isFullHall}
        />

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-900">Stall details</h2>
          {selected ? (
            <div className="space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Hall</span>
                <select
                  className="w-full rounded-lg border px-3 py-2"
                  value={selected.hallId || layout.halls[0]?.id}
                  onChange={(e) => updateSelected({ hallId: e.target.value })}
                >
                  {layout.halls.map((hall) => (
                    <option key={hall.id} value={hall.id}>
                      {hall.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Stall no.</span>
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  value={selected.stallNo}
                  onChange={(e) => updateSelected({ stallNo: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Company</span>
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  value={selected.companyName || ""}
                  onChange={(e) => updateSelected({ companyName: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Stall price (INR)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border px-3 py-2"
                  value={selected.price ?? ""}
                  onChange={(e) => updateSelected({ price: e.target.value === "" ? 0 : Number(e.target.value) })}
                  placeholder="0.00"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Discount (INR)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border px-3 py-2"
                  value={selected.discount ?? ""}
                  onChange={(e) =>
                    updateSelected({ discount: e.target.value === "" ? 0 : Number(e.target.value) })
                  }
                  placeholder="0.00"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">GST (%)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border px-3 py-2"
                  value={selected.gstPercent ?? 18}
                  onChange={(e) =>
                    updateSelected({ gstPercent: e.target.value === "" ? 18 : Number(e.target.value) })
                  }
                />
              </label>
              {selectedTotals && (
                <div className="space-y-2 rounded-lg bg-slate-50 p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">GST ({selectedTotals.gstPercent}%)</span>
                    <span className="font-medium text-gray-900">{formatINR(selectedTotals.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Final price</span>
                    <span className="text-lg font-bold text-blue-800">{formatINR(selectedTotals.finalAmount)}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">Stall price − discount + GST</p>
                </div>
              )}
              <label className="block text-sm">
                <span className="mb-1 block text-gray-600">Status</span>
                <select
                  className="w-full rounded-lg border px-3 py-2"
                  value={selected.status}
                  onChange={(e) => updateSelected({ status: e.target.value as StallStatus })}
                >
                  <option value="available">Not booked</option>
                  <option value="booked">Booked</option>
                </select>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-sm">
                  <span className="mb-1 block text-gray-600">Width (m)</span>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    className="w-full rounded-lg border px-3 py-2"
                    value={selected.widthM}
                    onChange={(e) => updateSelected({ widthM: Number(e.target.value) || 1 })}
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-gray-600">Height (m)</span>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    className="w-full rounded-lg border px-3 py-2"
                    value={selected.heightM}
                    onChange={(e) => updateSelected({ heightM: Number(e.target.value) || 1 })}
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={removeSelected}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Remove stall
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Click a stall to edit number, price, discount, GST, and booked status.</p>
          )}
        </div>
      </div>
    </div>
  );
}
