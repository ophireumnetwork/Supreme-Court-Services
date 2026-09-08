import {
  EcosystemNode,
  NotaryProfile,
  SignerProfile,
  LegalInstrument,
  ElectronicNotarialRegisterEntry,
  ClearingSettlement,
  AuditTelemetryEvent,
  CryptographicSealPackage,
} from '../types/enfi';

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'sc-judicial',
    layer: 'regulatory',
    title: 'Supreme Court & Judicial Regulatory Body',
    subtitle: 'Sovereign Regulatory Authority',
    roleDescription: 'Promulgates Electronic Notarial Rules, sets mandatory PKI seal standards, inspects live e-registers, and enforces judicial discipline.',
    mandatesOrFunctions: [
      'Statutory Rulemaking & Guidelines for Remote Online Notarization (RON)',
      'Real-time verification feed of National Electronic Notarial Register',
      'Revocation & suspension dispatch for notarial commissions',
      'Validation of Root Certificate Authorities (CA) & Qualified TSA Providers'
    ],
    inboundFlows: ['Sequential e-Register hash telemetry', 'Malpractice & fraud alarms', 'Compliance proof ledger'],
    outboundFlows: ['Mandates & Rules', 'PKI policy requirements', 'Disciplinary revocation notices'],
    telemetryMetric: '100% Sync with Supreme Court Ledger Node',
    activeStatus: 'enforcing',
  },
  {
    id: 'bar-assoc',
    layer: 'regulatory',
    title: 'Integrated Bar Association & Regulatory Board',
    subtitle: 'Legal Officer Accreditation',
    roleDescription: 'Maintains live attorney standing, annual bar fee compliance, and certificates of good standing for notary commissioners.',
    mandatesOrFunctions: [
      'Automated MCLE & Bar Standing Verification API',
      'Judicial roll clearance for notary qualification',
      'Biometric attorney identity synchronization'
    ],
    inboundFlows: ['Commission applications', 'Continuing legal education logs'],
    outboundFlows: ['Real-time Bar status attestations', 'Good standing clearances'],
    telemetryMetric: '3,842 Commissioned Attorneys Verified',
    activeStatus: 'active',
  },
  {
    id: 'enfi-kms-hsm',
    layer: 'infrastructure',
    title: 'Cryptographic Key & HSM Management',
    subtitle: 'FIPS 140-2 Level 3 Core Trust Engine',
    roleDescription: 'Secure Hardware Security Module (HSM) cluster holding notarial private keys with zero client-side key exposure and PAdES-B-LTA sealing.',
    mandatesOrFunctions: [
      'Hardware-isolated asymmetric key generation (RSA-4096 / ECC-384)',
      'RFC 3161 Qualified Time-Stamping Authority (TSA) integration',
      'PAdES & CAdES cryptographic wrapper generation',
      'Hardware-enforced tamper detection & zeroization guards'
    ],
    inboundFlows: ['Notary biometric auth tokens', 'Raw document hashes to sign'],
    outboundFlows: ['Cryptographically signed PAdES objects', 'Seal fingerprints'],
    telemetryMetric: 'FIPS 140-2 Level 3 Certified (HSM Node Latency 14ms)',
    activeStatus: 'nominal',
  },
  {
    id: 'enfi-audit-vault',
    layer: 'infrastructure',
    title: 'Immutable Ledger & Video Archival Engine',
    subtitle: 'WORM Evidentiary Repository',
    roleDescription: 'Write-Once-Read-Many (WORM) cloud repository indexing continuous AV recordings, timestamped telemetry, and biometric receipts.',
    mandatesOrFunctions: [
      'Time-synced audiovisual WebRTC stream hashing',
      'Tamper-evident Merkle tree chaining of session telemetry',
      '10-year statutory evidentiary retention lifecycle'
    ],
    inboundFlows: ['Continuous WebRTC AV recording stream', 'Interaction telemetry'],
    outboundFlows: ['WORM storage hashes', 'Evidentiary packages for courts'],
    telemetryMetric: 'SHA-256 Merkle Root anchored every 300s',
    activeStatus: 'nominal',
  },
  {
    id: 'enfi-idv-gateway',
    layer: 'infrastructure',
    title: 'National ID, Biometric & eKYC Gateway',
    subtitle: 'Deterministic Identity Proofing (LOA 3/4)',
    roleDescription: 'Integrates with sovereign identity databases, performing OCR, passport chip NFC/MRZ parsing, and 3D facial liveness with anti-spoofing.',
    mandatesOrFunctions: [
      'Government ID document authenticity & hologram check',
      'ISO/IEC 30107-3 compliant 3D facial liveness detection',
      'Level of Assurance 3 & 4 (NIST SP 800-63-3) credential generation'
    ],
    inboundFlows: ['Signer government ID captures', 'Live selfie video stream'],
    outboundFlows: ['eKYC assertion tokens', 'Biometric match scores'],
    telemetryMetric: 'Average Identity Verification Time: 4.8s (Match Rate: 99.4%)',
    activeStatus: 'nominal',
  },
  {
    id: 'enfi-registry-core',
    layer: 'infrastructure',
    title: 'National Electronic Notarial Register (e-Book)',
    subtitle: 'Statutory Sequentially Indexed Ledger',
    roleDescription: 'Digital equivalent of the physical notarial book. Every notarization receives an unalterable sequence number and cryptographic receipt.',
    mandatesOrFunctions: [
      'Deterministic sequence locking (Doc No., Page No., Book No., Series of 2026)',
      'Zero-gap ledger numbering preventing retroactive insertions',
      'Direct sync bridge to Supreme Court Judicial Audit Feed'
    ],
    inboundFlows: ['Sealed transaction completion tokens', 'Notary & signer metadata'],
    outboundFlows: ['Sequential register certificates', 'Judicial audit proofs'],
    telemetryMetric: '142,890 Total Notarized Acts Sequenced',
    activeStatus: 'enforcing',
  },
  {
    id: 'supply-notaries',
    layer: 'supply',
    title: 'Commissioned Electronic Notaries Public',
    subtitle: 'Attestation & Judicial Supply Layer',
    roleDescription: 'Commissioned legal professionals (solo notaries and bar-certified jurists) who administer oaths, verify understanding, and execute jurats.',
    mandatesOrFunctions: [
      'Live audiovisual administration of oath or affirmation',
      'Statutory verification of principal comprehension & voluntariness',
      'Execution of Jurat, Acknowledgment, and electronic seal application',
      'Collection of statutory honoraria'
    ],
    inboundFlows: ['Staged transaction dossiers', 'Pre-verified eKYC packets'],
    outboundFlows: ['Executed jurats', 'Affixed digital seals', 'Register entries'],
    telemetryMetric: '24/7 On-Demand Notary Roster (Avg queue: 1m 20s)',
    activeStatus: 'nominal',
  },
  {
    id: 'demand-enterprise',
    layer: 'demand',
    title: 'Institutional & Corporate Layer',
    subtitle: 'Enterprises, Banks, FinTechs & Law Firms',
    roleDescription: 'Commercial entities staging bulk legal instruments, credit agreements, deeds of conveyance, and powers of attorney through API and portal.',
    mandatesOrFunctions: [
      'ERP / Core Banking API transaction ingestion',
      'Transaction staging with party roles and document parameters',
      'Settlement of platform infrastructure fees'
    ],
    inboundFlows: ['Sealed non-repudiable instrument packages', 'Audit trail reports'],
    outboundFlows: ['Unexecuted contracts & deeds', 'Signer invitations', 'Platform fees'],
    telemetryMetric: '$14.2M Monthly Transaction Volume Cleared',
    activeStatus: 'nominal',
  },
  {
    id: 'consumption-citizens',
    layer: 'consumption',
    title: 'Signers, Witnesses & Relying Parties',
    subtitle: 'Primary Principals & Citizens',
    roleDescription: 'Individuals executing binding instruments remotely via browser or mobile without traveling to physical notarial chambers.',
    mandatesOrFunctions: [
      'Submission of biometric credentials and ID proofing',
      'Participation in live secure WebRTC audiovisual session',
      'Execution of cryptographic e-signatures with legal intent'
    ],
    inboundFlows: ['Multi-factor session invite links', 'Final sealed documents'],
    outboundFlows: ['Biometric signatures', 'Oral affirmation of oath'],
    telemetryMetric: '98.9% First-Time Completion Rate',
    activeStatus: 'nominal',
  },
];

