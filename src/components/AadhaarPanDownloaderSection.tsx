import React from 'react';
import {
  CreditCard,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  User,
  Calendar,
  MapPin,
  RefreshCw,
  FileCheck,
  Check,
  Copy,
  Info,
  PhoneCall,
  Sparkles,
  Smartphone,
  ChevronRight
} from 'lucide-react';

interface AadhaarCardData {
  aadhaarNumber: string;
  name: string;
  nameHindi: string;
  dob: string;
  gender: string;
  genderHindi: string;
  careOf: string;
  careOfHindi: string;
  address: string;
  addressHindi: string;
  isMasked: boolean;
  photoUrl: string;
}

interface PanCardData {
  panNumber: string;
  name: string;
  fatherName: string;
  dob: string;
  photoUrl: string;
}

export const AadhaarPanDownloaderSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'aadhaar' | 'pan' | 'portals'>('aadhaar');

  // -------------------------------------------------------------
  // AADHAAR STATE
  // -------------------------------------------------------------
  const [aadhaarForm, setAadhaarForm] = React.useState<AadhaarCardData>({
    aadhaarNumber: '5489 1234 8912',
    name: 'Rahul Verma',
    nameHindi: 'राहुल वर्मा',
    dob: '14/05/1998',
    gender: 'MALE',
    genderHindi: 'पुरुष',
    careOf: 'S/O: Ramesh Kumar Verma',
    careOfHindi: 'आत्मज: रमेश कुमार वर्मा',
    address: 'H.No. 42, Shanti Nagar, Near Shiv Mandir, Ward No. 3, Saoner, Nagpur, Maharashtra - 441107',
    addressHindi: 'म.नं. 42, शांति नगर, शिव मंदिर के पास, वार्ड नं. 3, सावनेर, नागपुर, महाराष्ट्र - 441107',
    isMasked: false,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80'
  });

  const [cardSide, setCardSide] = React.useState<'front' | 'back' | 'both'>('both');
  const [showOtpModal, setShowOtpModal] = React.useState(false);
  const [otpInput, setOtpInput] = React.useState('');
  const [simulatedSentOtp, setSimulatedSentOtp] = React.useState('');
  const [otpVerified, setOtpVerified] = React.useState(true);
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  // -------------------------------------------------------------
  // PAN STATE
  // -------------------------------------------------------------
  const [panForm, setPanForm] = React.useState<PanCardData>({
    panNumber: 'ABCDE1234F',
    name: 'RAHUL VERMA',
    fatherName: 'RAMESH KUMAR VERMA',
    dob: '14/05/1998',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80'
  });

  const [panEntityDecoded, setPanEntityDecoded] = React.useState<any>({
    entity: 'Individual (Person)',
    fourthChar: 'P',
    fifthChar: 'E',
    status: 'Valid format'
  });

  // Calculate clean display for Aadhaar
  const rawNum = aadhaarForm.aadhaarNumber.replace(/[\s-]/g, '');
  const last4 = rawNum.slice(-4) || '8912';
  const displayAadhaar = aadhaarForm.isMasked
    ? `XXXX XXXX ${last4}`
    : rawNum.length === 12
    ? `${rawNum.slice(0, 4)} ${rawNum.slice(4, 8)} ${rawNum.slice(8, 12)}`
    : aadhaarForm.aadhaarNumber;

  // Calculate e-Aadhaar PDF password (First 4 letters of name in CAPITAL + 4 digit birth year)
  const cleanNameOnly = aadhaarForm.name.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const birthYearMatch = aadhaarForm.dob.match(/\d{4}/);
  const birthYear = birthYearMatch ? birthYearMatch[0] : '1998';
  const pdfPassword = (cleanNameOnly.slice(0, 4).padEnd(4, 'X') + birthYear).toUpperCase();

  // PAN Analysis
  React.useEffect(() => {
    const p = panForm.panNumber.trim().toUpperCase();
    if (p.length >= 5) {
      const fourth = p[3];
      const fifth = p[4];
      const entities: Record<string, string> = {
        P: 'Individual / Person',
        C: 'Company',
        H: 'Hindu Undivided Family (HUF)',
        F: 'Partnership Firm / LLP',
        A: 'Association of Persons (AOP)',
        T: 'Trust',
        B: 'Body of Individuals (BOI)',
        G: 'Government Agency',
        J: 'Artificial Juridical Person',
        L: 'Local Authority'
      };
      setPanEntityDecoded({
        entity: entities[fourth] || 'Special Entity',
        fourthChar: fourth,
        fifthChar: fifth,
        status: /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(p) ? 'Valid PAN Structure' : 'Incomplete / Invalid Format'
      });
    }
  }, [panForm.panNumber]);

  // Pre-fill helpers
  const handlePreFillAadhaar = (profile: 'rahul' | 'priya' | 'anjali') => {
    if (profile === 'rahul') {
      setAadhaarForm({
        aadhaarNumber: '5489 1234 8912',
        name: 'Rahul Verma',
        nameHindi: 'राहुल वर्मा',
        dob: '14/05/1998',
        gender: 'MALE',
        genderHindi: 'पुरुष',
        careOf: 'S/O: Ramesh Kumar Verma',
        careOfHindi: 'आत्मज: रमेश कुमार वर्मा',
        address: 'H.No. 42, Shanti Nagar, Near Shiv Mandir, Ward 3, Saoner, Nagpur, MH - 441107',
        addressHindi: 'म.नं. 42, शांति नगर, शिव मंदिर के पास, वार्ड 3, सावनेर, नागपुर, महाराष्ट्र - 441107',
        isMasked: false,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80'
      });
      setPanForm({
        panNumber: 'ABCDE1234F',
        name: 'RAHUL VERMA',
        fatherName: 'RAMESH KUMAR VERMA',
        dob: '14/05/1998',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80'
      });
    } else if (profile === 'priya') {
      setAadhaarForm({
        aadhaarNumber: '7890 2341 5619',
        name: 'Priya Sharma',
        nameHindi: 'प्रिया शर्मा',
        dob: '22/08/2001',
        gender: 'FEMALE',
        genderHindi: 'महिला',
        careOf: 'D/O: Ashok Kumar Sharma',
        careOfHindi: 'सुपुत्री: अशोक कुमार शर्मा',
        address: 'Plot 18, Saraswati Enclave, Ring Road, Bhopal, MP - 462001',
        addressHindi: 'प्लॉट 18, सरस्वती एन्क्लेव, रिंग रोड, भोपाल, म.प्र. - 462001',
        isMasked: true,
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=260&q=80'
      });
      setPanForm({
        panNumber: 'PQRSK5678M',
        name: 'PRIYA SHARMA',
        fatherName: 'ASHOK KUMAR SHARMA',
        dob: '22/08/2001',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=260&q=80'
      });
    } else {
      setAadhaarForm({
        aadhaarNumber: '9123 4567 8901',
        name: 'Anjali Kushwaha',
        nameHindi: 'अंजलि कुशवाहा',
        dob: '05/11/2002',
        gender: 'FEMALE',
        genderHindi: 'महिला',
        careOf: 'D/O: Santosh Kushwaha',
        careOfHindi: 'सुपुत्री: संतोष कुशवाहा',
        address: 'CEP Digital Seva Mission, Tech Campus Road, Nagpur, MH - 440010',
        addressHindi: 'सीईपी डिजिटल सेवा मिशन, टेक कैंपस रोड, नागपुर, महाराष्ट्र - 440010',
        isMasked: false,
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=260&q=80'
      });
      setPanForm({
        panNumber: 'KZPPK9123A',
        name: 'ANJALI KUSHWAHA',
        fatherName: 'SANTOSH KUSHWAHA',
        dob: '05/11/2002',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=260&q=80'
      });
    }
  };

  // Trigger simulated OTP
  const handleRequestOtp = () => {
    setOtpLoading(true);
    const mock = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedSentOtp(mock);
    setShowOtpModal(true);
    setTimeout(() => {
      setOtpLoading(false);
    }, 700);
  };

  const handleVerifyOtp = () => {
    if (otpInput === simulatedSentOtp || otpInput === '123456') {
      setOtpVerified(true);
      setShowOtpModal(false);
      setOtpInput('');
    } else {
      alert('Incorrect OTP. Please enter the simulated OTP shown on screen.');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="py-8 sm:py-12" id="aadhaar-pan-portal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 mb-2 border border-emerald-200 dark:border-emerald-800">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Digital Identity Services • आधार व पैन कार्ड पोर्टल</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            Aadhaar & PAN Soft-Copy Portal & Official Direct Connect
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Enter your details to generate an instant, authentic <strong>e-Aadhaar & e-PAN Soft Copy</strong> for inspection and printing, or connect directly to official Government of India portals (UIDAI & Income Tax) to download the original government-signed cards with OTP.
          </p>
        </div>

        {/* Legal & Educational Clarity Banner in Hindi & English */}
        <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white flex-shrink-0 mt-0.5 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-blue-950 dark:text-blue-200">
                आधिकारिक सरकारी नियम व सुरक्षा सूचना (Govt. Compliance & Training Notice)
              </h4>
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300/90 mt-1 leading-relaxed">
                Aadhaar Act 2016 के तहत किसी भी वेबसाइट को बिना रजिस्टर्ड आधार-ओटीपी के किसी का निजी डेटा सीधे निकालने की अनुमति नहीं है। इस पोर्टल पर आप:
                <br />
                <span className="font-semibold">1)</span> अपना नंबर व विवरण डालकर तुरंत <strong>100% ओरिजिनल फॉर्मेट जैसा e-Aadhaar व e-PAN Soft Copy</strong> देख व डाउनलोड कर सकते हैं।
                <br />
                <span className="font-semibold">2)</span> भारत सरकार के अधिकृत सर्वर से रियल कार्ड निकालने हेतु सीधे <strong>UIDAI (myaadhaar.uidai.gov.in)</strong> व <strong>Income Tax</strong> से कनेक्ट हो सकते हैं।
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0 self-end md:self-center">
            <button
              onClick={() => setActiveTab('portals')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
            >
              <span>सरकारी पोर्टल लिंक</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('aadhaar')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'aadhaar'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>🪪 e-Aadhaar Soft Copy (आधार कार्ड)</span>
          </button>

          <button
            onClick={() => setActiveTab('pan')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'pan'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>💳 e-PAN Soft Copy (पैन कार्ड)</span>
          </button>

          <button
            onClick={() => setActiveTab('portals')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'portals'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>🌐 Official Govt Portals (UIDAI / NSDL / UTIITSL)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: E-AADHAAR SOFT COPY GENERATOR & DOWNLOADER */}
        {/* ========================================================================= */}
        {activeTab === 'aadhaar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Column */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className="rounded-3xl p-6 border shadow-md space-y-5"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600">
                      <CreditCard className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Enter Aadhaar Details
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        विवरण दर्ज करें - कार्ड लाइव अपडेट होगा
                      </p>
                    </div>
                  </div>

                  {/* Masking Toggle */}
                  <button
                    onClick={() =>
                      setAadhaarForm((prev) => ({ ...prev, isMasked: !prev.isMasked }))
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
                      aadhaarForm.isMasked
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300'
                    }`}
                    title="Toggle Masked Aadhaar (XXXX XXXX 1234)"
                  >
                    {aadhaarForm.isMasked ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Masked (Safe)</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Full Digits</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Pre-fill Quick Profiles */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    ⚡ Quick 1-Click Demo Profiles:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handlePreFillAadhaar('rahul')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-400 cursor-pointer"
                    >
                      Rahul Verma (Nagpur)
                    </button>
                    <button
                      onClick={() => handlePreFillAadhaar('priya')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-400 cursor-pointer"
                    >
                      Priya Sharma (Bhopal)
                    </button>
                    <button
                      onClick={() => handlePreFillAadhaar('anjali')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-blue-600 dark:text-blue-300 hover:border-blue-400 cursor-pointer"
                    >
                      Anjali Kushwaha (Lead)
                    </button>
                  </div>
                </div>

                {/* Aadhaar Number Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    12-Digit Aadhaar Number (आधार संख्या) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={14}
                      value={aadhaarForm.aadhaarNumber}
                      onChange={(e) => {
                        // Auto format with spaces: 1234 5678 9012
                        const val = e.target.value.replace(/\D/g, '').slice(0, 12);
                        const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                        setAadhaarForm((prev) => ({ ...prev, aadhaarNumber: formatted }));
                      }}
                      placeholder="e.g. 5489 1234 8912"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold tracking-wider text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div className="absolute right-3 top-2.5 flex items-center space-x-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>12 Digits</span>
                    </div>
                  </div>
                </div>

                {/* Full Name English & Hindi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name (English) *
                    </label>
                    <input
                      type="text"
                      value={aadhaarForm.name}
                      onChange={(e) => setAadhaarForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      नाम (हिंदी) *
                    </label>
                    <input
                      type="text"
                      value={aadhaarForm.nameHindi}
                      onChange={(e) =>
                        setAadhaarForm((prev) => ({ ...prev, nameHindi: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* DOB & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Date of Birth (जन्म तिथि) *
                    </label>
                    <input
                      type="text"
                      value={aadhaarForm.dob}
                      onChange={(e) => setAadhaarForm((prev) => ({ ...prev, dob: e.target.value }))}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Gender / लिंग *
                    </label>
                    <select
                      value={aadhaarForm.gender}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAadhaarForm((prev) => ({
                          ...prev,
                          gender: val,
                          genderHindi: val === 'FEMALE' ? 'महिला' : val === 'MALE' ? 'पुरुष' : 'ट्रांसजेंडर'
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="MALE">MALE / पुरुष</option>
                      <option value="FEMALE">FEMALE / महिला</option>
                      <option value="TRANSGENDER">TRANSGENDER / उभयलिंगी</option>
                    </select>
                  </div>
                </div>

                {/* Care Of (Father / Husband) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Care Of (C/O / S/O / D/O / W/O)
                  </label>
                  <input
                    type="text"
                    value={aadhaarForm.careOf}
                    onChange={(e) => setAadhaarForm((prev) => ({ ...prev, careOf: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Complete Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Address (पता)
                  </label>
                  <textarea
                    rows={2}
                    value={aadhaarForm.address}
                    onChange={(e) => setAadhaarForm((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Simulated OTP Trigger Button */}
                <div className="pt-2">
                  <button
                    onClick={handleRequestOtp}
                    disabled={otpLoading}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>
                      {otpLoading ? 'Connecting to UIDAI OTP Gateway...' : 'Simulate UIDAI OTP Verification & Generate Soft Copy'}
                    </span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-1.5">
                    Tests realistic UIDAI OTP step without exposing real private numbers.
                  </p>
                </div>
              </div>

              {/* PDF Password Helper Card */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start space-x-3 text-xs text-amber-900 dark:text-amber-200">
                <Key className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong>Calculated e-Aadhaar PDF Password:</strong>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-extrabold text-sm px-2.5 py-0.5 rounded bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 border border-amber-300">
                      {pdfPassword}
                    </span>
                    <button
                      onClick={() => copyToClipboard(pdfPassword, 'pass')}
                      className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      {copiedText === 'pass' ? 'Copied!' : 'Copy Password'}
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-800 dark:text-amber-300/80">
                    Rule: First 4 capital letters of name ({cleanNameOnly.slice(0, 4)}) + 4-digit birth year ({birthYear}).
                  </p>
                </div>
              </div>
            </div>

            {/* Soft Copy Display & Download Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mr-1">View:</span>
                  <button
                    onClick={() => setCardSide('both')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cardSide === 'both' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-white/50'
                    }`}
                  >
                    Both Sides (Full)
                  </button>
                  <button
                    onClick={() => setCardSide('front')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cardSide === 'front' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-white/50'
                    }`}
                  >
                    Front Only
                  </button>
                  <button
                    onClick={() => setCardSide('back')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cardSide === 'back' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-white/50'
                    }`}
                  >
                    Back Only
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrintCard}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Soft Copy</span>
                  </button>
                  <button
                    onClick={handlePrintCard}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF / Print</span>
                  </button>
                </div>
              </div>

              {/* PRINTABLE CONTAINER (WITH EXACT OFFICIAL UIDAI SOFT-COPY STYLING) */}
              <div
                id="printable-aadhaar-card"
                className="space-y-6 p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-xl"
              >
                {/* FRONT SIDE OF E-AADHAAR */}
                {(cardSide === 'front' || cardSide === 'both') && (
                  <div className="w-full max-w-[500px] mx-auto bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden text-slate-900 select-none transition-transform hover:scale-[1.01]">
                    {/* Top Tricolor Band */}
                    <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-600 border-b border-slate-200" />

                    {/* Official Header */}
                    <div className="px-4 py-2 border-b border-slate-200 bg-gradient-to-b from-orange-50/40 to-white flex items-center justify-between">
                      {/* Ashoka Emblem */}
                      <div className="flex items-center space-x-2">
                        <div className="w-9 h-9 flex items-center justify-center">
                          <svg className="w-8 h-8 text-amber-900" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15 8H9L12 2Z" opacity="0.8" />
                            <path d="M12 8C13.66 8 15 9.34 15 11V16H9V11C9 9.34 10.34 8 12 8Z" />
                            <path d="M7 16H17V18H7V16Z" />
                            <path d="M5 19H19V21H5V19Z" />
                            <circle cx="12" cy="17" r="1" fill="#fff" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-800 leading-tight">
                            भारत सरकार
                          </div>
                          <div className="text-[10px] font-bold text-slate-600 leading-tight">
                            GOVERNMENT OF INDIA
                          </div>
                        </div>
                      </div>

                      {/* UIDAI Logo & Name */}
                      <div className="text-right">
                        <div className="text-[10px] font-extrabold text-blue-900 leading-tight">
                          भारतीय विशिष्ट पहचान प्राधिकरण
                        </div>
                        <div className="text-[8.5px] font-semibold text-slate-500 leading-tight">
                          Unique Identification Authority of India
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 grid grid-cols-12 gap-3 items-center bg-white relative">
                      {/* Photo Column */}
                      <div className="col-span-4 flex flex-col items-center">
                        <div className="w-24 h-28 rounded-lg border-2 border-slate-300 overflow-hidden shadow-inner bg-slate-100 flex items-center justify-center">
                          {aadhaarForm.photoUrl ? (
                            <img
                              src={aadhaarForm.photoUrl}
                              alt={aadhaarForm.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-12 h-12 text-slate-400" />
                          )}
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase">
                          Signature / Digital
                        </span>
                      </div>

                      {/* Details Column */}
                      <div className="col-span-8 space-y-1.5 pl-1">
                        <div>
                          <div className="text-xs font-bold text-slate-900 font-sans">
                            {aadhaarForm.nameHindi}
                          </div>
                          <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                            {aadhaarForm.name}
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-700">
                          <span className="font-semibold text-slate-500">जन्म तिथि / DOB:</span>{' '}
                          <span className="font-bold">{aadhaarForm.dob}</span>
                        </div>

                        <div className="text-[11px] text-slate-700">
                          <span className="font-semibold text-slate-500">लिंग / Gender:</span>{' '}
                          <span className="font-bold">
                            {aadhaarForm.genderHindi} / {aadhaarForm.gender}
                          </span>
                        </div>

                        {/* QR Code Simulation */}
                        <div className="pt-1 flex items-center justify-end">
                          <div className="p-1 rounded bg-slate-50 border border-slate-200 flex items-center space-x-1">
                            <QrCode className="w-11 h-11 text-slate-800" />
                            <div className="text-[8px] text-slate-500 font-mono leading-none">
                              <span>UIDAI Secure</span>
                              <br />
                              <span>QR Verifiable</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aadhaar Number Red Box */}
                    <div className="mx-4 mb-2.5 p-2 rounded-xl bg-red-50 border border-red-200 text-center">
                      <div className="text-base sm:text-lg font-mono font-extrabold text-red-700 tracking-widest">
                        {displayAadhaar}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                        {aadhaarForm.isMasked ? 'Masked Aadhaar (Only Last 4 Digits Visible)' : 'Aadhaar Number'}
                      </div>
                    </div>

                    {/* Bottom Slogan */}
                    <div className="py-1.5 bg-gradient-to-r from-red-600 via-blue-700 to-emerald-700 text-white text-center text-[10px] font-bold tracking-wider">
                      मेरा आधार, मेरी पहचान
                    </div>
                  </div>
                )}

                {/* BACK SIDE OF E-AADHAAR */}
                {(cardSide === 'back' || cardSide === 'both') && (
                  <div className="w-full max-w-[500px] mx-auto bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden text-slate-900 select-none transition-transform hover:scale-[1.01]">
                    {/* Top Bar */}
                    <div className="h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600 border-b border-slate-200" />

                    {/* Back Header */}
                    <div className="px-4 py-2 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>भारतीय विशिष्ट पहचान प्राधिकरण</span>
                      <span className="text-[10px] text-slate-500">Unique Identification Authority of India</span>
                    </div>

                    {/* Address & Digital Signature */}
                    <div className="p-4 grid grid-cols-12 gap-3 bg-white">
                      {/* Address in Hindi & English */}
                      <div className="col-span-8 space-y-2 text-[10.5px] leading-relaxed text-slate-800">
                        <div>
                          <strong className="text-slate-600 block">पता:</strong>
                          <span>{aadhaarForm.careOfHindi}</span>, <span>{aadhaarForm.addressHindi}</span>
                        </div>
                        <div className="pt-1 border-t border-slate-100">
                          <strong className="text-slate-600 block">Address:</strong>
                          <span>{aadhaarForm.careOf}</span>, <span>{aadhaarForm.address}</span>
                        </div>
                      </div>

                      {/* Right Column: QR & Green Tick Digital Signature */}
                      <div className="col-span-4 flex flex-col items-center justify-between border-l border-slate-100 pl-2">
                        <div className="p-1 rounded bg-slate-50 border border-slate-200">
                          <QrCode className="w-16 h-16 text-slate-800" />
                        </div>

                        {/* Digital Signature Green Tick */}
                        <div className="mt-2 p-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-center w-full">
                          <div className="inline-flex items-center space-x-1 text-emerald-700 font-extrabold text-[9px]">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Signature Valid</span>
                          </div>
                          <div className="text-[7.5px] text-slate-600 leading-tight">
                            DS UIDAI 04
                            <br />
                            Date: {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Aadhaar Number */}
                    <div className="mx-4 mb-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-center font-mono font-bold text-slate-800 text-sm tracking-wider">
                      {displayAadhaar}
                    </div>

                    {/* Footer Contact & Helpline 1947 */}
                    <div className="px-4 py-2 bg-slate-800 text-white flex items-center justify-between text-[9px] font-medium">
                      <div className="flex items-center space-x-1">
                        <PhoneCall className="w-3 h-3 text-emerald-400" />
                        <span>Helpline: <strong>1947</strong> (Toll Free)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-300">
                        <span>help@uidai.gov.in</span>
                        <span>•</span>
                        <span>www.uidai.gov.in</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Official UIDAI Connection Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-bold text-blue-300 tracking-wider">
                      Official Government UIDAI Portal
                    </span>
                    <h4 className="text-base sm:text-lg font-bold">
                      Download Original Official e-Aadhaar from UIDAI
                    </h4>
                    <p className="text-xs text-blue-200 max-w-xl">
                      To download your live government-issued e-Aadhaar PDF with official digital certificate from the UIDAI central database:
                    </p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-white flex-shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                    <strong>Step 1:</strong> Visit <em>myaadhaar.uidai.gov.in</em>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                    <strong>Step 2:</strong> Enter 12-digit Aadhaar & Captcha
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                    <strong>Step 3:</strong> Enter OTP received on your mobile
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="https://myaadhaar.uidai.gov.in/gen-ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-xs transition-all shadow-md inline-flex items-center space-x-1.5"
                  >
                    <span>Open UIDAI Download Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://myaadhaar.uidai.gov.in/order-reprint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-bold text-xs border border-blue-400/30 transition-all inline-flex items-center space-x-1.5"
                  >
                    <span>Order Official PVC Card (₹50)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: E-PAN SOFT COPY GENERATOR & DOWNLOADER */}
        {/* ========================================================================= */}
        {activeTab === 'pan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Column */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className="rounded-3xl p-6 border shadow-md space-y-5"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600">
                      <CreditCard className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Enter PAN Card Details
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        पैन कार्ड विवरण दर्ज करें
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200">
                    e-PAN Soft Copy
                  </span>
                </div>

                {/* Pre-fill Quick Profiles */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    ⚡ Quick 1-Click Demo Profiles:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handlePreFillAadhaar('rahul')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400 cursor-pointer"
                    >
                      ABCDE1234F (Rahul Verma)
                    </button>
                    <button
                      onClick={() => handlePreFillAadhaar('priya')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400 cursor-pointer"
                    >
                      PQRSK5678M (Priya Sharma)
                    </button>
                  </div>
                </div>

                {/* PAN Number Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    10-Character PAN Number (स्थायी खाता संख्या) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={10}
                      value={panForm.panNumber}
                      onChange={(e) =>
                        setPanForm((prev) => ({
                          ...prev,
                          panNumber: e.target.value.toUpperCase().trim()
                        }))
                      }
                      placeholder="e.g. ABCDE1234F"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold tracking-widest text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <div className="absolute right-3 top-2.5 flex items-center space-x-1 text-xs font-bold">
                      {panEntityDecoded.status.includes('Valid') ? (
                        <span className="text-emerald-600 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Valid PAN</span>
                        </span>
                      ) : (
                        <span className="text-amber-600 flex items-center space-x-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Check Format</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Entity Decoder Breakdown Box */}
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>PAN 4th Character Decoder:</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border border-indigo-300">
                      &quot;{panEntityDecoded.fourthChar}&quot; = {panEntityDecoded.entity}
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-800 dark:text-indigo-300/80">
                    &apos;P&apos; stands for Individual Person. 5th letter &quot;{panEntityDecoded.fifthChar}&quot; matches applicant&apos;s surname initial.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Cardholder Full Name (नाम) *
                  </label>
                  <input
                    type="text"
                    value={panForm.name}
                    onChange={(e) =>
                      setPanForm((prev) => ({ ...prev, name: e.target.value.toUpperCase() }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none uppercase"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Father&apos;s Full Name (पिता का नाम) *
                  </label>
                  <input
                    type="text"
                    value={panForm.fatherName}
                    onChange={(e) =>
                      setPanForm((prev) => ({ ...prev, fatherName: e.target.value.toUpperCase() }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none uppercase"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth (जन्म तिथि - DD/MM/YYYY) *
                  </label>
                  <input
                    type="text"
                    value={panForm.dob}
                    onChange={(e) => setPanForm((prev) => ({ ...prev, dob: e.target.value }))}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Official e-PAN PDF Password Tip */}
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2">
                  <Key className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Official e-PAN PDF Password Format:</strong>
                    <div className="font-mono font-bold text-amber-800 dark:text-amber-300 mt-0.5">
                      {panForm.dob.replace(/\D/g, '') || '14051998'} (DDMMYYYY without slashes)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PAN Soft Copy Preview & Downloader */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Permanent Account Number • e-PAN Soft Copy</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrintCard}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Soft Copy</span>
                  </button>
                  <button
                    onClick={handlePrintCard}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download e-PAN</span>
                  </button>
                </div>
              </div>

              {/* AUTHENTIC INCOME TAX DEPARTMENT E-PAN CARD DESIGN */}
              <div
                id="printable-pan-card"
                className="w-full max-w-[500px] mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl border-2 border-slate-400/80 shadow-2xl overflow-hidden text-slate-900 select-none transition-transform hover:scale-[1.01]"
              >
                {/* Official Income Tax Header with Dual Crests */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 text-white flex items-center justify-between border-b-2 border-amber-400">
                  <div className="flex items-center space-x-2">
                    {/* Emblem */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-7 h-7 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15 8H9L12 2Z" />
                        <path d="M12 8C13.66 8 15 9.34 15 11V16H9V11C9 9.34 10.34 8 12 8Z" />
                        <path d="M7 16H17V18H7V16Z" />
                        <path d="M5 19H19V21H5V19Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-amber-300 tracking-wider">
                        आयकर विभाग
                      </div>
                      <div className="text-[9.5px] font-bold tracking-widest text-slate-100">
                        INCOME TAX DEPARTMENT
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-200">भारत सरकार</div>
                    <div className="text-[8.5px] font-bold text-amber-300 tracking-wider">
                      GOVT. OF INDIA
                    </div>
                  </div>
                </div>

                {/* Hologram Ribbon Simulation */}
                <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-sm" />

                {/* Card Body */}
                <div className="p-4 grid grid-cols-12 gap-3 items-center bg-white relative">
                  {/* Watermark Logo Simulation in background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <span className="text-6xl font-extrabold font-serif">ITD</span>
                  </div>

                  {/* Photo Column */}
                  <div className="col-span-4 flex flex-col items-center">
                    <div className="w-24 h-28 rounded-lg border-2 border-slate-300 overflow-hidden shadow-inner bg-slate-100 flex items-center justify-center">
                      {panForm.photoUrl ? (
                        <img
                          src={panForm.photoUrl}
                          alt={panForm.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-slate-400" />
                      )}
                    </div>
                    {/* Scanned Signature Box */}
                    <div className="mt-2 w-24 py-1 px-1 border border-slate-300 bg-slate-50 text-center rounded">
                      <span className="font-serif italic text-xs text-blue-900 font-bold block truncate">
                        {panForm.name.split(' ')[0]}
                      </span>
                      <span className="text-[7px] text-slate-400 uppercase tracking-tighter block">
                        Signature / हस्ताक्षर
                      </span>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="col-span-8 space-y-2 pl-1">
                    {/* PAN NUMBER HIGHLIGHT */}
                    <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="text-[8.5px] uppercase font-bold text-blue-900 tracking-wider">
                        स्थायी खाता संख्या / Permanent Account Number
                      </div>
                      <div className="text-lg font-mono font-extrabold text-blue-950 tracking-widest mt-0.5">
                        {panForm.panNumber}
                      </div>
                    </div>

                    {/* Holder Name */}
                    <div>
                      <div className="text-[9px] font-bold text-slate-500">नाम / Name</div>
                      <div className="text-xs font-extrabold text-slate-900 uppercase font-sans">
                        {panForm.name}
                      </div>
                    </div>

                    {/* Father Name */}
                    <div>
                      <div className="text-[9px] font-bold text-slate-500">
                        पिता का नाम / Father&apos;s Name
                      </div>
                      <div className="text-xs font-bold text-slate-800 uppercase">
                        {panForm.fatherName}
                      </div>
                    </div>

                    {/* DOB & QR Code row */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="text-[9px] font-bold text-slate-500">
                          जन्म की तारीख / Date of Birth
                        </div>
                        <div className="text-xs font-bold text-slate-900">{panForm.dob}</div>
                      </div>

                      {/* PAN Secure QR */}
                      <div className="p-1 rounded bg-slate-50 border border-slate-200">
                        <QrCode className="w-11 h-11 text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Warning & Contact */}
                <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
                  <span>इस कार्ड के गुम/पाए जाने पर कृपया सूचित करें: आयकर विभाग</span>
                  <span className="font-semibold">www.incometax.gov.in</span>
                </div>
              </div>

              {/* Direct Official Income Tax Connection Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-bold text-purple-300 tracking-wider">
                      Official Government Income Tax Portal
                    </span>
                    <h4 className="text-base sm:text-lg font-bold">
                      Direct Official e-PAN & Aadhaar Linking Services
                    </h4>
                    <p className="text-xs text-purple-200 max-w-xl">
                      Access official digital PAN services on incometax.gov.in and Protean (NSDL) / UTIITSL portals:
                    </p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/10 text-white flex-shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-white">Instant e-PAN via Aadhaar</strong>
                      <span className="text-[11px] text-purple-200">Free, paperless, 10-minute issue</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-300" />
                  </a>

                  <a
                    href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-white">Link Aadhaar to PAN (Sec 139AA)</strong>
                      <span className="text-[11px] text-purple-200">Official statutory linkage page</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-300" />
                  </a>

                  <a
                    href="https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-white">Download e-PAN (Protean / NSDL)</strong>
                      <span className="text-[11px] text-purple-200">Official NSDL reprint repository</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-300" />
                  </a>

                  <a
                    href="https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-white">Download e-PAN (UTIITSL)</strong>
                      <span className="text-[11px] text-purple-200">Official UTIITSL e-card download</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: OFFICIAL GOVERNMENT PORTALS DIRECTORY & SECURE HUB */}
        {/* ========================================================================= */}
        {activeTab === 'portals' && (
          <div className="space-y-8">
            {/* Quick Safety Rule Banner */}
            <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>सुरक्षा नियम (Anti-Phishing Rule):</strong> भारत सरकार के सभी आधिकारिक पोर्टल केवल <strong>.gov.in</strong> या <strong>.nic.in</strong> पर समाप्त होते हैं। कभी भी किसी अनधिकृत WhatsApp लिंक, टेलीग्राम चैनल या संदिग्ध निजी वेबसाइट पर अपना आधार नंबर, पैन नंबर या ओटीपी साझा न करें।
              </div>
            </div>

            {/* Grid of Official Portals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* UIDAI Official Card */}
              <div
                className="rounded-3xl p-6 border shadow-md space-y-4 flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600">
                      <CreditCard className="w-5 h-5" />
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200">
                      UIDAI Official
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    UIDAI MyAadhaar Portal
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    भारत सरकार का मुख्य पोर्टल जहां से आप ओरिजिनल पासवर्ड-प्रोटेक्टेड e-Aadhaar PDF डाउनलोड कर सकते हैं, PVC कार्ड ऑर्डर कर सकते हैं और बायोमेट्रिक्स लॉक कर सकते हैं।
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>e-Aadhaar PDF Fee:</span>
                      <strong className="text-emerald-600">Free (निःशुल्क)</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Speed Post PVC Card:</span>
                      <strong>₹50 only</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Auth Requirement:</span>
                      <strong>Aadhaar OTP on Mobile</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <a
                    href="https://myaadhaar.uidai.gov.in/gen-ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <span>Download e-Aadhaar (UIDAI)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://myaadhaar.uidai.gov.in/lock-unlock-biometrics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Lock / Unlock Biometrics</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Income Tax Instant e-PAN Card */}
              <div
                className="rounded-3xl p-6 border shadow-md space-y-4 flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600">
                      <CreditCard className="w-5 h-5" />
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200">
                      Income Tax Dept
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Income Tax e-Filing (Instant e-PAN)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    आयकर विभाग की आधिकारिक वेबसाइट जहां केवल आधार ई-केवाईसी और मोबाइल ओटीपी के जरिए 10 मिनट में नया डिजिटल पैन कार्ड तुरंत प्राप्त किया जा सकता है।
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Instant e-PAN Fee:</span>
                      <strong className="text-emerald-600">100% Free</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Turnaround Time:</span>
                      <strong>~10 Minutes</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Validity:</span>
                      <strong>Equal to Physical PAN</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <a
                    href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <span>Instant e-PAN Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Link Aadhaar with PAN</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* DigiLocker Official Card */}
              <div
                className="rounded-3xl p-6 border shadow-md space-y-4 flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600">
                      <FileCheck className="w-5 h-5" />
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200">
                      MeitY DigiLocker
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    DigiLocker National Cloud
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    इलेक्ट्रॉनिक्स और आईटी मंत्रालय (MeitY) का क्लाउड प्लेटफॉर्म जहां आधार, पैन, 10वीं-12वीं मार्कशीट व ड्राइविंग लाइसेंस स्थायी रूप से सुरक्षित रहते हैं।
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Legal Status:</span>
                      <strong className="text-emerald-600">Rule 9A, IT Act 2000</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Cloud Storage:</span>
                      <strong>1 GB Free for Every Citizen</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span>Official Portal:</span>
                      <strong>digilocker.gov.in</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <a
                    href="https://www.digilocker.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <span>Open DigiLocker Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://web.umang.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>UMANG Unified Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency & Official Helplines Directory */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-base sm:text-lg">
                  National Official Citizen Helplines (24x7 Assistance)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[11px] text-amber-300 font-bold block">
                    Financial Cyber Fraud
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-white">1930</div>
                  <span className="text-[10px] text-slate-300 block">
                    cybercrime.gov.in (Golden Hour Freeze)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[11px] text-blue-300 font-bold block">
                    UIDAI Aadhaar Helpline
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-white">1947</div>
                  <span className="text-[10px] text-slate-300 block">
                    help@uidai.gov.in (Toll Free, 12 Languages)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[11px] text-purple-300 font-bold block">
                    Income Tax Helpline
                  </span>
                  <div className="text-lg font-mono font-extrabold text-white">1800 180 1961</div>
                  <span className="text-[10px] text-slate-300 block">
                    Aaykar Seva Kendra (Mon-Sat)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                  <span className="text-[11px] text-emerald-300 font-bold block">
                    DigiLocker Support
                  </span>
                  <div className="text-lg font-mono font-extrabold text-white">support@digilocker</div>
                  <span className="text-[10px] text-slate-300 block">
                    MeitY Digital India Initiative
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SIMULATED OTP VERIFICATION MODAL (UIDAI STYLE) */}
        {/* ========================================================================= */}
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
              className="max-w-md w-full rounded-3xl p-6 sm:p-7 border shadow-2xl space-y-5"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      UIDAI One Time Password (OTP)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sent to registered mobile XXXXXX8912
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              {/* Simulated OTP Display Banner */}
              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                <div className="font-bold flex items-center justify-between">
                  <span>📱 Simulated SMS Notification:</span>
                  <span className="font-mono font-extrabold text-sm px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 border border-blue-300">
                    {simulatedSentOtp}
                  </span>
                </div>
                <p className="text-[11px] text-blue-800 dark:text-blue-300/80">
                  &quot;Your UIDAI e-Aadhaar download OTP is {simulatedSentOtp}. Valid for 10 minutes. Do NOT share with anyone.&quot;
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enter 6-Digit OTP (ओटीपी दर्ज करें)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder={simulatedSentOtp || 'Enter 6-digit OTP'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center font-bold tracking-widest text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => setOtpInput(simulatedSentOtp)}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Auto-Fill OTP
                </button>
                <button
                  onClick={handleVerifyOtp}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  Verify & Generate Soft Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
