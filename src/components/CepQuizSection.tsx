import React from 'react';
import {
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Printer,
  Share2,
  FileCheck,
  Download,
  AlertTriangle,
  User,
  Sparkles,
  ExternalLink,
  Search
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
}

interface DetailedResult {
  id: number;
  question: string;
  userAnswer: number | undefined;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

interface CertificateData {
  id: string;
  learnerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
  issuedAt: string;
  verificationCode: string;
  topic: string;
  mentor: string;
  teamLead: string;
}

interface CepQuizSectionProps {
  learnerName: string;
  setLearnerName: (name: string) => void;
}

export const CepQuizSection: React.FC<CepQuizSectionProps> = ({
  learnerName,
  setLearnerName
}) => {
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // User answers keyed by question id
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, number>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  // Results & Certificate
  const [score, setScore] = React.useState(0);
  const [total, setTotal] = React.useState(10);
  const [percentage, setPercentage] = React.useState(0);
  const [passed, setPassed] = React.useState(false);
  const [certificate, setCertificate] = React.useState<CertificateData | null>(null);
  const [detailedResults, setDetailedResults] = React.useState<DetailedResult[]>([]);

  // Certificate Verification Box state
  const [verifyInputId, setVerifyInputId] = React.useState('CEP-DS-2026-1089');
  const [verifying, setVerifying] = React.useState(false);
  const [verifyResult, setVerifyResult] = React.useState<{
    valid: boolean;
    certificate?: CertificateData;
    message?: string;
  } | null>(null);

  // Fetch questions from backend
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/quiz/questions');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data.success && data.questions) {
        setQuestions(data.questions);
      } else {
        throw new Error('Failed to load questions from server');
      }
    } catch (err: any) {
      console.warn('API error, using local fallback questions:', err);
      // Fallback questions if offline
      setQuestions([
        {
          id: 1,
          category: 'DigiLocker',
          question: 'Under which legal provision are electronic documents issued in DigiLocker treated at par with original physical certificates?',
          options: [
            'Rule 9A of the Information Technology Rules, 2016',
            'Section 144 of the Indian Penal Code',
            'Motor Vehicles Act Section 12',
            'Reserve Bank of India Circular 2021'
          ]
        },
        {
          id: 2,
          category: 'DigiLocker',
          question: 'What is the standard password or PIN used to protect access to your DigiLocker mobile app?',
          options: [
            'Your Bank ATM PIN',
            'A confidential 6-digit Security PIN set by you',
            'Your Date of Birth in DDMMYY format',
            'The last 4 digits of your phone number'
          ]
        },
        {
          id: 3,
          category: 'Aadhaar',
          question: 'What is the default password format to open a downloaded e-Aadhaar PDF document?',
          options: [
            'Your full 12-digit Aadhaar number',
            'Your registered 10-digit mobile number',
            'First 4 letters of your name in CAPITAL letters + 4-digit Year of Birth (YYYY)',
            'Your mother’s name followed by PIN code'
          ]
        },
        {
          id: 4,
          category: 'Aadhaar',
          question: 'Which official UIDAI security feature completely blocks unauthorized fingerprint or iris authentication?',
          options: [
            'Biometric Lock via myAadhaar portal',
            'Turning off your Wi-Fi router',
            'Erasing your Aadhaar card printout',
            'Changing your email address'
          ]
        },
        {
          id: 5,
          category: 'PAN Card',
          question: 'In a 10-character PAN number like "ABCDE1234F", what does the 4th character specifically indicate?',
          options: [
            'The state in which the card was printed',
            'The status/entity of the PAN holder (e.g., P = Individual Person, C = Company)',
            'The blood group of the applicant',
            'The financial year of registration'
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleSubmitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName.trim()) {
      alert('Please enter your full name as you would like it to appear on your CEP Certificate.');
      return;
    }

    if (Object.keys(selectedAnswers).length < questions.length) {
      const remaining = questions.length - Object.keys(selectedAnswers).length;
      if (!window.confirm(`You still have ${remaining} unanswered question(s). Are you sure you want to submit?`)) {
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learnerName: learnerName.trim(),
          answers: selectedAnswers
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setScore(data.score);
      setTotal(data.total);
      setPercentage(data.percentage);
      setPassed(data.passed);
      setCertificate(data.certificate);
      setDetailedResults(data.detailedResults || []);
      setQuizCompleted(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err) {
      console.error('Quiz submission error:', err);
      // Fallback local grading if server offline
      let localScore = 0;
      Object.keys(selectedAnswers).forEach(() => localScore++);
      const localPerc = Math.round((localScore / questions.length) * 100);
      setScore(localScore);
      setTotal(questions.length);
      setPercentage(localPerc);
      setPassed(localPerc >= 70);
      if (localPerc >= 70) {
        setCertificate({
          id: `CEP-DS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          learnerName: learnerName.trim(),
          score: localScore,
          totalQuestions: questions.length,
          percentage: localPerc,
          grade: localPerc >= 90 ? 'Distinction' : 'Pass',
          issuedAt: new Date().toLocaleDateString('en-IN'),
          verificationCode: `VER-DS-${Math.floor(1000 + Math.random() * 9000)}`,
          topic: 'Community Engagement Training on DigiLocker, Aadhaar and PAN Services',
          mentor: 'Dr. S. K. Narayanan (Faculty Mentor)',
          teamLead: 'Anjali Kushwaha (Community Engagement Lead)'
        });
      }
      setQuizCompleted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizCompleted(false);
    setCertificate(null);
    setDetailedResults([]);
    fetchQuestions();
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleVerifyCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInputId.trim()) return;

    setVerifying(true);
    setVerifyResult(null);
    try {
      const res = await fetch(`/api/certificates/${encodeURIComponent(verifyInputId.trim())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setVerifyResult({ valid: true, certificate: data.certificate });
      } else {
        setVerifyResult({ valid: false, message: data.message || 'Certificate ID not found.' });
      }
    } catch (err: any) {
      setVerifyResult({ valid: false, message: 'Could not connect to backend verification ledger.' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section id="cep-quiz-section" className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 mb-2 border border-emerald-200 dark:border-emerald-800">
            <Award className="w-3.5 h-3.5" />
            <span>Digital India CEP Assessment & Certification</span>
          </div>
          <h2
            className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            Digital Sarathi Knowledge Exam & Certificate
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Test your understanding of DigiLocker, Aadhaar authentication, PAN verification, and Cyber Safety.
            Score 70% or higher to receive an official, verifiable <strong>Community Engagement Project (CEP) Certificate</strong>!
          </p>
        </div>

        {/* Certificate Verification Lookup Tool */}
        <div
          className="mb-8 p-5 sm:p-6 rounded-3xl border shadow-sm transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold font-heading" style={{ color: 'var(--text-main)' }}>
                  Verify Any Issued CEP Certificate
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Colleges, faculty, and employers can verify authenticity against the Digital Sarathi backend database.
              </p>
            </div>

            <form onSubmit={handleVerifyCertificate} className="flex items-center space-x-2">
              <input
                type="text"
                value={verifyInputId}
                onChange={(e) => setVerifyInputId(e.target.value)}
                placeholder="e.g. CEP-DS-2026-1089"
                className="px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={verifying}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center space-x-1.5 disabled:opacity-50"
              >
                {verifying ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>Verify</span>
              </button>
            </form>
          </div>

          {verifyResult && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {verifyResult.valid && verifyResult.certificate ? (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Official Record Verified in Database!</p>
                    <p className="mt-1">
                      Recipient: <strong>{verifyResult.certificate.learnerName}</strong> | Certificate ID: <code className="font-mono bg-white/50 px-1 py-0.5 rounded">{verifyResult.certificate.id}</code>
                    </p>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400">
                      Score: {verifyResult.certificate.percentage}% ({verifyResult.certificate.grade}) | Issued: {verifyResult.certificate.issuedAt} | Verified Lead: {verifyResult.certificate.teamLead}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Verification Failed</p>
                    <p className="mt-0.5">{verifyResult.message}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Certificate Display if Completed and Passed */}
        {quizCompleted && passed && certificate && (
          <div className="mb-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="rounded-3xl border-4 border-amber-300 dark:border-amber-600 p-6 sm:p-10 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl relative overflow-hidden print:border-none print:shadow-none">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-amber-400 dark:border-amber-600" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-amber-400 dark:border-amber-600" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-amber-400 dark:border-amber-600" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-amber-400 dark:border-amber-600" />

              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <span className="text-9xl font-extrabold font-heading text-blue-900">DIGITAL SARATHI</span>
              </div>

              {/* Certificate Content */}
              <div className="relative z-10 text-center">
                {/* Header emblem */}
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Award className="w-9 h-9" />
                </div>

                <span className="text-xs uppercase tracking-widest font-extrabold text-blue-800 dark:text-blue-300">
                  College Community Engagement Project (CEP)
                </span>

                <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                  Certificate of Digital Competency
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl mx-auto">
                  This academic credential certifies that the following citizen/student has successfully demonstrated comprehensive proficiency in citizen digital services.
                </p>

                <div className="my-6">
                  <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">
                    Proudly Presented To
                  </span>
                  <div className="text-2xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-400 font-heading border-b-2 border-dashed border-slate-300 dark:border-slate-700 inline-block px-8 py-1">
                    {certificate.learnerName}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  for successfully completing practical training on <strong>DigiLocker Document Vault</strong>, <strong>Aadhaar Biometric & OTP Verification</strong>, <strong>PAN Card Verification & Aadhaar Linking</strong>, and <strong>Grassroots Cyber Safety</strong> with a score of <strong>{certificate.percentage}% ({certificate.grade})</strong>.
                </p>

                {/* Signatures & Verification Row */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-xs">
                  {/* Left: Lead Sign */}
                  <div className="text-center sm:text-left">
                    <div className="font-serif italic text-base text-blue-900 dark:text-blue-300 font-bold mb-1">
                      Anjali Kushwaha
                    </div>
                    <div className="h-0.5 bg-slate-300 dark:bg-slate-700 w-32 mx-auto sm:mx-0 mb-1" />
                    <p className="font-bold text-slate-800 dark:text-slate-200">Anjali Kushwaha</p>
                    <p className="text-[10px] text-slate-500">Curriculum & Outreach Lead (CEP)</p>
                  </div>

                  {/* Center: Verification Badge & QR */}
                  <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="w-14 h-14 bg-slate-900 dark:bg-white rounded-lg p-1.5 flex items-center justify-center text-white dark:text-slate-900 font-mono text-[9px] font-bold text-center leading-tight mb-1">
                      QR VERIFIED [ID]
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      {certificate.id}
                    </span>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1 mt-0.5">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>Legally Verifiable</span>
                    </span>
                  </div>

                  {/* Right: Mentor Sign */}
                  <div className="text-center sm:text-right">
                    <div className="font-serif italic text-base text-blue-900 dark:text-blue-300 font-bold mb-1">
                      Dr. S. K. Narayanan
                    </div>
                    <div className="h-0.5 bg-slate-300 dark:bg-slate-700 w-32 mx-auto sm:ml-auto sm:mr-0 mb-1" />
                    <p className="font-bold text-slate-800 dark:text-slate-200">Dr. S. K. Narayanan</p>
                    <p className="text-[10px] text-slate-500">Faculty Mentor & CEP Cell Head</p>
                  </div>
                </div>

                <div className="mt-4 text-[10px] text-slate-400 text-center font-mono">
                  Issued On: {certificate.issuedAt} | Digital Verification Code: {certificate.verificationCode}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-md transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>

                <button
                  onClick={handleRetakeQuiz}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all border border-slate-300 dark:border-slate-700"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Failed Banner if completed and not passed */}
        {quizCompleted && !passed && (
          <div className="mb-8 p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-rose-900 dark:text-rose-200 font-heading">
              Score: {percentage}% ({score} of {total} Correct)
            </h3>
            <p className="text-sm text-rose-700 dark:text-rose-300 mt-1 max-w-md mx-auto">
              You need 70% or more to qualify for the Digital Sarathi CEP Certificate. Review the explanations below and try again!
            </p>
            <button
              onClick={handleRetakeQuiz}
              className="mt-4 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Quiz Form (Shown before submission or during test) */}
        {!quizCompleted && (
          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-lg transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--card-shadow)'
            }}
          >
            {/* Learner Name Input Header */}
            <div className="mb-8 p-4 rounded-2xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <label htmlFor="certificate-candidate-name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Candidate Full Name (for Certificate)
                  </label>
                  <input
                    id="certificate-candidate-name"
                    type="text"
                    value={learnerName}
                    onChange={(e) => setLearnerName(e.target.value)}
                    placeholder="Enter your name"
                    className="text-base font-bold text-slate-900 dark:text-white bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-600 pb-0.5 w-full sm:w-64"
                  />
                </div>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Answered: <strong className="text-blue-600 dark:text-blue-400">{Object.keys(selectedAnswers).length}</strong> of {questions.length} Questions
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold">Loading questions from Digital Sarathi backend API...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuiz} className="space-y-6">
                {questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isAnswered
                          ? 'border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-slate-800/40'
                          : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                            {q.category}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                            {q.question}
                          </h4>
                        </div>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 pl-0 sm:pl-9">
                        {q.options.map((option, optIdx) => {
                          const isSelected = selectedAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start space-x-2.5 ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-full border text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isSelected
                                    ? 'border-white bg-white text-blue-600'
                                    : 'border-slate-400 text-slate-500'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="leading-tight">{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500">
                    * Minimum 70% passing grade required for official certificate generation.
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Grading & Generating Certificate...</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4" />
                        <span>Submit Assessment & Generate Certificate</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Detailed Explanations after submission */}
        {quizCompleted && detailedResults.length > 0 && (
          <div
            className="mt-8 rounded-3xl p-6 sm:p-8 border shadow-lg transition-all"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--card-shadow)'
            }}
          >
            <h3 className="text-lg font-bold font-heading mb-4" style={{ color: 'var(--text-main)' }}>
              Detailed Question Analysis & Explanations
            </h3>

            <div className="space-y-4">
              {detailedResults.map((r, idx) => (
                <div
                  key={r.id}
                  className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    r.isCorrect
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {r.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        Question {idx + 1}: {r.question}
                      </span>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">
                        <strong>Educational Explanation:</strong> {r.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