export const INITIAL_NOTARIES: NotaryProfile[] = [
  {
    id: 'notary-01',
    fullName: 'Atty. Helena Vance, J.D.',
    rollNumber: 'Roll of Attorneys No. 58921',
    commissionNumber: 'COMM-NCJR-2025-084',
    judicialRegion: 'National Capital Judicial Region (Branch 42)',
    commissionExpiry: '2026-12-31',
    barAdmissionYear: 2012,
    hsmKeyId: 'HSM-KEY-FIPS-099412-VANCE',
    x509CertSerial: '4A:7F:C2:90:11:BB:09:88:EA:31',
    fipsCompliance: 'FIPS 140-2 Level 3 (Hardware Token)',
    status: 'active',
    notarizationsCompleted: 1420,
    honorariaEarned: 63900,
    rating: 4.98,
  },
  {
    id: 'notary-02',
    fullName: 'Atty. Marcus Sterling, LL.M.',
    rollNumber: 'Roll of Attorneys No. 61402',
    commissionNumber: 'COMM-NCJR-2025-119',
    judicialRegion: 'National Capital Judicial Region (Branch 18)',
    commissionExpiry: '2026-12-31',
    barAdmissionYear: 2015,
    hsmKeyId: 'HSM-KEY-FIPS-087220-STERLING',
    x509CertSerial: '7C:1E:55:0A:89:D2:14:4E:9F:72',
    fipsCompliance: 'FIPS 140-2 Level 3 (Cloud HSM)',
    status: 'active',
    notarizationsCompleted: 980,
    honorariaEarned: 44100,
    rating: 4.95,
  },
];

