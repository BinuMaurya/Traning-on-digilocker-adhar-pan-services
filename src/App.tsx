import React from 'react';
import {
  LEARNING_MODULES,
  LEARNING_ACTIVITIES,
  CEP_PROJECT_INFO
} from './data/modulesData';
import { LearningModule, NavTab, ThemeMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleList } from './components/ModuleList';
import { ModuleDetailModal } from './components/ModuleDetailModal';
import { ProgressTracker } from './components/ProgressTracker';
import { Simulators } from './components/Simulators';
import { FaqSection } from './components/FaqSection';
import { HelpWorkshopModal } from './components/HelpWorkshopModal';
import { AboutCepSection } from './components/AboutCepSection';
import { VsCodeRunnerModal } from './components/VsCodeRunnerModal';
import { CepQuizSection } from './components/CepQuizSection';
import { BackendExplorerSection } from './components/BackendExplorerSection';
import { AadhaarPanDownloaderSection } from './components/AadhaarPanDownloaderSection';
import { Footer } from './components/Footer';
import {
  Home,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Info,
  Layers,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Search,
  Sparkles,
  Award,
  Server,
  CreditCard
} from 'lucide-react';

export default function App() {
  // Theme state with CSS variables support
  const [theme, setTheme] = React.useState<ThemeMode>(() => {
    const saved = localStorage.getItem('digital_sarathi_theme');
    return (saved as ThemeMode) || 'light';
  });

  // Current active navigation tab
  const [currentTab, setCurrentTab] = React.useState<NavTab>('home');

  // Selected module for detail modal
  const [selectedModule, setSelectedModule] = React.useState<LearningModule | null>(null);

  // Completed module IDs (for badge & status)
  const [completedModuleIds, setCompletedModuleIds] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('digital_sarathi_completed_modules');
    return saved ? JSON.parse(saved) : ['digilocker'];
  });

  // Completed practical activities
  const [completedActivityIds, setCompletedActivityIds] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('digital_sarathi_completed_activities');
    return saved ? JSON.parse(saved) : ['act-1', 'act-2'];
  });

  // Learner name ("Rahul" by default, matching the reference image's "Namaste, Rahul!")
  const [learnerName, setLearnerName] = React.useState<string>(() => {
    const saved = localStorage.getItem('digital_sarathi_learner_name');
    return saved || 'Rahul';
  });

  // Global search query
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Mobile App frame simulation toggle (as requested to mirror the reference image)
  const [isMobilePreview, setIsMobilePreview] = React.useState<boolean>(false);

  // VS Code Runner & Single index.html Exporter modal
  const [isVsCodeModalOpen, setIsVsCodeModalOpen] = React.useState<boolean>(false);

  // Sync theme changes to data-theme attribute on document.documentElement
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('digital_sarathi_theme', theme);
  }, [theme]);

  // Sync state to local storage
  React.useEffect(() => {
    localStorage.setItem('digital_sarathi_completed_modules', JSON.stringify(completedModuleIds));
  }, [completedModuleIds]);

  React.useEffect(() => {
    localStorage.setItem('digital_sarathi_completed_activities', JSON.stringify(completedActivityIds));
  }, [completedActivityIds]);

  React.useEffect(() => {
    localStorage.setItem('digital_sarathi_learner_name', learnerName);
  }, [learnerName]);

  // Sync learner progress to the backend REST API
  React.useEffect(() => {
    try {
      fetch('/api/progress/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learnerId: 'learner-' + (learnerName || 'default').toLowerCase().replace(/[^a-z0-9]/g, ''),
          name: learnerName,
          completedModules: completedModuleIds,
          completedActivities: completedActivityIds
        })
      }).catch(() => {});
    } catch (e) {}
  }, [completedModuleIds, completedActivityIds, learnerName]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleModuleComplete = (moduleId: string) => {
    setCompletedModuleIds((prev) => {
      const exists = prev.includes(moduleId);
      if (exists) {
        return prev.filter((id) => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleToggleActivity = (activityId: string) => {
    setCompletedActivityIds((prev) => {
      const exists = prev.includes(activityId);
      if (exists) {
        return prev.filter((id) => id !== activityId);
      } else {
        return [...prev, activityId];
      }
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your learning checklist and module progress?')) {
      setCompletedModuleIds([]);
      setCompletedActivityIds([]);
    }
  };

  // Calculate overall progress percentage
  const totalTasks = LEARNING_ACTIVITIES.length;
  const progressPercent = Math.round((completedActivityIds.length / totalTasks) * 100);

  // App Content Component (rendered either full width or inside the realistic phone frame)
  const renderAppContent = () => (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        toggleTheme={toggleTheme}
        isMobilePreview={isMobilePreview}
        setIsMobilePreview={setIsMobilePreview}
        openVsCodeModal={() => setIsVsCodeModalOpen(true)}
        openSearch={() => {
          setCurrentTab('learning');
          const searchInput = document.getElementById('hero-search-input');
          searchInput?.focus();
        }}
        progressPercent={progressPercent}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <>
            <HeroSection
              onExplore={() => {
                setCurrentTab('learning');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTrackProgress={() => {
                setCurrentTab('progress');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              learnerName={learnerName}
              setLearnerName={setLearnerName}
              progressPercent={progressPercent}
              onSelectModule={(m) => setSelectedModule(m)}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />

            {/* Featured Modules on Home */}
            <ModuleList
              modules={LEARNING_MODULES}
              onSelectModule={(m) => setSelectedModule(m)}
              completedModuleIds={completedModuleIds}
              searchQuery={searchQuery}
            />

            {/* CEP Exam & Full-Stack Backend Quick Action Banners */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Banner 1: Aadhaar & PAN Card Soft Copy & Official Portal */}
                <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl flex flex-col justify-between border border-emerald-500/40">
                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-extrabold uppercase mb-2 border border-emerald-300/30">
                      <CreditCard className="w-4 h-4" />
                      <span>Digital Identity Soft-Copy</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                      Aadhaar & PAN Soft-Copy Portal
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                      Enter details to view & download instant e-Aadhaar and e-PAN soft copies, or connect directly to official UIDAI & Income Tax portals.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('card_download');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-950 font-bold text-xs self-start transition-transform active:scale-95 flex items-center space-x-2 shadow-md cursor-pointer"
                  >
                    <span>Open e-Card Portal</span>
                    <ChevronRight className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>

                {/* Banner 2: Certification */}
                <div className="rounded-3xl p-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 text-xs font-extrabold uppercase mb-2">
                      <Award className="w-4 h-4" />
                      <span>Official Academic Certification</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-950">
                      Take the CEP Literacy Exam
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-900/90 mt-1 font-medium">
                      Score 70%+ to generate your official, verifiable Digital Sarathi Certificate signed by Anjali Kushwaha (Team Lead).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('quiz');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs self-start hover:bg-slate-900 transition-transform active:scale-95 flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Start Exam & Certificate</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Banner 3: Full-Stack Live REST API */}
                <div className="rounded-3xl p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col justify-between border border-blue-700/50">
                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold uppercase mb-2 border border-blue-400/30">
                      <Server className="w-4 h-4" />
                      <span>Full-Stack Architecture</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                      Inspect Live REST API
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
                      Real endpoints on port 3000: workshops, citizen helpdesk, certificates ledger, and sandboxed validation tools.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('api');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs self-start transition-transform active:scale-95 flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Open Live API Explorer</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Simulators Preview */}
            <Simulators
              onOpenCardPortal={() => {
                setCurrentTab('card_download');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Help & Workshop demo form */}
            <HelpWorkshopModal />

            {/* About CEP & Student Team */}
            <AboutCepSection />
          </>
        )}

        {currentTab === 'learning' && (
          <div className="pt-4">
            <ModuleList
              modules={LEARNING_MODULES}
              onSelectModule={(m) => setSelectedModule(m)}
              completedModuleIds={completedModuleIds}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {currentTab === 'progress' && (
          <div className="pt-4">
            <ProgressTracker
              activities={LEARNING_ACTIVITIES}
              completedActivityIds={completedActivityIds}
              onToggleActivity={handleToggleActivity}
              onResetProgress={handleResetProgress}
              learnerName={learnerName}
              progressPercent={progressPercent}
            />
          </div>
        )}

        {currentTab === 'simulators' && (
          <div className="pt-4">
            <Simulators
              onOpenCardPortal={() => {
                setCurrentTab('card_download');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentTab === 'card_download' && (
          <div className="pt-4">
            <AadhaarPanDownloaderSection />
          </div>
        )}

        {currentTab === 'quiz' && (
          <div className="pt-4">
            <CepQuizSection
              learnerName={learnerName}
              setLearnerName={setLearnerName}
            />
          </div>
        )}

        {currentTab === 'api' && (
          <div className="pt-4">
            <BackendExplorerSection />
          </div>
        )}

        {currentTab === 'faq' && (
          <div className="pt-4">
            <FaqSection />
          </div>
        )}

        {currentTab === 'help' && (
          <div className="pt-4">
            <HelpWorkshopModal />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="pt-4">
            <AboutCepSection />
          </div>
        )}
      </main>

      {/* Module Detail Step-by-Step Modal */}
      {selectedModule && (
        <ModuleDetailModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          isCompleted={completedModuleIds.includes(selectedModule.id)}
          onToggleComplete={handleToggleModuleComplete}
        />
      )}

      {/* VS Code Guide & Standalone index.html Exporter */}
      <VsCodeRunnerModal
        isOpen={isVsCodeModalOpen}
        onClose={() => setIsVsCodeModalOpen(false)}
      />

      {/* Bottom Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        openVsCodeModal={() => setIsVsCodeModalOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation (App Experience as in Reference Image) */}
      <nav
        id="mobile-bottom-app-bar"
        className="lg:hidden sticky bottom-0 z-30 border-t flex items-center justify-around py-2 px-1 shadow-lg backdrop-blur-md transition-colors"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)'
        }}
      >
        <button
          onClick={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 text-xs font-semibold ${
            currentTab === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('learning');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 text-xs font-semibold ${
            currentTab === 'learning' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Learning</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('progress');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 text-xs font-semibold relative ${
            currentTab === 'progress' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Progress</span>
          <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        <button
          onClick={() => {
            setCurrentTab('simulators');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 text-xs font-semibold ${
            currentTab === 'simulators' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Practice</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('card_download');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 text-xs font-semibold ${
            currentTab === 'card_download' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">e-Cards</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('quiz');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 text-xs font-semibold ${
            currentTab === 'quiz' ? 'text-amber-500 dark:text-amber-400' : 'text-slate-500'
          }`}
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Certificate</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('help');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 text-xs font-semibold ${
            currentTab === 'help' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Help</span>
        </button>
      </nav>
    </div>
  );

  // If user activated the realistic "Mobile App Simulator" frame (mirroring the 3 phone mockups in the photo)
  if (isMobilePreview) {
    return (
      <div className="min-h-screen bg-slate-900 py-6 px-3 flex flex-col items-center justify-center font-body">
        {/* Device Frame Top Control Bar */}
        <div className="max-w-md w-full mb-3 flex items-center justify-between text-white text-xs px-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Digital Sarathi Mobile Simulator</span>
          </div>
          <button
            onClick={() => setIsMobilePreview(false)}
            className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition-all"
          >
            Exit to Full Web View
          </button>
        </div>

        {/* Smartphone Hardware Frame (iPhone style mockup as seen in reference photo) */}
        <div className="w-full max-w-[412px] h-[870px] bg-black rounded-[52px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
          {/* Dynamic Island / Camera Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-end px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          </div>

          {/* Screen Content Window */}
          <div className="w-full h-full rounded-[42px] overflow-y-auto overflow-x-hidden relative bg-[var(--bg-app)] scrollbar-none flex flex-col">
            {/* Status bar mock */}
            <div className="sticky top-0 z-40 bg-[var(--bg-header-solid)] text-white px-7 pt-2.5 pb-1 flex justify-between items-center text-[11px] font-bold">
              <span>9:41</span>
              <div className="flex items-center space-x-1.5">
                <span>5G</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            <div className="flex-1">
              {renderAppContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular Desktop / Tablet / Mobile Full View
  return renderAppContent();
}
