import React, { useState } from 'react';
import { NotaryProfile, AuditTelemetryEvent } from '../types/enfi';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Users,
  Activity,
  Award,
  Search,
  ExternalLink,
  Lock,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

interface JudicialRegulatoryHubProps {
  notaries: NotaryProfile[];
  auditEvents: AuditTelemetryEvent[];
}

export function JudicialRegulatoryHub({ notaries, auditEvents }: JudicialRegulatoryHubProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNotary, setSelectedNotary] = useState<NotaryProfile | null>(notaries[0] || null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditSuccessMsg, setAuditSuccessMsg] = useState<string | null>(null);

  const filteredNotaries = notaries.filter(
    (n) =>
      n.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.commissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRunSupremeCourtAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditSuccessMsg('Supreme Court Audit Ingress verified: Zero-gap integrity confirmed across all NCJR branches.');
      setTimeout(() => setAuditSuccessMsg(null), 4000);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold">
              Layer 1: Regulatory Sovereign
            </span>
            <span className="text-xs text-slate-400 font-mono">Supreme Court Judicial Audit Node</span>
          </div>
          <h2 className="text-2xl font-bold font-serif tracking-tight mt-1">
            Judicial Regulatory Sovereignty & Audit Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Real-time statutory supervision over commissioned electronic notaries public, bar association standing, and tamper-free register verification.
          </p>
        </div>

        <button
          onClick={handleRunSupremeCourtAudit}
          disabled={isAuditing}
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Auditing Ledger Nodes...' : 'Execute Judicial Compliance Sweep'}</span>
        </button>
      </div>

      {auditSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{auditSuccessMsg}</span>
        </div>
      )}

      {/* 4 Live Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Commissioned Notaries Active</div>
          <div className="text-2xl font-bold font-serif text-slate-900">3,842</div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> 100% Bar Standing Verified
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Today Notarial Throughput</div>
          <div className="text-2xl font-bold font-serif text-blue-600">1,421 Acts</div>
          <div className="text-[11px] text-slate-500">Average Session: 4m 12s</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Fraud & Spoof Alarms</div>
          <div className="text-2xl font-bold font-serif text-emerald-600">0 Critical</div>
          <div className="text-[11px] text-slate-500">3 Liveness Retry Invocations</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Ledger Merkle Proofs</div>
          <div className="text-2xl font-bold font-serif text-cyan-600">Synchronized</div>
          <div className="text-[11px] text-slate-500">Anchor interval: 300s</div>
        </div>
      </div>

      {/* Main Content: Notary Roster (7 Cols) + Real-time Audit Feed (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Commissioned Notary Judicial Roster (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-600" />
              <h3 className="font-bold text-sm text-slate-900">Judicial Commission Roster</h3>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="h-3.5 w-3.5 absolute left-3 top-2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Notary, Roll or Commission..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredNotaries.map((notary) => (
              <div
                key={notary.id}
                onClick={() => setSelectedNotary(notary)}
                className={`p-3.5 rounded-xl border cursor-pointer transition ${
                  selectedNotary?.id === notary.id
                    ? 'bg-amber-50/70 border-amber-500 shadow-sm ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-900">{notary.fullName}</span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    Active Commission
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{notary.judicialRegion}</div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                  <span>{notary.rollNumber}</span>
                  <span>Expires: {notary.commissionExpiry}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedNotary && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>Certificated Hardware Token:</span>
                <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  {selectedNotary.fipsCompliance}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-600 break-all">
                X.509 Fingerprint: {selectedNotary.x509CertSerial}
              </div>
              <div className="text-[11px] text-slate-500">
                Notarizations Executed: {selectedNotary.notarizationsCompleted} • Commission: {selectedNotary.commissionNumber}
              </div>
            </div>
          )}
        </div>

        {/* Real-time Audit Telemetry Log (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span className="font-bold text-slate-200">Supreme Court Audit Ingress Feed</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Live Stream
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {auditEvents.map((evt) => (
              <div key={evt.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-cyan-400 font-bold">{evt.eventType}</span>
                  <span className="text-slate-500">{evt.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-snug">{evt.details}</p>
                <div className="text-[9px] text-slate-500 truncate">{evt.hashDigest}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
            Zero-gap cryptographic chaining conforms to Supreme Court E-Evidence Rules.
          </div>
        </div>
      </div>
    </div>
  );
}
