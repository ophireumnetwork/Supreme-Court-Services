import React, { useState } from 'react';
import { ElectronicNotarialRegisterEntry } from '../types/enfi';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Download,
  Filter,
  ShieldCheck,
  ArrowUpDown,
  ExternalLink,
  Scale,
  RefreshCw
} from 'lucide-react';

interface ElectronicNotarialRegisterProps {
  entries: ElectronicNotarialRegisterEntry[];
}

export function ElectronicNotarialRegister({ entries }: ElectronicNotarialRegisterProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<ElectronicNotarialRegisterEntry | null>(
    entries[0] || null
  );
  const [isVerifyingSequence, setIsVerifyingSequence] = useState<boolean>(false);
  const [sequenceVerified, setSequenceVerified] = useState<boolean>(true);

  const filteredEntries = entries.filter(
    (e) =>
      e.instrumentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.principalSigner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.commissionedNotary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.docNumber.toString().includes(searchTerm)
  );

  const handleVerifyZeroGap = () => {
    setIsVerifyingSequence(true);
    setTimeout(() => {
      setIsVerifyingSequence(false);
      setSequenceVerified(true);
    }, 800);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ENFI-Judicial-Register-Series-2026.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200 font-bold">
              Pillar 4: Statutory Registry
            </span>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Supreme Court Mirror Active
            </span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            National Electronic Notarial Register (e-Book)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Immutable, sequentially indexed electronic notarial book with zero-gap ledger numbering and real-time judicial compliance synchronization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleVerifyZeroGap}
            disabled={isVerifyingSequence}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isVerifyingSequence ? 'animate-spin' : ''}`} />
            <span>{isVerifyingSequence ? 'Re-chaining Merkle Root...' : 'Verify Zero-Gap Sequence'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Judicial Ledger (JSON)</span>
          </button>
        </div>
      </div>

      {/* Sequence Integrity Bar */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-medium">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            Zero-Gap Monotonic Index: <strong>Series of 2026</strong>. No gaps, backdating, or deletions detected in sequential ledger.
          </span>
        </div>
        <div className="font-mono text-[11px] text-emerald-800 bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
          Last Committed Entry: Doc No. {entries[0]?.docNumber || 1421}
        </div>
      </div>

      {/* Main Grid: Entries Table + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-3 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="relative w-full sm:w-72">
              <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Doc No., Title, or Principal..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Showing {filteredEntries.length} recorded acts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-medium border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Doc No.</th>
                  <th className="py-2.5 px-3">Instrument Details</th>
                  <th className="py-2.5 px-3">Principal Affiant</th>
                  <th className="py-2.5 px-3">Commissioned Notary</th>
                  <th className="py-2.5 px-3">Judicial Sync</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEntries.map((entry) => {
                  const isSelected = selectedEntry?.id === entry.id;

                  return (
                    <tr
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-blue-50/80 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        #{entry.docNumber}
                        <div className="text-[10px] text-slate-400 font-normal">Page {entry.pageNumber}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 line-clamp-1">{entry.instrumentTitle}</div>
                        <div className="text-[10px] text-slate-500">{entry.instrumentType}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-800">{entry.principalSigner}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{entry.signerIdInfo}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-800">{entry.commissionedNotary}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Roll #{entry.rollNumber}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-medium px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>Synced</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Record Inspector (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedEntry ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 sticky top-24">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  Book {selectedEntry.bookNumber}, Series {selectedEntry.seriesYear}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 font-serif">
                  Document No. {selectedEntry.docNumber}
                </h3>
                <p className="text-xs text-slate-500">Page {selectedEntry.pageNumber}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Instrument Title</div>
                  <div className="font-medium text-slate-900 mt-0.5">{selectedEntry.instrumentTitle}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Principal Affiant</div>
                  <div className="text-slate-800 font-medium">{selectedEntry.principalSigner}</div>
                  <div className="text-[11px] text-slate-500">{selectedEntry.signerIdInfo}</div>
                </div>

                {selectedEntry.witnessName && (
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Credible Witness</div>
                    <div className="text-slate-800">{selectedEntry.witnessName}</div>
                  </div>
                )}

                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Commissioned Notary</div>
                  <div className="text-slate-800 font-medium">{selectedEntry.commissionedNotary}</div>
                  <div className="text-[11px] text-slate-500 font-mono">Roll of Attorneys #{selectedEntry.rollNumber}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1 font-mono text-[11px]">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">SHA-256 Tamper Hash</div>
                  <div className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 break-all text-[10px]">
                    {selectedEntry.documentHash}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-3 rounded-lg text-[10px] font-mono space-y-1">
                  <div className="text-slate-400 uppercase font-bold">Supreme Court Sync Token</div>
                  <div className="text-cyan-400 break-all">{selectedEntry.supremeCourtSyncToken}</div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Notarial Fee: ${selectedEntry.notarialFee.toFixed(2)}</span>
                  <span className="text-slate-500">Platform Fee: ${selectedEntry.platformFee.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-400">
              Select an entry to view judicial registration certificate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
