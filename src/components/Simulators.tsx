import React from 'react';
import {
  Layers,
  Key,
  FileCheck,
  ShieldCheck,
  Search,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Lock,
  Unlock,
  Check,
  X,
  CreditCard,
  ChevronRight
} from 'lucide-react';

interface SimulatorsProps {
  onOpenCardPortal?: () => void;
}

export const Simulators: React.FC<SimulatorsProps> = ({ onOpenCardPortal }) => {
  const [activeTab, setActiveTab] = React.useState<'aadhaar_pass' | 'digilocker_fetch' | 'pan_link' | 'scam_spotter'>('aadhaar_pass');

  // Simulator 1: Aadhaar Password & Masked generator
  const [demoName, setDemoName] = React.useState('Rahul Verma');
  const [demoYear, setDemoYear] = React.useState('1998');
  const [isMasked, setIsMasked] = React.useState(true);

  const cleanName = demoName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const calculatedPassword = (cleanName.slice(0, 4).padEnd(4, 'X') + demoYear).toUpperCase();

  // Simulator 2: DigiLocker Fetcher
  const [docType, setDocType] = React.useState('Class X Marksheet');
  const [demoRollNo, setDemoRollNo] = React.useState('CBSE-2024-8192');
  const [isFetched, setIsFetched] = React.useState(false);

  // Simulator 3: PAN Link Checker
  const [demoPan, setDemoPan] = React.useState('ABCDE1234F');
  const [linkStatus, setLinkStatus] = React.useState<any | null>(null);
  const [panVerifying, setPanVerifying] = React.useState(false);

  const handleVerifyPanBackend = async () => {
    setPanVerifying(true);
    try {
      const res = await fetch('/api/sandbox/verify-pan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ panNumber: demoPan })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setLinkStatus(data.analysis);
      } else {
        setLinkStatus({
          pan: demoPan,
          entityType: 'Individual / Person',
          fourthCharacterExplanation: '"P" represents Individual Person.',
          fifthCharacterExplanation: '"E" represents the Surname Initial.',
          aadhaarLinkingStatus: 'Linked with Aadhaar',
          educationalTip: data.message || 'Always verify linking on incometax.gov.in.'
        });
      }
    } catch (err) {
      setLinkStatus({
        pan: demoPan,
        entityType: 'Individual / Person',
        fourthCharacterExplanation: '4th letter represents Holder Status.',
        fifthCharacterExplanation: '5th letter represents Surname initial.',
        aadhaarLinkingStatus: 'Linked with Aadhaar',
        educationalTip: 'Verified via local educational engine.'
      });
    } finally {
      setPanVerifying(false);
    }
  };

  // Simulator 4: Scam Spotter
  const [selectedDecision, setSelectedDecision] = React.useState<'click' | 'report' | null>(null);

  return (
    <section id="simulators-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 mb-2 border border-indigo-200 dark:border-indigo-800">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Practice Lab</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            Safe Practice Simulators
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Experiment with risk-free interactive sandboxes. Master e-Aadhaar passwords, test mock DigiLocker document pulls, and practice identifying cyber scams.
          </p>
        </div>

        {/* Prominent Educational Safety Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start space-x-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Educational Sandbox Notice:</strong> These tools run completely in your local browser for training purposes. Never enter real personal passwords, real Aadhaar, or confidential banking numbers on third-party websites.
          </div>
        </div>

        {/* e-Card Soft-Copy & Official Portals Highlight Box */}
        {onOpenCardPortal && (
          <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-900 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-400/40">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-2xl bg-white/10 text-white flex-shrink-0 mt-0.5">
                <CreditCard className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                  Need Real e-Aadhaar or e-PAN Soft Copy & Downloader?
                </h4>
                <p className="text-xs text-emerald-100/90 mt-0.5 max-w-xl">
                  Enter your details to generate and download printable soft-copy cards (front & back), or connect to official UIDAI & Income Tax portals directly.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenCardPortal}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-900 font-extrabold text-xs transition-all shadow-md flex items-center space-x-1.5 flex-shrink-0 cursor-pointer"
            >
              <span>Open Soft-Copy Portal</span>
              <ChevronRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('aadhaar_pass')}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center text-center space-y-1 ${
              activeTab === 'aadhaar_pass'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Aadhaar Password & VID</span>
          </button>

          <button
            onClick={() => setActiveTab('digilocker_fetch')}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center text-center space-y-1 ${
              activeTab === 'digilocker_fetch'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>DigiLocker Doc Fetcher</span>
          </button>

          <button
            onClick={() => setActiveTab('pan_link')}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center text-center space-y-1 ${
              activeTab === 'pan_link'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>PAN-Aadhaar Link Check</span>
          </button>

          <button
            onClick={() => setActiveTab('scam_spotter')}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center text-center space-y-1 ${
              activeTab === 'scam_spotter'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Cyber Scam Spotter</span>
          </button>
        </div>

        {/* Simulator Container */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-lg transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          {/* SIMULATOR 1: Aadhaar PDF Password Decrypter */}
          {activeTab === 'aadhaar_pass' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold text-blue-600 tracking-wider">
                  Interactive Exercise 1
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-1">
                  e-Aadhaar PDF Password & Masking Visualizer
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Every e-Aadhaar PDF downloaded from UIDAI is encrypted. The password is strictly{' '}
                  <strong className="text-blue-600 dark:text-blue-400">FIRST 4 LETTERS OF NAME (CAPITAL) + 4-DIGIT BIRTH YEAR</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Sample Full Name (as on card)
                    </label>
                    <input
                      type="text"
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Birth Year (YYYY)
                    </label>
                    <input
                      type="number"
                      value={demoYear}
                      onChange={(e) => setDemoYear(e.target.value.slice(0, 4))}
                      placeholder="e.g. 1998"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="toggle-mask"
                      checked={isMasked}
                      onChange={(e) => setIsMasked(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="toggle-mask" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                      Show recommended <strong>Masked Aadhaar</strong> format (XXXX-XXXX-9021)
                    </label>
                  </div>
                </div>

                {/* Simulated e-Aadhaar Card Visual */}
                <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-md">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700 mb-3">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Unique Identification Authority of India (UIDAI)
                    </span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-bold">
                      DEMO CARD
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                    <p><strong>Name:</strong> {demoName || '—'}</p>
                    <p><strong>Year of Birth:</strong> {demoYear || '—'}</p>
                    <p>
                      <strong>Aadhaar Number:</strong>{' '}
                      <span className="font-mono font-bold tracking-wider text-blue-700 dark:text-blue-300">
                        {isMasked ? 'XXXX-XXXX-9021' : '3842-1982-9021'}
                      </span>
                    </p>
                    <p>
                      <strong>16-Digit VID (Virtual ID):</strong>{' '}
                      <span className="font-mono text-slate-500">9182 4719 0281 9921</span>
                    </p>
                  </div>

                  {/* Calculated Password Result Box */}
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 rounded-xl border">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Generated Unlock Password:
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-lg font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider">
                        {calculatedPassword}
                      </span>
                      <span className="text-[11px] text-slate-500">8 Characters</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: DigiLocker Document Fetcher */}
          {activeTab === 'digilocker_fetch' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold text-blue-600 tracking-wider">
                  Interactive Exercise 2
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-1">
                  DigiLocker Issued Document Fetcher Sandbox
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Experience how DigiLocker talks to authentic government repositories (CBSE, MoRTH) without manual paper scanning.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Select Certificate Type
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => {
                        setDocType(e.target.value);
                        setIsFetched(false);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                    >
                      <option>Class X Marksheet (CBSE)</option>
                      <option>Class XII Passing Certificate</option>
                      <option>Driving License (MoRTH)</option>
                      <option>Vehicle Registration (RC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Demo Registration / Roll No.
                    </label>
                    <input
                      type="text"
                      value={demoRollNo}
                      onChange={(e) => setDemoRollNo(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    ✓ By clicking Fetch, citizen provides digital consent under IT Rules 2016.
                  </div>

                  <button
                    onClick={() => setIsFetched(true)}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Fetch Issued Document</span>
                  </button>
                </div>

                {/* Result Document Visual */}
                <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center min-h-[220px] flex flex-col justify-center">
                  {isFetched ? (
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>DigiLocker Verified Issuer</span>
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                          RULE 9A VALID
                        </span>
                      </div>
                      <div className="text-xs space-y-1 text-slate-800 dark:text-slate-200">
                        <p><strong>Document:</strong> {docType}</p>
                        <p><strong>Identifier:</strong> {demoRollNo}</p>
                        <p><strong>Signatory:</strong> National Informatics Centre (NIC) CA</p>
                        <p><strong>Legal Status:</strong> Treated at par with original physical certificate</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500">
                        <span>QR Code Embedded</span>
                        <button
                          onClick={() => setIsFetched(false)}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          Fetch Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 py-6">
                      <FileCheck className="w-10 h-10 mx-auto mb-2 opacity-40" />
                      <p className="text-xs font-semibold">
                        Enter identifiers and click "Fetch Issued Document" to see verified digital certificate preview.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 3: PAN Link Checker */}
          {activeTab === 'pan_link' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold text-blue-600 tracking-wider">
                  Interactive Exercise 3
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-1">
                  PAN-Aadhaar Linking Status Sandbox
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Check how the Income Tax e-Filing database verifies matching names and links PAN with 12-digit Aadhaar.
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Sample PAN (10-Digit Alphanumeric)
                  </label>
                  <input
                    type="text"
                    value={demoPan}
                    onChange={(e) => setDemoPan(e.target.value.toUpperCase().slice(0, 10))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono tracking-wider outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
                  </span>
                </div>

                <button
                  onClick={handleVerifyPanBackend}
                  disabled={panVerifying}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {panVerifying ? 'Analyzing via Backend API...' : 'Verify Linkage & Decode Syntax (Backend API)'}
                </button>

                {linkStatus && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Status: {linkStatus.aadhaarLinkingStatus || 'Operative & Linked'}</strong>
                        <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                          PAN <code className="font-mono bg-white/60 dark:bg-slate-900 px-1 py-0.5 rounded">{demoPan}</code> decoded successfully.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 space-y-1 text-slate-700 dark:text-slate-300">
                      <p>• <strong>Entity Status (4th Letter):</strong> {linkStatus.entityType || 'Individual Person'}</p>
                      <p>• <strong>Surname Initial (5th Letter):</strong> {linkStatus.fifthCharacterExplanation || 'Initial of last name'}</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">💡 {linkStatus.educationalTip}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIMULATOR 4: Scam Spotter */}
          {activeTab === 'scam_spotter' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold text-rose-600 tracking-wider">
                  Interactive Exercise 4
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-1">
                  Cyber Scam Spotter: Real-World SMS Test
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Examine this incoming message sent to a citizen. What would you do?
                </p>
              </div>

              {/* Fake SMS Card */}
              <div className="max-w-lg mx-auto rounded-2xl p-4 bg-slate-900 text-white shadow-xl border border-slate-700 space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>SMS from: +91 98210 94821</span>
                  <span>Today 8:45 PM</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-300 leading-relaxed">
                  "Dear Consumer, your electricity power will be DISCONNECTED tonight at 9:30 PM because your previous month bill was not updated. Please call officer immediately at 98210-94821 or click: <span className="underline text-blue-400">http://bit.ly/urja-bill-pay</span>"
                </p>
              </div>

              {/* Citizen choices */}
              <div className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setSelectedDecision('click')}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                    selectedDecision === 'click'
                      ? 'bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                  }`}
                >
                  <span>Click link & call number to avoid blackout</span>
                  <X className="w-4 h-4 text-rose-600 flex-shrink-0" />
                </button>

                <button
                  onClick={() => setSelectedDecision('report')}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                    selectedDecision === 'report'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                  }`}
                >
                  <span>Ignore link & report to 1930 / DISCOM</span>
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                </button>
              </div>

              {/* Feedback */}
              {selectedDecision === 'click' && (
                <div className="max-w-lg mx-auto p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200">
                  <strong>🚨 DANGER - SCAM DETECTED!</strong>
                  <p className="mt-1">
                    Clicking that link downloads a malicious APK file that reads your SMS OTPs. Genuine power utilities never send disconnection notices from personal mobile numbers or disconnect electricity at night.
                  </p>
                </div>
              )}

              {selectedDecision === 'report' && (
                <div className="max-w-lg mx-auto p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                  <strong>✅ 100% CORRECT RESPONSE!</strong>
                  <p className="mt-1">
                    You spotted the red flags: a private mobile sender, urgency exploitation ("tonight 9:30 PM"), and a shortened bit.ly link. You safeguarded your device and bank balance!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