export const DEFAULT_SIGNER: SignerProfile = {
  id: 'signer-01',
  fullName: 'Eduardo Gabriel Montemayor',
  role: 'Principal Signer',
  email: 'e.montemayor@pacificequities.corp',
  phone: '+63 (917) 555-0182',
  idType: 'National Biometric ID',
  idNumber: 'CRN-9904-8821-4472',
  idFrontVerified: true,
  livenessScore: 99.6,
  loaLevel: 'LOA-4',
  facialHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  location: 'Makati Financial District (14.5547° N, 121.0244° E)',
  ipAddress: '124.105.18.94 (Verified Residential Fiber)',
};

export const DEFAULT_WITNESS: SignerProfile = {
  id: 'witness-01',
  fullName: 'Maria Cecilia Del Rosario',
  role: 'Credible Witness',
  email: 'c.delrosario@crestviewpartners.law',
  phone: '+63 (918) 555-9011',
  idType: 'e-Passport',
  idNumber: 'P8842109A',
  idFrontVerified: true,
  livenessScore: 98.8,
  loaLevel: 'LOA-3',
  facialHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
  location: 'Taguig City (14.5378° N, 121.0503° E)',
  ipAddress: '112.198.45.12',
};

export const DEFAULT_INSTRUMENTS: LegalInstrument[] = [
  {
    id: 'inst-001',
    title: 'Deed of Absolute Sale of Commercial Real Property',
    instrumentType: 'Deed of Absolute Sale',
    originatingEntity: 'Metro Prime Horizon Land Corp & Pacific Equities',
    createdDate: '2026-09-02',
    summary: 'Conveyance of a 4,500 sq. meter commercial parcel in Bonifacio Global City for the consideration of PHP 245,000,000.00, free from liens and encumbrances.',
    rawText: `DEED OF ABSOLUTE SALE

KNOW ALL MEN BY THESE PRESENTS:
This DEED OF ABSOLUTE SALE made and executed this 2nd day of September 2026 by and between:

PACIFIC EQUITIES CAPITAL CORP., represented herein by its Managing Director, EDUARDO GABRIEL MONTEMAYOR, hereinafter referred to as the VENDOR;
- and -
METRO PRIME HORIZON LAND CORP., hereinafter referred to as the VENDEE.

WITNESSETH:
WHEREAS, the VENDOR is the absolute and registered owner of a prime commercial parcel situated in Bonifacio Global City, registered under Transfer Certificate of Title (TCT) No. 004-2022019948;

NOW, THEREFORE, for and in consideration of the sum of TWO HUNDRED FORTY-FIVE MILLION PESOS (PHP 245,000,000.00), Philippine Currency, in hand paid by the VENDEE, the VENDOR hereby SELLS, CEDES, TRANSFERS, and CONVEYS in a manner absolute and irrevocable unto the said VENDEE, its successors and assigns, the aforementioned property together with all improvements thereon.

IN WITNESS WHEREOF, the parties have signed this electronic notarial instrument under the Electronic Notarial Facility Infrastructure (ENFI).`,
    sha256Original: '7b80a2569e5d73b06385d852a420846e96dc6632ecb44e05739810d738f6bdf1',
    pagesCount: 4,
    parties: [
      { signerName: 'Eduardo Gabriel Montemayor', role: 'Vendor / Principal', status: 'Pending' },
      { signerName: 'Maria Cecilia Del Rosario', role: 'Credible Witness', status: 'Pending' },
      { signerName: 'Atty. Helena Vance, J.D.', role: 'Commissioned E-Notary', status: 'Pending' },
    ],
  },
  {
    id: 'inst-002',
    title: 'Syndicated Secured Credit Facility Agreement (PHP 500M)',
    instrumentType: 'Commercial Facility Agreement',
    originatingEntity: 'Apex Investment Banking Consortium & Solis Energy',
    createdDate: '2026-09-01',
    summary: 'Senior secured working capital revolving credit facility for 120MW solar photovoltaic grid development.',
    rawText: `SYNDICATED SECURED CREDIT FACILITY AGREEMENT
Executed pursuant to the Electronic Commerce Act and Judicial Remote Online Notarization Rules.
Borrower: Solis Energy Infrastructure Inc.
Facility Agent: Apex Investment Bank.
Total Facility: PHP 500,000,000.00.
Interest: 6.25% p.a. floating over BSP benchmark rate.`,
    sha256Original: '4f21bb8909d94312e4fbc875412895642a8b9e67d4f1092a472c3d887a4192bc',
    pagesCount: 18,
    parties: [
      { signerName: 'Eduardo Gabriel Montemayor', role: 'Managing Trustee', status: 'Pending' },
      { signerName: 'Atty. Helena Vance, J.D.', role: 'Commissioned E-Notary', status: 'Pending' },
    ],
  },
  {
    id: 'inst-003',
    title: 'Irrevocable Special Power of Attorney (Corporate Actions)',
    instrumentType: 'Special Power of Attorney',
    originatingEntity: 'Pacific Equities Asset Management Group',
    createdDate: '2026-08-30',
    summary: 'Granting plenary authority to represent principal in regulatory filings, court appearances, and commercial bids before sovereign bodies.',
    rawText: `SPECIAL POWER OF ATTORNEY
KNOW ALL MEN BY THESE PRESENTS:
I, EDUARDO GABRIEL MONTEMAYOR, of legal age, do hereby NAME, CONSTITUTE, and APPOINT Maria Cecilia Del Rosario to be my true and lawful attorney-in-fact...`,
    sha256Original: 'a20c918f6734ef9115d9a8c1704259b1cf1889c258d4a9611e992b4506c7104b',
    pagesCount: 2,
    parties: [
      { signerName: 'Eduardo Gabriel Montemayor', role: 'Principal Grantor', status: 'Pending' },
      { signerName: 'Atty. Helena Vance, J.D.', role: 'Commissioned E-Notary', status: 'Pending' },
    ],
  },
];

