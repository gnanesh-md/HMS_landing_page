import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ChevronDownIcon, MenuIcon, XIcon } from './icons';
import { moduleGroups, showDashboard } from './moduleData';
import { scrollToId } from './ui';

const navLinks = [
  { label: 'Modules', href: '#modules' },
  { label: 'Doctor Portal', href: '#doctor' },
  { label: 'AI', href: '#ai' },
  { label: 'Departments', href: '#departments' },
  { label: 'Pharmacy', href: '#pharmacy' },
  { label: 'Billing & TPA', href: '#revenue' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
];

/** HospAI official transparent brand logo. */
export function LogoMark({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/hosp ai logo without bg.png"
      alt="HospAI"
      width={size}
      height={size}
      className={`object-contain shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function Logo({
  dark = false,
  className = '',
  imgClassName = '',
}: {
  dark?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src="/hosp ai logo without bg.png"
        alt="HospAI"
        className={`h-14 sm:h-18 md:h-20 w-auto object-contain select-none transition-transform hover:scale-[1.02] ${
          dark ? 'brightness-125 drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]' : ''
        } ${imgClassName}`}
      />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [megaCat, setMegaCat] = useState(0);
  const [current, setCurrent] = useState<string | null>(null);
  const solid = scrolled || mega;
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy: highlight the nav link for the section in the middle of the screen.
  useEffect(() => {
    const els = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setCurrent(`#${e.target.id}`); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => { if (window.scrollY < 300) setCurrent(null); };
    window.addEventListener('scroll', onTop, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onTop); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    setMega(false);
    scrollToId(href);
  };

  const openModules = () => {
    setMega(false);
    setMenuOpen(false);
    scrollToId('#modules');
  };

  const openDashboard = () => {
    setMega(false);
    setMenuOpen(false);
    showDashboard();
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* Announcement */}
        <div className={`bg-ink-900 text-slate-300 text-[13px] transition-all duration-300 overflow-hidden ${scrolled ? 'h-0' : 'h-9'}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-9 flex items-center justify-center gap-2">
            <span className="hidden sm:inline rounded-full bg-brand-600/20 text-brand-300 text-[11px] font-semibold px-2 py-0.5">New</span>
            <span className="truncate">New: Voice SOAP notes in Telugu, Hindi, Tamil, Kannada and English.</span>
            <button onClick={() => goTo('#doctor')} className="hidden sm:inline-flex items-center gap-1 text-white font-medium hover:text-brand-300">
              See it <ArrowRightIcon size={13} />
            </button>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            solid ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_0_rgba(15,23,42,0.02)]' : 'bg-transparent border-b border-transparent'
          }`}
          onMouseLeave={() => setMega(false)}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="HospAI home">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              <button
                onMouseEnter={() => setMega(true)}
                onClick={() => setMega((m) => !m)}
                className={`flex items-center gap-1 px-3 h-9 rounded-md text-[14px] font-medium transition-colors ${mega ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900'}`}
                aria-expanded={mega}
              >
                Platform <ChevronDownIcon size={14} className={`transition-transform ${mega ? 'rotate-180' : ''}`} />
              </button>
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onMouseEnter={() => setMega(false)}
                  onClick={() => goTo(l.href)}
                  className={`relative px-3 h-9 rounded-md text-[14px] font-medium transition-colors ${current === l.href ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {l.label}
                  <span className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-600 origin-left transition-transform duration-500 ${current === l.href ? 'scale-x-100' : 'scale-x-0'}`} />
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <button onClick={openDashboard} className="px-3.5 h-9 text-[14px] font-medium text-slate-700 hover:text-slate-900">
                Live demo
              </button>
              <button
                onClick={() => navigate('/book-demo')}
                className="btn-shine inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-slate-900 text-white text-[14px] font-semibold hover:bg-slate-800 transition-colors"
              >
                Book a demo <ArrowRightIcon size={14} />
              </button>
            </div>

            <button className="lg:hidden p-2 -mr-2 rounded-md text-slate-700" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <MenuIcon size={22} />
            </button>
          </div>

          {/* Mega menu */}
          {mega && (
            <div className="hidden lg:block border-t border-slate-100 animate-fade-in">
              <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-12 gap-6">
                <div className="col-span-3 space-y-1">
                  {moduleGroups.map((g, i) => (
                    <button
                      key={g.key}
                      onMouseEnter={() => setMegaCat(i)}
                      onFocus={() => setMegaCat(i)}
                      className={`w-full text-left rounded-xl px-4 py-3 transition-colors ${megaCat === i ? 'bg-brand-50' : 'hover:bg-slate-50'}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${megaCat === i ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <g.icon size={16} />
                        </span>
                        <span className={`text-[14.5px] font-semibold ${megaCat === i ? 'text-brand-800' : 'text-slate-700'}`}>{g.title}</span>
                        <span className="ml-auto text-[12px] text-slate-400">{g.items.length}</span>
                      </span>
                    </button>
                  ))}
                  <p className="px-4 pt-3 text-[12.5px] text-slate-500 leading-relaxed">{moduleGroups[megaCat].blurb}</p>
                </div>

                <div key={megaCat} className="col-span-6 grid grid-cols-2 gap-1 content-start border-l border-slate-100 pl-6 animate-view-in">
                  {moduleGroups[megaCat].items.map((it) => {
                    return (
                      <button key={it.key} onClick={openModules} className="group flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 text-left">
                        <span className="h-9 w-9 shrink-0 rounded-lg border border-slate-200 bg-white text-slate-600 flex items-center justify-center transition-colors group-hover:border-brand-200 group-hover:text-brand-600">
                          <it.icon size={17} />
                        </span>
                        <span>
                          <span className="flex items-center gap-1 text-[14px] font-semibold text-slate-900">
                            {it.label}
                            <ArrowRightIcon size={12} className="text-brand-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                          </span>
                          <span className="block text-[12.5px] text-slate-500 leading-snug mt-0.5">{it.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button onClick={openDashboard} className="group col-span-3 text-left rounded-2xl bg-ink-900 p-5 text-white flex flex-col overflow-hidden relative">
                  <div className="absolute inset-0 bg-grid-dark opacity-60" />
                  <div className="relative">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">Interactive demo</div>
                    <div className="mt-2 font-display text-[17px] font-bold leading-snug">Try the live command dashboard. No sign-up.</div>
                  </div>
                  <div className="relative mt-4 rounded-lg bg-white/[0.06] border border-white/10 p-3 space-y-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                    {[['ESI 1', 'bg-white text-ink-900', 'Thomas Reed'], ['ESI 2', 'bg-red-500', 'Ann Martinez'], ['ESI 3', 'bg-orange-500', 'Kevin Park']].map(([e, c, n]) => (
                      <div key={n} className="flex items-center gap-2 text-[11.5px]">
                        <span className={`font-mono font-bold rounded px-1 text-[10px] ${c}`}>{e}</span>
                        <span className="text-slate-300">{n}</span>
                      </div>
                    ))}
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-300 group-hover:text-white">
                    Open the dashboard <ArrowRightIcon size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-[86%] max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between px-5 h-20 border-b border-slate-100">
              <Logo />
              <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2 text-slate-600" aria-label="Close menu"><XIcon size={22} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {[{ label: 'Live dashboard', href: '#dashboard' }, ...navLinks].map((l) => (
                <button key={l.label} onClick={() => goTo(l.href)} className="w-full text-left px-3 py-3 rounded-lg text-[16px] font-medium text-slate-800 hover:bg-slate-50">
                  {l.label}
                </button>
              ))}
              <div className="mt-4 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Modules</div>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {moduleGroups.flatMap((g) => g.items).map((m) => (
                  <button key={m.key} onClick={openModules} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[14px] text-slate-600 hover:bg-slate-50">
                    <m.icon size={15} className="text-slate-400" /> {m.label}
                  </button>
                ))}
              </div>
            </nav>
            <div className="p-5 border-t border-slate-100">
              <button
                onClick={() => { setMenuOpen(false); navigate('/book-demo'); }}
                className="w-full h-12 rounded-lg bg-brand-600 text-white text-[15px] font-semibold hover:bg-brand-700"
              >
                Book a demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
