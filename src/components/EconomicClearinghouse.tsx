import React, { useState } from 'react';
import { ClearingSettlement } from '../types/enfi';
import {
  Coins,
  CreditCard,
  Building2,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Download,
  DollarSign
} from 'lucide-react';

interface EconomicClearinghouseProps {
  settlements: ClearingSettlement[];
}

export function EconomicClearinghouse({ settlements }: EconomicClearinghouseProps) {
  const [clearingList, setClearingList] = useState<ClearingSettlement[]>(settlements);
  const [isClearingBatch, setIsClearingBatch] = useState<boolean>(false);

  const totalGross = clearingList.reduce((acc, s) => acc + s.grossAmount, 0);
  const totalNotaryHonoraria = clearingList.reduce((acc, s) => acc + s.notaryHonorarium, 0);
  const totalPlatformFees = clearingList.reduce((acc, s) => acc + s.platformFee, 0);
  const totalIdaasFees = clearingList.reduce((acc, s) => acc + s.idaasFee, 0);

  const handleClearBatches = () => {
    setIsClearingBatch(true);
    setTimeout(() => {
      setClearingList((prev) =>
        prev.map((s) => ({ ...s, settlementStatus: 'Cleared' as const }))
      );
      setIsClearingBatch(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
            Revenue Architecture & Flywheel
          </span>
          <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            Economic Flywheel & Clearinghouse Facility
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Transparent tripartite fee separation: Statutory Notarial Honoraria ($45) + ENFI Platform Infrastructure Fee ($15) + Enterprise IDaaS ($5).
          </p>
        </div>

        <button
          onClick={handleClearBatches}
          disabled={isClearingBatch}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
        >
          <Coins className="h-4 w-4" />
          <span>{isClearingBatch ? 'Disbursing to Notary Roster...' : 'Execute Automated Clearing Batch'}</span>
        </button>
      </div>

      {/* Financial Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Gross Processed Volume</div>
          <div className="text-2xl font-bold font-serif text-slate-900">${totalGross.toFixed(2)}</div>
          <div className="text-[11px] text-slate-500">100% Non-Repudiable Settlement</div>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-xl border border-emerald-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-emerald-700">Notary Honoraria Remitted</div>
          <div className="text-2xl font-bold font-serif text-emerald-900">${totalNotaryHonoraria.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-700">Directly Disbursed to Jurists</div>
        </div>

        <div className="bg-blue-50/70 p-5 rounded-xl border border-blue-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-blue-700">ENFI Infrastructure Fee</div>
          <div className="text-2xl font-bold font-serif text-blue-900">${totalPlatformFees.toFixed(2)}</div>
          <div className="text-[11px] text-blue-700">$15.00 / notarization clearing</div>
        </div>

        <div className="bg-cyan-50/70 p-5 rounded-xl border border-cyan-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-cyan-700">Enterprise IDaaS Revenue</div>
          <div className="text-2xl font-bold font-serif text-cyan-900">${totalIdaasFees.toFixed(2)}</div>
          <div className="text-[11px] text-cyan-700">$5.00 / biometric check</div>
        </div>
      </div>

      {/* Revenue Model Breakdown */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          The Tripartite Economic Model Explained
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">1. Statutory Honoraria</span>
            <div className="font-bold text-white text-sm">$45.00 per Act</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Paid straight to the commissioned legal professional administering the oath and executing the jurat. Eliminates paper overhead and manual billing.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-blue-400 font-bold">2. Platform Infrastructure</span>
            <div className="font-bold text-white text-sm">$15.00 per Act</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Covers FIPS 140-2 Level 3 HSM hardware cryptography, continuous dual-stream WebRTC AV recording, and 10-year WORM evidentiary vault storage.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold">3. Enterprise IDaaS</span>
            <div className="font-bold text-white text-sm">$5.00 per Lookup</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Level of Assurance (LOA-4) credential verification, holographic government ID checks, and ISO 30107-3 compliant 3D facial liveness scoring.
            </p>
          </div>
        </div>
      </div>

      {/* Clearinghouse Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900">Real-Time Transaction Clearance Ledger</h3>
          <span className="text-xs font-mono text-slate-500">Automated Daily Settlement Batch</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Transaction ID</th>
                <th className="py-2.5 px-3">Instrument</th>
                <th className="py-2.5 px-3">Recipient Notary</th>
                <th className="py-2.5 px-3">Notary ($45)</th>
                <th className="py-2.5 px-3">Platform ($15)</th>
                <th className="py-2.5 px-3">IDaaS ($5)</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clearingList.map((tx) => (
                <tr key={tx.transactionId} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-medium text-slate-900">{tx.transactionId}</td>
                  <td className="py-3 px-3 text-slate-800">{tx.instrumentTitle}</td>
                  <td className="py-3 px-3 text-slate-700">{tx.recipientNotary}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">${tx.notaryHonorarium.toFixed(2)}</td>
                  <td className="py-3 px-3 font-medium text-blue-700">${tx.platformFee.toFixed(2)}</td>
                  <td className="py-3 px-3 font-medium text-cyan-700">${tx.idaasFee.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        tx.settlementStatus === 'Cleared'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-blue-100 text-blue-800 border-blue-300'
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{tx.settlementStatus}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
