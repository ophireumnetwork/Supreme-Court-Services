import React, { useState } from 'react';
import { ECOSYSTEM_NODES } from '../data/mockData';
import { EcosystemNode } from '../types/enfi';
import {
  Scale,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  Sparkles,
  Lock,
  FileText,
  Activity,
  Award
} from 'lucide-react';

interface EcologyArchitectureViewProps {
  onLaunchLifecycle: () => void;
}

export function EcologyArchitectureView({ onLaunchLifecycle }: EcologyArchitectureViewProps) {
  const [selectedNode, setSelectedNode] = useState<EcosystemNode>(ECOSYSTEM_NODES[0]);
  const [flowHighlight, setFlowHighlight] = useState<'all' | 'downward' | 'upward'>('all');

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'regulatory':
        return <Scale className="h-5 w-5 text-amber-500" />;
      case 'infrastructure':
        return <ShieldCheck className="h-5 w-5 text-cyan-500" />;
      case 'supply':
        return <Award className="h-5 w-5 text-emerald-500" />;
      case 'demand':
        return <Building2 className="h-5 w-5 text-indigo-500" />;
      case 'consumption':
        return <Users className="h-5 w-5 text-violet-500" />;
      default:
        return <Briefcase className="h-5 w-5 text-slate-500" />;
    }
  };

  const getLayerBadgeColor = (layer: string) => {
    switch (layer) {
      case 'regulatory':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'infrastructure':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800';
      case 'supply':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'demand':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800';
      case 'consumption':
        return 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono uppercase tracking-wider border border-blue-400/30">
              <Sparkles className="h-3.5 w-3.5" /> Institutional Digital Public Infrastructure (DPI)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
              The Deterministic Trust Network Ecology
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Value, compliance, and cryptographic integrity flow downward from the Sovereign Regulatory Authority, while transaction volume, economic yield, and audit telemetry circulate upward through the 5 stakeholder layers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onLaunchLifecycle}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-blue-500/25 transition"
            >
              <span>Execute Notarization Lifecycle</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dual Flow Legend & Toggles */}
        <div className="mt-6 pt-6 border-t border-slate-700/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div
            onClick={() => setFlowHighlight(flowHighlight === 'downward' ? 'all' : 'downward')}
            className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
              flowHighlight === 'downward'
                ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-600 text-slate-300'
            }`}
          >
            <ArrowDownCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                Downward Mandate & Cryptographic Vector
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                  Sovereign → Citizen
                </span>
              </div>
              <p className="text-slate-300 mt-1 leading-snug">
                Supreme Court Mandates, RON Rules, Licensure Telemetry, X.509 Digital Seal Provisioning, and Hardware HSM Keys.
              </p>
            </div>
          </div>

          <div
            onClick={() => setFlowHighlight(flowHighlight === 'upward' ? 'all' : 'upward')}
            className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
              flowHighlight === 'upward'
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                : 'bg-slate-800/60 border-slate-700 hover:border-slate-600 text-slate-300'
            }`}
          >
            <ArrowUpCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white flex items-center gap-2">
                Upward Yield & Audit Telemetry Circulation
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                  Citizen → Sovereign
                </span>
              </div>
              <p className="text-slate-300 mt-1 leading-snug">
                Sequential e-Register Entries, Non-repudiable Hash Proofs, Platform Fees, and Automated Notarial Honoraria Clearance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Architecture Topology & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topology Visual Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span>Stakeholder Layers & Interconnected Nodes</span>
            </h2>
            <span className="text-xs text-slate-500">Select any entity to inspect cryptographic protocols</span>
          </div>

          <div className="space-y-3">
            {/* Layer 1: Regulatory Sovereign */}
            <div className="bg-slate-50 border-2 border-amber-200 rounded-xl p-4 relative overflow-hidden">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5" /> 1. Sovereign Regulatory Authority Layer
                </span>
                <span className="bg-amber-200/80 px-2 py-0.5 rounded text-[10px]">Sovereignty Apex</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ECOSYSTEM_NODES.filter((n) => n.layer === 'regulatory').map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`text-left p-3 rounded-lg border transition ${
                      selectedNode.id === node.id
                        ? 'bg-amber-100/90 border-amber-600 shadow-sm ring-2 ring-amber-500/30'
                        : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 text-xs leading-snug">{node.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{node.subtitle}</div>
                    <div className="mt-2 text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                      {node.telemetryMetric}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Directional Indicator Down */}
            <div className="flex justify-center items-center py-0.5 text-slate-400 text-xs font-mono">
              <span className="bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 text-[11px]">
                <ArrowDownCircle className="h-3 w-3 text-amber-600" /> Mandates & Seal Delegation | Audit Telemetry
                <ArrowUpCircle className="h-3 w-3 text-emerald-600 ml-1" />
              </span>
            </div>

            {/* Layer 2: ENFI Platform Core */}
            <div className="bg-slate-50 border-2 border-cyan-200 rounded-xl p-4 relative">
              <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-800 font-bold mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> 2. ENFI Core Trust Engine (The Infrastructure Layer)
                </span>
                <span className="bg-cyan-200/80 px-2 py-0.5 rounded text-[10px]">FIPS 140-2 / WORM</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ECOSYSTEM_NODES.filter((n) => n.layer === 'infrastructure').map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`text-left p-3 rounded-lg border transition ${
                      selectedNode.id === node.id
                        ? 'bg-cyan-100/90 border-cyan-600 shadow-sm ring-2 ring-cyan-500/30'
                        : 'bg-white border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 text-xs leading-snug">{node.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{node.subtitle}</div>
                    <div className="mt-2 text-[10px] font-mono text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200 inline-block truncate max-w-full">
                      {node.telemetryMetric}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Directional Indicator Down */}
            <div className="flex justify-center items-center py-0.5 text-slate-400 text-xs font-mono">
              <span className="bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 text-[11px]">
                <ArrowDownCircle className="h-3 w-3 text-amber-600" /> Digital Seal Provisioning | Jurat Attestation
                <ArrowUpCircle className="h-3 w-3 text-emerald-600 ml-1" />
              </span>
            </div>

            {/* Layer 3 & 4 Side-by-Side: Supply (Notaries) vs Demand (Enterprises) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Supply */}
              <div className="bg-slate-50 border-2 border-emerald-200 rounded-xl p-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" /> 3. Supply: E-Notaries
                  </span>
                </div>
                {ECOSYSTEM_NODES.filter((n) => n.layer === 'supply').map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedNode.id === node.id
                        ? 'bg-emerald-100/90 border-emerald-600 shadow-sm ring-2 ring-emerald-500/30'
                        : 'bg-white border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 text-xs">{node.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{node.subtitle}</div>
                    <div className="mt-2 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block">
                      {node.telemetryMetric}
                    </div>
                  </button>
                ))}
              </div>

              {/* Demand */}
              <div className="bg-slate-50 border-2 border-indigo-200 rounded-xl p-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-800 font-bold mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> 4. Demand: Institutional
                  </span>
                </div>
                {ECOSYSTEM_NODES.filter((n) => n.layer === 'demand').map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      selectedNode.id === node.id
                        ? 'bg-indigo-100/90 border-indigo-600 shadow-sm ring-2 ring-indigo-500/30'
                        : 'bg-white border-slate-200 hover:border-indigo-400'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 text-xs">{node.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{node.subtitle}</div>
                    <div className="mt-2 text-[10px] font-mono text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 inline-block">
                      {node.telemetryMetric}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Layer 5: Consumption (Signers & Citizens) */}
            <div className="bg-slate-50 border-2 border-violet-200 rounded-xl p-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-violet-800 font-bold mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> 5. Consumption: Signers, Witnesses & Relying Citizens
                </span>
                <span className="bg-violet-200/80 px-2 py-0.5 rounded text-[10px]">End Principals</span>
              </div>
              {ECOSYSTEM_NODES.filter((n) => n.layer === 'consumption').map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    selectedNode.id === node.id
                      ? 'bg-violet-100/90 border-violet-600 shadow-sm ring-2 ring-violet-500/30'
                      : 'bg-white border-slate-200 hover:border-violet-400'
                  }`}
                >
                  <div className="font-semibold text-slate-900 text-xs">{node.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{node.subtitle}</div>
                  <div className="mt-2 text-[10px] font-mono text-violet-800 bg-violet-50 px-1.5 py-0.5 rounded border border-violet-200 inline-block">
                    {node.telemetryMetric}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Node Detail Inspector Drawer (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5 sticky top-24">
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${getLayerBadgeColor(selectedNode.layer)}`}>
                  Layer: {selectedNode.layer}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Status: {selectedNode.activeStatus}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-2 font-serif">{selectedNode.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{selectedNode.subtitle}</p>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Architectural Role</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                {selectedNode.roleDescription}
              </p>
            </div>

            {/* Mandates */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-blue-600" />
                Statutory Functions & Security Controls
              </h4>
              <ul className="space-y-1.5">
                {selectedNode.mandatesOrFunctions.map((func, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                    <span>{func}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inbound & Outbound Data Vectors */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="font-semibold text-slate-800 flex items-center gap-1 text-[11px] text-amber-800">
                  <ArrowDownCircle className="h-3.5 w-3.5" /> Inbound Dependencies / Downward Vectors
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedNode.inboundFlows.map((flow, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                      {flow}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-800 flex items-center gap-1 text-[11px] text-emerald-800">
                  <ArrowUpCircle className="h-3.5 w-3.5" /> Outbound Telemetry / Upward Value
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedNode.outboundFlows.map((flow, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                      {flow}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Telemetry Callout */}
            <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg text-xs font-mono border border-slate-800">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Live Telemetry Proof</div>
              <div className="text-cyan-400 font-semibold">{selectedNode.telemetryMetric}</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Four Pillars of Platform Integrity */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full font-bold">
            Executive Architecture Pillars
          </span>
          <h2 className="text-xl font-bold font-serif text-slate-900 mt-2">
            The Four Pillars of Platform Integrity
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Standardizing legal attestation directly aligned with Supreme Court evidentiary rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Cryptographic Non-Repudiation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Secured with PKI conforming to <strong>PAdES (PDF Advanced Electronic Signatures)</strong> standards. Any alteration invalidates the cryptographic seal instantly.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="h-8 w-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Deterministic Identity Assurance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated biometric matching, government digital ID queries, and anti-spoofing facial liveness checks replacing subjective visual ID inspection.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Session Evidentiary Continuity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous live audiovisual recording time-synced with document interaction logs, creating a unified evidentiary package anchored to WORM storage.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-sm">The Electronic Notarial Book</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional physical registers replaced with an immutable, sequentially indexed ledger. Real-time verification feed audited by the judiciary on demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
