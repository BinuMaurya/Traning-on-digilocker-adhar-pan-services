import React from 'react';
import {
  Server,
  Activity,
  Database,
  Terminal,
  Play,
  CheckCircle,
  Copy,
  ExternalLink,
  Code,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Users
} from 'lucide-react';

interface EndpointConfig {
  method: 'GET' | 'POST';
  path: string;
  name: string;
  description: string;
  defaultBody?: any;
}

const ENDPOINTS: EndpointConfig[] = [
  {
    method: 'GET',
    path: '/api/health',
    name: 'Server Health & Diagnostics',
    description: 'Returns real-time Express server status, timestamp, and active environment mode.'
  },
  {
    method: 'GET',
    path: '/api/cep/info',
    name: 'CEP Project & Team Info',
    description: 'Retrieves full college Community Engagement Project info, faculty mentor, and team members.'
  },
  {
    method: 'GET',
    path: '/api/workshops',
    name: 'List Scheduled Workshops',
    description: 'Fetches registered grassroots training sessions, panchayat camps, and college seminars.'
  },
  {
    method: 'POST',
    path: '/api/workshops/register',
    name: 'Register Training Camp',
    description: 'Registers a new community workshop session into the backend database.',
    defaultBody: {
      organizerName: 'Prof. Anjali Kushwaha',
      organization: 'Gram Panchayat Digital Seva Center',
      contactNumber: '9876543210',
      email: 'anjalikhushwaha682@gmail.com',
      targetAudience: 'Rural Women & Youth Self-Help Group',
      expectedAttendees: 50,
      preferredDate: '2026-10-25',
      selectedTopics: ['DigiLocker Training', 'Aadhaar Services Guide', 'PAN Card Guide'],
      locationCity: 'Community Hall, Sector 4'
    }
  },
  {
    method: 'GET',
    path: '/api/helpdesk',
    name: 'Citizen Helpdesk Inquiries',
    description: 'Returns citizen queries and automated resolution advice from the database.'
  },
  {
    method: 'POST',
    path: '/api/sandbox/verify-pan',
    name: 'PAN Syntax & Structure Analyzer',
    description: 'Educational simulation decoding the 4th char entity type, 5th char surname, and linking status.',
    defaultBody: {
      panNumber: 'ABCDE1234F'
    }
  },
  {
    method: 'POST',
    path: '/api/sandbox/verify-aadhaar',
    name: 'Aadhaar Verhoeff Algorithm Sandbox',
    description: 'Simulates 12-digit format check, Verhoeff checksum validation, and demo OTP generation.',
    defaultBody: {
      aadhaarNumber: '2345 6789 0123'
    }
  },
  {
    method: 'POST',
    path: '/api/sandbox/digilocker-fetch',
    name: 'DigiLocker IT Act Doc Pull Sandbox',
    description: 'Simulates fetching digitally signed credentials with Rule 9A legal validity.',
    defaultBody: {
      docType: 'Class X Marksheet',
      identifier: 'CBSE-2024-8192'
    }
  },
  {
    method: 'POST',
    path: '/api/card/generate-aadhaar',
    name: 'Generate e-Aadhaar Soft Copy',
    description: 'Generates compliant UIDAI-formatted soft copy with checksum, XML barcode data, and official portal links.',
    defaultBody: {
      aadhaarNumber: '5489 1234 8912',
      name: 'Rahul Verma',
      dob: '1998-05-14',
      gender: 'MALE',
      isMasked: false
    }
  },
  {
    method: 'POST',
    path: '/api/card/generate-pan',
    name: 'Generate e-PAN Soft Copy',
    description: 'Generates authentic Income Tax Department e-PAN soft copy with 4th/5th char decoding and linking status.',
    defaultBody: {
      panNumber: 'ABCDE1234F',
      name: 'RAHUL VERMA',
      fatherName: 'RAMESH KUMAR VERMA',
      dob: '14/05/1998'
    }
  },
  {
    method: 'GET',
    path: '/api/official-portals',
    name: 'Official Portals Directory API',
    description: 'Returns official verified URLs and emergency helplines for UIDAI, Income Tax, NSDL, and DigiLocker.'
  }
];

