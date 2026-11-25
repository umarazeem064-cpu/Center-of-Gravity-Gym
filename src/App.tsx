import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  Dumbbell,
  ExternalLink,
  Globe,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  X,
} from 'lucide-react';
import {
  CURRENCIES,
  formatMembershipPrice,
  GYM_PROFILE,
  HERO_IMAGE,
  MEMBER_REVIEWS,
  MEMBERSHIP_PLANS,
  TRAINING_ZONES,
  TRANSLATIONS,
  type CurrencyCode,
  type LanguageCode,
} from './data/gymData';
import { Preloader } from './components/Preloader';
import { SmartImage } from './components/SmartImage';
import { BmiCalculator } from './components/BmiCalculator';
import { PrivacyModal, TrialModal, type TrialRequestSummary } from './components/Modals';

interface StatCounterProps {
  target: number;
  decimals?: number;
  suffix?: string;
  label: string;
  detail: string;
}

function StatCounter({ target, decimals = 0, suffix = '', label, detail }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(target);
  const ref = useRef<HTMLDivElement | null>(null);
  const animatedOnce = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !animatedOnce.current) {
          animatedOnce.current = true;
          const duration = 700;
          const start = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(target * eased);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const formatted =
    decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString('en-US');

  return (
    <div ref={ref} className="py-2">
      <div className="font-mono text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums dark:text-white md:text-4xl">
        {formatted}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{label}</div>
      <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{detail}</div>
    </div>
  );
}

const GOAL_OPTIONS = [
  'Strength & Muscle Gain',
  'Fat Loss & Conditioning',
  'Functional & Athletic HIIT',
  'General Fitness & Coaching',
];

