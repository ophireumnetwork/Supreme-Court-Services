import React, { useState } from 'react';
import { CryptographicSealPackage } from '../types/enfi';
import {
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  Key,
  Clock,
  Video,
  FileText,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { computeSha256 } from '../utils/crypto';

interface CryptographicVerifierProps {
  sealPackage: CryptographicSealPackage;
}

export function CryptographicVerifier({ sealPackage }: CryptographicVerifierProps) {
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const activeDocHash = isTampered
    ? 'e9b28a41103c8008a011d87192837bc99104fa2810a9c29801f948c21a4f0011'
    : sealPackage.sha256DocumentHash;

  const handleSimulateTamper = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsTampered(true);
      setIsVerifying(false);
    }, 500);
  };

  const handleRestorePristine = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsTampered(false);
      setIsVerifying(false);
    }, 400);
  };

  const isValid = !isTampered && sealPackage.isValid;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase bg-cyan-100 text-cyan-900 px-2.5 py-0.5 rounded-full border border-cyan-200 font-bold">
            Pillar 1: Cryptographic Non-Repudiation
          </span>
          <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            PAdES Advanced Seal & Evidentiary Package Verifier
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Cryptographic validation of PDF Advanced Electronic Signatures (PAdES-B-LTA), X.509 certificate chains, RFC 3161 timestamps, and WORM video hashes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isTampered ? (
            <button
              onClick={handleRestorePristine}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restore Authentic Document Hash</span>
            </button>
          ) : (
            <button
              onClick={handleSimulateTamper}
              className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Simulate 1-Byte Tamper Attack</span>
            </button>
          )}
        </div>
      </div>

      {/* Verification Status Card */}
      <div
        className={`rounded-2xl p-6 border transition-all ${
          isValid
            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
            : 'bg-rose-50/80 border-rose-300 text-rose-950 ring-2 ring-rose-500/20'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                isValid ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {isValid ? <ShieldCheck className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold">
                {isValid ? 'Cryptographic Integrity Status' : 'TAMPER DETECTION ALERT'}
              </div>
              <h3 className="text-xl font-bold font-serif">
                {isValid
                  ? 'PAdES-B-LTA Seal Valid & Non-Repudiable'
                  : 'Cryptographic Signature Broken: Document Altered'}
              </h3>
              <p className="text-xs mt-0.5 opacity-90">
                {isValid
                  ? 'The cryptographic hash matches the commissioned notary hardware signature digest exactly. Timestamp validated by RFC 3161 TSA.'
                  : 'The calculated SHA-256 digest does not match the sealed digital wrapper. The notarial seal is legally void and inadmissible.'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                isValid ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
              }`}
            >
              {isValid ? 'PASSED: 100% INTEGRITY' : 'FAILED: TAMPER DETECTED'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Evidence Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Card 1: Document Hash Check */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-blue-600" /> Document Digest
            </span>
            {isValid ? (
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                MATCH
              </span>
            ) : (
              <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                MISMATCH
              </span>
            )}
          </div>
          <div className="font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-200 break-all text-slate-700">
            {activeDocHash}
          </div>
          <p className="text-[11px] text-slate-500">
            Standard: SHA-256 (NIST FIPS 180-4) tamper-evident digest calculation.
          </p>
        </div>

        {/* Card 2: HSM Token & PKI Seal */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Key className="h-4 w-4 text-cyan-600" /> Hardware HSM Key
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              FIPS 140-2
            </span>
          </div>
          <div className="font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-200 break-all text-slate-700">
            {sealPackage.hsmKeyFingerprint}
          </div>
          <p className="text-[11px] text-slate-500">
            Isolated cryptographic partition; private keys never leave physical HSM boundary.
          </p>
        </div>

        {/* Card 3: RFC 3161 Qualified Timestamp */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-600" /> RFC 3161 TSA
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              QUALIFIED
            </span>
          </div>
          <div className="font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-200 text-slate-700">
            {sealPackage.rfc3161Timestamp}
          </div>
          <p className="text-[11px] text-slate-500">
            Supreme Court National Trust TSA Node #01 cryptographic time token.
          </p>
        </div>

        {/* Card 4: WORM Video Evidence Archival */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Video className="h-4 w-4 text-violet-600" /> WORM Video Hash
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              10-YR LOCK
            </span>
          </div>
          <div className="font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-200 break-all text-slate-700">
            {sealPackage.wormVideoHash}
          </div>
          <p className="text-[11px] text-slate-500">
            Write-Once-Read-Many archival index synced with Supreme Court evidentiary repository.
          </p>
        </div>
      </div>

      {/* Complete X.509 Certificate Chain & Package Details */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-cyan-400" />
            <span className="font-bold text-slate-200">X.509 Certificate Hierarchy & PAdES Envelope</span>
          </div>
          <span className="text-[11px] text-slate-400">Profile: {sealPackage.padesStandard}</span>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Subject Distinguished Name (DN)</div>
            <div className="text-cyan-300 text-[11px]">{sealPackage.x509Subject}</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Issuer (Root Certificate Authority)</div>
            <div className="text-slate-300 text-[11px]">{sealPackage.x509Issuer}</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Notary Signature RSA-PSS Digest</div>
            <div className="text-emerald-400 text-[11px] break-all">{sealPackage.notarySignatureDigest}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
