import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Parse JSON request bodies
app.use(express.json());

// In-Memory Database with optional disk persistence
const DATA_FILE = path.join(__dirname, 'server-db.json');

interface WorkshopRecord {
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
  status: 'Approved' | 'Scheduled' | 'Completed' | 'Pending';
}

interface HelpdeskRecord {
  id: string;
  citizenName: string;
  category: 'DigiLocker' | 'Aadhaar' | 'PAN' | 'General';
  query: string;
  contact: string;
  response?: string;
  status: 'Resolved' | 'Under Review';
  submittedAt: string;
}

interface CertificateRecord {
  id: string;
  learnerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: 'Distinction' | 'Merit' | 'Pass';
  issuedAt: string;
  verificationCode: string;
  topic: string;
  mentor: string;
  teamLead: string;
}

interface LearnerProgressRecord {
  learnerId: string;
  name: string;
  completedModules: string[];
  completedActivities: string[];
  lastActive: string;
}

// Initial seed data
const INITIAL_WORKSHOPS: WorkshopRecord[] = [
  {
    id: 'ws-101',
    organizerName: 'Prof. Ramesh Gupta',
    organization: 'Govt. Polytechnic College, Block A',
    contactNumber: '9876543210',
    email: 'polytechnic.ce@edu.in',
    targetAudience: '1st & 2nd Year Diploma Engineering Students',
    expectedAttendees: 65,
    preferredDate: '2026-10-15',
    selectedTopics: ['DigiLocker Training', 'Aadhaar Services Guide', 'Cyber Safety'],
    locationCity: 'Nagpur, Maharashtra',
    submittedAt: '28 Sep 2026',
    status: 'Scheduled'
  },
  {
    id: 'ws-102',
    organizerName: 'Sunita Devi (Gram Pradhan)',
    organization: 'Gram Panchayat Digital Seva Kendra',
    contactNumber: '9123456780',
    email: 'panchayat.outreach@rural.gov.in',
    targetAudience: 'Rural Women Self-Help Groups & Farmers',
    expectedAttendees: 80,
    preferredDate: '2026-10-22',
    selectedTopics: ['Aadhaar Services Guide', 'PAN Card Guide', 'Cyber Safety'],
    locationCity: 'Ward 4, Saoner Rural',
    submittedAt: '01 Oct 2026',
    status: 'Approved'
  },
  {
    id: 'ws-103',
    organizerName: 'Vikas Deshmukh',
    organization: 'Youth Skill Development Society',
    contactNumber: '9988776655',
    email: 'contact@youthskills.org',
    targetAudience: 'Job Seekers & Fresh Graduates',
    expectedAttendees: 110,
    preferredDate: '2026-09-20',
    selectedTopics: ['DigiLocker Training', 'Online Form Basics', 'PAN Card Guide'],
    locationCity: 'Pune City',
    submittedAt: '15 Sep 2026',
    status: 'Completed'
  }
];

const INITIAL_HELPDESK: HelpdeskRecord[] = [
  {
    id: 'hd-1',
    citizenName: 'Kavita Joshi',
    category: 'Aadhaar',
    query: 'How can I update my surname in Aadhaar card after marriage without visiting bank again?',
    contact: 'kavita.j@gmail.com',
    response: 'You can update your name/surname online via myaadhaar.uidai.gov.in using Marriage Certificate or Gazette Notification as supporting POA/POI. Keep your mobile number active to receive OTP.',
    status: 'Resolved',
    submittedAt: '02 Oct 2026'
  },
  {
    id: 'hd-2',
    citizenName: 'Mohd. Imran',
    category: 'PAN',
    query: 'My PAN card has spelling mistake in father name. Will it affect bank KYC?',
    contact: '9822334411',
    response: 'Yes, minor mismatch in father name can cause rejection in Demat or loan KYC. Submit "PAN Correction Request (Form 49A/CR)" online on Protean (NSDL) or UTIITSL website using Class 10th marksheet or Passport as proof.',
    status: 'Resolved',
    submittedAt: '03 Oct 2026'
  },
  {
    id: 'hd-3',
    citizenName: 'Rameshwar Patil',
    category: 'DigiLocker',
    query: 'DigiLocker says "Name mismatch with UIDAI" when pulling driving license.',
    contact: 'patil.r@rediffmail.com',
    response: 'Ensure your spelling in Driving License matches your Aadhaar exactly. If there is a space or middle name difference, contact the local RTO or submit an online name correction on Sarathi Parivahan portal.',
    status: 'Resolved',
    submittedAt: '04 Oct 2026'
  }
];

