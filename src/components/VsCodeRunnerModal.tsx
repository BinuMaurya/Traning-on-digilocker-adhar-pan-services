import React from 'react';
import {
  Code,
  Download,
  Copy,
  Check,
  X,
  Play,
  Terminal,
  FolderOpen,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface VsCodeRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VsCodeRunnerModal: React.FC<VsCodeRunnerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  // Generates standalone standalone index.html code with vanilla JS, CSS, and interactive features
  const generateStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Sarathi – Your Digital Life Guide | College CEP</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; }
    h1, h2, h3, .font-heading { font-family: 'Outfit', sans-serif; }
    .header-grad { background: linear-gradient(135deg, #0d52b9 0%, #1a6ed8 50%, #2563eb 100%); }
    .dark-mode { background-color: #090d16; color: #f8fafc; }
    .dark-mode .bg-white { background-color: #131b2e !important; color: #f8fafc !important; }
    .dark-mode .text-slate-900 { color: #f8fafc !important; }
    .dark-mode .text-slate-600 { color: #94a3b8 !important; }
    .dark-mode .border-slate-200 { border-color: #1e293b !important; }
  </style>
</head>
<body class="min-h-screen text-slate-800">

  <!-- Blue Header -->
  <header class="header-grad text-white sticky top-0 z-40 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl shadow-inner">
          📖
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold tracking-tight">Digital Sarathi</h1>
          <p class="text-xs text-blue-100">Your Digital Life Guide • College CEP</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 text-xs font-semibold">
        <button onclick="toggleDarkMode()" class="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white">
          🌓 Toggle Dark
        </button>
        <span id="nav-badge" class="px-2.5 py-1 rounded-full bg-emerald-400 text-slate-900 font-bold">
          Progress: <span id="progress-text">0%</span>
        </span>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="text-center py-6">
      <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
        Community Engagement Project (CEP)
      </span>
      <h2 class="text-3xl sm:text-5xl font-extrabold mt-3 text-slate-900">
        Your guide to a <span class="text-blue-600 underline">digital India.</span>
      </h2>
      <p class="text-slate-600 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
        Training on DigiLocker, Aadhaar services, PAN card, online forms and cyber safety for students & citizens.
      </p>
    </div>

    <!-- Quick Greeting Card -->
    <div class="max-w-md mx-auto bg-white p-5 rounded-2xl shadow-md border border-slate-200 mb-8 text-center">
      <p class="text-lg font-bold text-slate-800">👋 Namaste, Digital Learner!</p>
      <p class="text-xs text-blue-600 font-semibold mt-0.5">Learn • Practice • Grow</p>
      <div class="w-full bg-slate-100 rounded-full h-3 mt-3 overflow-hidden">
        <div id="hero-progress-bar" class="bg-blue-600 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
      </div>
    </div>

    <!-- 6 Learning Cards Grid -->
    <h3 class="text-xl font-bold mb-4">Core Learning Modules</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <!-- 1. DigiLocker -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
        <div class="text-3xl mb-2">☁️</div>
        <h4 class="font-bold text-lg text-slate-900">1. DigiLocker Training</h4>
        <p class="text-xs text-slate-600 mt-1">Store, access and fetch legally valid marksheet, Driving License, & RC under IT Rule 9A.</p>
        <button onclick="openModal('digilocker')" class="mt-4 w-full py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700">
          Open Guide & Steps
        </button>
      </div>

      <!-- 2. Aadhaar -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
        <div class="text-3xl mb-2">🔍</div>
        <h4 class="font-bold text-lg text-slate-900">2. Aadhaar Services</h4>
        <p class="text-xs text-slate-600 mt-1">Address update, 8-digit PDF password format, 16-digit Virtual ID (VID), and biometric lock.</p>
        <button onclick="openModal('aadhaar')" class="mt-4 w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700">
          Open Guide & Steps
        </button>
      </div>

      <!-- 3. PAN -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
        <div class="text-3xl mb-2">💳</div>
        <h4 class="font-bold text-lg text-slate-900">3. PAN Card Guide</h4>
        <p class="text-xs text-slate-600 mt-1">Instant free e-PAN in 10 minutes via Aadhaar e-KYC, Aadhaar linking, corrections & tracking.</p>
        <button onclick="openModal('pan')" class="mt-4 w-full py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700">
          Open Guide & Steps
        </button>
      </div>

      <!-- 4. Forms -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
        <div class="text-3xl mb-2">📄</div>
        <h4 class="font-bold text-lg text-slate-900">4. Online Form Basics</h4>
        <p class="text-xs text-slate-600 mt-1">Verifying .gov.in domains, image compression below 50KB, draft preview, and fee receipt archiving.</p>
        <button onclick="openModal('forms')" class="mt-4 w-full py-2 bg-cyan-600 text-white font-bold text-xs rounded-xl hover:bg-cyan-700">
          Open Guide & Steps
        </button>
      </div>

      <!-- 5. Cyber Safety -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
        <div class="text-3xl mb-2">🛡️</div>
        <h4 class="font-bold text-lg text-slate-900">5. Cyber Safety</h4>
        <p class="text-xs text-slate-600 mt-1">Golden Rule: Never enter UPI PIN to receive money. Spotting fake APKs & calling Helpline 1930.</p>
        <button onclick="openModal('safety')" class="mt-4 w-full py-2 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700">
          Open Guide & Steps
        </button>
      </div>

      <!-- 6. Mobile Basics -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
        <div class="text-3xl mb-2">📱</div>
        <h4 class="font-bold text-lg text-slate-900">6. Mobile & Internet</h4>
        <p class="text-xs text-slate-600 mt-1">App permissions manager, official UMANG portal app, and safe Wi-Fi surfing rules.</p>
        <button onclick="openModal('mobile')" class="mt-4 w-full py-2 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700">
          Open Guide & Steps
        </button>
      </div>
    </div>

    <!-- Interactive Progress Checklist -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-12">
      <h3 class="text-xl font-bold mb-2">Practical Learning Checklist</h3>
      <p class="text-xs text-slate-500 mb-4">Click tasks to tick them off and automatically update your progress bar:</p>
      <div class="space-y-2 text-xs sm:text-sm">
        <label class="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border cursor-pointer hover:bg-blue-50">
          <input type="checkbox" onchange="updateProgress()" class="w-4 h-4 text-blue-600 task-check">
          <span>Create DigiLocker account and fetch Class 10th marksheet or DL</span>
        </label>
        <label class="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border cursor-pointer hover:bg-blue-50">
          <input type="checkbox" onchange="updateProgress()" class="w-4 h-4 text-blue-600 task-check">
          <span>Master e-Aadhaar PDF password (First 4 letters CAPITAL + Birth Year)</span>
        </label>
        <label class="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border cursor-pointer hover:bg-blue-50">
          <input type="checkbox" onchange="updateProgress()" class="w-4 h-4 text-blue-600 task-check">
          <span>Check PAN-Aadhaar linkage status on incometax.gov.in</span>
        </label>
        <label class="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border cursor-pointer hover:bg-blue-50">
          <input type="checkbox" onchange="updateProgress()" class="w-4 h-4 text-blue-600 task-check">
          <span>Memorize Cybercrime Helpline (1930) and never enter UPI PIN to receive funds</span>
        </label>
      </div>
    </div>

    <!-- About & Team Section -->
    <div class="bg-blue-50 p-6 rounded-2xl border border-blue-200 mb-12 text-center">
      <h3 class="text-lg font-bold text-blue-900">College Community Engagement Project (CEP)</h3>
      <p class="text-xs text-slate-600 mt-1 max-w-xl mx-auto">
        Conducted by Department of Computer Applications student fellows: Rahul Sharma, Anjali Kushwaha, Priya Patel, and Amit Verma.
      </p>
    </div>
  </main>

  <!-- Detail Modal -->
  <div id="guide-modal" class="fixed inset-0 bg-black/70 backdrop-blur-xs hidden items-center justify-center p-4 z-50">
    <div class="bg-white max-w-2xl w-full rounded-2xl p-6 shadow-2xl relative">
      <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold">✕</button>
      <h3 id="modal-title" class="text-xl font-bold text-blue-800"></h3>
      <div id="modal-content" class="mt-4 text-xs sm:text-sm text-slate-700 space-y-3 max-h-[70vh] overflow-y-auto"></div>
      <button onclick="closeModal()" class="mt-6 w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs">
        Back to Modules
      </button>
    </div>
  </div>

  <footer class="bg-slate-900 text-slate-400 py-6 text-center text-xs">
    <p>© 2026 Digital Sarathi CEP Project • Educational Training Portal</p>
    <p class="mt-1 text-slate-500">Disclaimer: Student educational initiative. Not an official government website.</p>
  </footer>

  <script>
    const guideData = {
      digilocker: {
        title: "DigiLocker Step-by-Step Training",
        html: "<p><strong>Step 1: Sign Up</strong><br>Visit digilocker.gov.in. Register with mobile and Aadhaar. Set 6-digit security PIN.</p><p><strong>Step 2: Fetch Documents</strong><br>Search CBSE, State Board or MoRTH. Enter roll/DL number and consent.</p><p><strong>Step 3: Legal Validity</strong><br>Under IT Rule 9A, issued documents carry legal parity with physical originals.</p>"
      },
      aadhaar: {
        title: "Aadhaar Services Guide",
        html: "<p><strong>1. Address Update</strong><br>Login to myaadhaar.uidai.gov.in using Aadhaar OTP. Upload electricity bill/bank passbook.</p><p><strong>2. e-Aadhaar PDF Password</strong><br>First 4 letters of name in CAPITAL + 4 digit birth year (e.g. RAHU1998).</p><p><strong>3. Masked Aadhaar & VID</strong><br>Hides first 8 digits (XXXX-XXXX-1234) for privacy during hotel check-ins.</p>"
      },
      pan: {
        title: "PAN Card Services Guide",
        html: "<p><strong>1. Instant e-PAN</strong><br>Apply paperless on incometax.gov.in. Zero fee, issued in 10 minutes via Aadhaar e-KYC.</p><p><strong>2. PAN-Aadhaar Linking</strong><br>Verify status under Quick Links. Inoperative PAN attracts higher tax deductions.</p>"
      },
      forms: {
        title: "Online Form Filling Basics",
        html: "<p><strong>1. Domain Check:</strong> Always verify URL ends with .gov.in or .nic.in.</p><p><strong>2. Document Size:</strong> Resize photos between 20-50KB and certificates under 200KB before uploading.</p>"
      },
      safety: {
        title: "Cyber Safety & Scam Protection",
        html: "<p><strong>Golden Rule:</strong> UPI PIN is ONLY for debiting money. You never enter PIN to receive money.</p><p><strong>National Helpline:</strong> Call 1930 immediately within the 'Golden Hour' if fraud occurs.</p>"
      },
      mobile: {
        title: "Mobile & Internet Basics",
        html: "<p><strong>Permissions:</strong> Revoke SMS and Contact access from flashlight/calculator apps.</p><p><strong>UMANG App:</strong> Download the single verified MeitY platform for all government services.</p>"
      }
    };

    function openModal(key) {
      document.getElementById('modal-title').innerText = guideData[key].title;
      document.getElementById('modal-content').innerHTML = guideData[key].html;
      const modal = document.getElementById('guide-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeModal() {
      const modal = document.getElementById('guide-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function updateProgress() {
      const checks = document.querySelectorAll('.task-check');
      let done = 0;
      checks.forEach(c => { if (c.checked) done++; });
      const pct = Math.round((done / checks.length) * 100);
      document.getElementById('progress-text').innerText = pct + '%';
      document.getElementById('hero-progress-bar').style.width = pct + '%';
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
    }
  </script>
</body>
</html>`;
  };

  const handleDownloadStandalone = () => {
    const code = generateStandaloneHtml();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Digital_Sarathi_index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const code = generateStandaloneHtml();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="vscode-guide-modal"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        className="w-full max-w-3xl rounded-3xl overflow-hidden border shadow-2xl flex flex-col max-h-[92vh]"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)'
        }}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading">
                Run in VS Code & Single HTML File Guide
              </h3>
              <p className="text-xs text-slate-400">
                Step-by-step instructions for running locally or submitting for college evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {/* 1-Click Standalone Exporter Box */}
          <div className="rounded-2xl p-5 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-emerald-600/10 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                Instant College Submission File
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                Single <code className="font-mono bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 rounded">index.html</code> Standalone File
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Contains complete responsive HTML, Tailwind CSS styling, and working JS in one file. Double-click to open in any browser!
              </p>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleCopyCode}
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownloadStandalone}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download .html</span>
              </button>
            </div>
          </div>

          {/* Method A: Live Server in VS Code (Simplest) */}
          <div className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
              <Play className="w-4 h-4 text-emerald-600" />
              <span>Method 1: Open Single File in VS Code (Zero Installation)</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 pl-1">
              <li>Click the <strong>Download .html</strong> button above to save <code>Digital_Sarathi_index.html</code> on your computer.</li>
              <li>Open <strong>VS Code</strong> and choose <em>File → Open File...</em> (or drag the file into VS Code).</li>
              <li>Install the free extension <strong>"Live Server"</strong> (by Ritwick Dey) from the VS Code Extensions tab (<kbd className="bg-slate-200 dark:bg-slate-700 px-1 rounded">Ctrl+Shift+X</kbd>).</li>
              <li>Right-click anywhere inside the file in VS Code and select <strong>"Open with Live Server"</strong>.</li>
              <li>Your browser will immediately open at <code>http://127.0.0.1:5500/Digital_Sarathi_index.html</code> with all interactive features active!</li>
            </ol>
          </div>

          {/* Method B: Full Node.js / Vite Project */}
          <div className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Method 2: Full React + Vite Development Mode</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              If you exported the full project folder:
            </p>
            <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-xs space-y-1 overflow-x-auto">
              <p className="text-slate-500"># 1. Open terminal inside the project directory</p>
              <p><span className="text-emerald-400">$</span> npm install</p>
              <p className="text-slate-500"># 2. Start the fast local Vite development server</p>
              <p><span className="text-emerald-400">$</span> npm run dev</p>
            </div>
            <p className="text-xs text-slate-500">
              Open your browser at <code>http://localhost:3000</code> to view the full TypeScript app.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>
  );
};