const VISIT_SLOTS = [
  'Morning (6:00 AM – 11:00 AM)',
  'Midday (11:00 AM – 4:00 PM)',
  'Evening Peak (4:00 PM – 8:00 PM)',
  'Late Evening (8:00 PM – 11:00 PM)',
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Booking form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [selectedPlanId, setSelectedPlanId] = useState(MEMBERSHIP_PLANS[1].id);
  const [preferredTime, setPreferredTime] = useState(VISIT_SLOTS[2]);
  const [formError, setFormError] = useState<string | null>(null);

  // Modals
  const [submittedTrial, setSubmittedTrial] = useState<TrialRequestSummary | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectZoneFocus = (zoneGoal: string) => {
    setGoal(zoneGoal);
    scrollToBooking();
  };

  const handleChoosePlan = (planId: string) => {
    setSelectedPlanId(planId);
    scrollToBooking();
  };

  const handleApplyBmiGoal = (recommendedGoal: string) => {
    setGoal(recommendedGoal);
    scrollToBooking();
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedName = fullName.trim();
    const cleanedPhone = phone.trim();

    if (cleanedName.length < 2) {
      setFormError('Please enter your full name so our front desk can reserve your pass.');
      return;
    }
    if (cleanedPhone.replace(/\D/g, '').length < 7) {
      setFormError('Please enter a valid phone or WhatsApp number (e.g. 0315 2269636).');
      return;
    }

    setFormError(null);
    const chosenPlan = MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) ?? MEMBERSHIP_PLANS[0];

    setSubmittedTrial({
      fullName: cleanedName,
      phone: cleanedPhone,
      goal,
      planName: `${chosenPlan.name} (${formatMembershipPrice(chosenPlan.pricePkr, currency)})`,
      preferredTime,
    });
  };

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-stone-50 text-zinc-900 transition-colors duration-200 dark:bg-[#0B0C0E] dark:text-zinc-100"
    >
      <Preloader />

      {/* Top Navigation Header — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-stone-50/95 backdrop-blur-md dark:border-white/10 dark:bg-[#0B0C0E]/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            className="whitespace-nowrap shrink-0 font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-white"
          >
            {GYM_PROFILE.name}
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex"
          >
            <a
              href="#home"
              className="whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:hover:text-white"
            >
              {t.nav.home}
            </a>
            <a
              href="#zones"
              className="whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:hover:text-white"
            >
              {t.nav.zones}
            </a>
            <a
              href="#plans"
              className="whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:hover:text-white"
            >
              {t.nav.plans}
            </a>
            <a
              href="#bmi"
              className="whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:hover:text-white"
            >
              {t.nav.bmi}
            </a>
            <a
              href="#location"
              className="whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline dark:hover:text-white"
            >
              {t.nav.location}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Drawer Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#booking"
              className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-lime-400 px-4 py-2 text-xs font-bold text-zinc-950 transition-colors hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 sm:text-sm"
            >
              {t.nav.trialCta}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/10 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-zinc-200 bg-stone-50 px-4 py-4 dark:border-white/10 dark:bg-[#0B0C0E] md:hidden"
          >
            <div className="flex flex-col gap-1">
              {[
                { href: '#home', label: t.nav.home },
                { href: '#zones', label: t.nav.zones },
                { href: '#plans', label: t.nav.plans },
                { href: '#bmi', label: t.nav.bmi },
                { href: '#reviews', label: 'Reviews' },
                { href: '#location', label: t.nav.location },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center rounded-lg px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Non-Sticky Utility Strip (Language, Currency, Theme Switcher, WhatsApp) */}
      <div className="border-b border-zinc-200 bg-white dark:border-white/10 dark:bg-[#111318]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
              <MapPin className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
              {GYM_PROFILE.shortAddress}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <Clock className="h-3.5 w-3.5 text-zinc-400" />
              {GYM_PROFILE.hoursWeekday}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <label className="sr-only" htmlFor="lang-select">
              Language
            </label>
            <div className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 dark:border-white/10 dark:bg-zinc-900">
              <Globe className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              <select
                id="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none dark:text-zinc-100"
              >
                <option value="en" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
                  English
                </option>
                <option value="ur" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
                  اردو (Urdu)
                </option>
                <option value="ar" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
                  العربية (Arabic)
                </option>
                <option value="es" className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
                  Español
                </option>
              </select>
            </div>

            {/* Currency Switcher */}
            <label className="sr-only" htmlFor="currency-select">
              Currency
            </label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs font-semibold text-zinc-800 focus:outline-none dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option
                  key={c.code}
                  value={c.code}
                  className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
                >
                  {c.label}
                </option>
              ))}
            </select>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex min-h-[30px] items-center gap-1.5 whitespace-nowrap rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {darkMode ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-zinc-700" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Quick WhatsApp */}
            <a
              href={GYM_PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[30px] items-center gap-1.5 whitespace-nowrap rounded-md border border-lime-600/30 bg-lime-400/15 px-2.5 py-1 text-xs font-semibold text-lime-800 transition-colors hover:bg-lime-400/25 dark:border-lime-400/30 dark:text-lime-300"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* 1. Hero Section */}
        <section id="home" className="relative overflow-hidden bg-[#0B0C0E] text-white">
          <div className="absolute inset-0">
            <SmartImage
              src={HERO_IMAGE}
              alt="Center of Gravity Gym main strength and power rack training floor in Karachi"
              priority
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/95 via-[#0B0C0E]/80 to-[#0B0C0E]/45" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
            <div className="max-w-2xl">
              {/* Unboxed Metadata Line (Zero-Pill Rule) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-300 sm:text-sm">
                <span className="inline-flex items-center gap-1 font-semibold text-lime-400">
                  <Star className="h-3.5 w-3.5 fill-lime-400 text-lime-400" />
                  <span className="font-mono tabular-nums">{GYM_PROFILE.googleRating}/5</span> Google Rating ({GYM_PROFILE.reviewCount} Reviews)
                </span>
                <span aria-hidden="true">·</span>
                <span>{GYM_PROFILE.shortAddress}</span>
                <span aria-hidden="true">·</span>
                <span>{GYM_PROFILE.hoursWeekday}</span>
              </div>

              <h1
                className="mt-5 font-display font-bold tracking-tight text-white [text-wrap:balance]"
                style={{ fontSize: 'clamp(2.65rem, 5vw, 4.5rem)', lineHeight: 1.02 }}
              >
                {t.hero.headline}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                {t.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#booking"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>
                <a
                  href="#plans"
                  className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Gym Credentials Strip */}
        <section aria-label="Club credentials" className="border-b border-zinc-200 bg-white dark:border-white/10 dark:bg-[#111318]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
            <StatCounter
              target={650}
              suffix="+"
              label="Active Local Members"
              detail="Across C.P. & Berar, Dhoraji & PECHS"
            />
            <StatCounter
              target={8}
              label="Floor & Personal Coaches"
              detail="Form supervision & custom splits"
            />
            <StatCounter
              target={4.9}
              decimals={1}
              suffix=" / 5"
              label="Google Maps Rating"
              detail={`${GYM_PROFILE.reviewCount} verified neighborhood reviews`}
            />
            <StatCounter
              target={17}
              suffix=" hrs"
              label="Daily Operating Window"
              detail="Mon – Sat, 6:00 AM to 11:00 PM"
            />
          </div>
        </section>

        {/* 3. Training Zones & Programs */}
        <section id="zones" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 [text-wrap:balance] dark:text-white sm:text-4xl">
              {t.sections.zonesTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t.sections.zonesLead}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {TRAINING_ZONES.map((zone) => (
              <article
                key={zone.id}
                className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors dark:border-white/10 dark:bg-[#13151A]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <SmartImage
                    src={zone.image}
                    alt={`${zone.title} at Center of Gravity Gym Karachi`}
                    aspectClass="aspect-[4/3]"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {zone.subtitle}
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {zone.index}. {zone.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {zone.description}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-zinc-200 pt-4 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                      {zone.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-600 dark:text-lime-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleSelectZoneFocus(zone.goalKey)}
                      className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:border-lime-500 hover:bg-lime-400/10 dark:border-white/15 dark:text-white dark:hover:border-lime-400"
                    >
                      <span>{t.actions.selectFocus}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Membership Plans (Live Currency Conversion) */}
        <section
          id="plans"
          className="border-y border-zinc-200 bg-white py-20 dark:border-white/10 dark:bg-[#101216]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 [text-wrap:balance] dark:text-white sm:text-4xl">
                  {t.sections.plansTitle}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t.sections.plansLead}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span>Active Currency:</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-lime-400">
                  {CURRENCIES[currency].label}
                </span>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {MEMBERSHIP_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`flex flex-col justify-between rounded-xl border p-6 transition-colors md:p-7 ${
                      plan.recommended
                        ? 'border-lime-500 bg-stone-50 dark:border-lime-400/70 dark:bg-[#15181F]'
                        : 'border-zinc-200 bg-stone-50/70 dark:border-white/10 dark:bg-[#13151A]'
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        <span>{plan.durationLabel}</span>
                        {plan.recommended && (
                          <span className="font-semibold text-lime-700 dark:text-lime-400">
                            Most Popular
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 font-display text-2xl font-bold text-zinc-900 dark:text-white">
                        {plan.name}
                      </h3>

                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-mono text-4xl font-semibold tracking-tight text-zinc-900 tabular-nums dark:text-white">
                          {formatMembershipPrice(plan.pricePkr, currency)}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {plan.summary}
                      </p>

                      <ul className="mt-6 space-y-2.5 border-t border-zinc-200 pt-5 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-600 dark:text-lime-400" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={() => handleChoosePlan(plan.id)}
                        className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-bold transition-colors ${
                          plan.recommended || isSelected
                            ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300'
                            : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                        }`}
                      >
                        <span>{isSelected ? 'Selected — Book Pass' : t.actions.choosePlan}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Interactive BMI Calculator */}
        <section id="bmi" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 [text-wrap:balance] dark:text-white sm:text-4xl">
              {t.sections.bmiTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t.sections.bmiLead}
            </p>
          </div>

          <div className="mt-8">
            <BmiCalculator onApplyRecommendedGoal={handleApplyBmiGoal} />
          </div>
        </section>

        {/* 6. Free Trial & Membership Booking Form */}
        <section
          id="booking"
          className="border-y border-zinc-200 bg-white py-20 dark:border-white/10 dark:bg-[#101216]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 [text-wrap:balance] dark:text-white sm:text-4xl">
                  {t.sections.bookingTitle}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t.sections.bookingLead}
                </p>

                <div className="mt-8 space-y-4 border-t border-zinc-200 pt-6 text-sm dark:border-white/10">
                  <div className="flex items-start gap-3">
                    <Dumbbell className="mt-0.5 h-5 w-5 shrink-0 text-lime-600 dark:text-lime-400" />
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-white">
                        Full-Access Trial Session
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Experience our free weights, cardio floor, and functional turf with a guided coach walk-through.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-lime-600 dark:text-lime-400" />
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-white">
                        Instant WhatsApp Confirmation
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Your booking summary dispatches straight to {GYM_PROFILE.phoneDisplay} with zero waiting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleBookingSubmit}
                noValidate
                className="rounded-xl border border-zinc-200 bg-stone-50 p-6 dark:border-white/10 dark:bg-[#13151A] md:p-8 lg:col-span-7"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="trial-name"
                      className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="trial-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Bilal Ahmed"
                      className="min-h-[44px] w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="trial-phone"
                      className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="trial-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0315 2269636"
                      className="min-h-[44px] w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 font-mono text-sm text-zinc-900 focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="trial-goal"
                      className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Primary Fitness Goal
                    </label>
                    <select
                      id="trial-goal"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="min-h-[44px] w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    >
                      {GOAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="trial-plan"
                      className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Membership Plan Interest
                    </label>
                    <select
                      id="trial-plan"
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="min-h-[44px] w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    >
                      {MEMBERSHIP_PLANS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({formatMembershipPrice(p.pricePkr, currency)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="trial-time"
                      className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      Preferred Visit Time (Mon – Sat)
                    </label>
                    <select
                      id="trial-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="min-h-[44px] w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-lime-500 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    >
                      {VISIT_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formError && (
                  <p role="alert" className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400">
                    {formError}
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                  >
                    <span>{t.actions.submitTrial}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>

                  <a
                    href={GYM_PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-lime-600 dark:text-lime-400" />
                    <span>{t.actions.whatsappDirect}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* 7. Google Reviews & Member Testimonials */}
        <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 [text-wrap:balance] dark:text-white sm:text-4xl">
                {t.sections.reviewsTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.sections.reviewsLead}
              </p>
            </div>

            <a
              href={GYM_PROFILE.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-lime-700 underline-offset-4 hover:underline dark:text-lime-400"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MEMBER_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-[#13151A]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{review.dateLabel}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    “{review.quote}”
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-white/10">
                  <div className="mb-3 text-xs font-semibold text-lime-700 dark:text-lime-400">
                    {review.outcome}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-zinc-800">
                      <SmartImage
                        src={review.avatar}
                        alt={`${review.author}, member at Center of Gravity Gym`}
                        aspectClass="aspect-square"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-white">
                        {review.author}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {review.neighborhood}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 8. Visit Our Gym — Embedded Google Maps & Studio Card */}
        <section
          id="location"
          className="border-t border-zinc-200 bg-white py-20 dark:border-white/10 dark:bg-[#101216]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-900 [text-wrap:balance] dark:text-white sm:text-4xl">
                {t.sections.locationTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.sections.locationLead}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
              {/* Studio Info Card */}
              <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-stone-50 p-6 dark:border-white/10 dark:bg-[#13151A] md:p-8 lg:col-span-5">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                      {GYM_PROFILE.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>{GYM_PROFILE.googleRating} Stars on Google Maps</span>
                      <span aria-hidden="true">·</span>
                      <span>{GYM_PROFILE.cityCountry}</span>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-zinc-200 pt-5 text-sm dark:border-white/10">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-600 dark:text-lime-400" />
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">Street Address</div>
                        <div className="text-zinc-600 dark:text-zinc-300">{GYM_PROFILE.fullAddress}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime-600 dark:text-lime-400" />
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">Opening Hours</div>
                        <div className="text-zinc-600 dark:text-zinc-300">{GYM_PROFILE.hoursWeekday}</div>
                        <div className="text-zinc-500 dark:text-zinc-400">{GYM_PROFILE.hoursSunday}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime-600 dark:text-lime-400" />
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">Phone &amp; WhatsApp Desk</div>
                        <a
                          href={`tel:${GYM_PROFILE.phoneRaw}`}
                          className="font-mono font-medium text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-200"
                        >
                          {GYM_PROFILE.phoneDisplay}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={GYM_PROFILE.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300"
                  >
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{t.actions.getDirections}</span>
                  </a>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      href={`tel:${GYM_PROFILE.phoneRaw}`}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>Direct Call</span>
                    </a>
                    <a
                      href={GYM_PROFILE.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                    >
                      <MessageCircle className="h-3.5 w-3.5 shrink-0 text-lime-600 dark:text-lime-400" />
                      <span>{t.actions.whatsappDirect}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Embedded Interactive Google Maps Iframe */}
              <div className="min-h-[380px] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-white/10 dark:bg-zinc-900 lg:col-span-7 lg:h-full">
                <iframe
                  title="Center of Gravity Gym Google Map Location"
                  src={GYM_PROFILE.googleMapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[380px] w-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-zinc-200 bg-stone-50 py-12 text-sm text-zinc-600 dark:border-white/10 dark:bg-[#0B0C0E] dark:text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                {GYM_PROFILE.name}
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {GYM_PROFILE.fullAddress} · {GYM_PROFILE.hoursWeekday}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
              <a href="#zones" className="hover:text-zinc-950 dark:hover:text-white">
                {t.nav.zones}
              </a>
              <a href="#plans" className="hover:text-zinc-950 dark:hover:text-white">
                {t.nav.plans}
              </a>
              <a href="#bmi" className="hover:text-zinc-950 dark:hover:text-white">
                {t.nav.bmi}
              </a>
              <a href="#location" className="hover:text-zinc-950 dark:hover:text-white">
                {t.nav.location}
              </a>
              <a
                href={`tel:${GYM_PROFILE.phoneRaw}`}
                className="font-mono hover:text-zinc-950 dark:hover:text-white"
              >
                {GYM_PROFILE.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-zinc-950 hover:underline dark:hover:text-white"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Privacy Policy</span>
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-500 sm:flex-row">
            <span>© {new Date().getFullYear()} {GYM_PROFILE.name}. All rights reserved.</span>
            <span>Karachi Strength &amp; Conditioning Club</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TrialModal request={submittedTrial} onClose={() => setSubmittedTrial(null)} />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  );
}