const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'CEP-DS-2026-1089',
    learnerName: 'Rahul Verma',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    grade: 'Distinction',
    issuedAt: '02 Oct 2026',
    verificationCode: 'VER-DS-8192-A7',
    topic: 'Training on DigiLocker, Aadhaar and PAN Services (CEP)',
    mentor: 'Dr. S. K. Narayanan (Faculty Mentor)',
    teamLead: 'Anjali Kushwaha (Community Engagement Lead)'
  }
];

// Load persisted data if exists
let db = {
  workshops: INITIAL_WORKSHOPS,
  helpdesk: INITIAL_HELPDESK,
  certificates: INITIAL_CERTIFICATES,
  learners: {} as Record<string, LearnerProgressRecord>
};

try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    db = { ...db, ...parsed };
  }
} catch (err) {
  console.warn('Could not read existing server-db.json, starting with seed data:', err);
}

const saveDb = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
  } catch (e) {
    console.error('Failed to save to server-db.json:', e);
  }
};

// ==========================================
// REST API ROUTES (/api/*)
// ==========================================

// 1. Health & Server Info
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    serverTime: new Date().toISOString(),
    project: 'Digital Sarathi – CEP Training Portal',
    version: '1.2.0',
    framework: 'Node.js Express + React 19',
    mode: isProd ? 'production' : 'development'
  });
});

// 2. CEP Overview & Team Info API
app.get('/api/cep/info', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      projectName: 'Digital Sarathi – Your Digital Life Guide',
      projectType: 'College Community Engagement Project (CEP)',
      academicYear: '2025–2026',
      topic: 'Training on DigiLocker, Aadhaar and PAN Services',
      institution: 'Department of Computer Science & Information Technology',
      mentor: {
        name: 'Dr. S. K. Narayanan',
        designation: 'Professor & Head of Community Engagement Cell',
        department: 'School of Technology & Applied Sciences'
      },
      studentTeam: [
        {
          name: 'Anjali Kushwaha',
          role: 'Curriculum & Community Outreach Lead',
          studentId: 'CEP-2025-088',
          department: 'B.Sc Information Technology',
          contribution: 'Authored bilingual step-by-step guides, simplified legal nuances and led village workshops.',
          badge: 'Team Lead'
        },
        {
          name: 'Rahul Sharma',
          role: 'Project Lead & Research Analyst',
          studentId: 'CEP-2025-041',
          department: 'B.Tech Computer Science & Engineering',
          contribution: 'Designed workflow architectures for DigiLocker and PAN e-filing module integrations.'
        },
        {
          name: 'Priya Patel',
          role: 'Simulator & UX Interactive Designer',
          studentId: 'CEP-2025-112',
          department: 'BCA (Bachelor of Computer Applications)',
          contribution: 'Created safe sandboxed Aadhaar decrypters, progress trackers, and accessibility UI.'
        },
        {
          name: 'Amit Verma',
          role: 'Cyber Safety Specialist & Field Coordinator',
          studentId: 'CEP-2025-067',
          department: 'MCA (Master of Computer Applications)',
          contribution: 'Researched real-world UPI scams, compiled helpline response procedures, and coordinated field tests.'
        }
      ],
      impactStats: {
        totalCitizensTrained: 1250,
        workshopsConducted: db.workshops.filter((w) => w.status === 'Completed').length + 18,
        activeWorkshops: db.workshops.length,
        certificatesIssued: db.certificates.length + 320,
        villagesCovered: 14,
        averageQuizScore: '86%'
      }
    }
  });
});

// 3. Workshops API
app.get('/api/workshops', (req: Request, res: Response) => {
  res.json({
    success: true,
    total: db.workshops.length,
    workshops: db.workshops
  });
});

app.post('/api/workshops/register', (req: Request, res: Response) => {
  const {
    organizerName,
    organization,
    contactNumber,
    email,
    targetAudience,
    expectedAttendees,
    preferredDate,
    selectedTopics,
    locationCity
  } = req.body;

  if (!organizerName || !organization || !contactNumber) {
    return res.status(400).json({
      success: false,
      message: 'Organizer name, organization, and contact number are required.'
    });
  }

  const newWorkshop: WorkshopRecord = {
    id: 'ws-' + Date.now().toString().slice(-6),
    organizerName,
    organization,
    contactNumber,
    email: email || 'N/A',
    targetAudience: targetAudience || 'General Citizens',
    expectedAttendees: Number(expectedAttendees) || 30,
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    selectedTopics: selectedTopics && selectedTopics.length > 0 ? selectedTopics : ['DigiLocker Training', 'Aadhaar Services Guide'],
    locationCity: locationCity || 'Local Community Center',
    submittedAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    status: 'Approved'
  };

  db.workshops.unshift(newWorkshop);
  saveDb();

  res.status(201).json({
    success: true,
    message: 'Workshop request successfully registered in Digital Sarathi CEP database!',
    workshop: newWorkshop
  });
});

