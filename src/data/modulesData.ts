import { LearningModule, LearningActivity } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'digilocker',
    title: 'DigiLocker Training',
    shortTitle: 'DigiLocker',
    tagline: 'Store, access and manage your legally valid digital documents anytime, anywhere.',
    iconName: 'CloudCheck',
    badge: 'Govt Cloud Vault',
    colorScheme: 'blue',
    estimatedMinutes: 12,
    officialPortal: 'digilocker.gov.in',
    portalUrl: 'https://www.digilocker.gov.in',
    overview:
      'DigiLocker is the flagship initiative of the Ministry of Electronics and IT (MeitY) under Digital India. Documents stored in DigiLocker are treated at par with original physical documents under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016.',
    steps: [
      {
        stepNumber: 1,
        title: 'Account Creation & Aadhaar Linking',
        description: 'Set up your secure digital wallet using your mobile number and Aadhaar authentication.',
        details: [
          'Visit digilocker.gov.in or download the verified DigiLocker app from Google Play Store / Apple App Store.',
          'Click on "Sign Up" and enter your Full Name as per Aadhaar, Date of Birth, Gender, and active Mobile Number.',
          'Set a confidential 6-digit Security PIN (acts like your login passcode).',
          'Enter the 6-digit OTP sent to your registered mobile number.',
          'Provide your 12-digit Aadhaar number to verify and link your identity.'
        ],
        safetyTip: 'Never share your 6-digit DigiLocker PIN with anyone, including cyber cafe operators.',
        importantNote: 'Your mobile number must be linked with your Aadhaar to receive authentication OTPs.'
      },
      {
        stepNumber: 2,
        title: 'Searching & Fetching Issued Documents',
        description: 'Pull verified electronic certificates directly from thousands of government issuers.',
        details: [
          'Click on the "Search" or "Explore" tab inside DigiLocker.',
          'Search by issuer (e.g., CBSE, State Education Boards, Ministry of Road Transport & Highways, UIDAI).',
          'Select the document type (e.g., Class X Marksheet, Driving License, Vehicle RC, Ration Card, COVID Vaccine Certificate).',
          'Enter required identifiers such as Roll Number, Passing Year, or Registration / DL Number.',
          'Tick the consent box and click "Get Document". The document is fetched with a cryptographic digital signature.'
        ],
        actionHint: 'Look for the green tick mark on fetched documents — it certifies digital authenticity.',
        safetyTip: 'Issued documents from government repositories cannot be forged and are legally equivalent to originals.'
      },
      {
        stepNumber: 3,
        title: 'Uploading Personal Documents (DigiLocker Drive)',
        description: 'Use the 1 GB free cloud storage to save scanned receipts, medical files, or certificates.',
        details: [
          'Navigate to "Drive" or "Uploaded Documents" section.',
          'Click "Upload" and choose files in supported formats: PDF, JPEG, or PNG.',
          'Ensure each uploaded file is under the 10 MB per file limit.',
          'Create labeled folders such as "Medical", "Education", and "Identity" for easy categorization.',
          'Note: Uploaded files are private backups; unlike "Issued Documents", they do not carry a government digital signature.'
        ],
        importantNote: 'Always redact or hide unnecessary personal banking numbers before uploading general files.'
      },
      {
        stepNumber: 4,
        title: 'Sharing Documents Securely via QR Code & Consent',
        description: 'Share your verified credentials with employers, colleges, or traffic police without physical photocopies.',
        details: [
          'Open any issued document and tap "Share" or "View QR Code".',
          'Traffic authorities and government verifiers scan this QR code via their official verifier app to authenticate instantly.',
          'Use DigiLocker Doc Locker consent feature to grant time-limited access to verified organizations.',
          'You can revoke sharing permissions anytime from the permissions dashboard.'
        ],
        safetyTip: 'Never forward downloaded document PDFs via unverified social media messaging groups.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Always access DigiLocker from the official domain ending in .gov.in.',
        'Use biometric fingerprint or face lock if using the smartphone app.',
        'Fetch your Driving License and Vehicle RC so you never need to carry physical plastic cards for traffic checks.',
        'Check issued documents annually to ensure all certificates reflect your latest credentials.'
      ],
      donts: [
        'Do not save your 6-digit DigiLocker PIN in public browser autofill on cyber cafe computers.',
        'Do not upload unauthorized documents or copyright-infringing media files.',
        'Do not create multiple accounts with different phone numbers; your DigiLocker is permanently tied to your Aadhaar.'
      ]
    },
    quizQuestions: [
      {
        question: 'Under which Indian law are DigiLocker issued documents legally equivalent to original physical documents?',
        options: [
          'Motor Vehicles Act 1988',
          'Rule 9A of the IT Rules 2016',
          'Indian Penal Code Section 420',
          'Consumer Protection Act 2019'
        ],
        correctIndex: 1,
        explanation: 'Under Rule 9A of the Information Technology Rules 2016, issued documents in DigiLocker are treated at par with original physical certificates.'
      },
      {
        question: 'What is the storage limit provided in DigiLocker Drive for uploading self-scanned documents?',
        options: ['100 MB', '500 MB', '1 GB', '15 GB'],
        correctIndex: 2,
        explanation: 'DigiLocker provides 1 GB of free, secure cloud storage for every citizen.'
      },
      {
        question: 'What is the key difference between "Issued Documents" and "Uploaded Documents" in DigiLocker?',
        options: [
          'Issued documents come directly from govt repositories with digital signatures, whereas uploaded ones are self-scanned files',
          'Uploaded documents are publicly viewable by anyone on the internet',
          'Issued documents expire after 30 days',
          'There is no difference between them'
        ],
        correctIndex: 0,
        explanation: 'Issued documents are digitally signed certificates fetched straight from authentic govt servers like CBSE, UIDAI, and MoRTH.'
      }
    ]
  },
  {
    id: 'aadhaar',
    title: 'Aadhaar Services Guide',
    shortTitle: 'Aadhaar Services',
    tagline: 'Learn how to update address, link with PAN, generate Virtual ID (VID), and lock biometrics.',
    iconName: 'Fingerprint',
    badge: 'Identity Services',
    colorScheme: 'emerald',
    estimatedMinutes: 14,
    officialPortal: 'myaadhaar.uidai.gov.in',
    portalUrl: 'https://myaadhaar.uidai.gov.in',
    overview:
      'Aadhaar is a 12-digit unique identity number issued by UIDAI. It serves as proof of identity and residence across India. This module teaches you how to safely manage your Aadhaar profile, update records online, use Masked Aadhaar, and protect against identity theft.',
    steps: [
      {
        stepNumber: 1,
        title: 'Updating Address & Details Online via myAadhaar',
        description: 'Change your residential address online using valid address proof without visiting a center.',
        details: [
          'Visit myaadhaar.uidai.gov.in and login using your 12-digit Aadhaar and the OTP sent to your linked phone.',
          'Select "Address Update" -> "Update Aadhaar Online".',
          'Review the demographic rules and proceed to upload valid proof (Electricity bill, Passport, Bank passbook, Rent agreement, etc.).',
          'Enter your new residential address carefully including Pin Code, Village/Town, and District.',
          'Upload clear scanned copy of the document (JPG/PNG/PDF under 2 MB) and submit.',
          'Pay the nominal standard fee (₹50) and note down the Service Request Number (SRN) to track approval.'
        ],
        safetyTip: 'UIDAI will never call you asking for an OTP to complete an address update.',
        importantNote: 'Name, Gender, and Date of Birth have strict lifetime update limits. Address can be updated whenever you relocate.'
      },
      {
        stepNumber: 2,
        title: 'Downloading e-Aadhaar & Opening Password-Protected PDF',
        description: 'Understand the standard 8-character password pattern required to unlock e-Aadhaar PDF files.',
        details: [
          'Click "Download Aadhaar" on myAadhaar or UIDAI official portal.',
          'Choose between Regular Aadhaar or "Masked Aadhaar" (which conceals the first 8 digits as XXXX-XXXX-1234).',
          'Download the password-protected PDF document.',
          'PASSWORD FORMULA: The first 4 letters of your Name in CAPITAL letters, followed by your 4-digit Year of Birth (YYYY).',
          'Example: If name is ANJALI SHARMA and birth year is 2002, the password is ANJA2002.',
          'Example 2: If name is P. SURESH born in 1995, password is P.SU1995.'
        ],
        actionHint: 'Always prefer Masked Aadhaar when submitting ID proofs for hotel check-ins or sim card purchases.',
        safetyTip: 'Never share the unmasked 12-digit Aadhaar on social media or public forums.'
      },
      {
        stepNumber: 3,
        title: 'Generating and Using 16-Digit Virtual ID (VID)',
        description: 'Use a temporary, revocable 16-digit number instead of your permanent 12-digit Aadhaar number.',
        details: [
          'A Virtual ID (VID) is a temporary 16-digit random number mapped to your Aadhaar.',
          'No one can derive your real Aadhaar number from your VID.',
          'Login to myAadhaar portal and click "VID Generator".',
          'Select "Generate VID" or "Retrieve VID". A fresh 16-digit code will be generated and SMSed to you.',
          'Use this 16-digit code for e-KYC across banks, telecom, and examinations.',
          'You can regenerate a fresh VID anytime; generating a new VID automatically cancels the previous one.'
        ],
        safetyTip: 'Using VID prevents third parties from harvesting your permanent Aadhaar number.'
      },
      {
        stepNumber: 4,
        title: 'Locking & Unlocking Biometrics (mAadhaar)',
        description: 'Put a digital padlock on your fingerprints and iris scans to prevent unauthorized misuse.',
        details: [
          'Biometric locking blocks anyone (including scammers) from authenticating fingerprint/iris transactions.',
          'On myAadhaar portal or mAadhaar mobile app, click "Lock / Unlock Biometrics".',
          'Authenticate using your OTP and toggle the lock switch to ON.',
          'Whenever you need to verify your biometrics at a ration shop, bank, or exam hall, temporarily unlock it for 10 minutes.',
          'After 10 minutes, the biometrics lock automatically re-engages for ongoing peace of mind.'
        ],
        importantNote: 'Even if your biometrics are locked, OTP-based authentication continues to work normally.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Keep your active mobile number updated in Aadhaar at your nearest Aadhaar Seva Kendra.',
        'Use "Masked Aadhaar" wherever offline photocopy submission is required.',
        'Check your Aadhaar Authentication History every 6 months to review past login events.',
        'Lock biometrics if you rarely use fingerprint-based AePS payments.'
      ],
      donts: [
        'Never leave laminated Aadhaar photocopies in xerox/cyber cafes.',
        'Do not pay unauthorized agents claiming to "change date of birth" without valid birth certificates.',
        'Never entertain calls claiming "Your Aadhaar is suspended, press 1 to verify".'
      ]
    },
    quizQuestions: [
      {
        question: 'What is the default password to open a downloaded e-Aadhaar PDF file for "RAHUL VERMA" born in 1998?',
        options: ['RAHUL1998', 'RAHU1998', '1998RAHU', 'VERM1998'],
        correctIndex: 1,
        explanation: 'The password format is the first 4 letters of the name in UPPERCASE followed by the 4-digit Year of Birth (RAHU + 1998 = RAHU1998).'
      },
      {
        question: 'What is the main benefit of downloading a "Masked Aadhaar"?',
        options: [
          'It is valid for 100 years',
          'It hides the first 8 digits as XXXX-XXXX, safeguarding your identity from exposure',
          'It removes the photograph',
          'It does not require an OTP'
        ],
        correctIndex: 1,
        explanation: 'Masked Aadhaar masks the first 8 digits and displays only the last 4 digits, ensuring privacy during routine verifications.'
      },
      {
        question: 'How long does a temporary biometric unlock remain active before re-locking automatically in myAadhaar?',
        options: ['10 minutes', '24 hours', '1 month', 'It never re-locks'],
        correctIndex: 0,
        explanation: 'The temporary unlock window remains open for 10 minutes to allow your verification and then automatically locks back.'
      }
    ]
  },
  {
    id: 'pan',
    title: 'PAN Card Guide',
    shortTitle: 'PAN Card Services',
    tagline: 'Step-by-step guidance on instant e-PAN, linking with Aadhaar, corrections, and tracking.',
    iconName: 'CreditCard',
    badge: 'Tax & Finance',
    colorScheme: 'indigo',
    estimatedMinutes: 10,
    officialPortal: 'incometax.gov.in',
    portalUrl: 'https://www.incometax.gov.in',
    overview:
      'A Permanent Account Number (PAN) is a 10-digit alphanumeric code issued by the Income Tax Department. It is essential for banking, scholarships, employment, and income tax filing. This guide covers instant paperless application, Aadhaar-PAN linking, and updates.',
    steps: [
      {
        stepNumber: 1,
        title: 'Applying for Instant e-PAN (Free & Paperless)',
        description: 'Get an official PAN generated in under 10 minutes via paperless Aadhaar e-KYC.',
        details: [
          'Visit the Income Tax e-Filing portal (incometax.gov.in).',
          'Under "Quick Links", click on "Instant e-PAN".',
          'Click "Get New e-PAN" and enter your 12-digit Aadhaar number.',
          'Ensure you have never been allotted a PAN before and your mobile number is linked to Aadhaar.',
          'Enter the 6-digit OTP received on your phone to validate details fetched from UIDAI.',
          'Confirm your details (Name, DOB, Gender, Address) and submit the request.',
          'Within 10 to 15 minutes, download your digital e-PAN PDF containing a digitally signed QR code at zero cost.'
        ],
        safetyTip: 'Instant e-PAN is 100% free on the official government portal. Do not pay third-party scam sites.',
        importantNote: 'If you want a physical plastic card delivered home, you can request a reprint on Protean (NSDL) or UTIITSL for ₹50.'
      },
      {
        stepNumber: 2,
        title: 'Linking PAN with Aadhaar',
        description: 'Check status and link your PAN with Aadhaar to keep your PAN operative.',
        details: [
          'Visit incometax.gov.in -> Quick Links -> "Link Aadhaar Status".',
          'Enter your PAN and Aadhaar number to verify whether they are already linked.',
          'If not linked, click "Link Aadhaar" on the portal.',
          'Ensure your Name, Date of Birth, and Gender match exactly in both PAN and Aadhaar records.',
          'If demographic mismatch exists, correct the discrepancy first before attempting to link.'
        ],
        safetyTip: 'Inoperative PAN cards attract higher TDS rates and may freeze certain bank account operations.',
        importantNote: 'Certain late linking requests require a challan payment under Minor Head 500 on the e-Pay Tax portal.'
      },
      {
        stepNumber: 3,
        title: 'Correcting Errors in PAN (Spelling, DOB, Father Name)',
        description: 'Update mismatched details online using Form 49A / PAN Correction services.',
        details: [
          'Visit the Protean e-Gov (formerly NSDL) or UTIITSL online PAN application portal.',
          'Select Application Type: "Changes or Correction in existing PAN data".',
          'Enter your existing PAN number and check the boxes next to the fields you wish to correct.',
          'Submit supporting proof (e.g., Aadhaar card for name/DOB or 10th marksheet).',
          'Select paperless e-KYC and e-Sign using Aadhaar OTP verification.',
          'Pay the processing fee (~₹107 for Indian address delivery or ₹50 for e-PAN only).',
          'Receive an Acknowledgement Number to track dispatch and status.'
        ],
        actionHint: 'Always double-check the spelling of your father’s name, as PAN requires it even for married women.'
      },
      {
        stepNumber: 4,
        title: 'Verifying & Tracking PAN Card Status',
        description: 'Verify if a PAN card is active and authentic using the official Income Tax database.',
        details: [
          'Go to incometax.gov.in -> "Verify Your PAN".',
          'Input the PAN number, Full Name, DOB, and active Mobile Number.',
          'Enter OTP received to view the real-time status: "PAN is Active and details are matching with PAN database".',
          'This tool is useful for colleges, banks, and citizens to detect fraudulent or typo-ridden cards.'
        ],
        safetyTip: 'Possessing more than one PAN card is illegal under Section 272B of the Income Tax Act, attracting a ₹10,000 fine.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Ensure the spelling of your name in PAN matches your Aadhaar and Class 10th certificate.',
        'Always check the website domain — use only incometax.gov.in or onlineservices.nsdl.com.',
        'Keep a digital copy of your e-PAN saved in DigiLocker for instant access.'
      ],
      donts: [
        'Never apply for a second PAN card if you lose your physical card; apply for a "Reprint of PAN Card" instead.',
        'Never enter your PAN details on unverified loan apps or lottery message links.',
        'Do not click on SMS alerts saying "Your bank account will be blocked today due to pending PAN KYC".'
      ]
    },
    quizQuestions: [
      {
        question: 'What is the penalty under Indian Income Tax law for possessing more than one PAN card?',
        options: ['₹500', '₹2,000', '₹10,000', 'There is no penalty'],
        correctIndex: 2,
        explanation: 'Under Section 272B of the Income Tax Act, possessing more than one PAN card is illegal and liable to a penalty of ₹10,000.'
      },
      {
        question: 'Which service allows citizens to get a valid digital PAN card within 10 minutes completely free of cost?',
        options: [
          'Instant e-PAN via Aadhaar e-KYC on Income Tax portal',
          'Postal Money Order method',
          'Local Cyber Cafe manual filing',
          'Passport Seva Kendra counter'
        ],
        correctIndex: 0,
        explanation: 'The Instant e-PAN service on incometax.gov.in generates a verified digital PAN in minutes via paperless Aadhaar OTP.'
      },
      {
        question: 'What should you do if your physical PAN card is damaged or lost?',
        options: [
          'Apply for a completely new PAN with a new number',
          'Request a Reprint of the existing PAN card via NSDL/UTIITSL for ₹50',
          'Use a friend’s PAN card',
          'Nothing can be done'
        ],
        correctIndex: 1,
        explanation: 'You should simply request a Reprint of the existing PAN card or download the e-PAN PDF.'
      }
    ]
  },
  {
    id: 'online-forms',
    title: 'Online Form Basics',
    shortTitle: 'Form Filling & Uploads',
    tagline: 'Master government job, scholarship and entrance exam forms, photo resizing, and fees.',
    iconName: 'FileText',
    badge: 'Student Essentials',
    colorScheme: 'cyan',
    estimatedMinutes: 9,
    officialPortal: 'india.gov.in',
    portalUrl: 'https://www.india.gov.in',
    overview:
      'Whether applying for national scholarships (NSP), college admissions, or government exams (SSC, UPSC, State Boards), filling online forms without errors is a crucial digital skill. Learn how to resize images, compress PDFs, review drafts, and safely process payments.',
    steps: [
      {
        stepNumber: 1,
        title: 'Verifying Official Portals & Domain Extensions',
        description: 'Ensure you are submitting data to genuine government servers, not phishing clones.',
        details: [
          'Always inspect the URL address bar: Genuine central and state govt portals end in .gov.in or .nic.in.',
          'Verify the padlock symbol indicating HTTPS SSL encryption.',
          'Beware of deceptive clone domains ending in .com, .org, or .xyz using government logos.'
        ],
        safetyTip: 'Never enter personal or parent information on forms circulated solely via WhatsApp broadcast messages.'
      },
      {
        stepNumber: 2,
        title: 'Preparing & Resizing Photos, Signatures & Documents',
        description: 'Format files to meet strict size limits (e.g., photo 20-50 KB, certificates under 200 KB).',
        details: [
          'Scan passport photographs on plain white background without hats, masks, or tinted glasses.',
          'Sign clearly on clean white paper using blue or black ink.',
          'Use standard image compression tools to keep photo files between 20 KB and 50 KB.',
          'Save identity and marksheet certificates in PDF format below 200 KB or 500 KB as specified in the notification.',
          'Ensure the text on compressed documents remains crisp and legible to avoid form rejection.'
        ],
        actionHint: 'Give filenames meaningful titles like "Rahul_Photo_Passport.jpg" instead of "IMG_9281.jpg".'
      },
      {
        stepNumber: 3,
        title: 'Careful Data Entry & Preview Verification',
        description: 'Prevent costly spelling mistakes in names, categories, and account details.',
        details: [
          'Match your Name, Father’s Name, and Date of Birth character-by-character with your Class 10th marksheet.',
          'Carefully choose reservation categories (General, OBC-NCL, SC, ST, EWS) with active certificate numbers.',
          'Enter bank account details and IFSC code with utmost care for scholarship disbursements.',
          'Always click "Preview / Draft Application" before proceeding to payment. Print or save the preview draft.'
        ],
        importantNote: 'Most portals charge steep fees or do not allow editing after the final submission window closes.'
      },
      {
        stepNumber: 4,
        title: 'Safe Fee Payment & Acknowledgement Archiving',
        description: 'Complete transactions securely and store the confirmation slip.',
        details: [
          'Use UPI, Net Banking, or Debit Cards on official payment gateways (SBI e-Pay, Bharatkosh, BillDesk).',
          'Do NOT refresh or press the back button while the payment gateway is processing.',
          'Immediately save and download the Application Confirmation Page and Payment Receipt.',
          'Store both PDF files in your DigiLocker Drive and Google Drive for safe retrieval.'
        ],
        safetyTip: 'If money is deducted but form shows pending, wait 24 hours for bank reconciliation before re-paying.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Save application reference numbers and registration IDs in a private diary or password manager.',
        'Submit applications at least 3-4 days before the deadline to avoid server overload.',
        'Double-check that uploaded signatures are not rotated upside down.'
      ],
      donts: [
        'Do not share your application login password with cyber cafe attendants.',
        'Do not upload blurred camera pictures taken in dark rooms.',
        'Do not submit multiple forms for the same candidate unless permitted by official exam guidelines.'
      ]
    },
    quizQuestions: [
      {
        question: 'Which domain ending guarantees an authentic Indian central or state government website?',
        options: ['.gov.in or .nic.in', '.org.in', '.co.in', '.info'],
        correctIndex: 0,
        explanation: 'Only verified government ministries and departments are allotted domains ending in .gov.in or .nic.in.'
      },
      {
        question: 'What should you do if your exam application fee is debited from your bank but the portal says "Payment Pending"?',
        options: [
          'Immediately pay 5 times more',
          'Wait 24 to 48 hours for bank gateway reconciliation before paying again',
          'Delete your bank account',
          'File a police FIR right away'
        ],
        correctIndex: 1,
        explanation: 'Banking payment gateways reconcile pending transactions within 24 to 48 hours; premature re-payments often lead to double charges.'
      }
    ]
  },
  {
    id: 'cyber-safety',
    title: 'Cyber Safety & Scam Protection',
    shortTitle: 'Cyber Safety',
    tagline: 'Defend against OTP fraud, electricity bill scams, fake loan apps, and UPI deception.',
    iconName: 'ShieldAlert',
    badge: 'High Priority',
    colorScheme: 'rose',
    estimatedMinutes: 11,
    officialPortal: 'cybercrime.gov.in',
    portalUrl: 'https://cybercrime.gov.in',
    overview:
      'With millions transitioning to digital governance and UPI banking, cybercriminals use psychological urgency and fake links to defraud citizens. Learn the fundamental security habits that protect your money, identity, and peace of mind.',
    steps: [
      {
        stepNumber: 1,
        title: 'The Golden Rule of UPI & Banking PINs',
        description: 'Understand that entering your UPI PIN always DEBITS money from your bank account.',
        details: [
          'UPI PIN is entered ONLY when you are SENDING money, checking balance, or making a purchase.',
          'You NEVER need to enter your UPI PIN, scan a QR code, or share an OTP to RECEIVE money.',
          'If someone says: "I am sending you ₹5000 cashback / prize, please scan this QR code and enter your PIN", IT IS A SCAM.'
        ],
        safetyTip: 'No bank manager, customer support officer, or government official will ever ask for your UPI PIN or OTP.',
        importantNote: 'Treat your OTP and UPI PIN like your house key; keep them strictly confidential.'
      },
      {
        stepNumber: 2,
        title: 'Recognizing Common Scam Tactics',
        description: 'Identify fraudulent messages before falling into phishing traps.',
        details: [
          'Electricity Bill Scam: "Dear customer, your electricity power will be disconnected at 9:30 PM tonight. Call officer at 98xxxxxx immediately."',
          'Lottery / KBC Scam: "Congratulations! You have won ₹25 Lakh in Lucky Draw. Click link to claim."',
          'Fake Job / Part-Time Telegram Scam: "Earn ₹3000 daily by liking YouTube videos and rating hotels."',
          'Aadhaar / SIM Card Suspension: "Your SIM card will be deactivated due to pending KYC within 2 hours."',
          'All these scams exploit urgency, fear, or greed to make you panic and click malicious links or install APK files.'
        ],
        actionHint: 'Notice spelling errors, sender numbers starting with private mobile prefixes (+91 9xxxx) instead of official alpha-headers (like VK-UIDAI).'
      },
      {
        stepNumber: 3,
        title: 'Guarding Against Malicious Android APK Apps',
        description: 'Never install application packages downloaded from WhatsApp or browser links.',
        details: [
          'Scammers send APK files disguised as "Electricity_Update.apk", "PM_Kisan_Yojana.apk", or "Bank_Support.apk".',
          'Once installed, these apps steal SMS messages, read incoming OTPs, and mirror your screen.',
          'Only install mobile apps from the official Google Play Store or Apple App Store.',
          'Keep Google Play Protect enabled on your smartphone settings.'
        ],
        safetyTip: 'Never install remote screen-sharing apps (like AnyDesk, TeamViewer, RustDesk) at the request of an unknown caller.'
      },
      {
        stepNumber: 4,
        title: 'Immediate Action if Scammed: Dial 1930 & Freeze Accounts',
        description: 'Act within the "Golden Hour" to freeze defrauded funds before scammers cash out.',
        details: [
          'Dial National Cyber Crime Helpline Number: 1930 immediately.',
          'File an online incident report on cybercrime.gov.in within 2 hours.',
          'Call your bank’s emergency fraud number to block ATM cards, net banking, and UPI IDs.',
          'Save screenshots of scam SMS messages, transaction UTR numbers, and WhatsApp chats as evidence.'
        ],
        importantNote: 'The 1930 helpline works in coordination with banks to intercept and freeze transferred money inside fraudulent beneficiary accounts.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Memorize the National Cyber Helpline number: 1930.',
        'Use distinct, strong passwords for your email and bank accounts with special characters.',
        'Enable Two-Factor Authentication (2FA) with an authenticator app wherever possible.',
        'Warn elderly family members and neighbors about fake phone calls.'
      ],
      donts: [
        'Never scan a QR code to "receive" money on OLX or Facebook Marketplace.',
        'Never click on shortened links (bit.ly, tinyurl) sent by unknown contacts.',
        'Do not share banking details on calls claiming to be from customs, police, or courier companies ("digital arrest" scams).'
      ]
    },
    quizQuestions: [
      {
        question: 'When is a user required to enter their 4 or 6-digit UPI PIN?',
        options: [
          'Only when sending money or deducting balance from their account',
          'Whenever receiving money or cashbacks from strangers',
          'To verify identity to an unknown telephone caller',
          'Every time someone calls them'
        ],
        correctIndex: 0,
        explanation: 'UPI PIN is strictly used for debit authorization (sending money). Receiving money never requires entering a PIN or scanning a QR code.'
      },
      {
        question: 'What is India’s official National Cybercrime Helpline Number for reporting financial cyber fraud immediately?',
        options: ['100', '1930', '1098', '1800'],
        correctIndex: 1,
        explanation: '1930 is the national cyber financial helpline run by the Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs.'
      }
    ]
  },
  {
    id: 'mobile-basics',
    title: 'Mobile & Internet Basics',
    shortTitle: 'Mobile Basics',
    tagline: 'Master smartphone settings, app permissions, QR scanner safety, and government apps.',
    iconName: 'Smartphone',
    badge: 'Foundations',
    colorScheme: 'amber',
    estimatedMinutes: 8,
    officialPortal: 'meity.gov.in',
    portalUrl: 'https://www.meity.gov.in',
    overview:
      'Smartphones are now personal computers in the hands of every citizen. Learn how to manage device security, review app permissions, connect securely to public Wi-Fi, and identify verified government apps like UMANG and mAadhaar.',
    steps: [
      {
        stepNumber: 1,
        title: 'Reviewing App Permissions (Camera, Contacts, Location)',
        description: 'Audit which applications can secretly access your microphone, photos, and contacts.',
        details: [
          'Open Phone Settings -> Apps -> Permission Manager.',
          'Check which apps have access to "Location", "Camera", "Microphone", and "SMS".',
          'For calculators, flashlight apps, or games, immediately revoke access to SMS, Contacts, and Location.',
          'Set permissions to "Allow only while using the app" rather than "Always allow".'
        ],
        actionHint: 'A simple utility app (like a calculator or PDF reader) never needs access to your contacts or SMS.'
      },
      {
        stepNumber: 2,
        title: 'Using Verified Government Multi-Service Apps (UMANG)',
        description: 'Access hundreds of central and state services in one single verified application.',
        details: [
          'Download UMANG (Unified Mobile Application for New-age Governance) from Google Play Store.',
          'UMANG integrates EPFO (Provident Fund claims), Bharat Gas, Ayushman Bharat, driving services, and pension.',
          'Check developer name is "National e-Governance Division (NeGD), MeitY".',
          'Use biometric login on your phone for easy daily access.'
        ],
        safetyTip: 'Always verify the developer name under the app title before installing.'
      },
      {
        stepNumber: 3,
        title: 'Safe Internet Browsing & Public Wi-Fi Precautions',
        description: 'Prevent data sniffing on railway, bus stand, and cafe Wi-Fi networks.',
        details: [
          'Avoid logging into bank accounts or UPI while connected to unencrypted public Wi-Fi.',
          'Turn off "Auto-connect to open Wi-Fi networks" in phone settings.',
          'Ensure your phone operating system (Android / iOS) receives regular security updates.',
          'Never leave your phone unattended without a screen lock pattern or PIN.'
        ],
        importantNote: 'Always install security patches when notified by your device manufacturer.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Set up screen lock using a 6-digit PIN, strong password, or biometric fingerprint.',
        'Back up your mobile contacts to your secured Google or Apple account.',
        'Keep phone storage at least 15% free for optimal operating system performance.'
      ],
      donts: [
        'Do not install random cleaner or booster apps that bombard you with malicious ads.',
        'Do not root or jailbreak your primary daily phone, as it breaks security sandboxes.',
        'Do not click on unsolicited popups stating "Your phone has 13 viruses, tap to clean".'
      ]
    },
    quizQuestions: [
      {
        question: 'Which official app by MeitY provides unified access to EPFO, Ayushman Bharat, and hundreds of govt services?',
        options: ['UMANG', 'Candy Crush', 'QuickCleaner', 'FastPay'],
        correctIndex: 0,
        explanation: 'UMANG (Unified Mobile Application for New-age Governance) is the official single-window platform by NeGD, MeitY.'
      }
    ]
  }
];

