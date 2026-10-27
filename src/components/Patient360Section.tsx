import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import HMSDashboard from './dashboard/HMSDashboard';

const journeySteps = [
  { icon: '🏥', label: 'Patient Discharged', desc: 'Discharge summary auto-generated and sent via portal' },
  { icon: '🤖', label: 'Journey Created', desc: 'Keppler AI configures the care pathway automatically' },
  { icon: '💬', label: 'WhatsApp Survey Sent', desc: 'Personalised check-in delivered on schedule' },
  { icon: '📊', label: 'Feedback Captured', desc: 'Patient responses analysed for recovery sentiment' },
  { icon: '⚡', label: 'Tasks Escalated', desc: 'Concerns routed to the right care team member instantly' },
  { icon: '✅', label: 'Journey Closed', desc: 'Care episode documented with outcome metrics' },
];

const features = [
  {
    title: 'Unified Patient Profile',
    desc: 'Every encounter, discharge summary, lab result, prescription and appointment — visible in a single 360° workspace.',
    icon: '🧑‍⚕️',
    color: 'bg-brand-50 border-brand-200 text-brand-700',
  },
  {
    title: 'Keppler AI Segmentation',
    desc: 'Query your entire patient population in plain language. "Diabetic patients discharged in the last 30 days with HbA1c > 8" — done in seconds.',
    icon: '🧠',
    color: 'bg-violet-50 border-violet-200 text-violet-700',
  },
  {
    title: 'WhatsApp Outreach Engine',
    desc: 'Send approved surveys and check-ins via WhatsApp. Track delivery, read status and responses in a complete conversation timeline.',
    icon: '💬',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  },
  {
    title: 'Automated Care Journeys',
    desc: 'Configure clinical pathways with daily surveys, appointment reminders and medication adherence checks — no manual follow-up needed.',
    icon: '📋',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  {
    title: 'Smart Escalations',
    desc: 'Concerning responses, missed messages and overdue tasks are automatically routed to the right doctor, nurse or care coordinator.',
    icon: '⚡',
    color: 'bg-rose-50 border-rose-200 text-rose-700',
  },
  {
    title: 'Recovery Analytics',
    desc: 'Track response rates, sentiment trends, journey performance and staff task completion — across every post-discharge programme.',
    icon: '📊',
    color: 'bg-teal-50 border-teal-200 text-teal-700',
  },
];

const metrics = [
  { value: '87%', label: 'Survey response rate', sub: 'vs 12% phone follow-up' },
  { value: '3.2d', label: 'First response time', sub: 'median across journeys' },
  { value: '40%', label: 'Readmission reduction', sub: 'pilot hospitals reported' },
  { value: '100%', label: 'Integrated with HMS', sub: 'no duplicate data entry' },
];

export default function Patient360Section() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="patient360" className="py-28 bg-white relative overflow-hidden">
      {/* Gradient bg blob */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-violet-50/80 via-brand-50/40 to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={ref} className="scroll-reveal">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">New Module</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-5"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Patient 360° —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-brand-600">
                Care Beyond Discharge
              </span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              The only post-discharge engagement module built natively inside your HMS. Automated WhatsApp follow-ups, 
              AI-powered recovery tracking, and smart escalations — without any third-party tool.
            </p>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {metrics.map((m) => (
              <div
                key={m.value}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="text-3xl font-extrabold text-brand-700 mb-1"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {m.value}
                </div>
                <div className="text-[13px] font-semibold text-slate-900">{m.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Main content: mockup + journey flow */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

            {/* Left: Interactive HMS mockup showing Patient 360° */}
            <div className="order-2 lg:order-1">
              <div className="rounded-xl border border-slate-200/60 shadow-[0_24px_48px_-8px_rgba(0,0,0,0.12)] overflow-hidden ring-1 ring-slate-900/5">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-[#f8fafc]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1 max-w-[260px] mx-auto shadow-sm">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1.5a2 2 0 0 1 2 2V5l1 1v1H2V6l1-1V3.5a2 2 0 0 1 2-2z" stroke="#94a3b8" strokeWidth="1" fill="none"/>
                      </svg>
                      <span className="text-[10px] text-slate-500 font-medium">hms.generalhospital.org / patient360</span>
                    </div>
                  </div>
                </div>
                <div style={{ height: '460px' }}>
                  <HMSDashboard view="patient360" />
                </div>
              </div>
            </div>

            {/* Right: How it works — interactive journey steps */}
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">How It Works</p>
              <div className="space-y-2">
                {journeySteps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-full text-left rounded-xl border px-5 py-4 transition-all duration-200 ${
                      activeStep === i
                        ? 'border-violet-300 bg-violet-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xl shrink-0 transition-all ${activeStep === i ? 'bg-violet-100' : 'bg-slate-100'}`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-bold tracking-widest uppercase ${activeStep === i ? 'text-violet-500' : 'text-slate-400'}`}
                          >
                            Step {i + 1}
                          </span>
                        </div>
                        <div className={`text-[14px] font-semibold ${activeStep === i ? 'text-slate-900' : 'text-slate-700'}`}>
                          {step.label}
                        </div>
                        {activeStep === i && (
                          <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                        )}
                      </div>
                      <div className="ml-auto">
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${activeStep === i ? 'border-violet-500 bg-violet-500' : 'border-slate-300'}`}>
                          {activeStep === i && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">Core Capabilities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className={`rounded-xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${f.color.split(' ').slice(0, 2).join(' ')} border-opacity-60`}
                >
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className="text-[14px] font-bold text-slate-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keppler AI callout */}
          <div className="rounded-2xl bg-gradient-to-r from-violet-700 to-brand-700 p-8 text-white overflow-hidden relative">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-4 bottom-0 h-28 w-28 rounded-full bg-violet-400/20 blur-xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-violet-300 animate-pulse" />
                  <span className="text-xs font-bold text-violet-300 tracking-widest uppercase">Powered by Keppler AI · Qwen</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  "Show me all diabetic patients discharged in October with HbA1c above 8 who haven't responded to their Day 3 survey."
                </h3>
                <p className="text-violet-200 text-[13px] leading-relaxed">
                  Natural language patient search, Excel/PDF cohort import, and AI-generated recovery insights — all within your existing HMS. 
                  No separate analytics tool needed.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-[13px] w-full">
                  <div className="text-violet-200 text-[10px] font-bold tracking-wider uppercase mb-1">Keppler AI found</div>
                  <div className="text-2xl font-bold">14 patients</div>
                  <div className="text-violet-200 text-[11px] mt-0.5">matching your criteria</div>
                </div>
                <div className="rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-[13px] w-full">
                  <div className="text-violet-200 text-[10px] font-bold tracking-wider uppercase mb-1">Recommended action</div>
                  <div className="text-[13px] font-semibold">Schedule urgent follow-up call for 3 high-risk patients</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