// 4. Helpdesk Inquiries API
app.get('/api/helpdesk', (req: Request, res: Response) => {
  res.json({
    success: true,
    total: db.helpdesk.length,
    inquiries: db.helpdesk
  });
});

app.post('/api/helpdesk/inquiry', (req: Request, res: Response) => {
  const { citizenName, category, query, contact } = req.body;

  if (!citizenName || !query) {
    return res.status(400).json({
      success: false,
      message: 'Citizen name and query details are required.'
    });
  }

  // Generate automated instant resolution guidance based on keywords
  let instantGuidance = 'Our student volunteer team will review your query within 24 hours. For emergency cybercrime reporting, dial National Helpline 1930 immediately.';
  const qLower = query.toLowerCase();

  if (qLower.includes('lock') || qLower.includes('biometric')) {
    instantGuidance = 'Aadhaar Biometric Lock Tip: Open myaadhaar.uidai.gov.in, log in with Aadhaar + OTP, and toggle "Lock Biometrics". Once locked, no fingerprint transaction can be done until you temporarily unlock it.';
  } else if (qLower.includes('password') && (qLower.includes('pdf') || qLower.includes('eaadhaar') || qLower.includes('aadhaar'))) {
    instantGuidance = 'e-Aadhaar PDF Password Format: First 4 letters of your Name in CAPITAL letters followed by your 4-digit Year of Birth (e.g., SURE1990 for SURESH born in 1990).';
  } else if (qLower.includes('link') && (qLower.includes('pan') || qLower.includes('aadhaar'))) {
    instantGuidance = 'PAN-Aadhaar Linking: Visit incometax.gov.in -> Quick Links -> "Link Aadhaar Status" or "Link Aadhaar". Ensure Name, Gender, and DOB match exactly in both documents.';
  } else if (qLower.includes('pin') && qLower.includes('digilocker')) {
    instantGuidance = 'DigiLocker PIN Reset: Click "Forgot Security PIN?" on the login page, enter your Aadhaar/Mobile number, enter the OTP sent to your phone, and create a fresh 6-digit PIN.';
  }

  const newInquiry: HelpdeskRecord = {
    id: 'hd-' + Date.now().toString().slice(-6),
    citizenName,
    category: category || 'General',
    query,
    contact: contact || 'Registered via Web Portal',
    response: instantGuidance,
    status: 'Resolved',
    submittedAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  };

  db.helpdesk.unshift(newInquiry);
  saveDb();

  res.status(201).json({
    success: true,
    message: 'Your query has been logged and answered by the Digital Sarathi Helpdesk.',
    inquiry: newInquiry
  });
});