export const LEARNING_ACTIVITIES: LearningActivity[] = [
  {
    id: 'act-1',
    moduleId: 'digilocker',
    moduleName: 'DigiLocker',
    title: 'Create and verify DigiLocker account with Aadhaar OTP',
    description: 'Set up your official digital vault with 6-digit security PIN.',
    category: 'DigiLocker',
    points: 15
  },
  {
    id: 'act-2',
    moduleId: 'digilocker',
    moduleName: 'DigiLocker',
    title: 'Fetch Class 10th or 12th digital marksheet from board',
    description: 'Pull verified educational certificate carrying digital signature.',
    category: 'DigiLocker',
    points: 15
  },
  {
    id: 'act-3',
    moduleId: 'digilocker',
    moduleName: 'DigiLocker',
    title: 'Link Driving License or Vehicle Registration (RC)',
    description: 'Carry digital motor certificates valid for traffic police inspection.',
    category: 'DigiLocker',
    points: 15
  },
  {
    id: 'act-4',
    moduleId: 'aadhaar',
    moduleName: 'Aadhaar Services',
    title: 'Generate and practice 8-character e-Aadhaar PDF password',
    description: 'Master the UPPERCASE Name + Year-of-birth password format.',
    category: 'Aadhaar',
    points: 10
  },
  {
    id: 'act-5',
    moduleId: 'aadhaar',
    moduleName: 'Aadhaar Services',
    title: 'Generate 16-digit Virtual ID (VID) for privacy protection',
    description: 'Use revocable VID to avoid exposing 12-digit permanent Aadhaar.',
    category: 'Aadhaar',
    points: 15
  },
  {
    id: 'act-6',
    moduleId: 'aadhaar',
    moduleName: 'Aadhaar Services',
    title: 'Test Biometric Lock & Unlock feature on myAadhaar',
    description: 'Protect biometric sensors from unauthorized AePS debits.',
    category: 'Aadhaar',
    points: 15
  },
  {
    id: 'act-7',
    moduleId: 'pan',
    moduleName: 'PAN Card',
    title: 'Verify PAN-Aadhaar linkage status on Income Tax portal',
    description: 'Check if PAN is operative and demographic details match perfectly.',
    category: 'PAN',
    points: 15
  },
  {
    id: 'act-8',
    moduleId: 'pan',
    moduleName: 'PAN Card',
    title: 'Understand Instant e-PAN generation via Aadhaar e-KYC',
    description: 'Learn how paperless PAN allotment works in under 10 minutes.',
    category: 'PAN',
    points: 10
  },
  {
    id: 'act-9',
    moduleId: 'online-forms',
    moduleName: 'Online Forms',
    title: 'Inspect website domain ending (.gov.in vs fake clones)',
    description: 'Practice spotting genuine SSL certificates and official extensions.',
    category: 'Forms',
    points: 10
  },
  {
    id: 'act-10',
    moduleId: 'online-forms',
    moduleName: 'Online Forms',
    title: 'Resize passport photo and signature under 50 KB',
    description: 'Prepare clean digital credentials without blurring for examinations.',
    category: 'Forms',
    points: 15
  },
  {
    id: 'act-11',
    moduleId: 'cyber-safety',
    moduleName: 'Cyber Safety',
    title: 'Pass the UPI PIN & QR Code safety discernment check',
    description: 'Verify understanding: Never enter UPI PIN to receive money.',
    category: 'Cyber Safety',
    points: 20
  },
  {
    id: 'act-12',
    moduleId: 'cyber-safety',
    moduleName: 'Cyber Safety',
    title: 'Save National Cybercrime Helpline (1930) in contacts',
    description: 'Be prepared for the "Golden Hour" if cyber fraud occurs.',
    category: 'Cyber Safety',
    points: 10
  }
];