export const BackendExplorerSection: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = React.useState<EndpointConfig>(ENDPOINTS[0]);
  const [requestBodyInput, setRequestBodyInput] = React.useState<string>(
    ENDPOINTS[0].defaultBody ? JSON.stringify(ENDPOINTS[0].defaultBody, null, 2) : ''
  );
  const [responseStatus, setResponseStatus] = React.useState<number | null>(null);
  const [responseTimeMs, setResponseTimeMs] = React.useState<number | null>(null);
  const [responseData, setResponseData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Auto-run first endpoint on mount
  React.useEffect(() => {
    executeRequest(ENDPOINTS[0]);
  }, []);

  const handleSelectEndpoint = (ep: EndpointConfig) => {
    setSelectedEndpoint(ep);
    setRequestBodyInput(ep.defaultBody ? JSON.stringify(ep.defaultBody, null, 2) : '');
    setResponseData(null);
    setResponseStatus(null);
    setResponseTimeMs(null);
  };

  const executeRequest = async (ep = selectedEndpoint) => {
    setLoading(true);
    const start = performance.now();
    try {
      const options: RequestInit = {
        method: ep.method,
        headers: { 'Content-Type': 'application/json' }
      };

      if (ep.method === 'POST') {
        let parsed = {};
        try {
          parsed = JSON.parse(requestBodyInput || '{}');
        } catch (e) {
          alert('Invalid JSON in request body');
          setLoading(false);
          return;
        }
        options.body = JSON.stringify(parsed);
      }

      const res = await fetch(ep.path, options);
      const end = performance.now();
      setResponseTimeMs(Math.round(end - start));
      setResponseStatus(res.status);

      const json = await res.json();
      setResponseData(json);
    } catch (err: any) {
      const end = performance.now();
      setResponseTimeMs(Math.round(end - start));
      setResponseStatus(500);
      setResponseData({ error: err.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (!responseData) return;
    navigator.clipboard.writeText(JSON.stringify(responseData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="backend-explorer-section" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
            <Server className="w-3.5 h-3.5" />
            <span>Full-Stack Architecture (Node.js + Express REST API)</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading"
            style={{ color: 'var(--text-main)' }}
          >
            Live Backend & API Explorer
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Inspect real server-side REST API endpoints powering Digital Sarathi. Test endpoints directly with live payloads, verify JSON responses, and observe real database updates.
          </p>
        </div>

        {/* Server Architecture Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div
            className="p-4 rounded-2xl border shadow-sm flex items-start space-x-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400">Server Status</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Active on Port 3000</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Express + Vite Middleware</p>
            </div>
          </div>

          <div
            className="p-4 rounded-2xl border shadow-sm flex items-start space-x-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400">Database Layer</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Persistent JSON Store</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Workshops, Certificates & Logs</p>
            </div>
          </div>

          <div
            className="p-4 rounded-2xl border shadow-sm flex items-start space-x-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-400">Security & Privacy</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Zero Real PII Storage</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Safe Educational Sandboxing</p>
            </div>
          </div>
        </div>

        {/* API Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Endpoint Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select API Endpoint:
            </h3>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {ENDPOINTS.map((ep, idx) => {
                const isSelected = selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectEndpoint(ep)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex flex-col space-y-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
                          ep.method === 'GET'
                            ? isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className={`text-[11px] font-mono truncate ml-2 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {ep.path}
                      </span>
                    </div>

                    <span className="text-xs font-bold truncate">
                      {ep.name}
                    </span>

                    <span className={`text-[11px] line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {ep.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Request & Response Inspector (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            {/* Request Control Box */}
            <div
              className="rounded-3xl p-5 border shadow-sm transition-all"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-lg ${
                      selectedEndpoint.method === 'GET'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                    }`}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold text-slate-800 dark:text-slate-200">
                    {selectedEndpoint.path}
                  </span>
                </div>

                <button
                  onClick={() => executeRequest()}
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{loading ? 'Executing...' : 'Send Request'}</span>
                </button>
              </div>

              {/* POST Body Editor if applicable */}
              {selectedEndpoint.method === 'POST' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Request JSON Payload (Body):
                    </label>
                    <span className="text-[10px] text-slate-400">application/json</span>
                  </div>
                  <textarea
                    rows={6}
                    value={requestBodyInput}
                    onChange={(e) => setRequestBodyInput(e.target.value)}
                    className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Response Viewer */}
            <div
              className="rounded-3xl p-5 border shadow-sm transition-all flex-grow flex flex-col"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Response Output:
                  </span>
                  {responseStatus !== null && (
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        responseStatus >= 200 && responseStatus < 300
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      HTTP {responseStatus}
                    </span>
                  )}
                  {responseTimeMs !== null && (
                    <span className="text-xs font-mono text-slate-400">
                      ⚡ {responseTimeMs} ms
                    </span>
                  )}
                </div>

                {responseData && (
                  <button
                    onClick={copyResponse}
                    className="text-xs text-slate-500 hover:text-blue-600 flex items-center space-x-1"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Response Code Area */}
              <div className="mt-3 flex-grow min-h-[300px]">
                {loading ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                    <Activity className="w-5 h-5 animate-spin mr-2 text-blue-600" />
                    <span>Communicating with Express server on port 3000...</span>
                  </div>
                ) : responseData ? (
                  <pre className="font-mono text-xs p-4 rounded-2xl bg-slate-950 text-slate-100 overflow-x-auto max-h-[480px] scrollbar-thin border border-slate-800">
                    {JSON.stringify(responseData, null, 2)}
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
                    Click "Send Request" to test this endpoint.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