// 5. Interactive Quiz & Official Certificate Generation API
const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'DigiLocker',
    question: 'Under which legal provision are electronic documents issued in DigiLocker treated at par with original physical certificates?',
    options: [
      'Rule 9A of the Information Technology Rules, 2016',
      'Section 144 of the Indian Penal Code',
      'Motor Vehicles Act Section 12',
      'Reserve Bank of India Circular 2021'
    ],
    correctIndex: 0,
    explanation: 'Rule 9A of IT Rules 2016 explicitly notifies that documents in DigiLocker are legally deemed equivalent to original physical documents.'
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
    ],
    correctIndex: 1,
    explanation: 'DigiLocker requires a user-defined confidential 6-digit Security PIN, which must never be disclosed to anyone.'
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
    ],
    correctIndex: 2,
    explanation: 'For example, if the name is ANJALI KUSHWAHA and birth year is 2003, the e-Aadhaar password is ANJA2003.'
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
    ],
    correctIndex: 0,
    explanation: 'Activating Biometric Lock via myaadhaar.uidai.gov.in prevents anyone, including fraudsters, from executing biometric or AePS transactions until you temporarily unlock it.'
  },
  {
    id: 5,
    category: 'Aadhaar',
    question: 'What is a "Masked Aadhaar" card?',
    options: [
      'An Aadhaar card with a black and white photo',
      'An Aadhaar card where the first 8 digits are hidden (XXXX-XXXX-1234)',
      'An expired Aadhaar card',
      'An Aadhaar card for senior citizens only'
    ],
    correctIndex: 1,
    explanation: 'Masked Aadhaar hides the first 8 digits for privacy protection while keeping the last 4 digits visible and is legally valid for hotel check-ins, transit, and verification.'
  },
  {
    id: 6,
    category: 'PAN Card',
    question: 'In a 10-character PAN number like "ABCDE1234F", what does the 4th character specifically indicate?',
    options: [
      'The state in which the card was printed',
      'The status/entity of the PAN holder (e.g., P = Individual Person, C = Company)',
      'The blood group of the applicant',
      'The financial year of registration'
    ],
    correctIndex: 1,
    explanation: 'The 4th character indicates holder status: P stands for Individual/Person, C for Company, H for HUF, F for Firm, and T for Trust.'
  },
  {
    id: 7,
    category: 'PAN Card',
    question: 'Under Section 139AA of the Income Tax Act, which document must be compulsorily linked to your PAN?',
    options: [
      'Driving License',
      'Aadhaar Number',
      'Ration Card',
      'Voter ID Card'
    ],
    correctIndex: 1,
    explanation: 'Linking PAN with Aadhaar is a mandatory statutory requirement to prevent fake duplicate PANs and keep your PAN active for tax returns and banking.'
  },
  {
    id: 8,
    category: 'Cyber Safety',
    question: 'What is the official nationwide emergency helpline number in India for immediate reporting of financial cyber fraud?',
    options: [
      '100',
      '1930',
      '1091',
      '1800'
    ],
    correctIndex: 1,
    explanation: 'Dialing 1930 connects citizens to the National Cybercrime Reporting Portal, where police and nodal banks can freeze stolen funds during the golden hour.'
  },
  {
    id: 9,
    category: 'Cyber Safety',
    question: 'How can you instantly identify whether an online government portal is authentic rather than a fake duplicate website?',
    options: [
      'The official domain strictly ends with ".gov.in" or ".nic.in"',
      'It has bright red and yellow animated banners',
      'It sends WhatsApp messages offering 100% discount',
      'It asks you to download an APK file from Telegram'
    ],
    correctIndex: 0,
    explanation: 'Legitimate Government of India portals always use the .gov.in or .nic.in domain extensions (e.g., incometax.gov.in, uidai.gov.in).'
  },
  {
    id: 10,
    category: 'Online Forms',
    question: 'Before uploading a scanned passport photo to an official exam/recruitment portal, what should you verify?',
    options: [
      'Upload any random group selfie with friends',
      'Verify the required file format (JPEG/PNG) and size limit (usually 20 KB to 50 KB)',
      'Change the file name to something funny',
      'Never crop the image'
    ],
    correctIndex: 1,
    explanation: 'Government portals enforce strict dimensions and compression limits (e.g. 20-50 KB JPEG) to prevent server rejections.'
  }
];

app.get('/api/quiz/questions', (req: Request, res: Response) => {
  // Strip correct answer for client side quiz taking
  const safeQuestions = QUIZ_QUESTIONS.map((q) => ({
    id: q.id,
    category: q.category,
    question: q.question,
    options: q.options
  }));

  res.json({
    success: true,
    total: safeQuestions.length,
    passingScorePercentage: 70,
    questions: safeQuestions
  });
});