export const CEP_PROJECT_INFO = {
  title: 'Digital Sarathi – Your Digital Life Guide',
  subtitle: 'A College Community Engagement Project (CEP)',
  institution: 'Department of Computer Applications & Community Engagement Cell',
  academicYear: '2025 – 2026',
  objective:
    'To bridge the digital literacy divide by empowering rural citizens, senior citizens, and first-time digital users with hands-on, practical guidance on essential Indian digital public infrastructure including DigiLocker, Aadhaar services, PAN card management, and cyber safety.',
  outreachLocations: [
    'Adopted Gram Panchayats & Village Community Centers',
    'Local Government High Schools & Junior Colleges',
    'Senior Citizens Welfare Centers',
    'Self-Help Groups (SHGs) & Small Trader Associations'
  ],
  milestones: [
    { number: '1,200+', label: 'Citizens & Students Trained' },
    { number: '100%', label: 'Free & Non-Commercial Mission' },
    { number: '24/7', label: 'Self-Paced Interactive Modules' },
    { number: '4', label: 'Student CEP Fellows' }
  ],
  studentTeam: [
    {
      name: 'Rahul Sharma',
      role: 'Project Lead & Research Analyst',
      studentId: 'CEP-2025-041',
      department: 'B.Tech Computer Science & Engineering',
      contribution: 'Designed workflow architectures for DigiLocker and PAN e-filing module integrations.',
      imagePlaceholder: 'RS'
    },
    {
      name: 'Anjali Kushwaha',
      role: 'Curriculum & Community Outreach Lead',
      studentId: 'CEP-2025-088',
      department: 'B.Sc Information Technology',
      contribution: 'Authored bilingual step-by-step guides, simplified legal nuances and led village workshops.',
      imagePlaceholder: 'AK'
    },
    {
      name: 'Priya Patel',
      role: 'Simulator & UX Interactive Designer',
      studentId: 'CEP-2025-112',
      department: 'BCA (Bachelor of Computer Applications)',
      contribution: 'Created safe sandboxed Aadhaar decrypters, progress trackers, and accessibility UI.',
      imagePlaceholder: 'PP'
    },
    {
      name: 'Amit Verma',
      role: 'Cyber Safety Specialist & Field Coordinator',
      studentId: 'CEP-2025-067',
      department: 'MCA (Master of Computer Applications)',
      contribution: 'Researched real-world UPI scams, compiled helpline response procedures, and coordinated field tests.',
      imagePlaceholder: 'AV'
    }
  ]
};

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    category: 'DigiLocker',
    question: 'Are digital documents in DigiLocker legally accepted during traffic police checks?',
    answer:
      'Yes, absolutely. As per the advisory issued by the Ministry of Road Transport and Highways (MoRTH) and Rule 9A of the Information Technology Rules 2016, Driving License and Registration Certificates presented via the DigiLocker app are legally equivalent to original physical documents. Police authorities cannot demand physical cards if presented via verified DigiLocker.'
  },
  {
    id: 'faq-2',
    category: 'Aadhaar',
    question: 'Can someone withdraw money from my bank account just by knowing my 12-digit Aadhaar number?',
    answer:
      'No. Simply knowing your Aadhaar number is not sufficient to withdraw money. For financial transactions (like AePS - Aadhaar Enabled Payment System), a live physical fingerprint or biometric iris scan is strictly mandatory. Furthermore, you can activate "Biometric Lock" on the myAadhaar portal to completely prevent any unauthorized biometric authentication.'
  },
  {
    id: 'faq-3',
    category: 'Aadhaar',
    question: 'What is a "Masked Aadhaar" and why should I use it?',
    answer:
      'A Masked Aadhaar conceals the first 8 digits of your 12-digit number and shows only the last 4 digits (e.g. XXXX-XXXX-4321). It is an official UIDAI-approved format valid for identity verification at hotels, airports, and courier pickups, ensuring that third parties cannot record or misuse your full Aadhaar number.'
  },
  {
    id: 'faq-4',
    category: 'PAN Card',
    question: 'What happens if PAN and Aadhaar are not linked?',
    answer:
      'If not linked by specified statutory deadlines, the PAN becomes "Inoperative". An inoperative PAN prevents income tax refunds, attracts higher rates of Tax Deducted at Source (TDS/TCS), and may cause difficulties in opening bank accounts or making high-value financial transactions over ₹50,000.'
  },
  {
    id: 'faq-5',
    category: 'Cyber Safety',
    question: 'I received an SMS claiming my electricity will be disconnected tonight at 9:30 PM. What should I do?',
    answer:
      'Do NOT click any link or call the private mobile number in the message. This is an extremely widespread cyber scam. Electricity distribution companies never send notices from 10-digit personal mobile numbers and do not disconnect power at night. Contact your local electricity department customer care directly through official utility bills.'
  },
  {
    id: 'faq-6',
    category: 'DigiLocker',
    question: 'What should I do if I forget my 6-digit DigiLocker Security PIN?',
    answer:
      'On the login screen, click "Forgot Security PIN?". Enter your registered mobile number and date of birth. You will receive an OTP. Once verified, you can immediately set a fresh 6-digit PIN.'
  },
  {
    id: 'faq-7',
    category: 'Online Forms',
    question: 'How do I know if an online form website is genuine or a fake scam replica?',
    answer:
      'Check the website address bar carefully. Authentic central and state government portals in India always end with ".gov.in" or ".nic.in" (for example, uidai.gov.in, incometax.gov.in, ssc.gov.in). Never trust portals ending in .com, .org, or .xyz disguised with government logos.'
  },
  {
    id: 'faq-8',
    category: 'Cyber Safety',
    question: 'What is the "Golden Hour" in cyber fraud reporting?',
    answer:
      'The "Golden Hour" refers to the first 1 to 2 hours immediately following unauthorized fraudulent debits. If you call the National Cybercrime Helpline 1930 immediately, police and nodal bank officers can trace the transaction in real-time and freeze the stolen funds before the fraudster withdraws them from an ATM.'
  }
];