export const INITIAL_REGISTER_ENTRIES: ElectronicNotarialRegisterEntry[] = [
  {
    id: 'reg-001',
    docNumber: 1421,
    pageNumber: 86,
    bookNumber: 14,
    seriesYear: 2026,
    instrumentTitle: 'Deed of Absolute Sale (Parcel BGC-402)',
    instrumentType: 'Deed of Absolute Sale',
    principalSigner: 'Eduardo Gabriel Montemayor',
    signerIdInfo: 'National Biometric ID CRN-9904-8821-4472',
    witnessName: 'Maria Cecilia Del Rosario',
    commissionedNotary: 'Atty. Helena Vance, J.D.',
    rollNumber: '58921',
    notarizedAt: '2026-09-02T10:14:22+08:00',
    notarialFee: 45.00,
    platformFee: 15.00,
    documentHash: '7b80a2569e5d73b06385d852a420846e96dc6632ecb44e05739810d738f6bdf1',
    judicialProofStatus: 'Synced to Supreme Court',
    supremeCourtSyncToken: 'SC-JUR-REG-SYNC-2026-0902-88194',
  },
  {
    id: 'reg-002',
    docNumber: 1420,
    pageNumber: 85,
    bookNumber: 14,
    seriesYear: 2026,
    instrumentTitle: 'Affidavit of Loss of Original Certificate of Title',
    instrumentType: 'General Jurat Affidavit',
    principalSigner: 'Ramon Alfonso Sy',
    signerIdInfo: 'e-Passport P7729104B',
    commissionedNotary: 'Atty. Helena Vance, J.D.',
    rollNumber: '58921',
    notarizedAt: '2026-09-02T09:41:05+08:00',
    notarialFee: 45.00,
    platformFee: 15.00,
    documentHash: 'c4ca4238a0b923820dcc509a6f75849b282c07060130e0bc3ca441612d0c0f1e',
    judicialProofStatus: 'Synced to Supreme Court',
    supremeCourtSyncToken: 'SC-JUR-REG-SYNC-2026-0902-88190',
  },
  {
    id: 'reg-003',
    docNumber: 979,
    pageNumber: 42,
    bookNumber: 9,
    seriesYear: 2026,
    instrumentTitle: 'Corporate Guaranty & Suretyship Agreement',
    instrumentType: 'Commercial Facility Agreement',
    principalSigner: 'Beatriz Cristina Cojuangco',
    signerIdInfo: 'National Biometric ID CRN-4412-9018-3311',
    witnessName: 'Jonathan Paul Estrada',
    commissionedNotary: 'Atty. Marcus Sterling, LL.M.',
    rollNumber: '61402',
    notarizedAt: '2026-09-01T16:22:40+08:00',
    notarialFee: 45.00,
    platformFee: 15.00,
    documentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    judicialProofStatus: 'Audited',
    supremeCourtSyncToken: 'SC-JUR-REG-SYNC-2026-0901-77211',
  },
  {
    id: 'reg-004',
    docNumber: 978,
    pageNumber: 41,
    bookNumber: 9,
    seriesYear: 2026,
    instrumentTitle: 'Irrevocable Special Power of Attorney (Land Registration)',
    instrumentType: 'Special Power of Attorney',
    principalSigner: 'Arthur Vincent Tan',
    signerIdInfo: "Driver's License N03-12-889104",
    commissionedNotary: 'Atty. Marcus Sterling, LL.M.',
    rollNumber: '61402',
    notarizedAt: '2026-09-01T14:10:19+08:00',
    notarialFee: 45.00,
    platformFee: 15.00,
    documentHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    judicialProofStatus: 'Synced to Supreme Court',
    supremeCourtSyncToken: 'SC-JUR-REG-SYNC-2026-0901-77202',
  },
];