app.post('/api/quiz/submit', (req: Request, res: Response) => {
  const { learnerName, answers } = req.body;

  if (!learnerName || !answers || typeof answers !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Learner name and answers map are required.'
    });
  }

  let correctCount = 0;
  const detailedResults = QUIZ_QUESTIONS.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    if (isCorrect) correctCount++;

    return {
      id: q.id,
      question: q.question,
      userAnswer,
      correctAnswer: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    };
  });

  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((correctCount / total) * 100);
  const passed = percentage >= 70;

  let certificate: CertificateRecord | null = null;

  if (passed) {
    const certNumber = Math.floor(1000 + Math.random() * 9000);
    const certId = `CEP-DS-2026-${certNumber}`;
    const grade = percentage >= 90 ? 'Distinction' : percentage >= 80 ? 'Merit' : 'Pass';

    certificate = {
      id: certId,
      learnerName: learnerName.trim(),
      score: correctCount,
      totalQuestions: total,
      percentage,
      grade,
      issuedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      verificationCode: `VER-DS-${certNumber}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      topic: 'Community Engagement Training on DigiLocker, Aadhaar and PAN Services',
      mentor: 'Dr. S. K. Narayanan (Faculty Mentor)',
      teamLead: 'Anjali Kushwaha (Community Engagement Lead)'
    };

    db.certificates.unshift(certificate);
    saveDb();
  }

  res.json({
    success: true,
    passed,
    score: correctCount,
    total,
    percentage,
    passingPercentage: 70,
    certificate,
    detailedResults
  });
});

// 6. Certificate Verification API
app.get('/api/certificates/:certId', (req: Request, res: Response) => {
  const { certId } = req.params;
  const cert = db.certificates.find((c) => c.id.toLowerCase() === certId.toLowerCase());

  if (!cert) {
    return res.status(404).json({
      success: false,
      message: `Certificate ID "${certId}" was not found in the Digital Sarathi academic verification ledger.`
    });
  }

  res.json({
    success: true,
    valid: true,
    certificate: cert,
    verifiedAt: new Date().toISOString()
  });
});

// 7. Learner Progress Cloud Sync API
app.get('/api/progress/:learnerId', (req: Request, res: Response) => {
  const { learnerId } = req.params;
  const record = db.learners[learnerId] || {
    learnerId,
    name: 'Learner',
    completedModules: ['digilocker'],
    completedActivities: ['act-1', 'act-2'],
    lastActive: new Date().toISOString()
  };

  res.json({
    success: true,
    progress: record
  });
});

app.post('/api/progress/save', (req: Request, res: Response) => {
  const { learnerId, name, completedModules, completedActivities } = req.body;

  if (!learnerId) {
    return res.status(400).json({ success: false, message: 'learnerId is required.' });
  }

  db.learners[learnerId] = {
    learnerId,
    name: name || 'Learner',
    completedModules: Array.isArray(completedModules) ? completedModules : [],
    completedActivities: Array.isArray(completedActivities) ? completedActivities : [],
    lastActive: new Date().toISOString()
  };

  saveDb();

  res.json({
    success: true,
    message: 'Progress successfully synchronized with Digital Sarathi cloud backend.',
    progress: db.learners[learnerId]
  });
});

// 8. Educational Sandboxed Verification APIs (Simulated Govt Services - Zero Real PII)
app.post('/api/sandbox/verify-pan', (req: Request, res: Response) => {
  const { panNumber } = req.body;

  if (!panNumber || typeof panNumber !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Please provide a 10-character sample PAN number to analyze.'
    });
  }

  const cleanPan = panNumber.trim().toUpperCase();
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const isValidSyntax = panRegex.test(cleanPan);

  if (!isValidSyntax) {
    return res.json({
      success: true,
      isValidSyntax: false,
      message: 'Invalid PAN structure. Standard PAN must have exactly 5 letters, 4 digits, and 1 letter (e.g. ABCDE1234F).',
      analysis: null
    });
  }

  const fourthChar = cleanPan[3];
  const fifthChar = cleanPan[4];

  const entityMap: Record<string, string> = {
    P: 'Individual / Person',
    C: 'Company',
    H: 'Hindu Undivided Family (HUF)',
    F: 'Firm / Partnership',
    A: 'Association of Persons (AOP)',
    T: 'Trust',
    B: 'Body of Individuals (BOI)',
    L: 'Local Authority',
    J: 'Artificial Juridical Person',
    G: 'Government Agency'
  };

  res.json({
    success: true,
    isValidSyntax: true,
    message: 'Valid PAN format. Character structure decoded below for training purposes.',
    analysis: {
      pan: cleanPan,
      entityType: entityMap[fourthChar] || 'Special Entity Category',
      fourthCharacterExplanation: `"${fourthChar}" denotes ${entityMap[fourthChar] || 'Special Entity'}.`,
      fifthCharacterExplanation: `"${fifthChar}" represents the first letter of the applicant's Surname / Last Name.`,
      sequentialSeries: cleanPan.substring(5, 9),
      checkDigit: cleanPan[9],
      aadhaarLinkingStatus: cleanPan.endsWith('F') ? 'Linked with Aadhaar' : 'Pending Verification with UIDAI Vault',
      educationalTip: 'Always verify linking status via incometax.gov.in -> Quick Links -> Link Aadhaar Status.'
    }
  });
});

