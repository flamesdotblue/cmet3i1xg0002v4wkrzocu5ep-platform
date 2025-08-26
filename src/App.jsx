import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToRef = (ref) => {
    setMobileOpen(false);
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav
        solid={navSolid}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onNavigate={{
          features: () => scrollToRef(featuresRef),
          services: () => scrollToRef(servicesRef),
          about: () => scrollToRef(aboutRef),
          contact: () => scrollToRef(contactRef),
        }}
      />

      <main className="relative isolate overflow-hidden">
        <BackgroundDecor />
        <Hero onCtaPrimary={() => scrollToRef(contactRef)} onCtaSecondary={() => scrollToRef(featuresRef)} />
        <Trustbar />
        <section ref={featuresRef} className="mx-auto max-w-7xl px-6 py-20" aria-label="Key features">
          <SectionHeader eyebrow="Platform" title="Proactive defenses that adapt in real-time" subtitle="Our unified security platform correlates signals across endpoints, identity, cloud, and network to detect and block threats before they spread." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature icon={<ShieldIcon />} title="Managed XDR" desc="24/7 detection and response across your entire attack surface with automated containment and expert analysts on call." />
            <Feature icon={<LockIcon />} title="Zero Trust Access" desc="Continuous verification of users and devices, least-privileged permissions, and adaptive access controls." />
            <Feature icon={<RadarIcon />} title="Attack Surface Monitoring" desc="Discover exposed assets, misconfigurations, and risky changes with prioritized remediation guidance." />
            <Feature icon={<CodeIcon />} title="Application Security" desc="SAST/DAST, secrets scanning, and supply chain checks integrated into your CI/CD for secure-by-default software." />
            <Feature icon={<CloudIcon />} title="Cloud Posture" desc="Agentless CSPM and workload protection with policy-as-code and drift detection across AWS, Azure, and GCP." />
            <Feature icon={<ComplianceIcon />} title="Compliance Automation" desc="Streamline SOC 2, ISO 27001, HIPAA, and GDPR with continuous control monitoring and audit-ready reports." />
          </div>
        </section>

        <section ref={servicesRef} className="bg-gradient-to-b from-slate-950 to-slate-900/60 border-y border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeader eyebrow="Services" title="Choose the path that fits your team" subtitle="From fully managed protection to enablement for in-house teams—start where you are, scale when you need." />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <ServiceCard tier="Managed" price="From $3,500/mo" bullets={[
                '24/7 SOC and incident response',
                'Endpoint, identity, email, and cloud coverage',
                'Prebuilt detections + custom rules',
                'Monthly posture reviews',
              ]} cta="Talk to sales" onClick={() => scrollToRef(contactRef)} highlight />
              <ServiceCard tier="Co-Managed" price="From $1,900/mo" bullets={[
                'You hunt, we watch the night shift',
                'Guided playbooks and tuning',
                'Case management & forensics assistance',
                'Quarterly red/blue exercises',
              ]} cta="Request a demo" onClick={() => scrollToRef(contactRef)} />
              <ServiceCard tier="Advisory" price="Project-based" bullets={[
                'Risk assessments & gap analysis',
                'Cloud architecture reviews',
                'Tabletop exercises & IR plans',
                'Compliance readiness support',
              ]} cta="Start a project" onClick={() => scrollToRef(contactRef)} />
            </div>
          </div>
        </section>

        <section ref={aboutRef} className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader eyebrow="Why us" title="Built by defenders, trusted by leaders" subtitle="Our team has led security at high-growth startups and Fortune 500s. We combine deep incident response expertise with modern automation to reduce mean-time-to-detect and mean-time-to-contain to minutes." />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <StatPanel />
            <Testimonial />
          </div>
        </section>

        <CtaBanner onClick={() => scrollToRef(contactRef)} />

        <section ref={contactRef} className="relative mx-auto max-w-7xl px-6 py-20" aria-label="Contact form">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Get started" title="Speak with a security expert" subtitle="Tell us a bit about your environment and goals. We’ll follow up within one business day." />
              <div className="mt-8 space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3"><CheckIcon className="mt-0.5" /><span>No pressure, no spam. Just helpful guidance.</span></div>
                <div className="flex items-start gap-3"><CheckIcon className="mt-0.5" /><span>Fast onboarding with zero-trust fundamentals.</span></div>
                <div className="flex items-start gap-3"><CheckIcon className="mt-0.5" /><span>US/EU data residency available.</span></div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer onNavigate={{
        features: () => scrollToRef(featuresRef),
        services: () => scrollToRef(servicesRef),
        about: () => scrollToRef(aboutRef),
        contact: () => scrollToRef(contactRef),
      }} />
    </div>
  );
}

