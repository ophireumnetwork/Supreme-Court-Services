import React, { useState } from 'react';
import {
  NotaryProfile,
  SignerProfile,
  LegalInstrument,
  CryptographicSealPackage,
  ElectronicNotarialRegisterEntry,
} from '../types/enfi';
import {
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  Video,
  Key,
  Stamp,
  Scale,
  CreditCard,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Fingerprint,
  Building,
  UserCheck
} from 'lucide-react';
import { formatTimestampRFC3161, generateRandomHex } from '../utils/crypto';

interface LifecycleWorkflowProps {
  notaries: NotaryProfile[];
  signer: SignerProfile;
  witness: SignerProfile;
  instruments: LegalInstrument[];
  activeInstrument: LegalInstrument;
  setActiveInstrument: (inst: LegalInstrument) => void;
  onEnterRonChamber: () => void;
  onCompleteNotarization: (packageData: CryptographicSealPackage, registerEntry: ElectronicNotarialRegisterEntry) => void;
  latestPackage: CryptographicSealPackage | null;
}

export function LifecycleWorkflow({
  notaries,
  signer,
  witness,
  instruments,
  activeInstrument,
  setActiveInstrument,
  onEnterRonChamber,
  onCompleteNotarization,
  latestPackage,
}: LifecycleWorkflowProps) {
  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const [selectedNotary, setSelectedNotary] = useState<NotaryProfile>(notaries[0]);
  const [isSimulatingBarQuery, setIsSimulatingBarQuery] = useState<boolean>(false);
  const [barQueryStatus, setBarQueryStatus] = useState<'nominal' | 'validated'>('validated');
  const [ekycStatus, setEkycStatus] = useState<'pending' | 'verified'>('verified');

  // Step 1: Run Bar Query Simulation
  const handleRunBarQuery = () => {
    setIsSimulatingBarQuery(true);
    setTimeout(() => {
      setIsSimulatingBarQuery(false);
      setBarQueryStatus('validated');
    }, 900);
  };

  // Quick Finalize Phase 4 & 5 directly from wizard if preferred
  const handleInstantSealAndRegister = () => {
    const docHash = activeInstrument.sha256Original;
    const sealPackage: CryptographicSealPackage = {
      packageId: `PKG-PAdES-${Date.now()}`,
      instrumentId: activeInstrument.id,
      instrumentTitle: activeInstrument.title,
      sha256DocumentHash: docHash,
      padesStandard: 'PAdES-B-LTA (Long Term Validation)',
      hsmTokenProvider: `${selectedNotary.fipsCompliance} Node`,
      hsmKeyFingerprint: selectedNotary.x509CertSerial,
      notarySignatureDigest: `rsa-pss-4096:${generateRandomHex(40)}`,
      rfc3161TimestampAuthority: 'Supreme Court National Trust TSA Node #01',
      rfc3161Timestamp: formatTimestampRFC3161(new Date()),
      x509Issuer: 'CN=Republic Notarial Root CA, O=Supreme Court Judicial PKI',
      x509Subject: `CN=${selectedNotary.fullName}, ${selectedNotary.rollNumber}`,
      tamperEvidentChecksum: `0x${generateRandomHex(16).toUpperCase()}`,
      wormVideoHash: `sha256:${generateRandomHex(64)}`,
      isValid: true,
    };

    const registerEntry: ElectronicNotarialRegisterEntry = {
      id: `reg-${Date.now()}`,
      docNumber: Math.floor(1422 + Math.random() * 50),
      pageNumber: Math.floor(87 + Math.random() * 20),
      bookNumber: 14,
      seriesYear: 2026,
      instrumentTitle: activeInstrument.title,
      instrumentType: activeInstrument.instrumentType,
      principalSigner: signer.fullName,
      signerIdInfo: `${signer.idType} ${signer.idNumber}`,
      witnessName: witness.fullName,
      commissionedNotary: selectedNotary.fullName,
      rollNumber: selectedNotary.rollNumber.replace('Roll of Attorneys No. ', ''),
      notarizedAt: new Date().toISOString(),
      notarialFee: 45.0,
      platformFee: 15.0,
      documentHash: docHash,
      judicialProofStatus: 'Synced to Supreme Court',
      supremeCourtSyncToken: `SC-JUR-REG-SYNC-2026-${generateRandomHex(8).toUpperCase()}`,
    };

    onCompleteNotarization(sealPackage, registerEntry);
    setCurrentPhase(5);
  };

  const phases = [
    {
      number: 1,
      title: 'Licensure & Cryptographic Enrollment',
      shortTitle: '1. Enrollment',
      description: 'Bar standing query, X.509 PKI Seal, and HSM credentials',
    },
    {
      number: 2,
      title: 'Transaction Staging & Identity Verification',
      shortTitle: '2. Staging & eKYC',
      description: 'Ingest instrument, biometric liveness, and LOA-4 issuance',
    },
    {
      number: 3,
      title: 'Remote Online Notarial (RON) Session',
      shortTitle: '3. Live RON Session',
      description: 'WebRTC audiovisual link, oath administration, and e-signing',
    },
    {
      number: 4,
      title: 'Attestation, Sealing & Vaulting',
      shortTitle: '4. PAdES Sealing',
      description: 'Jurat execution, commissioned digital seal, and RFC 3161 TSA',
    },
    {
      number: 5,
      title: 'Registry Archival & Audit Loop',
      shortTitle: '5. Registry & Settlement',
      description: 'e-Notarial Register sequence, Supreme Court sync, and honoraria',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-bold">
              Sequence Flow Engine
            </span>
            <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">
              End-to-End Notarial Instrument Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Tracks an instrument from transaction provisioning through the audiovisual session down to judicial registry logging.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEnterRonChamber}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
            >
              <Video className="h-4 w-4" />
              <span>Launch Live AV Chamber</span>
            </button>
          </div>
        </div>

        {/* 5-Step Stepper Ribbon */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 border-t border-slate-100 pt-6">
          {phases.map((phase) => {
            const isActive = currentPhase === phase.number;
            const isDone = currentPhase > phase.number;

            return (
              <button
                key={phase.number}
                onClick={() => setCurrentPhase(phase.number)}
                className={`text-left p-3 rounded-xl border transition relative ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                    : isDone
                    ? 'bg-slate-50 border-emerald-300 text-slate-800'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : phase.number}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Phase {phase.number}</span>
                </div>
                <div className="font-semibold text-xs text-slate-900 leading-tight">{phase.shortTitle}</div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{phase.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Phase Canvas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Phase 1 */}
        {currentPhase === 1 && (
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                  Phase 1 of 5
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-2">
                  Licensure & Cryptographic Enrollment
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  The commissioned notary submits their judicial credentials, verified against the Supreme Court & Integrated Bar database, followed by X.509 PKI Seal provisioning.
                </p>
              </div>
              <button
                onClick={() => setCurrentPhase(2)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
              >
                <span>Proceed to Staging</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notary Select & Commission Card */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Select Active Commissioned Notary
                  </h4>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Bar Standing Confirmed
                  </span>
                </div>

                <div className="space-y-2">
                  {notaries.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setSelectedNotary(n)}
                      className={`p-3 rounded-lg border cursor-pointer transition ${
                        selectedNotary.id === n.id
                          ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500'
                          : 'bg-white/60 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">{n.fullName}</span>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {n.commissionNumber}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">{n.judicialRegion}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{n.rollNumber}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleRunBarQuery}
                  disabled={isSimulatingBarQuery}
                  className="w-full text-center py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Scale className="h-3.5 w-3.5 text-slate-700" />
                  {isSimulatingBarQuery ? 'Querying Supreme Court Bar Roster...' : 'Re-verify Bar & Commission Standing'}
                </button>
              </div>

              {/* Provisioned PKI & HSM Credentials */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
                    <Key className="h-3.5 w-3.5" /> Cryptographic HSM Token Provisioning
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    FIPS 140-2 Level 3
                  </span>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-slate-400 text-[11px]">Hardware Key Fingerprint:</div>
                    <div className="text-cyan-300 text-xs break-all">{selectedNotary.x509CertSerial}</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-slate-400 text-[11px]">X.509 PKI Digital Seal Issuer:</div>
                    <div className="text-slate-300 text-xs">
                      CN=Republic Notarial Root CA, OU=Judicial PKI, O=Supreme Court
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="text-slate-400 text-[11px]">HSM Partition ID:</div>
                    <div className="text-emerald-400 text-xs">{selectedNotary.hsmKeyId}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Notary profile certified for PAdES-B-LTA Remote Online Attestation.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2 */}
        {currentPhase === 2 && (
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                  Phase 2 of 5
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-2">
                  Transaction Staging & Identity Verification (eKYC)
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Ingest legal instrument, specify required signatories, and dispatch multi-factor biometric invitation links through the eKYC Gateway.
                </p>
              </div>
              <button
                onClick={() => setCurrentPhase(3)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
              >
                <span>Proceed to RON Session</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Instrument Ingestion (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-blue-600" /> Legal Instrument Selection
                  </h4>
                  <span className="text-[11px] text-slate-500">API/Portal Ingestion</span>
                </div>

                <div className="space-y-2">
                  {instruments.map((inst) => (
                    <div
                      key={inst.id}
                      onClick={() => setActiveInstrument(inst)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        activeInstrument.id === inst.id
                          ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">{inst.title}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                          {inst.pagesCount} Pages
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{inst.summary}</p>
                      <div className="mt-2 text-[10px] font-mono text-slate-400 truncate">
                        SHA-256: {inst.sha256Original}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signers & eKYC Verification Proof (6 Cols) */}
              <div className="lg:col-span-6 space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-cyan-600" /> Signer eKYC Credential Score
                </h4>

                {/* Principal Signer Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{signer.fullName}</div>
                      <div className="text-[11px] text-slate-500">{signer.role} • {signer.email}</div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                      {signer.loaLevel} Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <div className="text-[10px] text-slate-400">Government ID</div>
                      <div className="font-medium text-slate-800 text-[11px]">{signer.idType}</div>
                      <div className="text-[10px] font-mono text-slate-500">{signer.idNumber}</div>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <div className="text-[10px] text-slate-400">3D Facial Liveness</div>
                      <div className="font-bold text-emerald-600 text-[11px]">{signer.livenessScore}% Match</div>
                      <div className="text-[10px] text-slate-500">Anti-Spoof ISO 30107-3</div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 truncate">
                    Biometric Hash: {signer.facialHash}
                  </div>
                </div>

                {/* Credible Witness Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{witness.fullName}</div>
                      <div className="text-[11px] text-slate-500">{witness.role} • {witness.email}</div>
                    </div>
                    <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-300">
                      {witness.loaLevel} Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    ID: {witness.idType} ({witness.idNumber}) • Liveness: {witness.livenessScore}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3 */}
        {currentPhase === 3 && (
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                  Phase 3 of 5
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-2">
                  Remote Online Notarial (RON) Audiovisual Session
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Live encrypted audiovisual conference between the commissioned notary, principal signer, and witness.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onEnterRonChamber}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                >
                  <Video className="h-4 w-4" />
                  <span>Open Interactive RON Chamber</span>
                </button>
                <button
                  onClick={() => setCurrentPhase(4)}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                >
                  <span>Proceed to Sealing</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* RON Preview Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">WebRTC Encrypted Link</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-xl font-bold text-cyan-400 font-mono">1080p @ 30 FPS</div>
                <p className="text-xs text-slate-300">
                  Continuous dual-stream audio/video recording with frame-level SHA-256 rolling session hash.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Statutory Oath</span>
                <div className="text-sm font-bold text-slate-900">Affirmation of Understanding</div>
                <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded border border-slate-200">
                  &quot;Do you swear or affirm under penalty of perjury that the contents of this instrument are true and executed of your own free will?&quot;
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Signer Attestation</span>
                <div className="text-sm font-bold text-slate-900">Cryptographic Signing</div>
                <p className="text-xs text-slate-600">
                  Principal signs on instrument canvas; client private key assertion appended to transaction envelope.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Phase 4 */}
        {currentPhase === 4 && (
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Phase 4 of 5
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-2">
                  Attestation, Sealing & Vaulting (PAdES / TSA)
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  The commissioned notary completes the statutory Jurat / Acknowledgment, affixes their X.509 digital seal, and binds the RFC 3161 timestamp.
                </p>
              </div>
              <button
                onClick={handleInstantSealAndRegister}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
              >
                <Stamp className="h-4 w-4" />
                <span>Affix Seal & Commit to Register</span>
              </button>
            </div>

            {/* Sealing Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                  <Stamp className="h-4 w-4 text-emerald-600" /> Jurat Execution & Commissioned Seal
                </h4>

                <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs space-y-2">
                  <div className="font-bold text-slate-900">JURAT NOTARIAL FORM</div>
                  <p className="text-slate-700 leading-relaxed">
                    Subscribed and sworn to before me this 2nd day of September 2026, affiant personally appeared via Remote Online Notarization (RON), exhibiting competent evidence of identity.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{selectedNotary.fullName}</span>
                    <span>{selectedNotary.commissionNumber}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Standard:</strong> PAdES-B-LTA (Long Term Validation Profile)</div>
                  <div><strong>Signature:</strong> RSA-PSS 4096-bit with SHA-256 Digest</div>
                  <div><strong>TSA:</strong> Supreme Court National Trust TSA Node #01</div>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
                  <Shield className="h-4 w-4" /> WORM Evidence Archival
                </h4>

                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Continuous AV Recording Hash:</div>
                    <div className="text-cyan-300 text-[11px] break-all">
                      sha256:d41d8cd98f00b204e9800998ecf8427e029410d94721ab8e6538c2ef4010992a
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-400 text-[10px]">WORM Storage Policy:</div>
                    <div className="text-emerald-400 text-[11px]">
                      10-Year Statutory Lock (Immutable, Deletion Forbidden)
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleInstantSealAndRegister}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Stamp className="h-4 w-4" />
                  <span>Execute Digital Seal Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase 5 */}
        {currentPhase === 5 && (
          <div className="space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Phase 5 of 5
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900 mt-2">
                  Registry Archival, Supreme Court Sync & Clearing
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  A sequential entry is committed to the National Electronic Notarial Register (e-Book), compliance proofs dispatched to the Supreme Court, and fees cleared.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>Lifecycle Complete</span>
              </span>
            </div>

            {/* Proof Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold text-sm text-emerald-950">
                    Non-Repudiable Evidence Package Ready
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                  Supreme Court Telemetry: RECONCILED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-3 rounded-lg border border-emerald-200">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">e-Book Record</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">Doc #1421, Page 86</div>
                  <div className="text-slate-500 text-[11px]">Book 14, Series of 2026</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-emerald-200">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Economic Split</div>
                  <div className="font-bold text-emerald-700 text-sm mt-0.5">$45 Notary • $15 ENFI</div>
                  <div className="text-slate-500 text-[11px]">$5 eGov IDaaS Fee Cleared</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-emerald-200">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">PAdES Hash Integrity</div>
                  <div className="font-bold text-blue-700 text-sm mt-0.5">PAdES-B-LTA Verified</div>
                  <div className="text-slate-500 text-[11px]">RFC 3161 Timestamp Bound</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentPhase(1)}
                  className="bg-white border border-slate-300 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  Stage New Instrument
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
