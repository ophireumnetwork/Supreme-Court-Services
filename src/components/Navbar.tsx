import { ShieldCheck, Server, Scale, BookOpen, FileCheck2, Cpu, Coins, Sparkles, RefreshCw } from 'lucide-react';

export type ActiveTab =
  | 'ecology'
  | 'lifecycle'
  | 'ron_chamber'
  | 'register_ebook'
  | 'verifier'
  | 'regulatory_hub'
  | 'clearinghouse';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onResetDemo: () => void;
  lastSequenceNumber: number;
}

export function Navbar({ activeTab, setActiveTab, onResetDemo, lastSequenceNumber }: NavbarProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      {/* Top Telemetry Sovereign Strip */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300 font-medium">HSM Core:</span> FIPS 140-2 Level 3 Active
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Scale className="h-3 w-3 text-amber-400" />
            <span className="text-slate-300 font-medium">Supreme Court Audit Ingress:</span> Synchronized
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-cyan-400" />
            <span className="text-slate-300 font-medium">RFC 3161 TSA:</span> Qualified Node #01
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 border border-slate-700">
            e-Book Doc #{lastSequenceNumber} (Series 2026)
          </span>
          <button
            onClick={onResetDemo}
            title="Reset system test data"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-900/30 border border-indigo-400/30">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-lg text-white font-serif">ENFI</span>
                <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full border border-blue-700/50 uppercase tracking-wider">
                  DPI Tier-1
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Electronic Notarial Facility Infrastructure</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('ecology')}
              className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'ecology'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              Ecology & Trust Network
            </button>

            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'lifecycle'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              E2E Notarial Lifecycle
            </button>

            <button
              onClick={() => setActiveTab('ron_chamber')}
              className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'ron_chamber'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Server className="h-3.5 w-3.5" />
              RON Live Chamber
            </button>

            <button
              onClick={() => setActiveTab('register_ebook')}
              className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'register_ebook'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              e-Notarial Register
            </button>

            <button
              onClick={() => setActiveTab('verifier')}
              className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'verifier'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              PAdES Verifier
            </button>

            <button
              onClick={() => setActiveTab('regulatory_hub')}
              className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'regulatory_hub'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              Judicial Sovereign
            </button>

            <button
              onClick={() => setActiveTab('clearinghouse')}
              className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'clearinghouse'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Coins className="h-3.5 w-3.5" />
              Flywheel Clearing
            </button>
          </nav>
        </div>

        {/* Mobile / Compact Tab Bar */}
        <div className="lg:hidden flex overflow-x-auto pb-2 pt-1 gap-1 text-xs no-scrollbar">
          {[
            { id: 'ecology', label: 'Ecology Trust' },
            { id: 'lifecycle', label: 'E2E Lifecycle' },
            { id: 'ron_chamber', label: 'RON Chamber' },
            { id: 'register_ebook', label: 'e-Register' },
            { id: 'verifier', label: 'PAdES Verifier' },
            { id: 'regulatory_hub', label: 'Supreme Court' },
            { id: 'clearinghouse', label: 'Clearinghouse' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`whitespace-nowrap px-2.5 py-1.5 rounded text-xs ${
                activeTab === tab.id ? 'bg-blue-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