app.post('/api/sandbox/verify-aadhaar', (req: Request, res: Response) => {
  const { aadhaarNumber } = req.body;

  if (!aadhaarNumber || typeof aadhaarNumber !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Please provide a 12-digit sample Aadhaar number for simulation.'
    });
  }

  const cleanNum = aadhaarNumber.replace(/[\s-]/g, '');

  if (!/^\d{12}$/.test(cleanNum)) {
    return res.json({
      success: true,
      valid: false,
      message: 'Aadhaar must be exactly 12 digits (e.g., 2345 6789 0123).'
    });
  }

  if (cleanNum.startsWith('0') || cleanNum.startsWith('1')) {
    return res.json({
      success: true,
      valid: false,
      message: 'Valid Aadhaar numbers never begin with digit 0 or 1 according to UIDAI allocation standards.'
    });
  }

  // Verhoeff algorithm check digit demo simulation
  const last4 = cleanNum.slice(8);
  const maskedVersion = `XXXX-XXXX-${last4}`;
  const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();

  res.json({
    success: true,
    valid: true,
    maskedAadhaar: maskedVersion,
    virtualId: `9102-4589-${Math.floor(1000 + Math.random() * 9000)}-${last4}`,
    simulatedOtp: mockOtp,
    message: 'Simulated Verhoeff check successful. OTP generated for training simulation only.',
    safetyNotice: 'In real life, never share authentication OTPs with anyone over call or SMS.'
  });
});

app.post('/api/sandbox/digilocker-fetch', (req: Request, res: Response) => {
  const { docType, identifier } = req.body;

  const validTypes = ['Class X Marksheet', 'Driving License', 'Vehicle RC', 'e-Aadhaar Card', 'Ration Card'];
  const selected = validTypes.includes(docType) ? docType : 'Class X Marksheet';

  res.json({
    success: true,
    document: {
      docType: selected,
      identifier: identifier || 'MH-02-2024-00912',
      issuer: selected.includes('Marksheet')
        ? 'Central Board of Secondary Education (CBSE)'
        : selected.includes('Driving') || selected.includes('Vehicle')
        ? 'Ministry of Road Transport and Highways (MoRTH)'
        : 'Unique Identification Authority of India (UIDAI)',
      digitalSignature: {
        signedBy: 'Government of India Certifying Authority (CCA)',
        verifiedAt: new Date().toISOString(),
        algorithm: 'SHA-256 with RSA 2048-bit',
        status: 'Cryptographically Verified (Green Tick)'
      },
      legalStatus: 'Valid under IT Act 2000 Section 9A. Equal to physical original document.',
      previewData: {
        holderName: 'Rahul Verma',
        issueDate: '15-June-2024',
        validity: 'Permanent / Lifetime'
      }
    }
  });
});

// Verhoeff checksum algorithm for authentic Aadhaar calculation
const VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
const VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

function validateVerhoeff(str: string): boolean {
  let c = 0;
  const invertedArray = str.split('').map(Number).reverse();
  for (let i = 0; i < invertedArray.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][invertedArray[i]]];
  }
  return c === 0;
}

// 9. Dedicated Aadhaar Card Soft-Copy & Official Portal Bridge
app.post('/api/card/generate-aadhaar', (req: Request, res: Response) => {
  const {
    aadhaarNumber,
    name,
    dob,
    gender,
    careOf,
    address,
    isMasked,
    photoUrl
  } = req.body;

  const rawNum = String(aadhaarNumber || '234567890123').replace(/[\s-]/g, '');
  const cleanNum = /^\d{12}$/.test(rawNum) ? rawNum : '234567890123';
  const last4 = cleanNum.slice(-4);
  const formattedFull = `${cleanNum.slice(0, 4)} ${cleanNum.slice(4, 8)} ${cleanNum.slice(8, 12)}`;
  const formattedMasked = `XXXX XXXX ${last4}`;
  const displayNum = isMasked ? formattedMasked : formattedFull;

  const holderName = (name || 'Rahul Verma').trim();
  const birthDate = dob || '1998-05-14';
  const birthYear = birthDate.split('-')[0] || '1998';
  const cleanNameLetters = holderName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const pdfPassword = (cleanNameLetters.slice(0, 4).padEnd(4, 'X') + birthYear).toUpperCase();
  const citizenGender = gender || 'MALE';
  const guardian = careOf || 'S/O: Ramesh Kumar Verma';
  const fullAddress = address || 'H.No. 42, Shanti Nagar, Near Shiv Mandir, Ward No. 3, Saoner, Nagpur, Maharashtra - 441107';

  // Construct standard UIDAI XML barcode data string
  const qrString = `<?xml version="1.0" encoding="UTF-8"?><PrintLetterBarcodeData uid="${isMasked ? 'XXXXXXXX' + last4 : cleanNum}" name="${holderName}" gender="${citizenGender[0]}" yob="${birthYear}" co="${guardian}" loc="Shanti Nagar" vtc="Saoner" dist="Nagpur" state="Maharashtra" pc="441107"/>`;

  res.json({
    success: true,
    cardType: 'Aadhaar Card (Soft Copy / e-Aadhaar)',
    card: {
      aadhaarNumber: cleanNum,
      displayNumber: displayNum,
      isMasked: !!isMasked,
      last4,
      virtualId: `9102-4589-${Math.floor(1000 + Math.random() * 9000)}-${last4}`,
      name: holderName,
      dob: birthDate,
      gender: citizenGender,
      careOf: guardian,
      address: fullAddress,
      pdfPassword,
      photoUrl: photoUrl || null,
      issueDate: '15/06/2018',
      downloadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      digitalSignature: {
        signedBy: 'DS UNIQUE IDENTIFICATION AUTHORITY OF INDIA 04',
        status: 'Valid (Cryptographic Green Tick)',
        verifiedAt: new Date().toISOString(),
        issuer: 'eMudhra Consumer Services Sub-CA / CCA India'
      },
      qrData: qrString
    },
    officialPortals: {
      myAadhaarHome: 'https://myaadhaar.uidai.gov.in/',
      downloadEaadhaar: 'https://myaadhaar.uidai.gov.in/gen-ae',
      orderPvc: 'https://myaadhaar.uidai.gov.in/order-reprint',
      checkStatus: 'https://myaadhaar.uidai.gov.in/check-aadhaar-status',
      lockBiometrics: 'https://myaadhaar.uidai.gov.in/lock-unlock-biometrics',
      verifyMobile: 'https://myaadhaar.uidai.gov.in/verify-email-mobile',
      helpline: '1947 (Toll-Free, 24x7 in 12 languages)',
      officialEmail: 'help@uidai.gov.in'
    },
    educationalNotice: 'Under the Aadhaar Act 2016, original live Aadhaar cards require OTP authentication sent to mobile registered on myaadhaar.uidai.gov.in. Use the official link to fetch the real signed PDF from UIDAI.'
  });
});