function Nav({ solid, mobileOpen, setMobileOpen, onNavigate }) {
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors ${solid ? 'bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="sr-only">AegisGuard</span>
          <span className="hidden text-sm font-semibold tracking-wide text-slate-200 sm:block">AegisGuard Security</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink onClick={onNavigate.features}>Platform</NavLink>
          <NavLink onClick={onNavigate.services}>Services</NavLink>
          <NavLink onClick={onNavigate.about}>Why us</NavLink>
          <NavLink onClick={onNavigate.contact}>Contact</NavLink>
          <a onClick={onNavigate.contact} className="cursor-pointer rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">Get started</a>
        </nav>
        <button aria-label="Open menu" className="md:hidden rounded-md p-2 text-slate-300 hover:bg-white/5" onClick={() => setMobileOpen((v) => !v)}>
          <BurgerIcon />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-2">
            <MobileLink onClick={onNavigate.features}>Platform</MobileLink>
            <MobileLink onClick={onNavigate.services}>Services</MobileLink>
            <MobileLink onClick={onNavigate.about}>Why us</MobileLink>
            <MobileLink onClick={onNavigate.contact}>Contact</MobileLink>
            <button onClick={onNavigate.contact} className="mt-2 w-full rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400">Get started</button>
          </div>
        </div>
      )}
    </header>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),rgba(15,23,42,0))] blur-2xl" />
      <div className="absolute -bottom-32 right-1/2 h-[600px] w-[1100px] translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),rgba(15,23,42,0))] blur-2xl" />
      <GridPattern />
    </div>
  );
}

