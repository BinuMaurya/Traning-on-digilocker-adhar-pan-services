import React from 'react';
import {
  Users,
  GraduationCap,
  Target,
  HeartHandshake,
  CheckCircle2,
  BookOpen,
  Compass,
  Award
} from 'lucide-react';
import { CEP_PROJECT_INFO } from '../data/modulesData';

export const AboutCepSection: React.FC = () => {
  return (
    <section id="about-cep-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Higher Education Community Engagement</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            About the Community Engagement Project (CEP)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Digital Sarathi is an academic social innovation project conceived to promote inclusive digital citizenship across grassroots communities.
          </p>
        </div>

        {/* Project Mission Card */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-lg mb-10 transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                  {CEP_PROJECT_INFO.institution}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  AY {CEP_PROJECT_INFO.academicYear}
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-extrabold font-heading"
                style={{ color: 'var(--text-main)' }}
              >
                Bridging the Citizen Digital Divide Through Peer Learning
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {CEP_PROJECT_INFO.objective}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Community Focus Areas:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {CEP_PROJECT_INFO.outreachLocations.map((loc, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Pillar */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {CEP_PROJECT_INFO.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-center flex flex-col justify-center"
                >
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">
                    {m.number}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Student Team Members Section */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3
              className="text-xl sm:text-2xl font-bold font-heading"
              style={{ color: 'var(--text-main)' }}
            >
              CEP Student Project Team
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Four dedicated undergraduate and postgraduate students conducting research, creating visual guides, and driving grassroots digital literacy workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CEP_PROJECT_INFO.studentTeam.map((member, idx) => (
              <div
                key={idx}
                id={`team-member-${idx}`}
                className="rounded-3xl p-6 border transition-all text-center flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                <div>
                  {/* Avatar with initials */}
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
                    {member.imagePlaceholder}
                  </div>

                  <h4
                    className="text-base font-bold font-heading"
                    style={{ color: 'var(--text-main)' }}
                  >
                    {member.name}
                  </h4>

                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                    {member.role}
                  </span>

                  <p className="text-xs text-slate-500 mt-1">
                    {member.department}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed text-left">
                    {member.contribution}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
                  Roll ID: {member.studentId}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