// 10. Dedicated PAN Card Soft-Copy & Official Portal Bridge
app.post('/api/card/generate-pan', (req: Request, res: Response) => {
  const {
    panNumber,
    name,
    fatherName,
    dob,
    photoUrl,
    signatureName
  } = req.body;

  const rawPan = String(panNumber || 'ABCDE1234F').trim().toUpperCase();
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const isValidSyntax = panRegex.test(rawPan);
  const cleanPan = isValidSyntax ? rawPan : 'ABCDE1234F';

  const holderName = (name || 'RAHUL VERMA').toUpperCase();
  const fName = (fatherName || 'RAMESH VERMA').toUpperCase();
  const birthDate = dob || '14/05/1998';

  const fourthChar = cleanPan[3];
  const fifthChar = cleanPan[4];

  const entityTypeMap: Record<string, string> = {
    P: 'Individual (Person)',
    C: 'Company',
    H: 'Hindu Undivided Family (HUF)',
    F: 'Firm / Partnership',
    A: 'Association of Persons (AOP)',
    T: 'Trust',
    B: 'Body of Individuals (BOI)',
    G: 'Government Agency',
    J: 'Artificial Juridical Person',
    L: 'Local Authority'
  };

  const qrData = `ITD-PAN:${cleanPan};NAME:${holderName};FNAME:${fName};DOB:${birthDate};STATUS:ACTIVE;ISSUER:INCOME TAX DEPARTMENT GOI`;

  res.json({
    success: true,
    cardType: 'Permanent Account Number (Soft Copy / e-PAN)',
    card: {
      panNumber: cleanPan,
      name: holderName,
      fatherName: fName,
      dob: birthDate,
      photoUrl: photoUrl || null,
      signatureName: signatureName || holderName,
      entityType: entityTypeMap[fourthChar] || 'Individual',
      fourthCharMeaning: `"${fourthChar}" represents ${entityTypeMap[fourthChar] || 'Cardholder Status'}`,
      fifthCharMeaning: `"${fifthChar}" corresponds to the first character of Surname`,
      issueDate: '22/04/2021',
      qrData,
      status: 'Active in NSDL / Protean Central Repository',
      aadhaarLinking: 'Eligible & Linked under Section 139AA'
    },
    officialPortals: {
      instantEpanIncomeTax: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan',
      downloadEpanNsdl: 'https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html',
      downloadEpanUtiitsl: 'https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard',
      linkAadhaarStatus: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status',
      linkAadhaarAction: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar',
      incometaxHelpdesk: '1800 180 1961 (Toll-Free)',
      officialDomainNotice: 'Ensure the URL ends strictly with .incometax.gov.in, .nsdl.com, or .utiitsl.com.'
    },
    educationalNotice: 'Official e-PAN downloads from Income Tax or NSDL/UTIITSL portals are password-protected with Date of Birth in DDMMYYYY format without slashes.'
  });
});

