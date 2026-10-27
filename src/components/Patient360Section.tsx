import { useState, useEffect } from 'react';
import {
  AlertIcon, ArrowRightIcon, BrainIcon, CheckIcon, ClipboardIcon, HeartPulseIcon,
  MessageIcon, SparkIcon, TrendIcon, UserIcon, UsersIcon, type IconType
} from './icons';
import { BrowserFrame, Reveal, SectionHeading } from './ui';

type TabKey = 'profile' | 'journey' | 'whatsapp' | 'escalations';

interface TabPillar {
  key: TabKey;
  icon: IconType;
  label: string;
  title: string;
  desc: string;
  pill: string;
}

const pillars: TabPillar[] = [
  {
    key: 'profile',
    icon: UserIcon,
    label: 'Patient 360° Profile',
    title: 'One Longitudinal Record Across Care',
    desc: 'Consolidated view of demographics, clinical encounters, discharge summaries, active medications, lab trends, and care history.',
    pill: 'Single EMR Thread',
  },
  {
    key: 'journey',
    icon: ClipboardIcon,
    label: 'Care Journeys',
    title: 'Automated Post-Discharge Pathways',
    desc: 'Pre-configured clinical pathways that automatically schedule check-ins, medication adherence audits, and follow-up reminders.',
    pill: 'Clinical Pathways',
  },
  {
    key: 'whatsapp',
    icon: MessageIcon,
    label: 'WhatsApp Outreach',
    title: 'Patient Feedback Without Any App Download',
    desc: 'Deliver approved surveys directly through WhatsApp. Collect real recovery scores and keep a timestamped conversation log.',
    pill: '87% Response Rate',
  },
  {
    key: 'escalations',
    icon: AlertIcon,
    label: 'Tasks & Escalations',
    title: 'Concerning Symptoms Routed in Real Time',
    desc: 'Keppler AI evaluates patient responses. High pain scores, abnormal vitals, or unanswered check-ins route directly to staff queues.',
    pill: 'Instant Clinical Routing',
  },
];

