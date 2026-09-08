import React, { useState, useRef, useEffect } from 'react';
import {
  NotaryProfile,
  SignerProfile,
  LegalInstrument,
  CryptographicSealPackage,
  ElectronicNotarialRegisterEntry,
} from '../types/enfi';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Radio,
  Stamp,
  CheckCircle2,
  FileText,
  Clock,
  Shield,
  Key,
  Eraser,
  PenTool,
  Volume2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatTimestampRFC3161, generateRandomHex } from '../utils/crypto';

interface RonSessionChamberProps {
  notary: NotaryProfile;
  signer: SignerProfile;
  instrument: LegalInstrument;
  onSessionFinished: (sealPackage: CryptographicSealPackage, registerEntry: ElectronicNotarialRegisterEntry) => void;
  onNavigateToRegister: () => void;
}

export function RonSessionChamber({
  notary,
  signer,
  instrument,
  onSessionFinished,
  onNavigateToRegister,
}: RonSessionChamberProps) {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(true);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(128);
  const [oathTaken, setOathTaken] = useState<boolean>(false);
  const [signerSigned, setSignerSigned] = useState<boolean>(false);
  const [notarySealed, setNotarySealed] = useState<boolean>(false);
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Timer simulation for continuous recording
  useEffect(() => {
    const timer = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup media tracks on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        try {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((t) => t.stop());
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Web camera toggle (real camera or fallback)
  const toggleCamera = async () => {
    if (!cameraActive) {
      try {
        if (
          typeof navigator !== 'undefined' &&
          navigator.mediaDevices &&
          typeof navigator.mediaDevices.getUserMedia === 'function'
        ) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
          setCameraActive(true);
        } else {
          setCameraActive(true);
        }
      } catch {
        // Fallback to simulated stream without failing
        setCameraActive(true);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        try {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((t) => t.stop());
        } catch {
          // ignore track stopping errors
        }
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }
  };

  // Signature canvas handlers
  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e3a8a'; // Deep blue ink
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleEndDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setSignerSigned(true);
    }
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSignerSigned(false);
    }
  };

  const handleAutoSign = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'italic 26px "Brush Script MT", cursive, sans-serif';
    ctx.fillStyle = '#1e3a8a';
    ctx.fillText('Eduardo G. Montemayor', 20, 50);
    setSignerSigned(true);
  };

  // Finalize Notarization & create e-Register entry
  const handleFinalizeSession = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      const docHash = instrument.sha256Original;
      const sealPackage: CryptographicSealPackage = {
        packageId: `PKG-RON-${Date.now()}`,
        instrumentId: instrument.id,
        instrumentTitle: instrument.title,
        sha256DocumentHash: docHash,
        padesStandard: 'PAdES-B-LTA (Long Term Validation)',
        hsmTokenProvider: `${notary.fipsCompliance} (Partition ${notary.hsmKeyId})`,
        hsmKeyFingerprint: notary.x509CertSerial,
        notarySignatureDigest: `rsa-pss-4096:${generateRandomHex(40)}`,
        rfc3161TimestampAuthority: 'Supreme Court National Trust TSA Node #01',
        rfc3161Timestamp: formatTimestampRFC3161(new Date()),
        x509Issuer: 'CN=Republic Notarial Root CA, OU=Judicial PKI, O=Supreme Court',
        x509Subject: `CN=${notary.fullName}, ${notary.rollNumber}`,
        tamperEvidentChecksum: `0x${generateRandomHex(16).toUpperCase()}`,
        wormVideoHash: `sha256:${generateRandomHex(64)}`,
        isValid: true,
      };

      const registerEntry: ElectronicNotarialRegisterEntry = {
        id: `reg-${Date.now()}`,
        docNumber: 1422,
        pageNumber: 87,
        bookNumber: 14,
        seriesYear: 2026,
        instrumentTitle: instrument.title,
        instrumentType: instrument.instrumentType,
        principalSigner: signer.fullName,
        signerIdInfo: `${signer.idType} ${signer.idNumber}`,
        commissionedNotary: notary.fullName,
        rollNumber: notary.rollNumber.replace('Roll of Attorneys No. ', ''),
        notarizedAt: new Date().toISOString(),
        notarialFee: 45.0,
        platformFee: 15.0,
        documentHash: docHash,
        judicialProofStatus: 'Synced to Supreme Court',
        supremeCourtSyncToken: `SC-JUR-REG-SYNC-2026-${generateRandomHex(8).toUpperCase()}`,
      };

      onSessionFinished(sealPackage, registerEntry);
      setIsFinalizing(false);
      setSessionCompleted(true);
    }, 1200);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Session Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white">Live Remote Online Notarization (RON) Chamber</span>
              <span className="bg-red-500/20 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-red-500/40 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" /> REC {formatTimer(recordingSeconds)}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              WebRTC Peer Connection: End-to-End Encrypted (AES-256-GCM) • Judicial Evidentiary Continuity Active
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCamera}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              cameraActive
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {cameraActive ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
            <span>{cameraActive ? 'Webcam Active' : 'Enable Camera'}</span>
          </button>

          <button
            onClick={() => setMicActive(!micActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              micActive
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                : 'bg-red-900/60 text-red-300 border-red-800'
            }`}
          >
            {micActive ? <Mic className="h-3.5 w-3.5 text-emerald-400" /> : <MicOff className="h-3.5 w-3.5 text-red-400" />}
            <span>{micActive ? 'Mic Live' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Main Chamber Grid: Audiovisual Feeds (Left 5 cols) + Document & Jurat Attestation (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AV Feeds & Telemetry (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Commissioned Notary Video Tile */}
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative shadow-md">
            <div className="aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4 relative">
              <div className="h-16 w-16 rounded-full bg-slate-800 border-2 border-indigo-400/40 flex items-center justify-center text-indigo-300 font-bold text-xl shadow-inner">
                HV
              </div>
              <div className="mt-2 text-center">
                <div className="text-white text-xs font-semibold">{notary.fullName}</div>
                <div className="text-[10px] text-indigo-300 font-mono">Presiding Commissioned Officer</div>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-slate-300 border border-slate-800">
                <Shield className="h-3 w-3 text-emerald-400" />
                <span>Roll #{notary.rollNumber.replace('Roll of Attorneys No. ', '')}</span>
              </div>

              <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                <Volume2 className="h-3 w-3" />
                <span className="font-mono">Audio Sync Nominal</span>
              </div>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span>{notary.judicialRegion}</span>
              <span className="text-cyan-400 font-mono">1080p @ 30fps</span>
            </div>
          </div>

          {/* Principal Signer Video Tile */}
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative shadow-md">
            <div className="aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 relative">
              {cameraActive ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <>
                  <div className="h-16 w-16 rounded-full bg-slate-800 border-2 border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-xl shadow-inner">
                    EM
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-white text-xs font-semibold">{signer.fullName}</div>
                    <div className="text-[10px] text-cyan-300 font-mono">Principal Signer (Affiant)</div>
                  </div>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-slate-300 border border-slate-800">
                <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                <span>eKYC: {signer.loaLevel} Verified</span>
              </div>

              <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                {signer.idType}
              </div>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span>Biometric Liveness: 99.6%</span>
              <span className="text-emerald-400 font-mono">Latency 18ms</span>
            </div>
          </div>

          {/* Statutory Oath & Competence Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Statutory Oath Administration
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${oathTaken ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {oathTaken ? 'Oath Administered' : 'Pending Affirmation'}
              </span>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed italic">
              &quot;Do you solemnly swear or affirm under penalty of perjury that the instrument you are about to execute is your own voluntary act and deed, and that you understand the legal consequences thereof?&quot;
            </div>

            <button
              onClick={() => setOathTaken(true)}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 ${
                oathTaken
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{oathTaken ? 'Affirmation of Oath Recorded (Audio Hash Bound)' : 'Signer: "I Do Affirm and Swear"'}</span>
            </button>
          </div>
        </div>

        {/* Legal Document & Attestation Workspace (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Doc Header */}
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  {instrument.instrumentType}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{instrument.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block truncate max-w-[200px]">
                  Original SHA-256: {instrument.sha256Original.substring(0, 16)}...
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">Tamper Lock Armed</span>
              </div>
            </div>

            {/* Document Content View */}
            <div className="p-5 max-h-72 overflow-y-auto font-serif text-xs text-slate-800 leading-relaxed space-y-3 bg-amber-50/20 border-b border-slate-200">
              <pre className="whitespace-pre-wrap font-serif text-xs">{instrument.rawText}</pre>
            </div>

            {/* Interactive Attestation & Signature Section */}
            <div className="p-5 space-y-5 bg-white">
              {/* Step 1: Principal Signer Signature Canvas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <PenTool className="h-3.5 w-3.5 text-blue-600" />
                    Signer Electronic Signature (Affiant)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAutoSign}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Autograph Sign
                    </button>
                    <button
                      onClick={handleClearSignature}
                      className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-1"
                    >
                      <Eraser className="h-3 w-3" /> Clear
                    </button>
                  </div>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-lg p-2 bg-slate-50 relative">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={80}
                    onMouseDown={handleStartDraw}
                    onMouseMove={handleDraw}
                    onMouseUp={handleEndDraw}
                    onTouchStart={handleStartDraw}
                    onTouchMove={handleDraw}
                    onTouchEnd={handleEndDraw}
                    className="w-full h-20 bg-white rounded cursor-crosshair touch-none"
                  />
                  {!signerSigned && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs italic">
                      Draw signature or click &quot;Autograph Sign&quot;
                    </div>
                  )}
                </div>

                {signerSigned && (
                  <div className="text-[11px] text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Affiant signature captured and cryptographically hashed into session telemetry.</span>
                  </div>
                )}
              </div>

              {/* Step 2: Jurat Form & Commissioned Notary Digital Seal */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Stamp className="h-3.5 w-3.5 text-emerald-600" />
                    Commissioned Notary Jurat Execution & Seal
                  </span>
                  <button
                    onClick={() => setNotarySealed(true)}
                    disabled={!signerSigned || !oathTaken}
                    className={`text-xs px-3 py-1 rounded font-semibold transition flex items-center gap-1.5 ${
                      notarySealed
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : signerSigned && oathTaken
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Stamp className="h-3.5 w-3.5" />
                    <span>{notarySealed ? 'Digital Seal Affixed' : 'Affix PKI Digital Seal'}</span>
                  </button>
                </div>

                {/* Notarial Seal Graphic Render */}
                {notarySealed ? (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                    <div className="h-20 w-20 rounded-full border-4 border-double border-emerald-700 flex flex-col items-center justify-center text-center p-1 bg-white shrink-0 shadow-sm">
                      <span className="text-[7px] font-bold uppercase text-emerald-900 leading-tight">COMMISSIONED NOTARY</span>
                      <Stamp className="h-4 w-4 text-emerald-700 my-0.5" />
                      <span className="text-[6px] font-mono text-emerald-800">ROLL #58921</span>
                    </div>
                    <div className="text-xs text-emerald-900 space-y-1">
                      <div className="font-bold">{notary.fullName}</div>
                      <div className="text-[11px] text-emerald-800">{notary.commissionNumber} • NCJR Branch 42</div>
                      <div className="text-[10px] font-mono text-emerald-700 break-all">
                        FIPS 140-2 Key: {notary.x509CertSerial}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-700">
                        RFC 3161 TSA Bound: {new Date().toISOString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                    Complete oath administration and affiant signature to enable the commissioned digital seal.
                  </div>
                )}
              </div>

              {/* Completion Action */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {sessionCompleted ? (
                    <span className="text-emerald-700 font-medium">Session recorded and entered in e-Notarial Register!</span>
                  ) : (
                    <span>Requires: Oath Taken ✓ Signer Signature ✓ Notary Digital Seal ✓</span>
                  )}
                </div>

                {sessionCompleted ? (
                  <button
                    onClick={onNavigateToRegister}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                  >
                    <span>View in National e-Register</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinalizeSession}
                    disabled={!oathTaken || !signerSigned || !notarySealed || isFinalizing}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition shadow-sm ${
                      oathTaken && signerSigned && notarySealed && !isFinalizing
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-500 hover:to-teal-600'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isFinalizing ? 'Hashing to WORM Storage...' : 'Complete & Seal Instrument (PAdES)'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
