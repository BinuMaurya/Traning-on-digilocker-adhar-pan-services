import React from 'react';
import { BookOpen, ShieldAlert, Heart, ExternalLink, Award } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  setCurrentTab: (tab: NavTab) => void;
  openVsCodeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openVsCodeModal }) => {
  return (
    <footer
      id="main-footer"
      className="mt-16 border-t transition-colors pt-12 pb-8"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Educational Disclaimer Box */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-slate-900 dark:text-white block">
              Official Educational & Academic Project Disclaimer:
            </strong>
            <p className="leading-relaxed">
              <strong>Digital Sarathi – Your Digital Life Guide</strong> is an educational initiative built strictly as a college <strong>Community Engagement Project (CEP)</strong>. It is <strong>NOT</strong> an official government website, and is not affiliated with UIDAI, MeitY, or the Income Tax Department. This website strictly uses demonstration mockups and sample data — it <strong>never</strong> collects, stores, or processes real Aadhaar numbers, PAN cards, OTPs, or passwords.
            </p>
          </div>
        </div>

        {/* 4-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-base font-heading text-slate-900 dark:text-white">
                Digital Sarathi
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Your trusted educational companion for DigiLocker, Aadhaar services, PAN cards, and cyber scam protection.
            </p>
            <p className="text-slate-400">
              Department of Computer Applications • Academic Year 2025–2026
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              Quick Sections
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentTab('learning');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  All 6 Learning Modules
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentTab('progress');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Progress Tracker & Certificate
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentTab('simulators');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Interactive Simulators
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Govt Portals (For Reference) */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              Authentic Government Portals
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://www.digilocker.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>DigiLocker (digilocker.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://myaadhaar.uidai.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>myAadhaar (uidai.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.incometax.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>Income Tax e-Filing (PAN)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>National Cybercrime Portal (1930)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Info & VS Code Exporter */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-xs">
              College CEP Submission
            </h4>
            <p className="text-slate-500">
              Designed for presentation and evaluation in Community Engagement Project (CEP) courses.
            </p>
            <button
              onClick={openVsCodeModal}
              className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 font-bold hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Download Standalone .html</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>
            © 2026 Digital Sarathi – Your Digital Life Guide. Built for College Community Engagement Project (CEP).
          </p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Learn • Practice • Grow</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">Safe & Verified Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