export const INITIAL_SETTLEMENTS: ClearingSettlement[] = [
  {
    transactionId: 'TX-CLR-2026-0902-01',
    instrumentTitle: 'Deed of Absolute Sale of Commercial Real Property',
    timestamp: '2026-09-02 10:15:00',
    grossAmount: 65.00,
    platformFee: 15.00,
    notaryHonorarium: 45.00,
    idaasFee: 5.00,
    settlementStatus: 'Settled',
    recipientNotary: 'Atty. Helena Vance, J.D.',
  },
  {
    transactionId: 'TX-CLR-2026-0902-02',
    instrumentTitle: 'Affidavit of Loss of Original Certificate of Title',
    timestamp: '2026-09-02 09:41:30',
    grossAmount: 65.00,
    platformFee: 15.00,
    notaryHonorarium: 45.00,
    idaasFee: 5.00,
    settlementStatus: 'Settled',
    recipientNotary: 'Atty. Helena Vance, J.D.',
  },
  {
    transactionId: 'TX-CLR-2026-0901-08',
    instrumentTitle: 'Corporate Guaranty & Suretyship Agreement',
    timestamp: '2026-09-01 16:23:10',
    grossAmount: 65.00,
    platformFee: 15.00,
    notaryHonorarium: 45.00,
    idaasFee: 5.00,
    settlementStatus: 'Cleared',
    recipientNotary: 'Atty. Marcus Sterling, LL.M.',
  },
];