export default function Patient360Section() {
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        const idx = pillars.findIndex((p) => p.key === curr);
        return pillars[(idx + 1) % pillars.length].key;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const selectTab = (k: TabKey) => {
    setActiveTab(k);
    setAutoRotate(false);
  };

  return (
    <section id="patient360" className="py-24 sm:py-32 bg-slate-50 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Patient 360° · Post-Discharge Continuity"
            title={
              <>
                One unified workspace to understand{' '}
                <span className="text-brand-600">every patient’s recovery journey.</span>
              </>
            }
            desc="HospAI Patient 360° brings together clinical history, automated WhatsApp surveys, follow-up journeys, and real-time clinical escalations — natively integrated without duplicating hospital records."
          />
        </Reveal>

        {/* Interactive Split View */}
        <Reveal className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Interactive Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pillars.map((p) => {
              const active = activeTab === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => selectTab(p.key)}
                  className={`relative text-left rounded-2xl border p-5 transition-all duration-200 overflow-hidden ${
                    active
                      ? 'bg-white border-brand-300 shadow-lg shadow-brand-900/5 ring-1 ring-brand-500/20'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        active
                          ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <p.icon size={20} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] font-bold uppercase tracking-wider text-brand-600">
                          {p.label}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {p.pill}
                        </span>
                      </div>
                      <div className="text-[15px] font-bold text-slate-900 mt-0.5 leading-snug">
                        {p.title}
                      </div>
                      <p className="text-[12.5px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Quick Metrics Tag */}
            <div className="mt-2 rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendIcon size={18} />
                </span>
                <div>
                  <div className="text-[14px] font-bold text-slate-900">40% Readmission Reduction</div>
                  <div className="text-[12px] text-slate-500">Documented in post-discharge pilot cohorts</div>
                </div>
              </div>
              <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>

          {/* Right Column: Tailored Preview for Active Tab */}
          <div className="lg:col-span-7 flex flex-col">
            <BrowserFrame
              url={`hms.generalhospital.org / patient-360 / ${activeTab}`}
              className="flex-1 min-h-[460px] flex flex-col shadow-xl"
            >
              <div className="p-6 flex-1 flex flex-col bg-white">
                {/* Persistent Patient Banner */}
                <div className="rounded-xl bg-slate-900 text-white p-4 mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center font-bold text-white text-[15px] shadow">
                      JO
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold">James R. Okafor</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 text-brand-300">
                          MRN-100482
                        </span>
                      </div>
                      <div className="text-[12px] text-slate-400 mt-0.5">
                        64 yrs · Male · Post-CABG (Cardiac Surgery) · Discharged 3 days ago
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Recovery: Stable
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">Care Lead: Dr. Iqbal</div>
                  </div>
                </div>

                {/* Tab Specific Workspace Content */}
                {activeTab === 'profile' && (
                  <div className="space-y-4 flex-1">
                    <div className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                      Longitudinal Patient Timeline
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { step: 'Emergency Intake', time: 'Oct 18 · 10:14 PM', tag: 'ESI-2 Critical', color: 'bg-rose-50 text-rose-700 border-rose-200' },
                        { step: 'Cath Lab & Surgery', time: 'Oct 19 · 08:30 AM', tag: 'Triple CABG', color: 'bg-violet-50 text-violet-700 border-violet-200' },
                        { step: 'ICU Stepdown', time: 'Oct 21 · 04:00 PM', tag: '7-Tab Flowsheet', color: 'bg-brand-50 text-brand-700 border-brand-200' },
                        { step: 'Home Discharge', time: 'Oct 24 · 11:00 AM', tag: 'Summary Issued', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                      ].map((item) => (
                        <div key={item.step} className="rounded-xl border border-slate-200 p-3 bg-slate-50/50">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.color}`}>
                            {item.tag}
                          </span>
                          <div className="text-[13px] font-bold text-slate-900 mt-2">{item.step}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.time}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="rounded-xl border border-slate-200 p-4">
                        <div className="text-[12px] font-bold text-slate-700 mb-2">Discharged Medications</div>
                        <ul className="space-y-2 text-[12.5px] text-slate-600">
                          <li className="flex justify-between border-b border-slate-100 pb-1.5">
                            <span>Aspirin 75mg OD</span>
                            <span className="font-semibold text-slate-900">Morning</span>
                          </li>
                          <li className="flex justify-between border-b border-slate-100 pb-1.5">
                            <span>Atorvastatin 40mg OD</span>
                            <span className="font-semibold text-slate-900">Night</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Metoprolol 25mg BD</span>
                            <span className="font-semibold text-slate-900">Twice Daily</span>
                          </li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-slate-200 p-4 bg-brand-50/20">
                        <div className="text-[12px] font-bold text-brand-900 mb-2 flex items-center gap-1.5">
                          <SparkIcon size={14} className="text-brand-600" /> Keppler AI Summary
                        </div>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">
                          Patient successfully discharged on post-CABG protocol. Day-3 check-in confirmed minimal pain (2/10), walking 15 min daily. No chest tightness or fever reported. Follow-up consultation scheduled for Nov 3.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'journey' && (
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        Active Pathway: Post-CABG Recovery (14-Day Protocol)
                      </span>
                      <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        Day 3 of 14
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { day: 'Day 0 · Discharge', title: 'Discharge Summary & Prescription Dispatched', status: 'Completed', date: 'Oct 24', done: true },
                        { day: 'Day 1 · Home Arrival', title: 'WhatsApp Check-in: Medication delivery & arrival confirmation', status: 'Patient Responded', date: 'Oct 25', done: true },
                        { day: 'Day 3 · Vitals & Pain', title: 'Automated Survey: Pain scale (1–10), walking tolerance & wound photo', status: 'Recorded (2/10 Pain)', date: 'Today · 10:15 AM', done: true },
                        { day: 'Day 7 · Clinical Review', title: 'Nurse phone check-in & sternal healing assessment', status: 'Scheduled', date: 'Oct 31', done: false },
                        { day: 'Day 14 · Cardiology Review', title: 'In-person consultation with Dr. Iqbal (Cardiology OPD)', status: 'Queued', date: 'Nov 3', done: false },
                      ].map((j, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3.5 p-3 rounded-xl border ${
                            j.done ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200/60 opacity-70'
                          }`}
                        >
                          <span
                            className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                              j.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {j.done ? <CheckIcon size={12} strokeWidth={3} /> : i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-semibold text-brand-600">{j.day}</span>
                              <span className="text-[11px] text-slate-400">{j.date}</span>
                            </div>
                            <div className="text-[13px] font-bold text-slate-900 truncate">{j.title}</div>
                          </div>
                          <span
                            className={`text-[11px] font-semibold px-2 py-1 rounded shrink-0 ${
                              j.done ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {j.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'whatsapp' && (
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        WhatsApp Conversation Feed · Verified Hospital Channel
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Delivered & Responded
                      </span>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 font-sans">
                      {/* Outbound Hospital Message */}
                      <div className="max-w-[85%] bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
                        <div className="text-[11px] font-bold text-brand-600 mb-1">HospAI Care Assistant</div>
                        <p className="text-[13px] text-slate-800 leading-relaxed">
                          Hello Mr. James, this is your Day-3 recovery check-in from General Hospital.
                          <br />
                          1. How is your chest pain today from 1 to 10?
                          <br />
                          2. Have you experienced any breathlessness or swelling?
                        </p>
                        <div className="text-[10px] text-slate-400 text-right mt-1">10:00 AM · Sent via WhatsApp API</div>
                      </div>

                      {/* Inbound Patient Message */}
                      <div className="max-w-[80%] ml-auto bg-emerald-500 text-white rounded-2xl rounded-tr-sm p-3.5 shadow-sm">
                        <p className="text-[13px] leading-relaxed">
                          "Good morning! Pain is very mild today, about 2/10. No breathlessness. I went for a 15-minute slow walk in the garden and took all morning medications."
                        </p>
                        <div className="text-[10px] text-emerald-100 text-right mt-1">10:14 AM · Read & Logged</div>
                      </div>

                      {/* Automated Clinical AI Confirmation */}
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px]">
                        <CheckIcon size={14} className="text-emerald-600 shrink-0" strokeWidth={2.5} />
                        <span>
                          <strong>Keppler AI Assessment:</strong> Pain score 2/10 within expected tolerance. Vitals stable. No clinical intervention needed.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'escalations' && (
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        Care Team Task & Escalation Board
                      </span>
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        1 High Priority Flag
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          patient: 'Carlos A. Mendez (71M)',
                          condition: 'Hypertension / CKD Stage 3',
                          reason: 'No response to Day-1 post-discharge survey within 24 hours',
                          priority: 'Urgent',
                          priorityColor: 'bg-rose-100 text-rose-800 border-rose-300',
                          action: 'Assigned to Nurse Sarah · Outbound call pending',
                        },
                        {
                          patient: 'David K. Mensah (58M)',
                          condition: 'Total Knee Arthroplasty',
                          reason: 'Patient reported moderate swelling and pain increased from 4 to 6/10',
                          priority: 'Review',
                          priorityColor: 'bg-amber-100 text-amber-800 border-amber-300',
                          action: 'Routed to Dr. Okafor (Ortho) · Prescription review',
                        },
                        {
                          patient: 'Fatima Al-Hassan (29F)',
                          condition: 'Post-Cesarean Delivery',
                          reason: 'Wound recovery confirmed satisfactory · Newborn feeding normal',
                          priority: 'Resolved',
                          priorityColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                          action: 'Closed by Midwife Elena · Routine follow-up scheduled',
                        },
                      ].map((esc, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white">
                          <div className="flex items-center justify-between">
                            <span className="text-[13.5px] font-bold text-slate-900">{esc.patient}</span>
                            <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded border ${esc.priorityColor}`}>
                              {esc.priority}
                            </span>
                          </div>
                          <div className="text-[12px] text-slate-500 mt-0.5">{esc.condition}</div>
                          <div className="text-[12.5px] text-slate-800 mt-1 font-medium">{esc.reason}</div>
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11.5px]">
                            <span className="text-slate-500">{esc.action}</span>
                            <button type="button" className="font-semibold text-brand-600 hover:text-brand-700">
                              Open Record →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </BrowserFrame>
          </div>
        </Reveal>

        {/* 3 Value Pillars at the bottom */}
        <Reveal className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <ClipboardIcon size={20} />
            </span>
            <div className="font-display text-[16px] font-bold text-slate-900">Native HMS Integration</div>
            <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
              Connects directly with your OPD, IPD, Discharge, Pharmacy, and Lab modules. Automatically kicks off care pathways without duplicating patient records.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="h-10 w-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <BrainIcon size={20} />
            </span>
            <div className="font-display text-[16px] font-bold text-slate-900">Keppler AI Segmentation</div>
            <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
              Query your patient population using natural English: filter cohorts from discharge PDFs, lab results, and survey responses in seconds.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <MessageIcon size={20} />
            </span>
            <div className="font-display text-[16px] font-bold text-slate-900">Zero App Download Required</div>
            <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
              Patients respond via WhatsApp messages they already check. Reaches elderly and regional patients effortlessly with 87% average survey response rates.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
