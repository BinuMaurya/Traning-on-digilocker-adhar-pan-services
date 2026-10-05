export type ThemeMode = 'light' | 'dark';

export type NavTab = 'home' | 'learning' | 'progress' | 'simulators' | 'card_download' | 'quiz' | 'api' | 'faq' | 'help' | 'about';

export interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  safetyTip?: string;
  importantNote?: string;
  actionHint?: string;
}

export interface LearningModule {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  iconName: string;
  badge: string;
  colorScheme: 'blue' | 'indigo' | 'emerald' | 'amber' | 'cyan' | 'rose';
  estimatedMinutes: number;
  officialPortal: string;
  portalUrl: string;
  overview: string;
  steps: GuideStep[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface LearningActivity {
  id: string;
  moduleId: string;
  moduleName: string;
  title: string;
  description: string;
  category: 'DigiLocker' | 'Aadhaar' | 'PAN' | 'Forms' | 'Cyber Safety' | 'General';
  points: number;
}

export interface WorkshopRequest {
  id: string;
  organizerName: string;
  organization: string;
  contactNumber: string;
  email: string;
  targetAudience: string;
  expectedAttendees: number;
  preferredDate: string;
  selectedTopics: string[];
  locationCity: string;
  submittedAt: string;
}
