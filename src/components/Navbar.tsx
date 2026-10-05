import React from 'react';
import {
  BookOpen,
  Sun,
  Moon,
  Smartphone,
  Monitor,
  Menu,
  X,
  Search,
  Award,
  HelpCircle,
  Info,
  Layers,
  Code,
  Server,
  CreditCard
} from 'lucide-react';
import { NavTab, ThemeMode } from '../types';

interface NavbarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  isMobilePreview: boolean;
  setIsMobilePreview: (val: boolean) => void;
  openVsCodeModal: () => void;
  openSearch: () => void;
  progressPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  theme,
  toggleTheme,
  isMobilePreview,
  setIsMobilePreview,
  openVsCodeModal,
  openSearch,
  progressPercent
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNav = (tab: NavTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 shadow-md transition-colors"
      style={{
        background: 'var(--bg-header)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand Identity */}
          <div
            id="brand-logo-container"
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
                  Digital Sarathi
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-white/20 text-white rounded-full border border-white/30">
                  CEP 2026
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium tracking-wide">
                Your Digital Life Guide
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-link-home"
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'home'
                  ? 'bg-white/25 text-white shadow-sm font-semibold'
                  : 'text-blue-100 hover:bg-white/15 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-learning"
              onClick={() => handleNav('learning')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'learning'
                  ? 'bg-white/25 text-white shadow-sm font-semibold'
                  : 'text-blue-100 hover:bg-white/15 hover:text-white'
              }`}
            >
              Learning Modules
            </button>
            <button
              id="nav-link-progress"
              onClick={() => handleNav('progress')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'progress'
                  ? 'bg-white/25 text-white shadow-sm font-semibold'
                  : 'text-blue-100 hover:bg-white/15 hover:text-white'
              }`}
            >
              <span>My Progress</span>
              <span className="bg-emerald-400 text-slate-900 text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {progressPercent}%
              </span>
            </button>
            <button
              id="nav-link-simulators"
              onClick={() => handleNav('simulators')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                currentTab === 'simulators'
                  ? 'bg-white/25 text-white shadow-sm font-semibold'
                  : 'text-blue-100 hover:bg-white/15 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Practice</span>
            </button>
            <button
              id="nav-link-card-download"
              onClick={() => handleNav('card_download')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'card_download'
                  ? 'bg-emerald-500 text-white shadow-sm font-bold'
                  : 'text-emerald-200 hover:bg-white/15 hover:text-white font-medium'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-300" />
              <span>Aadhaar/PAN</span>
            </button>
            <button
              id="nav-link-quiz"
              onClick={() => handleNav('quiz')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'quiz'
                  ? 'bg-amber-400 text-slate-900 shadow-sm font-bold'
                  : 'text-amber-200 hover:bg-white/15 hover:text-white font-semibold'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Exam & Certificate</span>
            </button>
            <button
              id="nav-link-api"
              onClick={() => handleNav('api')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                currentTab === 'api'
                  ? 'bg-emerald-500 text-white shadow-sm font-bold'
                  : 'text-emerald-200 hover:bg-white/15 hover:text-white font-medium'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-emerald-300" />
              <span>Live API</span>
            </button>
            <button
              id="nav-link-faq"
              onClick={() => handleNav('faq')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'faq'
                  ? 'bg-white/25 text-white shadow-sm font-semibold'
                  : 'text-blue-100 hover:bg-white/15 hover:text-white'
              }`}
            >
              FAQ
            </button>
            <button
              id="nav-link-help"
              onClick={() => handleNav('help')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'help'
                  ? 'bg-white/25 text-white shadow-sm font-semibold'
                  : 'text-blue-100 hover:bg-white/15 hover:text-white'
              }`}
            >
              Help & Workshop
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'about'
                  ? 'bg-white/25 text-white shadow-sm font-semibold'
                  : 'text-blue-100 hover:bg-white/15 hover:text-white'
              }`}
            >
              About CEP
            </button>
          </nav>

          {/* Action Tools: Search, Theme Toggle, Mobile Mockup Switch & VS Code Code Exporter */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Search Button */}
            <button
              id="btn-open-search"
              onClick={openSearch}
              title="Search topics, modules & FAQs"
              aria-label="Search"
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors border border-white/20"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle with CSS Variables */}
            <button
              id="theme-mode-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode (CSS Variables)`}
              aria-label="Toggle theme mode"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-all border border-white/20 text-xs font-medium cursor-pointer"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-blue-100" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">Light</span>
                </>
              )}
            </button>

            {/* Phone App Mockup vs Full Desktop View Toggle */}
            <button
              id="toggle-mobile-preview"
              onClick={() => setIsMobilePreview(!isMobilePreview)}
              title={isMobilePreview ? "Switch to Full Desktop View" : "Simulate Mobile App Frame (as in photo)"}
              className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isMobilePreview
                  ? 'bg-white text-blue-800 border-white shadow-md'
                  : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
              }`}
            >
              {isMobilePreview ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>App Frame</span>
                </>
              )}
            </button>

            {/* VS Code & Standalone Exporter Button */}
            <button
              id="btn-open-vscode-guide"
              onClick={openVsCodeModal}
              title="Download standalone index.html & VS Code run instructions"
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs shadow-sm transition-all"
            >
              <Code className="w-3.5 h-3.5" />
              <span>VS Code / HTML</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="lg:hidden px-4 pt-2 pb-5 border-t border-white/20 space-y-1.5 shadow-xl transition-all"
          style={{ background: 'var(--bg-header-solid)' }}
        >
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'home' ? 'bg-white/25 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            Home Overview
          </button>
          <button
            onClick={() => handleNav('learning')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'learning' ? 'bg-white/25 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            All Learning Guides (6 Modules)
          </button>
          <button
            onClick={() => handleNav('progress')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              currentTab === 'progress' ? 'bg-white/25 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <span>My Learning Progress</span>
            <span className="bg-emerald-400 text-slate-950 text-xs px-2 py-0.5 rounded-full font-bold">
              {progressPercent}%
            </span>
          </button>
          <button
            onClick={() => handleNav('simulators')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'simulators' ? 'bg-white/25 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            Practice Simulators (Aadhaar, DigiLocker, PAN)
          </button>
          <button
            onClick={() => handleNav('card_download')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-bold flex items-center space-x-2 ${
              currentTab === 'card_download' ? 'bg-emerald-500 text-white font-semibold' : 'text-emerald-200 hover:bg-white/10'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-300" />
            <span>🪪 Aadhaar & PAN Soft-Copy Portal</span>
          </button>
          <button
            onClick={() => handleNav('quiz')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-bold flex items-center space-x-2 ${
              currentTab === 'quiz' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-amber-200 hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>CEP Exam & Verifiable Certificate</span>
          </button>
          <button
            onClick={() => handleNav('api')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 ${
              currentTab === 'api' ? 'bg-emerald-500 text-white font-semibold' : 'text-emerald-200 hover:bg-white/10'
            }`}
          >
            <Server className="w-4 h-4 text-emerald-300" />
            <span>Live Backend & REST API Explorer</span>
          </button>
          <button
            onClick={() => handleNav('faq')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'faq' ? 'bg-white/25 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={() => handleNav('help')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'help' ? 'bg-white/25 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            Help & Workshop Demo Request
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentTab === 'about' ? 'bg-white/25 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            About CEP & Student Team
          </button>

          <div className="pt-2 border-t border-white/20 flex items-center justify-between">
            <button
              onClick={openVsCodeModal}
              className="px-3 py-2 rounded-lg bg-amber-400 text-slate-900 font-bold text-xs flex items-center space-x-1.5"
            >
              <Code className="w-4 h-4" />
              <span>VS Code / Single HTML Export</span>
            </button>
            <button
              onClick={() => setIsMobilePreview(!isMobilePreview)}
              className="px-3 py-2 rounded-lg bg-white/20 text-white font-medium text-xs flex items-center space-x-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isMobilePreview ? 'Exit Frame' : 'App Frame'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
