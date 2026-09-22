'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import StallMap from '@/components/stall-layout/StallMap';
import HallButtons from '@/components/stall-layout/HallButtons';
import { dashboardAPI, stallLayoutAPI } from '@/lib/api/exhibitors';
import {
  ALL_HALLS_ID,
  BARE_RATE,
  SHELL_RATE,
  defaultStallLayout,
  formatStallPrice,
  hallCounts,
  hallName,
  normalizeStallLayout,
  stallArea,
  stallCostForType,
  type StallBox,
  type StallLayout,
} from '@/lib/stallLayout';
import { calculateStallPayment, formatINR } from '@/lib/stallPayment';

type StallType = 'raw-space' | 'shell-space';

export default function ExhibitorLayoutPage() {
  const [layout, setLayout] = useState<StallLayout>(defaultStallLayout());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stallType, setStallType] = useState<StallType>('raw-space');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myStallNo, setMyStallNo] = useState('');
  const [myId, setMyId] = useState('');
  const [discount, setDiscount] = useState(0);
  const [activeHallId, setActiveHallId] = useState(ALL_HALLS_ID);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('exhibitor_data');
      if (raw) {
        const data = JSON.parse(raw);
        setMyStallNo(data.boothNumber || data.booth || '');
        setMyId(data.id || '');
      }
    } catch {
      setMyStallNo('');
    }

    dashboardAPI.getPayment().then((payment) => {
      setDiscount(Number(payment?.discount) || 0);
      if (payment?.boothType === 'shell-space' || payment?.boothType === 'raw-space') {
        setStallType(payment.boothType);
      }
    }).catch(() => {});

    stallLayoutAPI
      .get()
      .then((data) => {
        const stalls = (data.stalls || []) as StallBox[];
        const next = normalizeStallLayout({ ...defaultStallLayout(), ...data, stalls });
        setLayout(next);
        try {
          const raw = localStorage.getItem('exhibitor_data');
          const exhibitor = raw ? JSON.parse(raw) : {};
          const booth = String(exhibitor.boothNumber || exhibitor.booth || '').trim();
          setMyStallNo(booth);
          setMyId(exhibitor.id || '');
          const mine = next.stalls.find(
            (stall) =>
              (booth && stall.stallNo.trim().toLowerCase() === booth.toLowerCase()) ||
              (exhibitor.id && stall.bookedBy === exhibitor.id)
          );
          if (mine) {
            setSelectedId(mine.id);
            setActiveHallId(mine.hallId || ALL_HALLS_ID);
          }
        } catch {
          /* ignore */
        }
      })
      .catch((err) => setError(err.message || 'Failed to load layout'))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => hallCounts(layout), [layout]);
  const isFullHall = activeHallId === ALL_HALLS_ID;
  const selected = useMemo(
    () => layout.stalls.find((stall) => stall.id === selectedId) || null,
    [layout.stalls, selectedId]
  );

  const isMine =
    !!selected &&
    ((myId && selected.bookedBy === myId) ||
      (!!myStallNo && selected.stallNo.trim().toLowerCase() === myStallNo.trim().toLowerCase()));
  const isTaken = !!selected && selected.status === 'booked' && !isMine;

  const preview = useMemo(() => {
    if (!selected) return null;
    const stallCost = stallCostForType(selected, stallType);
    return calculateStallPayment({
      stallCost,
      discount: selected.discount != null ? Number(selected.discount) : discount,
      gstPercent: selected.gstPercent != null ? Number(selected.gstPercent) : 18,
    });
  }, [selected, stallType, discount]);

  const goToPayment = async () => {
    if (!selected || isTaken) {
      window.location.assign('/dashboard/payment/stall');
      return;
    }
    setSaving(true);
    try {
      const result = await dashboardAPI.selectStall({ stallId: selected.id, stallType });
      try {
        const raw = localStorage.getItem('exhibitor_data');
        if (raw) {
          const data = JSON.parse(raw);
          localStorage.setItem(
            'exhibitor_data',
            JSON.stringify({ ...data, boothNumber: result.boothNumber, booth: result.boothNumber })
          );
        }
      } catch {
        /* ignore */
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setSaving(false);
        return;
      }
      toast.error(err.message || 'Could not save stall selection');
    }
    window.location.assign('/dashboard/payment/stall');
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="mt-3 text-gray-600">Loading stall layout...</p>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exhibition Layout</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose a hall, select a stall, then go to payment. Full hall shows every hall together.
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <HallButtons
          halls={layout.halls}
          value={activeHallId}
          onChange={(id) => {
            setActiveHallId(id);
            if (selected && id !== ALL_HALLS_ID && selected.hallId !== id) {
              setSelectedId(null);
            }
          }}
          counts={counts}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow-sm text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: layout.availableColor }} />
          Not booked
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: layout.bookedColor }} />
          Booked
        </span>
        {myStallNo && (
          <span className="inline-flex items-center gap-2 text-gray-700">
            <span className="h-3 w-3 rounded-sm ring-2 ring-yellow-300" />
            Your stall: {myStallNo}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <StallMap
          layout={layout}
          readOnly
          selectedId={selectedId}
          onSelect={setSelectedId}
          highlightStallNo={myStallNo}
          hallFilter={activeHallId}
          combineHalls={isFullHall}
        />
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-semibold text-gray-900">Stall details</h2>
          {selected ? (
            <div className="space-y-4 text-sm">
              <p>
                <span className="text-gray-500">Stall no.</span>
                <br />
                <span className="text-lg font-bold">{selected.stallNo}</span>
              </p>
              <p>
                <span className="text-gray-500">Hall</span>
                <br />
                {hallName(layout, selected.hallId)}
              </p>
              <p>
                <span className="text-gray-500">Size</span>
                <br />
                {selected.widthM} m × {selected.heightM} m ({stallArea(selected)} sq.m)
              </p>
              {!!selected.price && (
                <p>
                  <span className="text-gray-500">Listed price</span>
                  <br />
                  <span className="font-semibold">{formatStallPrice(selected.price)}</span>
                </p>
              )}
              <p>
                <span className="text-gray-500">Status</span>
                <br />
                {isTaken ? 'Booked' : isMine ? 'Your stall' : 'Available'}
              </p>

              {!isTaken && (
                <>
                  <div>
                    <p className="mb-2 font-medium text-gray-900">Stall type</p>
                    <label className="mb-2 flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        name="stallType"
                        className="mt-1"
                        checked={stallType === 'raw-space'}
                        onChange={() => setStallType('raw-space')}
                      />
                      <span>
                        <span className="block font-medium">Raw space</span>
                        <span className="text-xs text-gray-500">
                          {selected.price
                            ? formatStallPrice(stallCostForType(selected, 'raw-space'))
                            : `₹${BARE_RATE.toLocaleString('en-IN')} / sq.m · ${formatStallPrice(stallCostForType(selected, 'raw-space'))}`}
                        </span>
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        name="stallType"
                        className="mt-1"
                        checked={stallType === 'shell-space'}
                        onChange={() => setStallType('shell-space')}
                      />
                      <span>
                        <span className="block font-medium">Shell space</span>
                        <span className="text-xs text-gray-500">
                          {selected.price
                            ? formatStallPrice(stallCostForType(selected, 'shell-space'))
                            : `₹${SHELL_RATE.toLocaleString('en-IN')} / sq.m · ${formatStallPrice(stallCostForType(selected, 'shell-space'))}`}
                        </span>
                      </span>
                    </label>
                  </div>

                  {preview && (
                    <div className="space-y-1 rounded-lg bg-slate-50 p-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Stall cost</span>
                        <span>{formatINR(preview.stallCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Discount</span>
                        <span>- {formatINR(preview.discount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">GST ({preview.gstPercent}%)</span>
                        <span>{formatINR(preview.gstAmount)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-blue-800">
                        <span>Final amount</span>
                        <span>{formatINR(preview.finalAmount)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={saving}
                    onClick={goToPayment}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Go to payment'}
                  </button>
                </>
              )}

              {isTaken && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-red-700">This stall is already booked.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Select an available stall to continue.</p>
          )}
        </div>
      </div>
    </div>
  );
}