export const INITIAL_AUDIT_EVENTS: AuditTelemetryEvent[] = [
  {
    id: 'aud-9901',
    timestamp: '2026-09-02 10:14:23 UTC',
    actor: 'ENFI Core Trust Engine',
    layer: 'Infrastructure',
    eventType: 'PADES_DIGITAL_SEAL_AFFIXED',
    hashDigest: 'sha256:7b80a2569e5d73b06385d852a420846e96dc6632ecb44e05739810d738f6bdf1',
    severity: 'low',
    details: 'Hardware HSM FIPS 140-2 Level 3 signed instrument with RFC 3161 TSA timestamp.',
  },
  {
    id: 'aud-9902',
    timestamp: '2026-09-02 10:14:25 UTC',
    actor: 'Supreme Court Audit Ingress Node',
    layer: 'Regulatory',
    eventType: 'JUDICIAL_REGISTER_ACK',
    hashDigest: 'token:SC-JUR-REG-SYNC-2026-0902-88194',
    severity: 'low',
    details: 'Entry sequentially committed into Series 2026 Book 14 Page 86. Zero-gap ledger reconciled.',
  },
  {
    id: 'aud-9903',
    timestamp: '2026-09-02 09:39:10 UTC',
    actor: 'eKYC Liveness Engine',
    layer: 'Infrastructure',
    eventType: 'ANTI_SPOOF_CHALLENGE_PASSED',
    hashDigest: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    severity: 'low',
    details: 'Principal facial 3D depth check returned 99.6% organic liveness (LOA-4 NIST SP 800-63-3).',
  },
  {
    id: 'aud-9904',
    timestamp: '2026-09-01 19:12:00 UTC',
    actor: 'Automated Commission Integrity Sentry',
    layer: 'Regulatory',
    eventType: 'REVOCATION_CHECK_CLEARED',
    hashDigest: 'roll:58921-STATUS-GOOD-STANDING',
    severity: 'low',
    details: 'Bar standing and MCLE compliance validated with Integrated Bar Association API.',
  },
];

export const INITIAL_SEALED_PACKAGE: CryptographicSealPackage = {
  packageId: 'PKG-PAdES-B-LTA-2026-0902-1421',
  instrumentId: 'inst-001',
  instrumentTitle: 'Deed of Absolute Sale of Commercial Real Property',
  sha256DocumentHash: '7b80a2569e5d73b06385d852a420846e96dc6632ecb44e05739810d738f6bdf1',
  padesStandard: 'PAdES-B-LTA (Long Term Validation)',
  hsmTokenProvider: 'ENFI Hardware Security Module #04 (FIPS 140-2 Level 3)',
  hsmKeyFingerprint: '4A:7F:C2:90:11:BB:09:88:EA:31:89:FA:12:00:EE:CC',
  notarySignatureDigest: 'rsa-pss-4096:b49f81a70041d8e19c991bfe280145c3810a9c29801f948c21a4f78310',
  rfc3161TimestampAuthority: 'Supreme Court National Trust TSA Node #01',
  rfc3161Timestamp: '2026-09-02T10:14:22.891+00:00',
  x509Issuer: 'CN=Republic Notarial Root CA, OU=Judicial Public Key Infrastructure, O=Supreme Court, C=PH',
  x509Subject: 'CN=Atty. Helena Vance, SERIALNUMBER=Roll-58921, OU=Commissioned Electronic Notary, O=ENFI Trust Network',
  tamperEvidentChecksum: '0x8894F2B0192A48C9E71F32A9',
  wormVideoHash: 'sha256:d41d8cd98f00b204e9800998ecf8427e029410d94721ab8e6538c2ef4010992a',
  isValid: true,
};