function Hero({ onCtaPrimary, onCtaSecondary }) {
  return (
    <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 pt-28 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
        <span className="inline-flex items-center gap-1 text-cyan-400"><SparkIcon />Live</span>
        Managed detection and response, now with agentless cloud posture.
      </div>
      <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">
        Stop breaches before they begin
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-slate-300">
        AegisGuard delivers unified, proactive cybersecurity—detect, investigate, and contain threats in minutes with automation and 24/7 experts.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button onClick={onCtaPrimary} className="w-full rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:w-auto">Book a demo</button>
        <button onClick={onCtaSecondary} className="w-full rounded-md border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 sm:w-auto">Explore platform</button>
      </div>
      <div className="relative mt-14 w-full max-w-5xl">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-xl" />
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function Trustbar() {
  const logos = [
    'Helios Bank',
    'Northwind Energy',
    'Orbit Health',
    'Pioneer Retail',
    'Acme Robotics',
  ];
  return (
    <div className="mx-auto max-w-7xl px-6 pb-6 pt-10">
      <p className="mb-4 text-center text-xs uppercase tracking-widest text-slate-400">Trusted by security-first teams</p>
      <div className="grid grid-cols-2 items-center justify-items-center gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-5">
        {logos.map((name) => (
          <div key={name} className="text-sm font-medium text-slate-400/80">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-slate-300">{subtitle}</p>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10">
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-300">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </div>
  );
}

function ServiceCard({ tier, price, bullets, cta, onClick, highlight }) {
  return (
    <div className={`relative rounded-2xl border ${highlight ? 'border-cyan-400/40 bg-slate-900/70' : 'border-white/10 bg-white/5'} p-6` }>
      {highlight && (
        <div className="absolute -top-3 right-4 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">Most popular</div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{tier}</h3>
        <span className="text-sm text-slate-300">{price}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2"><CheckIcon className="mt-0.5" /><span>{b}</span></li>
        ))}
      </ul>
      <button onClick={onClick} className={`mt-6 w-full rounded-md px-4 py-2 text-sm font-semibold shadow-lg transition focus:outline-none focus-visible:ring-2 ${highlight ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/30 hover:bg-cyan-400 focus-visible:ring-cyan-400' : 'bg-white/10 text-slate-100 hover:bg-white/15 focus-visible:ring-white/20'}`}>{cta}</button>
    </div>
  );
}

function StatPanel() {
  const stats = [
    { k: '93%', v: 'Fewer false positives' },
    { k: '8 min', v: 'Median time to contain' },
    { k: '24/7', v: 'Global SOC coverage' },
    { k: 'NIST', v: 'Aligned response playbooks' },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.v} className="text-center">
            <div className="text-3xl font-extrabold text-cyan-400">{s.k}</div>
            <div className="mt-1 text-xs text-slate-300">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-white/10 bg-slate-900/60 p-4">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <RadarIcon />
          <span>Correlated telemetry across endpoint, identity, network, cloud.</span>
        </div>
        <div className="mt-3 h-28 w-full overflow-hidden rounded-md bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="h-full w-full animate-[pulse_4s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.08),transparent)] bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <Avatar />
        <div>
          <div className="font-semibold">Leena Park</div>
          <div className="text-xs text-slate-400">CISO, Orbit Health</div>
        </div>
      </div>
      <p className="mt-4 text-slate-200">
        “AegisGuard cut our detection noise by more than half in the first month. Their playbooks and analysts helped us contain a phishing-born identity breach in under ten minutes.”
      </p>
      <div className="mt-4 flex items-center gap-2 text-cyan-300">
        <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
      </div>
    </div>
  );
}

function CtaBanner({ onClick }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-2xl" />
        <div className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-blue-500/20 blur-2xl" />
        <div className="relative">
          <h3 className="text-2xl font-bold">Ready to level up your security?</h3>
          <p className="mt-2 max-w-2xl text-slate-200">See how our team can strengthen your defenses in days, not months. We’ll tailor a plan to your risk profile and stack.</p>
          <div className="mt-4">
            <button onClick={onClick} className="rounded-md bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">Book a demo</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [state, setState] = useState({ name: '', email: '', company: '', size: '1-50', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
        <div className="flex items-center gap-3 text-emerald-300">
          <CheckIcon />
          <h3 className="text-lg font-semibold">Thanks! We’ll be in touch shortly.</h3>
        </div>
        <p className="mt-2 text-sm text-emerald-200">We’ve received your request and will reach out within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input required name="name" value={state.name} onChange={onChange} className="input" placeholder="Alex Rivera" />
        </Field>
        <Field label="Work email">
          <input required type="email" name="email" value={state.email} onChange={onChange} className="input" placeholder="alex@company.com" />
        </Field>
        <Field label="Company">
          <input required name="company" value={state.company} onChange={onChange} className="input" placeholder="Company Inc." />
        </Field>
        <Field label="Company size">
          <select name="size" value={state.size} onChange={onChange} className="input">
            <option>1-50</option>
            <option>51-200</option>
            <option>201-500</option>
            <option>501-2000</option>
            <option>2000+</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="What challenge can we help with?">
            <textarea name="message" value={state.message} onChange={onChange} className="input min-h-[120px]" placeholder="Tell us about your goals or recent incidents..." />
          </Field>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-slate-400">By submitting, you agree to our privacy policy.</div>
        <button disabled={loading} type="submit" className="rounded-md bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Sending…' : 'Request demo'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-white/5 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Logo />
              <div className="font-semibold">AegisGuard Security</div>
            </div>
            <p className="mt-3 max-w-md text-sm text-slate-300">Unified detection and response, built by defenders. We help modern teams reduce risk and respond faster.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a className="cursor-pointer hover:text-cyan-300" onClick={onNavigate.features}>Platform</a></li>
              <li><a className="cursor-pointer hover:text-cyan-300" onClick={onNavigate.services}>Services</a></li>
              <li><a className="cursor-pointer hover:text-cyan-300" onClick={onNavigate.about}>Why us</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>security@aegisguard.com</li>
              <li>+1 (555) 013-3700</li>
              <li><a className="cursor-pointer hover:text-cyan-300" onClick={onNavigate.contact}>Book a demo</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-400 sm:flex-row">
          <div>© {new Date().getFullYear()} AegisGuard Security. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="cursor-pointer hover:text-slate-200">Privacy</a>
            <a className="cursor-pointer hover:text-slate-200">Terms</a>
            <a className="cursor-pointer hover:text-slate-200">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// UI primitives and icons
function NavLink({ children, onClick }) {
  return (
    <a onClick={onClick} className="cursor-pointer text-sm text-slate-300 transition hover:text-cyan-300">
      {children}
    </a>
  );
}

function MobileLink({ children, onClick }) {
  return (
    <a onClick={onClick} className="block cursor-pointer rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/5">
      {children}
    </a>
  );
}

function Logo() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center">
      <svg viewBox="0 0 64 64" className="h-8 w-8">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path d="M32 4l20 8v14c0 10.5-6.9 20.4-17.3 24.2L32 56l-2.7-5.8C18.9 46.4 12 36.5 12 26V12l20-8z" fill="url(#g)" opacity="0.9" />
        <path d="M32 12l12 4v10c0 7.5-4.9 14.6-12 17.3C24.9 40.6 20 33.5 20 26V16l12-4z" fill="#0ea5e9" opacity="0.4" />
      </svg>
    </div>
  );
}

function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-slate-200"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  );
}

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-cyan-400"><path d="M12 2l1.8 4.6L18 8l-4.2 1.4L12 14l-1.8-4.6L6 8l4.2-1.4L12 2z" fill="currentColor" opacity="0.7"/></svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.4-2.9 8.6-7 10-4.1-1.4-7-5.6-7-10V6l7-3z" stroke="#22d3ee" strokeWidth="1.6" fill="rgba(34,211,238,0.08)"/></svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="#22d3ee" strokeWidth="1.6" fill="rgba(34,211,238,0.08)"/><path d="M8 11V8a4 4 0 118 0v3" stroke="#22d3ee" strokeWidth="1.6"/></svg>
  );
}

function RadarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#22d3ee" strokeWidth="1.6"/><path d="M12 12l6-6" stroke="#22d3ee" strokeWidth="1.6"/><circle cx="12" cy="12" r="1.5" fill="#22d3ee"/></svg>
  );
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

function CloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 18a5 5 0 010-10 6 6 0 1110.7 3.3A4.5 4.5 0 1117 18H7z" stroke="#22d3ee" strokeWidth="1.6" fill="rgba(34,211,238,0.08)"/></svg>
  );
}

function ComplianceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#22d3ee" strokeWidth="1.6"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#22d3ee" strokeWidth="1.6"/></svg>
  );
}

function CheckIcon({ className = '' }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#22d3ee"><path d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.8 5.82 22 7 14.15l-5-4.88 6.91-1.01L12 2z"/></svg>
  );
}

function Avatar() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-slate-100">LP</div>
  );
}

function GridPattern() {
  const rows = 18, cols = 24, size = 40;
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id="grid" width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function HeroVisual() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Detections</span>
          <span>Live</span>
        </div>
        <div className="mt-3 space-y-2 text-xs">
          {[
            { t: 'Suspicious PowerShell spawned by WinWord.exe', sev: 'High' },
            { t: 'Impossible travel sign-in detected', sev: 'Medium' },
            { t: 'Kubernetes role bound to system:masters', sev: 'High' },
            { t: 'Credential stuffing against login API', sev: 'Medium' },
          ].map((d, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${d.sev === 'High' ? 'bg-red-400' : 'bg-amber-300'}`} />
                <span className="text-slate-200">{d.t}</span>
              </div>
              <span className="text-slate-400">{d.sev}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Response Playbook</span>
          <span>Automated</span>
        </div>
        <ol className="mt-3 space-y-2 text-xs text-slate-200">
          <li className="rounded-md border border-white/10 bg-white/5 px-3 py-2">1. Isolate endpoint and disable sign-in</li>
          <li className="rounded-md border border-white/10 bg-white/5 px-3 py-2">2. Revoke tokens and reset risky sessions</li>
          <li className="rounded-md border border-white/10 bg-white/5 px-3 py-2">3. Block indicators at EDR and firewall</li>
          <li className="rounded-md border border-white/10 bg-white/5 px-3 py-2">4. Triage inbox and notify affected users</li>
        </ol>
      </div>
    </div>
  );
}

// Tailwind helpers
const inputBase = 'w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20';
// Attach once so classes are not purged
function HiddenStyleInjector() {
  return <div className="hidden input" />;
}

// Attach input class to global scope via jsx usage
// eslint-disable-next-line
const __inject = (() => { return; })();

// Patch input class via global CSS replacement
// We cannot modify index.css here; instead, apply className prop mapping
// Monkey patch React.createElement not allowed; so provide a small wrapper:
Object.defineProperty(window, 'twInputClass', { value: inputBase, writable: false });

// Extend intrinsic elements by wrapping usage in our Field children
// Practically, we just reuse string class
// eslint-disable-next-line no-unused-vars
const input = inputBase;