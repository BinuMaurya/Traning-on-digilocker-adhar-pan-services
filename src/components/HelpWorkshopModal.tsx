import React from 'react';
import {
  HelpCircle,
  Send,
  PhoneCall,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  Building
} from 'lucide-react';
import { WorkshopRequest } from '../types';

export const HelpWorkshopModal: React.FC = () => {
  const [requests, setRequests] = React.useState<WorkshopRequest[]>(() => {
    const saved = localStorage.getItem('digital_sarathi_workshops');
    return saved ? JSON.parse(saved) : [];
  });

  // Citizen Helpdesk Inquiries state
  const [helpdeskInquiries, setHelpdeskInquiries] = React.useState<any[]>([]);
  const [citizenQuery, setCitizenQuery] = React.useState({
    citizenName: '',
    category: 'Aadhaar',
    query: '',
    contact: ''
  });
  const [inquirySubmitting, setInquirySubmitting] = React.useState(false);
  const [inquiryResponse, setInquiryResponse] = React.useState<any | null>(null);

  const [formData, setFormData] = React.useState({
    organizerName: '',
    organization: '',
    contactNumber: '',
    email: '',
    targetAudience: 'College Students & First-Time Digital Users',
    expectedAttendees: 40,
    preferredDate: '',
    locationCity: '',
    selectedTopics: ['DigiLocker Training', 'Aadhaar Services Guide', 'Cyber Safety']
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Load workshops and helpdesk inquiries from backend on mount
  React.useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [wsRes, hdRes] = await Promise.all([
          fetch('/api/workshops'),
          fetch('/api/helpdesk')
        ]);
        if (wsRes.ok) {
          const wsData = await wsRes.json();
          if (wsData.workshops && wsData.workshops.length > 0) {
            setRequests(wsData.workshops);
            localStorage.setItem('digital_sarathi_workshops', JSON.stringify(wsData.workshops));
          }
        }
        if (hdRes.ok) {
          const hdData = await hdRes.json();
          if (hdData.inquiries) {
            setHelpdeskInquiries(hdData.inquiries);
          }
        }
      } catch (err) {
        console.warn('Backend fetch error, using local data:', err);
      }
    };
    fetchBackendData();
  }, []);

  const handleTopicToggle = (topic: string) => {
    setFormData((prev) => {
      const exists = prev.selectedTopics.includes(topic);
      return {
        ...prev,
        selectedTopics: exists
          ? prev.selectedTopics.filter((t) => t !== topic)
          : [...prev.selectedTopics, topic]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organizerName || !formData.organization || !formData.contactNumber) {
      alert('Please fill in your name, organization, and contact number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/workshops/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success && data.workshop) {
        const updated = [data.workshop, ...requests];
        setRequests(updated);
        localStorage.setItem('digital_sarathi_workshops', JSON.stringify(updated));
        setIsSubmitted(true);
      } else {
        throw new Error(data.message || 'Server error');
      }
    } catch (err) {
      // Local fallback
      const newReq: WorkshopRequest = {
        id: 'req-' + Date.now(),
        ...formData,
        submittedAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      };
      const updated = [newReq, ...requests];
      setRequests(updated);
      localStorage.setItem('digital_sarathi_workshops', JSON.stringify(updated));
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpdeskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenQuery.citizenName || !citizenQuery.query) {
      alert('Please enter your name and question.');
      return;
    }

    setInquirySubmitting(true);
    try {
      const res = await fetch('/api/helpdesk/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citizenQuery)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiryResponse(data.inquiry);
        setHelpdeskInquiries((prev) => [data.inquiry, ...prev]);
        setCitizenQuery({ citizenName: '', category: 'Aadhaar', query: '', contact: '' });
      }
    } catch (err) {
      console.error('Helpdesk query error:', err);
    } finally {
      setInquirySubmitting(false);
    }
  };

  return (
    <section id="help-workshop-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Community Outreach & Support</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            Help & Workshop Demo Request
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Request a free, hands-on student-led community workshop for your college, school, Gram Panchayat, or self-help group.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-lg transition-all"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-600" />
                <span>Request a Training Demo Session</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Our student CEP team conducts 100% non-commercial peer education sessions with live projector demonstrations and practice exercises.
              </p>

              {isSubmitted ? (
                <div className="rounded-2xl p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 font-heading">
                    Workshop Request Received!
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 max-w-md mx-auto">
                    Thank you! Our CEP student coordinator will connect with you on {formData.contactNumber} to coordinate dates, projector availability, and volunteer logistics.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Coordinator / Organizer Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organizerName}
                        onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                        placeholder="e.g. Prof. R. K. Gupta"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Institution / Community Org *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Govt Girls College / Gram Panchayat"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        placeholder="e.g. 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. cep.contact@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Expected Attendees
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="500"
                        value={formData.expectedAttendees}
                        onChange={(e) => setFormData({ ...formData, expectedAttendees: parseInt(e.target.value) || 20 })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        City / Village Location
                      </label>
                      <input
                        type="text"
                        value={formData.locationCity}
                        onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
                        placeholder="e.g. Wardha / Indore"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  {/* Modules selection */}
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Requested Training Topics (Select all applicable):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'DigiLocker Training & Document Fetching',
                        'Aadhaar Services & Biometric Locking',
                        'PAN Card Application & Aadhaar Linking',
                        'Online Form Filling & File Resizing',
                        'Cyber Safety, OTP & UPI Scam Defense'
                      ].map((topic) => {
                        const isChecked = formData.selectedTopics.includes(topic);
                        return (
                          <div
                            key={topic}
                            onClick={() => handleTopicToggle(topic)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center space-x-2 transition-all ${
                              isChecked
                                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-800 dark:text-blue-300 font-semibold'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span>{topic}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Workshop Request (Free CEP Service)</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Helplines & Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* National Official Helplines */}
            <div
              className="rounded-3xl p-6 border shadow-md"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-emerald-600" />
                <span>Official National Helplines</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                    1930
                  </div>
                  <div>
                    <h5 className="font-bold text-rose-900 dark:text-rose-200">
                      National Cyber Crime Helpline
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Call immediately if defrauded of money through online scams, fake APKs, or unauthorized UPI debits.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                    1947
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900 dark:text-blue-200">
                      UIDAI Aadhaar Citizen Helpline
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Toll-free 24x7 guidance on Aadhaar updates, Aadhaar Seva Kendra locations, and enrollment queries.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-[10px] flex-shrink-0">
                    TAX
                  </div>
                  <div>
                    <h5 className="font-bold text-indigo-900 dark:text-indigo-200">
                      Income Tax PAN Helpline (1800-180-1961)
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Assistance regarding PAN-Aadhaar linking status, e-PAN issues, and Form 49A corrections.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Citizen Helpdesk & Instant Guidance Form */}
            <div
              className="rounded-3xl p-6 border shadow-md"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>Ask Digital Sarathi Citizen Helpdesk</span>
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Have a question on DigiLocker PIN, Aadhaar name change, or PAN linking? Ask our CEP team for instant guidance.
              </p>

              <form onSubmit={handleHelpdeskSubmit} className="space-y-3 text-xs">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={citizenQuery.citizenName}
                    onChange={(e) => setCitizenQuery({ ...citizenQuery, citizenName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={citizenQuery.category}
                    onChange={(e) => setCitizenQuery({ ...citizenQuery, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  >
                    <option value="Aadhaar">Aadhaar Query</option>
                    <option value="DigiLocker">DigiLocker Query</option>
                    <option value="PAN">PAN Card Query</option>
                    <option value="General">Cyber / Form General</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Contact / Email (optional)"
                    value={citizenQuery.contact}
                    onChange={(e) => setCitizenQuery({ ...citizenQuery, contact: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your question or issue in detail..."
                    value={citizenQuery.query}
                    onChange={(e) => setCitizenQuery({ ...citizenQuery, query: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquirySubmitting}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{inquirySubmitting ? 'Submitting...' : 'Submit Citizen Query to Helpdesk'}</span>
                </button>
              </form>

              {inquiryResponse && (
                <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
                  <p className="font-bold text-emerald-900 dark:text-emerald-200">
                    Instant Guidance from Helpdesk:
                  </p>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">
                    {inquiryResponse.response}
                  </p>
                </div>
              )}
            </div>

            {/* Past Workshop Submissions Log */}
            {requests.length > 0 && (
              <div
                className="rounded-3xl p-6 border shadow-md"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Your Recent Workshop Bookings ({requests.length})
                </h4>
                <div className="space-y-2 text-xs">
                  {requests.slice(0, 3).map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
                        <span>{r.organization}</span>
                        <span className="text-[10px] text-blue-600 font-mono">{r.submittedAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Coordinator: {r.organizerName} • {r.expectedAttendees} Attendees
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