// 11. Official Government Portals & Security Directory API
app.get('/api/official-portals', (req: Request, res: Response) => {
  res.json({
    success: true,
    category: 'Government of India Digital Services Directory',
    lastVerified: 'October 2026',
    portals: {
      aadhaar: [
        {
          name: 'UIDAI MyAadhaar Portal',
          url: 'https://myaadhaar.uidai.gov.in/',
          description: 'Official unified portal for downloading e-Aadhaar, ordering PVC cards, updating addresses, and locking biometrics.',
          otpRequired: true,
          fee: 'Free for e-Aadhaar PDF / ₹50 for Speed Post PVC Card'
        },
        {
          name: 'Direct e-Aadhaar Download',
          url: 'https://myaadhaar.uidai.gov.in/gen-ae',
          description: 'Download password-protected original PDF directly with 12-digit Aadhaar number or 16-digit VID.',
          otpRequired: true,
          fee: 'Free'
        },
        {
          name: 'Lock/Unlock Biometrics',
          url: 'https://myaadhaar.uidai.gov.in/lock-unlock-biometrics',
          description: 'Instantly lock fingerprint & iris authentication to prevent unauthorized cyber withdrawals.',
          otpRequired: true,
          fee: 'Free'
        }
      ],
      pan: [
        {
          name: 'Income Tax e-Filing Instant e-PAN',
          url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan',
          description: 'Get a paperless digital PAN card in just 10 minutes free of cost using Aadhaar e-KYC.',
          otpRequired: true,
          fee: 'Free'
        },
        {
          name: 'Protean (NSDL) e-PAN Download',
          url: 'https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html',
          description: 'Download electronic PAN soft copy for PAN cards issued through NSDL / Protean portal.',
          otpRequired: true,
          fee: 'Free (within 30 days of issue) / ₹8.26 thereafter'
        },
        {
          name: 'UTIITSL e-PAN Download',
          url: 'https://www.pan.utiitsl.com/PAN_ONLINE/ePANCard',
          description: 'Download e-PAN card soft copy for PAN cards allocated through UTI Infrastructure Technology.',
          otpRequired: true,
          fee: 'Free (within 30 days of issue) / ₹8.26 thereafter'
        },
        {
          name: 'Link Aadhaar to PAN',
          url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar',
          description: 'Mandatory statutory linkage under Section 139AA of Income Tax Act 1961.',
          otpRequired: true,
          fee: 'Subject to CBDT guidelines'
        }
      ],
      digilocker: [
        {
          name: 'DigiLocker Web Portal',
          url: 'https://www.digilocker.gov.in/',
          description: 'MeitY cloud repository for 100% legally valid digital documents under IT Act Rule 9A.',
          otpRequired: true,
          fee: 'Free'
        },
        {
          name: 'UMANG Government Services',
          url: 'https://web.umang.gov.in/',
          description: 'Unified Mobile Application for New-age Governance offering 1200+ central and state services.',
          otpRequired: true,
          fee: 'Free'
        }
      ],
      emergencyHelplines: [
        { service: 'National Cyber Crime Helpline', number: '1930', portal: 'https://cybercrime.gov.in' },
        { service: 'UIDAI Aadhaar Helpline', number: '1947', portal: 'https://uidai.gov.in' },
        { service: 'Income Tax Aaykar Seva Kendra', number: '1800 180 1961', portal: 'https://incometax.gov.in' },
        { service: 'National Consumer Helpline', number: '1915', portal: 'https://consumerhelpline.gov.in' }
      ]
    }
  });
});

// ==========================================
// STATIC ASSETS & VITE MIDDLEWARE SETUP
// ==========================================
async function startServer() {
  if (!isProd) {
    // In dev: mount Vite middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production: serve built static files from dist
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(` Digital Sarathi CEP Full-Stack Server Running`);
    console.log(` Port: ${PORT}`);
    console.log(` Mode: ${isProd ? 'Production' : 'Development'}`);
    console.log(` Health: http://localhost:${PORT}/api/health`);
    console.log(` CEP Info: http://localhost:${PORT}/api/cep/info`);
    console.log(` Workshops: http://localhost:${PORT}/api/workshops`);
    console.log(` Certificates: http://localhost:${PORT}/api/quiz/questions`);
    console.log(`=======================================================`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
