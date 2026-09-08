import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { EcologyArchitectureView } from './components/EcologyArchitectureView';
import { LifecycleWorkflow } from './components/LifecycleWorkflow';
import { RonSessionChamber } from './components/RonSessionChamber';
import { ElectronicNotarialRegister } from './components/ElectronicNotarialRegister';
import { CryptographicVerifier } from './components/CryptographicVerifier';
import { JudicialRegulatoryHub } from './components/JudicialRegulatoryHub';
import { EconomicClearinghouse } from './components/EconomicClearinghouse';
import {
  INITIAL_NOTARIES,
  DEFAULT_SIGNER,
  DEFAULT_WITNESS,
  DEFAULT_INSTRUMENTS,
  INITIAL_REGISTER_ENTRIES,
  INITIAL_SETTLEMENTS,
  INITIAL_AUDIT_EVENTS,
  INITIAL_SEALED_PACKAGE,
} from './data/mockData';
import {
  CryptographicSealPackage,
  ElectronicNotarialRegisterEntry,
  LegalInstrument,
  ClearingSettlement,
  AuditTelemetryEvent,
} from './types/enfi';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('ecology');
  const [notaries] = useState(INITIAL_NOTARIES);
  const [signer] = useState(DEFAULT_SIGNER);
  const [witness] = useState(DEFAULT_WITNESS);
  const [instruments] = useState(DEFAULT_INSTRUMENTS);
  const [activeInstrument, setActiveInstrument] = useState<LegalInstrument>(DEFAULT_INSTRUMENTS[0]);
  const [registerEntries, setRegisterEntries] = useState<ElectronicNotarialRegisterEntry[]>(INITIAL_REGISTER_ENTRIES);
  const [latestPackage, setLatestPackage] = useState<CryptographicSealPackage>(INITIAL_SEALED_PACKAGE);
  const [settlements, setSettlements] = useState<ClearingSettlement[]>(INITIAL_SETTLEMENTS);
  const [auditEvents, setAuditEvents] = useState<AuditTelemetryEvent[]>(INITIAL_AUDIT_EVENTS);

  // When a notarization completes in either the wizard or the live RON session chamber:
  const handleNotarizationCompleted = (
    sealPackage: CryptographicSealPackage,
    registerEntry: ElectronicNotarialRegisterEntry
  ) => {
    setLatestPackage(sealPackage);
    setRegisterEntries((prev) => [registerEntry, ...prev]);

    // Add clearinghouse settlement
    const newSettlement: ClearingSettlement = {
      transactionId: `TX-CLR-${Date.now()}`,
      instrumentTitle: registerEntry.instrumentTitle,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      grossAmount: 65.0,
      platformFee: 15.0,
      notaryHonorarium: 45.0,
      idaasFee: 5.0,
      settlementStatus: 'Settled',
      recipientNotary: registerEntry.commissionedNotary,
    };
    setSettlements((prev) => [newSettlement, ...prev]);

    // Add judicial audit telemetry
    const newAudit: AuditTelemetryEvent = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'ENFI Core Trust Engine',
      layer: 'Infrastructure',
      eventType: 'PADES_NOTARIAL_SEAL_COMMITTED',
      hashDigest: `sha256:${registerEntry.documentHash}`,
      severity: 'low',
      details: `Sequential Entry #${registerEntry.docNumber} recorded in Book ${registerEntry.bookNumber}. Supreme Court Token: ${registerEntry.supremeCourtSyncToken}`,
    };
    setAuditEvents((prev) => [newAudit, ...prev]);
  };

  const handleResetDemo = () => {
    setRegisterEntries(INITIAL_REGISTER_ENTRIES);
    setLatestPackage(INITIAL_SEALED_PACKAGE);
    setSettlements(INITIAL_SETTLEMENTS);
    setAuditEvents(INITIAL_AUDIT_EVENTS);
    setActiveTab('ecology');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Enterprise Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetDemo={handleResetDemo}
        lastSequenceNumber={registerEntries[0]?.docNumber || 1421}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'ecology' && (
          <EcologyArchitectureView onLaunchLifecycle={() => setActiveTab('lifecycle')} />
        )}

        {activeTab === 'lifecycle' && (
          <LifecycleWorkflow
            notaries={notaries}
            signer={signer}
            witness={witness}
            instruments={instruments}
            activeInstrument={activeInstrument}
            setActiveInstrument={setActiveInstrument}
            onEnterRonChamber={() => setActiveTab('ron_chamber')}
            onCompleteNotarization={(pkg, reg) => {
              handleNotarizationCompleted(pkg, reg);
            }}
            latestPackage={latestPackage}
          />
        )}

        {activeTab === 'ron_chamber' && (
          <RonSessionChamber
            notary={notaries[0]}
            signer={signer}
            instrument={activeInstrument}
            onSessionFinished={(pkg, reg) => {
              handleNotarizationCompleted(pkg, reg);
            }}
            onNavigateToRegister={() => setActiveTab('register_ebook')}
          />
        )}

        {activeTab === 'register_ebook' && (
          <ElectronicNotarialRegister entries={registerEntries} />
        )}

        {activeTab === 'verifier' && (
          <CryptographicVerifier sealPackage={latestPackage} />
        )}

        {activeTab === 'regulatory_hub' && (
          <JudicialRegulatoryHub notaries={notaries} auditEvents={auditEvents} />
        )}

        {activeTab === 'clearinghouse' && (
          <EconomicClearinghouse settlements={settlements} />
        )}
      </main>

      {/* Enterprise Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-serif tracking-tight">ENFI</span>
            <span className="text-slate-600">|</span>
            <span>Electronic Notarial Facility Infrastructure</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-[11px] text-slate-500">PAdES-B-LTA / FIPS 140-2 Level 3 / WORM</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Supreme Court Regulatory Rules Compliant</span>
            <span>•</span>
            <span>RFC 3161 Qualified TSA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
