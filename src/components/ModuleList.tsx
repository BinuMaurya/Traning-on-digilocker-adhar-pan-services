import React from 'react';
import {
  CloudCheck,
  Fingerprint,
  CreditCard,
  FileText,
  ShieldAlert,
  Smartphone,
  ArrowRight,
  Clock,
  CheckCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { LearningModule } from '../types';

interface ModuleListProps {
  modules: LearningModule[];
  onSelectModule: (module: LearningModule) => void;
  completedModuleIds: string[];
  searchQuery: string;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onSelectModule,
  completedModuleIds,
  searchQuery
}) => {
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'id_services' | 'safety_skills'>('all');

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Smart search matcher with support for transliteration (adhar -> aadhaar, etc.)
  const matchesSearch = (m: LearningModule) => {
    if (!cleanQuery) return true;

    // Direct string match on title, shortTitle, tagline, overview
    if (
      m.title.toLowerCase().includes(cleanQuery) ||
      m.shortTitle.toLowerCase().includes(cleanQuery) ||
      m.tagline.toLowerCase().includes(cleanQuery) ||
      m.overview.toLowerCase().includes(cleanQuery)
    ) {
      return true;
    }

    // Step title, description, details
    const stepMatch = m.steps.some(
      (s) =>
        s.title.toLowerCase().includes(cleanQuery) ||
        s.description.toLowerCase().includes(cleanQuery) ||
        s.details.some((d) => d.toLowerCase().includes(cleanQuery)) ||
        (s.safetyTip && s.safetyTip.toLowerCase().includes(cleanQuery))
    );
    if (stepMatch) return true;

    // Transliteration & alias matching
    if ((cleanQuery.includes('ad') || cleanQuery.includes('uid') || cleanQuery.includes('vid')) && m.id === 'aadhaar') {
      return true;
    }
    if ((cleanQuery.includes('pan') || cleanQuery.includes('tax') || cleanQuery.includes('nsdl')) && m.id === 'pan') {
      return true;
    }
    if ((cleanQuery.includes('digi') || cleanQuery.includes('diji') || cleanQuery.includes('lock') || cleanQuery.includes('mark')) && m.id === 'digilocker') {
      return true;
    }
    if ((cleanQuery.includes('scam') || cleanQuery.includes('fraud') || cleanQuery.includes('cyber') || cleanQuery.includes('otp') || cleanQuery.includes('1930')) && m.id === 'cyber-safety') {
      return true;
    }
    if ((cleanQuery.includes('form') || cleanQuery.includes('photo') || cleanQuery.includes('upload') || cleanQuery.includes('size')) && m.id === 'online-forms') {
      return true;
    }
    if ((cleanQuery.includes('phone') || cleanQuery.includes('net') || cleanQuery.includes('mobile') || cleanQuery.includes('internet')) && m.id === 'mobile-basics') {
      return true;
    }

    return false;
  };

  // Filter modules based on search and category
  const filteredModules = modules.filter((m) => {
    if (!matchesSearch(m)) return false;

    if (activeCategory === 'id_services') {
      return ['digilocker', 'aadhaar', 'pan'].includes(m.id);
    }
    if (activeCategory === 'safety_skills') {
      return ['online-forms', 'cyber-safety', 'mobile-basics'].includes(m.id);
    }
    return true;
  });

  // Never leave the user with an empty cleared screen!
  const isNoMatchFallback = cleanQuery !== '' && filteredModules.length === 0;
  const displayModules = isNoMatchFallback
    ? modules.filter((m) => {
        if (activeCategory === 'id_services') return ['digilocker', 'aadhaar', 'pan'].includes(m.id);
        if (activeCategory === 'safety_skills') return ['online-forms', 'cyber-safety', 'mobile-basics'].includes(m.id);
        return true;
      })
    : filteredModules;

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'CloudCheck':
        return <CloudCheck className="w-7 h-7 text-blue-600 dark:text-blue-400" />;
      case 'Fingerprint':
        return <Fingerprint className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />;
      case 'CreditCard':
        return <CreditCard className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />;
      case 'FileText':
        return <FileText className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-7 h-7 text-rose-600 dark:text-rose-400" />;
      case 'Smartphone':
        return <Smartphone className="w-7 h-7 text-amber-600 dark:text-amber-400" />;
      default:
        return <BookOpen className="w-7 h-7 text-blue-600" />;
    }
  };

  const getCardThemeColors = (scheme: string) => {
    switch (scheme) {
      case 'blue':
        return {
          bgIcon: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800',
          badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
        };
      case 'emerald':
        return {
          bgIcon: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
          badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
        };
      case 'indigo':
        return {
          bgIcon: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
          badge: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300'
        };
      case 'cyan':
        return {
          bgIcon: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
          badge: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300'
        };
      case 'rose':
        return {
          bgIcon: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
          badge: 'bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300'
        };
      case 'amber':
        return {
          bgIcon: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
          badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300'
        };
      default:
        return {
          bgIcon: 'bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700',
          badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
        };
    }
  };

  return (
    <section id="learning-modules-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              <span>Interactive Curriculum</span>
            </div>
            <h2
              id="modules-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
              style={{ color: 'var(--text-main)' }}
            >
              Essential Digital Services Training
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Select any learning module to access beginner-friendly step-by-step instructions, official portal workflows, and safety alerts.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 md:mt-0 flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              id="filter-tab-all"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Modules ({modules.length})
            </button>
            <button
              id="filter-tab-id-services"
              onClick={() => setActiveCategory('id_services')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeCategory === 'id_services'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ID & Documents (3)
            </button>
            <button
              id="filter-tab-safety-skills"
              onClick={() => setActiveCategory('safety_skills')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeCategory === 'safety_skills'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Forms & Cyber Safety (3)
            </button>
          </div>
        </div>

        {/* Results Counter / Fallback Notification */}
        {searchQuery && (
          <div className="mb-5">
            {isNoMatchFallback ? (
              <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-base">💡</span>
                  <span>
                    No exact title matched <strong>"{searchQuery}"</strong>. All <strong>{displayModules.length} training modules</strong> are kept open below for you:
                  </span>
                </div>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                  (Check the search suggestions dropdown above for specific step lines)
                </span>
              </div>
            ) : (
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Showing {displayModules.length} module(s) matching "{searchQuery}"</span>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  Show All Modules
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grid of Learning Cards - Always stays visible so content never clears out */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayModules.map((module) => {
            const isCompleted = completedModuleIds.includes(module.id);
            const themeStyles = getCardThemeColors(module.colorScheme);

            return (
              <div
                key={module.id}
                id={`module-card-${module.id}`}
                className="rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group border relative hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: isCompleted ? '#10b981' : 'var(--border-color)',
                  boxShadow: 'var(--card-shadow)'
                }}
                onClick={() => onSelectModule(module)}
              >
                  {/* Top Status & Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-13 h-13 rounded-2xl flex items-center justify-center border shadow-xs ${themeStyles.bgIcon}`}
                        >
                          {getModuleIcon(module.iconName)}
                        </div>
                        <div>
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${themeStyles.badge}`}
                          >
                            {module.badge}
                          </span>
                        </div>
                      </div>

                      {isCompleted ? (
                        <span className="flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{module.estimatedMinutes} mins</span>
                        </span>
                      )}
                    </div>

                    {/* Card Title & Tagline */}
                    <h3
                      className="text-xl font-bold font-heading group-hover:text-blue-600 transition-colors leading-snug"
                      style={{ color: 'var(--text-main)' }}
                    >
                      {module.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                      {module.tagline}
                    </p>

                    {/* Preview Step Pills */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Key Steps Included ({module.steps.length}):
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {module.steps.slice(0, 3).map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <span className="w-4 h-4 rounded-full bg-blue-50 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                              {step.stepNumber}
                            </span>
                            <span className="truncate">{step.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Portal: {module.officialPortal}
                    </span>

                    <button
                      id={`btn-open-guide-${module.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectModule(module);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all flex items-center space-x-1.5 shadow-sm shadow-blue-500/20"
                    >
                      <span>Open Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
};
