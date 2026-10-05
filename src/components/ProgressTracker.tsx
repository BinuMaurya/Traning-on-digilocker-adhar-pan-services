import React from 'react';
import {
  CheckCircle2,
  Circle,
  Award,
  RotateCcw,
  Sparkles,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { LearningActivity } from '../types';

interface ProgressTrackerProps {
  activities: LearningActivity[];
  completedActivityIds: string[];
  onToggleActivity: (id: string) => void;
  onResetProgress: () => void;
  learnerName: string;
  progressPercent: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  activities,
  completedActivityIds,
  onToggleActivity,
  onResetProgress,
  learnerName,
  progressPercent
}) => {
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'completed'>('all');
  const [showCertificate, setShowCertificate] = React.useState(false);

  const totalPoints = activities.reduce((acc, curr) => acc + curr.points, 0);
  const earnedPoints = activities
    .filter((a) => completedActivityIds.includes(a.id))
    .reduce((acc, curr) => acc + curr.points, 0);

  const filteredActivities = activities.filter((act) => {
    const isDone = completedActivityIds.includes(act.id);
    if (filter === 'completed') return isDone;
    if (filter === 'pending') return !isDone;
    return true;
  });

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="progress-tracker-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 mb-2 border border-emerald-200 dark:border-emerald-800">
            <Award className="w-3.5 h-3.5" />
            <span>Community Engagement Tracker</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            My Learning Progress & Skills Checklist
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Track your hands-on milestones across DigiLocker, Aadhaar, and PAN cards. Checking items automatically updates your progress and unlocks your Digital Citizen Certificate.
          </p>
        </div>

        {/* Top Progress Dashboard Card */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-lg mb-8 transition-all relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          {/* Top color gradient highlight */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Metrics */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    Learner Profile: {learnerName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {completedActivityIds.length} of {activities.length} hands-on competencies completed
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">
                    {progressPercent}%
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Overall
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 rounded-full transition-all duration-700 ease-out shadow-xs"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>0% (Beginner)</span>
                  <span>50% (Competent)</span>
                  <span>100% (Certified Sarathi)</span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-500 font-medium">Completed</span>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {completedActivityIds.length} Tasks
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-500 font-medium">Pending</span>
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {activities.length - completedActivityIds.length} Tasks
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-500 font-medium">Skill Points</span>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {earnedPoints} / {totalPoints}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Action: Certificate Teaser */}
            <div className="lg:col-span-4 rounded-2xl p-5 bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col justify-between space-y-4 shadow-md">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-amber-300" />
                </div>
                <h4 className="text-base font-bold leading-snug">
                  Digital Sarathi Certificate
                </h4>
                <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                  Earn your recognized college Community Engagement Project (CEP) completion badge to print or show.
                </p>
              </div>

              <button
                id="btn-view-certificate"
                onClick={() => setShowCertificate(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{progressPercent >= 70 ? 'Claim Certificate' : 'Preview Certificate'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Checklist Controls & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Filter Tasks:</span>
            <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All ({activities.length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filter === 'completed'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Completed ({completedActivityIds.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filter === 'pending'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Pending ({activities.length - completedActivityIds.length})
              </button>
            </div>
          </div>

          <button
            onClick={onResetProgress}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center space-x-1 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>

        {/* Task Checklist Cards */}
        <div className="space-y-3">
          {filteredActivities.map((activity) => {
            const isDone = completedActivityIds.includes(activity.id);

            return (
              <div
                key={activity.id}
                id={`task-item-${activity.id}`}
                onClick={() => onToggleActivity(activity.id)}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer select-none ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <button
                    type="button"
                    className="mt-0.5 text-slate-400 flex-shrink-0 transition-colors"
                    aria-label={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-blue-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          activity.category === 'DigiLocker'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                            : activity.category === 'Aadhaar'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                            : activity.category === 'PAN'
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {activity.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        +{activity.points} pts
                      </span>
                    </div>

                    <h4
                      className={`text-sm sm:text-base font-bold mt-1 ${
                        isDone
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {activity.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {activity.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl flex-shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-200'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}
                >
                  {isDone ? 'Completed' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div
              className="w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl p-6 sm:p-8 relative"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              {/* Certificate Border Aesthetic */}
              <div className="border-4 border-double border-blue-600/60 p-6 sm:p-8 rounded-2xl text-center relative bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20">
                {/* Emblem */}
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-lg mb-3">
                  <Award className="w-10 h-10 text-amber-300" />
                </div>

                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-600 dark:text-blue-400">
                  College Community Engagement Project (CEP)
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                  Certificate of Digital Competency
                </h3>

                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  This certifies that
                </p>

                <div className="my-4 pb-2 border-b-2 border-blue-400 max-w-md mx-auto">
                  <span className="text-2xl sm:text-3xl font-bold font-heading text-blue-700 dark:text-blue-300">
                    {learnerName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  has successfully demonstrated operational knowledge and cyber safety principles in{' '}
                  <strong>DigiLocker document management</strong>,{' '}
                  <strong>Aadhaar identity services</strong>, and{' '}
                  <strong>PAN card processing</strong> under the <em>Digital Sarathi Initiative</em>.
                </p>

                {/* Metrics ribbon */}
                <div className="my-6 grid grid-cols-3 gap-2 max-w-sm mx-auto text-xs">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 uppercase">Score</span>
                    <p className="font-bold text-blue-700 dark:text-blue-400">{progressPercent}%</p>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 uppercase">Status</span>
                    <p className="font-bold text-emerald-600">Verified</p>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 uppercase">Year</span>
                    <p className="font-bold text-slate-700 dark:text-slate-300">2026</p>
                  </div>
                </div>

                {/* Signatures & Stamp */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-end justify-between text-xs text-slate-500">
                  <div className="text-left">
                    <p className="font-serif italic font-bold text-slate-700 dark:text-slate-300 text-sm">
                      CEP Faculty Mentor
                    </p>
                    <span className="text-[11px]">Dept of Computer Applications</span>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-emerald-600/80 flex flex-col items-center justify-center text-[9px] font-bold text-emerald-700 dark:text-emerald-400 rotate-[-12deg] bg-emerald-50 dark:bg-emerald-950/40">
                    <span>DIGITAL</span>
                    <span>SARATHI</span>
                    <span>VERIFIED</span>
                  </div>
                  <div className="text-right">
                    <p className="font-serif italic font-bold text-slate-700 dark:text-slate-300 text-sm">
                      Student Lead
                    </p>
                    <span className="text-[11px]">Rahul Sharma</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Close Window
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrintCertificate}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors flex items-center space-x-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
