import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import CommandDashboard from './CommandDashboard';
import MobileApp from './MobileApp';
import { EDMini, ICUMini } from './MiniScreens';
import { AlertIcon, ArrowRightIcon, CheckIcon, MicIcon, PlayIcon, ShieldIcon, SparkIcon, ZapIcon } from './icons';
import { BrowserFrame, scrollToId } from './ui';
import hospAiLogo from '../assets/logo.png';

export default function Hero() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: background layers drift slower than the page.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let f = 0;
    // --lay: 1 = dashboard lying back at the top of the page, 0 = upright after ~55% of a screen of scroll.
    const on = () => {
      if (f) return;
      f = requestAnimationFrame(() => {
        f = 0;
        const y = window.scrollY;
        el.style.setProperty('--sy', String(Math.min(y, 1200)));
        el.style.setProperty('--lay', Math.max(0, 1 - y / (window.innerHeight * 0.55)).toFixed(3));
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { cancelAnimationFrame(f); window.removeEventListener('scroll', on); };
  }, []);

  return (
    <section ref={sectionRef} style={{ ['--lay' as string]: 1 }} className="relative pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-28 overflow-hidden bg-white">
      {/* Light stage: grid + soft coral/purple glows */}
      <div className="absolute inset-0 bg-grid mask-fade-b pointer-events-none" style={{ transform: 'translateY(calc(var(--sy, 0) * 0.25px))' }} />
      <div className="hero-aurora absolute -top-40 left-[10%] h-[520px] w-[520px] rounded-full bg-rose-200/25 blur-[110px] pointer-events-none" />
      <div className="hero-aurora absolute -top-24 right-[8%] h-[500px] w-[560px] rounded-full bg-purple-200/20 blur-[120px] pointer-events-none" style={{ animationDelay: '-6s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero stage */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Mobile Watermark: HospAI logo positioned in the background of the content with reduced opacity */}
          <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none -z-0 overflow-hidden select-none" aria-hidden="true">
            <img
              src={hospAiLogo}
              alt=""
              className="w-[320px] sm:w-[420px] max-w-none opacity-[0.08] filter blur-[0.4px] transform scale-110 -translate-y-6"
            />
          </div>

          {/* Left Column: Badge, Headline, Paragraph, CTAs & Mobile Proof */}
          <div className="relative z-10 lg:col-span-7 text-left">
            <button
              onClick={() => scrollToId('#dashboard')}
              className="animate-fade-in group inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/90 backdrop-blur pl-1.5 pr-3.5 py-1 text-[12px] sm:text-[13px] text-slate-600 shadow-sm hover:border-rose-300 hover:shadow-md transition-all duration-300 max-w-full"
            >
              <span className="relative shrink-0 flex items-center gap-1.5 rounded-full bg-[#e11d48] text-white text-[10.5px] sm:text-[11px] font-bold px-2.5 py-0.5 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping-slow" />
                + HospAI
              </span>
              <span className="truncate font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                AI hospital management, live in production
              </span>
              <ArrowRightIcon size={13} className="shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <h1 className="mt-5 sm:mt-6 font-display text-[36px] sm:text-[52px] lg:text-[62px] xl:text-[68px] font-extrabold text-slate-900 leading-[1.08] tracking-[-0.035em]">
              {['The', 'command', 'center'].map((w, i) => (
                <span key={w} className="word-rise" style={{ animationDelay: `${0.08 + i * 0.08}s` }}>{w}&nbsp;</span>
              ))}
              <br className="hidden sm:block" />
              {['for', 'your'].map((w, i) => (
                <span key={w} className="word-rise" style={{ animationDelay: `${0.32 + i * 0.08}s` }}>{w}&nbsp;</span>
              ))}
              <span className="word-rise" style={{ animationDelay: '0.48s' }}>
                <span className="text-shimmer bg-gradient-to-r from-[#e11d48] via-rose-500 to-[#e11d48] bg-clip-text text-transparent">
                  entire hospital.
                </span>
              </span>
            </h1>

            <p className="animate-fade-in-up anim-delay-500 mt-5 sm:mt-6 text-[15.5px] sm:text-[18px] text-slate-600 leading-relaxed max-w-xl">
              Census, beds, ED, ICU, OT, lab, pharmacy, billing and insurance on one live screen, with AI that writes notes,
              splits prescriptions and reads documents for your team.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up anim-delay-600 mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => navigate('/book-demo')}
                className="btn-shine group inline-flex items-center justify-center gap-2 h-[48px] sm:h-[50px] px-6 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white text-[15px] font-semibold shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Book a live demo <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToId('#dashboard')}
                className="group inline-flex items-center justify-center gap-2 h-[48px] sm:h-[50px] px-6 rounded-xl border border-slate-200/90 bg-white text-slate-800 text-[15px] font-semibold hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all duration-200"
              >
                <PlayIcon size={13} className="text-[#e11d48] fill-[#e11d48] transition-transform group-hover:scale-110" /> Explore the dashboard
              </button>
            </div>

            {/* Mobile enhancement: Live proof badges strip */}
            <div className="lg:hidden mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-[11.5px] font-semibold text-rose-700 whitespace-nowrap shadow-xs">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping-slow" />
                Critical Lab · 42s Alert
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200/70 text-[11.5px] font-semibold text-purple-700 whitespace-nowrap shadow-xs">
                <MicIcon size={12} className="text-purple-600" />
                Voice AI · Telugu SOAP
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-[11.5px] font-semibold text-emerald-700 whitespace-nowrap shadow-xs">
                <ZapIcon size={12} className="text-emerald-600" />
                54 Live Beds Sync
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-5 hidden sm:flex items-center gap-5 text-[12.5px] text-slate-500">
              <span className="flex items-center gap-1.5"><CheckIcon size={14} className="text-emerald-500" /> ABDM M1, M2, M3</span>
              <span className="flex items-center gap-1.5"><CheckIcon size={14} className="text-emerald-500" /> 10 Indian Languages</span>
              <span className="flex items-center gap-1.5"><CheckIcon size={14} className="text-emerald-500" /> NABH & HIPAA Ready</span>
            </div>
          </div>

          {/* Desktop Right Column: HospAI Logo with smooth floating animation & subtle breathing aura */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative my-4 lg:my-0">
            {/* Ambient breathing aura behind logo */}
            <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-tr from-rose-200/30 via-purple-200/25 to-sky-200/30 blur-3xl pointer-events-none animate-pulse-glow" />

            {/* Floating Logo showcase */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-center animate-float-gentle">
              <img
                src={hospAiLogo}
                alt="HospAI - AI-Driven Healthcare Optimization"
                className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[450px] object-contain select-none drop-shadow-[0_15px_30px_rgba(15,23,42,0.08)] transition-all duration-500 hover:scale-[1.03] hover:drop-shadow-[0_20px_40px_rgba(225,29,72,0.14)]"
              />
            </div>
          </div>
        </div>

        {/* Product, elevated */}
        <div className="relative mt-14 sm:mt-20 dash-rise">
          <div className="absolute -inset-x-6 -top-10 bottom-10 rounded-[48px] bg-gradient-to-b from-brand-500/15 via-accent-500/10 to-transparent blur-3xl pointer-events-none" />

          <div id="dashboard" className="hero-tilt relative scroll-mt-28">
            <div className="hero-tilt-inner relative">
              {/* Screens fanned out behind the main dashboard */}
              <div className="hidden lg:block absolute -left-[3%] -top-12 w-[40%] z-0 fan-left" aria-hidden="true">
                <EDMini />
              </div>
              <div className="hidden lg:block absolute -right-[3%] -top-8 w-[40%] z-0 fan-right" aria-hidden="true">
                <ICUMini />
              </div>

              <div className="relative z-10 mx-auto lg:w-[80%]">
              {/* On small screens the dashboard stays readable and swipes sideways */}
              <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto md:overflow-visible no-scrollbar">
                <div className="min-w-[760px] md:min-w-0 rounded-[22px] p-[1.5px] bg-gradient-to-b from-slate-200 via-slate-100 to-white shadow-[0_50px_100px_-30px_rgba(42,45,52,0.35)]">
                  <BrowserFrame url="hms.yourhospital.org/dashboard" className="relative !rounded-[21px]">
                    <CommandDashboard />
                  </BrowserFrame>
                </div>
              </div>
              <div className="md:hidden mt-3 flex items-center justify-center gap-2 text-[12.5px] font-medium text-slate-500">
                <span className="swipe-hint inline-block">←</span> Swipe to explore the dashboard <span className="swipe-hint inline-block">→</span>
              </div>

              {/* Floating proof chips */}
              <div className="hidden lg:flex absolute -left-5 xl:-left-10 -top-8 z-10 chip-pop items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-ink-900/20 px-4 py-3" style={{ animationDelay: '1.6s, 2.3s' }}>
                <span className="relative h-9 w-9 rounded-xl bg-red-500 text-white flex items-center justify-center"><span className="absolute inset-0 rounded-xl bg-red-500 animate-ping-slow" /><AlertIcon size={16} className="relative" /></span>
                <span className="leading-tight">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-red-600">Critical lab</span>
                  <span className="block text-[13.5px] font-semibold text-slate-900">Escalated in 42 sec</span>
                </span>
              </div>
              <div className="hidden lg:flex absolute -right-5 xl:-right-10 -top-8 z-10 chip-pop items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-ink-900/20 px-4 py-3" style={{ animationDelay: '1.85s, 2.55s' }}>
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 text-white flex items-center justify-center"><MicIcon size={16} /></span>
                <span className="leading-tight">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-accent-600">Voice AI</span>
                  <span className="block text-[13.5px] font-semibold text-slate-900">SOAP note ready · Telugu</span>
                </span>
              </div>
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-7 z-10 chip-pop items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-ink-900/20 px-4 py-3" style={{ animationDelay: '2.1s, 2.8s' }}>
                <span className="h-9 w-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center"><ZapIcon size={16} /></span>
                <span className="leading-tight">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-600">Live sync</span>
                  <span className="block text-[13.5px] font-semibold text-slate-900">54 beds available now</span>
                </span>
              </div>
              </div>

              {/* The same platform on mobile, in front */}
              <div className="hidden lg:block absolute right-[1%] -bottom-16 z-20 phone-in">
                <MobileApp scale={0.62} />
              </div>
            </div>

          </div>

          {/* Phones and tablets: the mobile app, full size */}
          <div className="lg:hidden mt-12 flex flex-col items-center">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">HospAI mobile</div>
            <div className="mt-1 text-[15px] font-semibold text-slate-800">Tap to try the app</div>
            <div className="mt-4"><MobileApp scale={0.9} /></div>
          </div>

          <p className="mt-6 lg:mt-24 flex items-center justify-center gap-2 text-center text-[13px] text-slate-500">
            <CheckIcon size={14} strokeWidth={2.5} className="text-emerald-600" />
            Live preview with sample data. Click the sidebar, dismiss alerts, or tap the phone app.
          </p>
        </div>
      </div>
    </section>
  );
}
