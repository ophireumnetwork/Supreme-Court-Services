export type EcosystemLayerId = 'regulatory' | 'infrastructure' | 'supply' | 'demand' | 'consumption';

export interface EcosystemNode {
  id: string;
  layer: EcosystemLayerId;
  title: string;
  subtitle: string;
  roleDescription: string;
  mandatesOrFunctions: string[];
  inboundFlows: string[];
  outboundFlows: string[];
  telemetryMetric: string;
  activeStatus: 'nominal' | 'active' | 'enforcing';
}

export interface NotaryProfile {
  id: string;
  fullName: string;
  rollNumber: string;
  commissionNumber: string;
  judicialRegion: string;
  commissionExpiry: string;
  barAdmissionYear: number;
  hsmKeyId: string;
  x509CertSerial: string;
  fipsCompliance: string;
  status: 'active' | 'under_review' | 'renewed';
  notarizationsCompleted: number;
  honorariaEarned: number;
  rating: number;
}

export interface SignerProfile {
  id: string;
  fullName: string;
  role: 'Principal Signer' | 'Credible Witness' | 'Counterparty';
  email: string;
  phone: string;
  idType: 'National Biometric ID' | 'e-Passport' | 'Judicial Bar ID' | "Driver's License";
  idNumber: string;
  idFrontVerified: boolean;
  livenessScore: number; // e.g. 99.4
  loaLevel: 'LOA-3' | 'LOA-4';
  facialHash: string;
  location: string;
  ipAddress: string;
}

export interface LegalInstrument {
  id: string;
  title: string;
  instrumentType: 'Deed of Absolute Sale' | 'Commercial Facility Agreement' | 'Special Power of Attorney' | 'Affidavit of Non-Collusion' | 'General Jurat Affidavit';
  originatingEntity: string;
  createdDate: string;
  summary: string;
  rawText: string;
  sha256Original: string;
  pagesCount: number;
  parties: {
    signerName: string;
    role: string;
    status: 'Pending' | 'Verified' | 'Signed';
  }[];
}

export interface RonSessionState {
  sessionId: string;
  instrumentId: string;
  status: 'staging' | 'active' | 'oath_taken' | 'signing' | 'sealed' | 'concluded';
  notaryId: string;
  signerId: string;
  witnessId?: string;
  startTime: string;
  elapsedSeconds: number;
  isRecording: boolean;
  recordingStorageProof: string;
  audioBitrateKbps: number;
  videoFps: number;
  oathText: string;
  oathAdministered: boolean;
  signerSignatureDataUrl: string | null;
  notarySealApplied: boolean;
  sessionTelemetryLogs: Array<{
    timestamp: string;
    event: string;
    level: 'info' | 'crypto' | 'compliance' | 'warning';
  }>;
}

export interface CryptographicSealPackage {
  packageId: string;
  instrumentId: string;
  instrumentTitle: string;
  sha256DocumentHash: string;
  padesStandard: 'PAdES-B-LTA (Long Term Validation)' | 'PAdES-B-T';
  hsmTokenProvider: string;
  hsmKeyFingerprint: string;
  notarySignatureDigest: string;
  rfc3161TimestampAuthority: string;
  rfc3161Timestamp: string;
  x509Issuer: string;
  x509Subject: string;
  tamperEvidentChecksum: string;
  wormVideoHash: string;
  isValid: boolean;
}

export interface ElectronicNotarialRegisterEntry {
  id: string;
  docNumber: number;
  pageNumber: number;
  bookNumber: number;
  seriesYear: number;
  instrumentTitle: string;
  instrumentType: string;
  principalSigner: string;
  signerIdInfo: string;
  witnessName?: string;
  commissionedNotary: string;
  rollNumber: string;
  notarizedAt: string;
  notarialFee: number;
  platformFee: number;
  documentHash: string;
  judicialProofStatus: 'Synced to Supreme Court' | 'Pending Verification' | 'Audited';
  supremeCourtSyncToken: string;
}

export interface AuditTelemetryEvent {
  id: string;
  timestamp: string;
  actor: string;
  layer: string;
  eventType: string;
  hashDigest: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
}

export interface ClearingSettlement {
  transactionId: string;
  instrumentTitle: string;
  timestamp: string;
  grossAmount: number;
  platformFee: number;
  notaryHonorarium: number;
  idaasFee: number;
  settlementStatus: 'Settled' | 'Batched' | 'Cleared';
  recipientNotary: string;
}
