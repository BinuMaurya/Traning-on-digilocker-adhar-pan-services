import React from 'react';
import {
  Compass,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Users,
  Search,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  BookOpen,
  X,
  Layers,
  Fingerprint,
  CreditCard,
  CloudCheck,
  FileText,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { NavTab, LearningModule } from '../types';
import { LEARNING_MODULES } from '../data/modulesData';

interface HeroSectionProps {
  onExplore: () => void;
  onTrackProgress: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  learnerName: string;
  setLearnerName: (name: string) => void;
  progressPercent: number;
  onSelectModule?: (module: LearningModule) => void;
  onNavigateTab?: (tab: NavTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onTrackProgress,
  searchQuery,
  setSearchQuery,
  learnerName,
  setLearnerName,
  progressPercent,
  onSelectModule,
  onNavigateTab
}) => {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  // Helper to get normalized query and handle common Hindi/English transliterations
  const cleanQ = searchQuery.trim().toLowerCase();

  // Find matching topics/lines for the live dropdown under the search box
  const matchingResults = React.useMemo(() => {
    if (!cleanQ) return [];

    const results: Array<{
      id: string;
      category: string;
      title: string;
      subtitle: string;
      iconType: 'digilocker' | 'aadhaar' | 'pan' | 'forms' | 'safety' | 'sim' | 'quiz';
      action: () => void;
    }> = [];

    // Check query tokens
    const isAadhaarQuery = cleanQ.includes('ad') || cleanQ.includes('aad') || cleanQ.includes('uid') || cleanQ.includes('vid') || cleanQ.includes('bio');
    const isPanQuery = cleanQ.includes('pan') || cleanQ.includes('tax') || cleanQ.includes('139') || cleanQ.includes('nsdl');
    const isDigiQuery = cleanQ.includes('digi') || cleanQ.includes('diji') || cleanQ.includes('lock') || cleanQ.includes('mark') || cleanQ.includes('cert');
    const isScamQuery = cleanQ.includes('scam') || cleanQ.includes('fraud') || cleanQ.includes('cyber') || cleanQ.includes('otp') || cleanQ.includes('1930') || cleanQ.includes('pass');
    const isSimQuery = cleanQ.includes('sim') || cleanQ.includes('practice') || cleanQ.includes('tool') || cleanQ.includes('demo');
    const isQuizQuery = cleanQ.includes('quiz') || cleanQ.includes('exam') || cleanQ.includes('cert') || cleanQ.includes('test');

    // 1. Module matches & Step matches
    LEARNING_MODULES.forEach((mod) => {
      const modMatches =
        mod.title.toLowerCase().includes(cleanQ) ||
        mod.tagline.toLowerCase().includes(cleanQ) ||
        (isAadhaarQuery && mod.id === 'aadhaar') ||
        (isPanQuery && mod.id === 'pan') ||
        (isDigiQuery && mod.id === 'digilocker') ||
        (isScamQuery && mod.id === 'cyber-safety');

      if (modMatches) {
        results.push({
          id: `mod-${mod.id}`,
          category: mod.shortTitle,
          title: `${mod.title} (Complete Guide)`,
          subtitle: mod.tagline,
          iconType: mod.id === 'digilocker' ? 'digilocker' : mod.id === 'aadhaar' ? 'aadhaar' : mod.id === 'pan' ? 'pan' : 'safety',
          action: () => {
            if (onSelectModule) onSelectModule(mod);
          }
        });
      }

      // Check specific steps within this module
      mod.steps.forEach((step) => {
        const stepMatches =
          step.title.toLowerCase().includes(cleanQ) ||
          step.description.toLowerCase().includes(cleanQ) ||
          step.details.some((d) => d.toLowerCase().includes(cleanQ)) ||
          (step.safetyTip && step.safetyTip.toLowerCase().includes(cleanQ));

        if (stepMatches && results.length < 7) {
          results.push({
            id: `step-${mod.id}-${step.stepNumber}`,
            category: mod.shortTitle,
            title: `Step ${step.stepNumber}: ${step.title}`,
            subtitle: step.description,
            iconType: mod.id === 'digilocker' ? 'digilocker' : mod.id === 'aadhaar' ? 'aadhaar' : mod.id === 'pan' ? 'pan' : 'safety',
            action: () => {
              if (onSelectModule) onSelectModule(mod);
            }
          });
        }
      });
    });

    // 2. Interactive Simulator Matches
    if (isAadhaarQuery || isSimQuery || cleanQ.includes('pass') || cleanQ.includes('pdf')) {
      results.push({
        id: 'sim-aadhaar',
        category: 'Practice Simulator',
        title: 'e-Aadhaar PDF Password & VID Tool',
        subtitle: 'Practice unlocking e-Aadhaar with NAME1998 format in a safe sandbox.',
        iconType: 'sim',
        action: () => {
          if (onNavigateTab) onNavigateTab('simulators');
        }
      });
    }

    if (isPanQuery || isSimQuery || cleanQ.includes('link')) {
      results.push({
        id: 'sim-pan',
        category: 'Practice Simulator',
        title: 'PAN-Aadhaar Structure & Linkage Sandbox',
        subtitle: 'Decode 4th char entity type & practice linking verification with backend API.',
        iconType: 'sim',
        action: () => {
          if (onNavigateTab) onNavigateTab('simulators');
        }
      });
    }

    if (isDigiQuery || cleanQ.includes('fetch') || cleanQ.includes('cbse') || cleanQ.includes('dl')) {
      results.push({
        id: 'sim-digi',
        category: 'Practice Simulator',
        title: 'DigiLocker IT Act Rule 9A Doc Pull Sandbox',
        subtitle: 'Simulate fetching digitally verified Class X Marksheet or Driving License.',
        iconType: 'sim',
        action: () => {
          if (onNavigateTab) onNavigateTab('simulators');
        }
      });
    }

    if (isQuizQuery || cleanQ.includes('grade') || cleanQ.includes('anjali')) {
      results.push({
        id: 'quiz-cep',
        category: 'Certification',
        title: 'CEP Digital Literacy Exam & Official Certificate',
        subtitle: 'Take 10-question assessment to earn your verifiable student CEP certificate.',
        iconType: 'quiz',
        action: () => {
          if (onNavigateTab) onNavigateTab('quiz');
        }
      });
    }

    return results;
  }, [cleanQ, onSelectModule, onNavigateTab]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'digilocker':
        return <CloudCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'aadhaar':
        return <Fingerprint className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'pan':
        return <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'sim':
        return <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'quiz':
        return <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="hero-section" className="relative overflow-hidden pt-6 pb-10 sm:pb-14">
      {/* Decorative background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Community Engagement Project (CEP) Initiative</span>
            <span className="text-blue-400">•</span>
            <span className="text-slate-600 dark:text-slate-400 font-normal">Student Peer Training</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-heading"
              style={{ color: 'var(--text-main)' }}
            >
              Your guide to a{' '}
              <span className="text-blue-600 dark:text-blue-400 underline decoration-blue-300 decoration-wavy decoration-2">
                digital India.
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
              Empowering students, families, and senior citizens with safe, practical mastery of{' '}
              <strong className="text-blue-700 dark:text-blue-300 font-semibold">DigiLocker</strong>,{' '}
              <strong className="text-emerald-700 dark:text-emerald-300 font-semibold">Aadhaar services</strong>, and{' '}
              <strong className="text-indigo-700 dark:text-indigo-300 font-semibold">PAN cards</strong> without fear or cyber scam risk.
            </p>

            {/* Quick Live Search Bar with Instant Result Lines Dropdown */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0 relative">
              <div
                className="relative rounded-2xl p-1.5 transition-all shadow-md border focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex items-center">
                  <div className="pl-3 pr-2 text-slate-400">
                    <Search className="w-5 h-5 text-blue-500" />
                  </div>
                  <input
                    id="hero-search-input"
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search e.g. DigiLocker, Aadhaar password, PAN card, OTP..."
                    className="w-full bg-transparent py-2.5 px-1 text-sm sm:text-base outline-none focus:ring-0 placeholder:text-slate-400"
                    style={{ color: 'var(--text-main)' }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchFocused(false);
                      }}
                      className="px-2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* LIVE DROPDOWN RESULTS (Lines show below search box) */}
              {searchQuery.trim().length > 0 && (
                <div
                  id="hero-search-dropdown-results"
                  className="absolute top-full left-0 right-0 z-50 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>{matchingResults.length} Matching Topic Lines for "{searchQuery}"</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Click any line to open</span>
                  </div>

                  {matchingResults.length > 0 ? (
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                      {matchingResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            item.action();
                            setIsSearchFocused(false);
                          }}
                          className="p-3.5 hover:bg-blue-50/80 dark:hover:bg-slate-800/80 cursor-pointer transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                              {getResultIcon(item.iconType)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                                  {item.category}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 flex-shrink-0 ml-2">
                            <span>Open</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No exact title line match. Check the guides listed below or click a quick topic below.
                    </div>
                  )}

                  <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>💡 Full modules below remain open for training</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )}

              {/* Instant Filter Suggestions */}
              <div className="flex flex-wrap gap-1.5 mt-2.5 items-center justify-center lg:justify-start text-xs">
                <span className="text-slate-500 font-medium">Quick topics:</span>
                {['DigiLocker Marksheet', 'Aadhaar Password', 'Masked Aadhaar', 'Instant e-PAN', 'UPI Fraud'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setSearchQuery(kw)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                id="hero-btn-explore-guides"
                onClick={onExplore}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Learning Guides</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-btn-track-learning"
                onClick={onTrackProgress}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 text-base border cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Track My Learning ({progressPercent}%)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Reference-Image Inspired Welcome Card & Citizen Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              id="hero-welcome-card"
              className="w-full max-w-md rounded-3xl p-6 relative overflow-hidden transition-all border shadow-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-highlight)'
              }}
            >
              {/* Card top decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

              {/* Personalized Greeting Header as in photo */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">👋</span>
                    {isEditingName ? (
                      <input
                        type="text"
                        value={learnerName}
                        onChange={(e) => setLearnerName(e.target.value)}
                        onBlur={() => setIsEditingName(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                        autoFocus
                        className="font-bold text-xl px-1.5 py-0.5 rounded border border-blue-400 bg-transparent"
                      />
                    ) : (
                      <h2
                        onClick={() => setIsEditingName(true)}
                        title="Click to customize your name"
                        className="text-xl font-extrabold font-heading text-slate-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors flex items-center space-x-1"
                      >
                        <span>Namaste, {learnerName}!</span>
                        <span className="text-xs text-blue-500 font-normal underline ml-1">Edit</span>
                      </h2>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    Learn • Practice • Grow
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                    Digital Citizen
                  </span>
                </div>
              </div>

              {/* Illustration banner mirroring the student with laptop/mobile from photo */}
              <div className="my-4 rounded-2xl p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden shadow-inner">
                {/* Visual SVG representing Indian digital citizen / student */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1 z-10">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-200 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Digital Skills</span>
                    </span>
                    <h3 className="text-base font-bold leading-tight">
                      For a Better <br />Tomorrow
                    </h3>
                    <p className="text-xs text-blue-100 max-w-[170px]">
                      Step-by-step guidance for DigiLocker, Aadhaar & PAN.
                    </p>
                  </div>

                  {/* Character Illustration SVG */}
                  <div className="w-24 h-24 relative flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                      {/* Laptop screen */}
                      <rect x="25" y="40" width="50" height="35" rx="3" fill="#1e293b" />
                      <rect x="28" y="43" width="44" height="28" rx="2" fill="#38bdf8" />
                      <path d="M36 55 L44 62 L64 47" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Laptop base */}
                      <path d="M20 75 L80 75 L84 79 L16 79 Z" fill="#64748b" />
                      {/* Friendly student head */}
                      <circle cx="50" cy="24" r="14" fill="#fcd34d" />
                      {/* Hair */}
                      <path d="M37 24 C37 14 63 14 63 24 C60 17 40 17 37 24 Z" fill="#0f172a" />
                      {/* Glasses */}
                      <circle cx="45" cy="24" r="4" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                      <circle cx="55" cy="24" r="4" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                      <line x1="49" y1="24" x2="51" y2="24" stroke="#0f172a" strokeWidth="1.5" />
                      <path d="M46 31 Q50 35 54 31" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Progress Summary inside Hero Card */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Your Learning Progress</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* 4 Feature Badges as shown on right badge in photo */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 font-medium">
                  <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Easy Learning</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Safe & Secure</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 font-medium">
                  <Smartphone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span>Mobile Friendly</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 font-medium">
                  <Users className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>For Every Citizen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Highlights Bar (matching the bottom strip in photo) */}
        <div
          id="hero-features-bar"
          className="mt-10 rounded-2xl p-4 sm:p-5 border transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800 text-center">
            <div className="p-2 flex flex-col items-center justify-center">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Step-by-Step Guidance
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Clear numbered directions
              </p>
            </div>

            <div className="p-2 flex flex-col items-center justify-center">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Interactive Learning
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Try realistic safe mockups
              </p>
            </div>

            <div className="p-2 flex flex-col items-center justify-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Practice & Quizzes
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Test and verify knowledge
              </p>
            </div>

            <div className="p-2 flex flex-col items-center justify-center">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-1.5">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Learn Anywhere
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Optimized for mobile & PC
              </p>
            </div>

            <div className="p-2 flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1.5">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Students & Citizens
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                College Community Project
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
