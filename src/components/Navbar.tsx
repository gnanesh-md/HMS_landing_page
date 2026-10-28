import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hospAiLogo from '../assets/logo.png';
import hospAiLogoDark from '../assets/logo-dark.png';
import { ArrowRightIcon, ChevronDownIcon, MenuIcon, XIcon } from './icons';
import { moduleGroups, showDashboard } from './moduleData';
import { scrollToId } from './ui';

const navLinks = [
  { label: 'Doctor Portal', href: '#doctor' },
  { label: 'AI', href: '#ai' },
  { label: 'Departments', href: '#departments' },
  { label: 'Pharmacy', href: '#pharmacy' },
  { label: 'Billing & TPA', href: '#revenue' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
];

/** HospAI official transparent brand logo. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <img
      src={hospAiLogo}
      alt="HospAI"
      width={size}
      height={size}
      className="object-contain shrink-0 select-none"
      style={{ width: size, height: size }}
    />
  );
}

export function Logo({
  dark = false,
  className = '',
  imgClassName = '',
  compact = false,
}: {
  dark?: boolean;
  className?: string;
  imgClassName?: string;
  compact?: boolean;
}) {
  const sizeClasses = compact ? 'h-9 sm:h-10' : 'h-10 sm:h-11';
  const logoSrc = dark ? hospAiLogoDark : hospAiLogo;

  return (
    <span className={`inline-flex items-center transition-all duration-300 ${className}`}>
      <img
        src={logoSrc}
        alt="HospAI"
        className={`${dark ? 'h-20 sm:h-24 md:h-28' : sizeClasses} w-auto object-contain select-none transition-all duration-300 hover:scale-[1.02] ${imgClassName}`}
      />
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [megaCat, setMegaCat] = useState(0);
  const [current, setCurrent] = useState<string | null>(null);
  const navigate = useNavigate();

  // Scroll spy: highlight the nav link for the section in the middle of the screen.
  useEffect(() => {
    const allLinks = [{ label: 'Modules', href: '#modules' }, ...navLinks];
    const els = allLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
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
      {/* Floating pill navbar matching mockup */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
        <div
          className="pointer-events-auto mx-auto max-w-7xl"
          onMouseLeave={() => setMega(false)}
        >
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl h-16 flex items-center justify-between px-4 sm:px-6 transition-all duration-300">
            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
              {/* Platform dropdown trigger */}
              <button
                onMouseEnter={() => { setMegaCat(0); setMega(true); }}
                onClick={() => setMega((m) => !m)}
                className={`flex items-center gap-1 px-2.5 xl:px-3 h-9 rounded-lg text-[13.5px] xl:text-[14px] font-medium transition-colors ${
                  mega ? 'text-slate-900 bg-slate-100 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-expanded={mega}
              >
                Platform <ChevronDownIcon size={13} className={`transition-transform duration-200 ${mega ? 'rotate-180' : ''}`} />
              </button>

              {/* Modules dropdown trigger: opens the full modules catalogue */}
              <button
                onMouseEnter={() => { setMega(true); }}
                onClick={() => {
                  if (!mega) setMega(true);
                  else goTo('#modules');
                }}
                className={`flex items-center gap-1 px-2.5 xl:px-3 h-9 rounded-lg text-[13.5px] xl:text-[14px] font-medium transition-colors ${
                  mega || current === '#modules' ? 'text-slate-900 bg-slate-100 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-expanded={mega}
              >
                Modules <ChevronDownIcon size={13} className={`transition-transform duration-200 ${mega ? 'rotate-180' : ''}`} />
              </button>

              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onMouseEnter={() => setMega(false)}
                  onClick={() => goTo(l.href)}
                  className={`relative px-2 xl:px-2.5 h-9 rounded-lg text-[13px] xl:text-[14px] font-medium transition-colors ${
                    current === l.href ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l.label}
                  {current === l.href && (
                    <span className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-[#e11d48]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Nav Header items */}
            <button
              className="lg:hidden flex items-center gap-2 p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={22} />
              <span className="text-[14px] font-medium text-slate-800">Menu</span>
            </button>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                onClick={openDashboard}
                className="hidden lg:inline-flex items-center px-3 h-9 text-[13.5px] xl:text-[14px] font-medium text-slate-700 hover:text-slate-900"
              >
                Live demo
              </button>
              <div className="hidden lg:block h-5 w-px bg-slate-200 mx-1" />
              <button
                onClick={() => navigate('/book-demo')}
                className="btn-shine inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[13px] sm:text-[13.5px] xl:text-[14px] font-semibold transition-colors shadow-sm"
              >
                Book a demo <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>

          {/* Mega dropdown menu with full module catalogue */}
          {mega && (
            <div
              className="hidden lg:block mt-2 rounded-2xl border border-slate-200/80 bg-white/98 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 animate-fade-in"
            >
              <div className="grid grid-cols-12 gap-6">
                {/* Category Selector */}
                <div className="col-span-3 space-y-1">
                  <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Module Categories
                  </div>
                  {moduleGroups.map((g, i) => (
                    <button
                      key={g.key}
                      onMouseEnter={() => setMegaCat(i)}
                      onFocus={() => setMegaCat(i)}
                      className={`w-full text-left rounded-xl px-4 py-2.5 transition-colors ${megaCat === i ? 'bg-rose-50 text-rose-900' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${megaCat === i ? 'bg-[#e11d48] text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <g.icon size={16} />
                        </span>
                        <span className={`text-[14px] font-semibold ${megaCat === i ? 'text-rose-900' : 'text-slate-700'}`}>{g.title}</span>
                        <span className="ml-auto text-[11.5px] font-mono text-slate-400">{g.items.length}</span>
                      </span>
                    </button>
                  ))}
                  <p className="px-4 pt-3 text-[12px] text-slate-500 leading-relaxed border-t border-slate-100 mt-2">{moduleGroups[megaCat].blurb}</p>
                </div>

                {/* Modules list in active category */}
                <div key={megaCat} className="col-span-6 border-l border-slate-100 pl-6 animate-view-in">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[12.5px] font-bold text-slate-900 uppercase tracking-wide">
                      {moduleGroups[megaCat].title} ({moduleGroups[megaCat].items.length} modules)
                    </span>
                    <button onClick={openModules} className="text-[12px] font-semibold text-[#e11d48] hover:underline flex items-center gap-1">
                      View all in grid <ArrowRightIcon size={12} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-[340px] overflow-y-auto pr-1">
                    {moduleGroups[megaCat].items.map((it) => {
                      return (
                        <button key={it.key} onClick={openModules} className="group flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 text-left transition-colors">
                          <span className="h-8 w-8 shrink-0 rounded-lg border border-slate-200 bg-white text-slate-600 flex items-center justify-center transition-colors group-hover:border-rose-200 group-hover:text-[#e11d48] shadow-xs">
                            <it.icon size={15} />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-1 text-[13.5px] font-semibold text-slate-900 truncate">
                              {it.label}
                              <ArrowRightIcon size={11} className="text-[#e11d48] opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 shrink-0" />
                            </span>
                            <span className="block text-[11.5px] text-slate-500 leading-tight mt-0.5 line-clamp-2">{it.desc}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Promo / Interactive Demo */}
                <button onClick={openDashboard} className="group col-span-3 text-left rounded-2xl bg-slate-900 p-5 text-white flex flex-col justify-between overflow-hidden relative shadow-lg">
                  <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
                  <div className="relative">
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose-300">Live Production Preview</div>
                    <div className="mt-2 font-display text-[16px] font-bold leading-snug">Try the live command dashboard with all 60+ modules.</div>
                  </div>
                  <div className="relative my-3 rounded-lg bg-white/[0.08] border border-white/10 p-2.5 space-y-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {[['ESI 1', 'bg-white text-slate-900', 'Thomas Reed'], ['ESI 2', 'bg-red-500 text-white', 'Ann Martinez'], ['ESI 3', 'bg-orange-500 text-white', 'Kevin Park']].map(([e, c, n]) => (
                      <div key={n} className="flex items-center gap-2 text-[11px]">
                        <span className={`font-mono font-bold rounded px-1 text-[9.5px] ${c}`}>{e}</span>
                        <span className="text-slate-300 truncate">{n}</span>
                      </div>
                    ))}
                  </div>
                  <span className="relative inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-rose-300 group-hover:text-white transition-colors">
                    Open interactive dashboard <ArrowRightIcon size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>

              {/* Bottom bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                <span>Enterprise Hospital OS with full ABDM M1/M2/M3 certification, DICOM PACS, and Voice AI.</span>
                <button onClick={openModules} className="font-semibold text-[#e11d48] hover:text-[#be123c] flex items-center gap-1">
                  Explore full 60+ modular hospital architecture <ArrowRightIcon size={12} />
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
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
              <span className="font-display font-bold text-[18px] text-slate-900">Hospital Navigation</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-md" aria-label="Close menu"><XIcon size={22} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              {/* Primary Nav Links */}
              <div className="space-y-1">
                <button onClick={() => goTo('#modules')} className="w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#e11d48] hover:bg-rose-50 flex items-center justify-between">
                  <span>Modules (60+ Catalogue)</span>
                  <ArrowRightIcon size={14} />
                </button>
                <button onClick={() => goTo('#dashboard')} className="w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-medium text-slate-800 hover:bg-slate-50">
                  Live Command Dashboard
                </button>
                {navLinks.map((l) => (
                  <button key={l.label} onClick={() => goTo(l.href)} className="w-full text-left px-3 py-2.5 rounded-lg text-[15px] font-medium text-slate-700 hover:bg-slate-50">
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Individual Modules Categories */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2">
                  Browse by Department
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {moduleGroups.flatMap((g) => g.items.slice(0, 3)).map((m) => (
                    <button key={m.key} onClick={openModules} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] text-slate-600 hover:bg-slate-50 text-left">
                      <m.icon size={15} className="text-slate-400 shrink-0" />
                      <span className="truncate">{m.label}</span>
                    </button>
                  ))}
                  <button onClick={openModules} className="mt-2 text-left px-3 py-1.5 text-[12.5px] font-semibold text-[#e11d48] hover:underline">
                    + See all 60+ modules in grid →
                  </button>
                </div>
              </div>
            </nav>
            <div className="p-5 border-t border-slate-100">
              <button
                onClick={() => { setMenuOpen(false); navigate('/book-demo'); }}
                className="w-full h-12 rounded-xl bg-slate-900 text-white text-[15px] font-semibold hover:bg-slate-800 transition-colors shadow-sm"
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
