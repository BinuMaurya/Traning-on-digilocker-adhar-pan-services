import React from 'react';
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Share2,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';
import { LearningModule } from '../types';

interface ModuleDetailModalProps {
  module: LearningModule | null;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (moduleId: string) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
  isCompleted,
  onToggleComplete
}) => {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<{ [key: number]: number }>({});
  const [showQuizFeedback, setShowQuizFeedback] = React.useState(false);

  if (!module) return null;

  const currentStep = module.steps[activeStepIndex] || module.steps[0];

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleNextStep = () => {
    if (activeStepIndex < module.steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="module-detail-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
    >
      <div
        id="module-detail-container"
        className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[92vh]"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)'
        }}
      >
        {/* Top Header Banner */}
        <div
          className="p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative"
          style={{ background: 'var(--bg-header)' }}
        >
          <div className="flex items-center space-x-3.5">
            <button
              id="btn-back-to-modules"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors flex items-center space-x-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-blue-100">
                  {module.badge}
                </span>
                <span className="text-xs text-blue-200">
                  Step {activeStepIndex + 1} of {module.steps.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading mt-0.5">
                {module.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-toggle-module-complete"
              onClick={() => onToggleComplete(module.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm ${
                isCompleted
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-white text-blue-800 hover:bg-blue-50'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark as Done'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 overflow-x-auto flex items-center space-x-2 scrollbar-none">
          {module.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {step.stepNumber}
                </span>
                <span className="truncate max-w-[180px] sm:max-w-xs">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Step Main Card */}
          <div
            className="rounded-2xl p-5 sm:p-6 border transition-all"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                {currentStep.stepNumber}
              </span>
              <div>
                <span className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                  Instruction Phase
                </span>
                <h3
                  className="text-lg sm:text-xl font-bold font-heading"
                  style={{ color: 'var(--text-main)' }}
                >
                  {currentStep.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-4">
              {currentStep.description}
            </p>

            {/* Step Checkpoints / Bullet Details */}
            <div className="space-y-2.5 my-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                Action Steps:
              </h4>
              <ul className="space-y-2.5">
                {currentStep.details.map((detail, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Tip Warning Box */}
            {currentStep.safetyTip && (
              <div className="mt-4 rounded-xl p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start space-x-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-rose-900 dark:text-rose-100">
                    Critical Safety Warning:
                  </strong>
                  <span>{currentStep.safetyTip}</span>
                </div>
              </div>
            )}

            {/* Helpful Note Box */}
            {currentStep.importantNote && (
              <div className="mt-3 rounded-xl p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-200 text-xs sm:text-sm flex items-start space-x-2.5">
                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-blue-900 dark:text-blue-100">
                    Pro-Tip:
                  </strong>
                  <span>{currentStep.importantNote}</span>
                </div>
              </div>
            )}
          </div>

          {/* Dos & Don'ts Comparison Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-4 sm:p-5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Recommended Best Practices (DOs)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {module.dosAndDonts.dos.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-4 sm:p-5 bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
              <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-300 font-bold text-sm mb-3">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Things to Avoid (DON'Ts)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {module.dosAndDonts.donts.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-600 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mini Interactive Knowledge Check Quiz */}
          {module.quizQuestions && module.quizQuestions.length > 0 && (
            <div
              className="rounded-2xl p-5 sm:p-6 border"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Module Quiz: Test Your Understanding
                  </h4>
                </div>
                <span className="text-xs text-slate-500">
                  {module.quizQuestions.length} Questions
                </span>
              </div>

              <div className="space-y-4">
                {module.quizQuestions.map((quiz, qIdx) => {
                  const userAns = selectedAnswers[qIdx];
                  const isAnswered = userAns !== undefined;

                  return (
                    <div
                      key={qIdx}
                      className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5"
                    >
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {qIdx + 1}. {quiz.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {quiz.options.map((option, optIdx) => {
                          const isSelected = userAns === optIdx;
                          const isCorrect = quiz.correctIndex === optIdx;

                          let btnStyle = 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700';

                          if (isAnswered) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-blue-50 border-blue-500 text-blue-700 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(qIdx, optIdx)}
                              className={`text-left p-2.5 rounded-lg text-xs border transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {isAnswered && isCorrect && (
                                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />
                              )}
                              {isAnswered && isSelected && !isCorrect && (
                                <X className="w-4 h-4 text-rose-600 flex-shrink-0 ml-1" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700">
                          <strong>Explanation:</strong> {quiz.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Official Portal Reference Link */}
          <div className="rounded-xl p-4 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-slate-600 dark:text-slate-300">
                Official Govt Portal:{' '}
                <strong className="text-blue-700 dark:text-blue-300 font-semibold">
                  {module.officialPortal}
                </strong>
              </span>
            </div>
            <a
              href={module.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center space-x-1"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
          <button
            onClick={handlePrevStep}
            disabled={activeStepIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
            }`}
          >
            ← Previous Step
          </button>

          <span className="text-xs text-slate-500 font-semibold">
            {activeStepIndex + 1} / {module.steps.length} Steps
          </span>

          {activeStepIndex < module.steps.length - 1 ? (
            <button
              onClick={handleNextStep}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center space-x-1 shadow-sm"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isCompleted) onToggleComplete(module.id);
                onClose();
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center space-x-1 shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Finish Module</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
