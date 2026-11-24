import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Briefcase,
  Layers,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Mail,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { projects, getProject, getProjectIndex, gradientFor } from '@/data/projects';
import { ProjectImage } from '@/components/ProjectImage';
import { Navigation } from '@/components/Navigation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { Footer } from '@/sections/Footer';
import { useLocale } from '@/i18n/context';
import { usePageMeta } from '@/hooks/usePageMeta';

// ─── Small building blocks ──────────────────────────────────────────────

function Eyebrow({ children, tone = 'dark' }: { children: string; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={cn(
        'text-[12px] font-semibold uppercase tracking-[0.18em]',
        tone === 'light' ? 'text-[#8A8FA3]' : 'text-[#5B6072]'
      )}
    >
      {children}
    </span>
  );
}

function MetaItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 px-6 py-5 lg:px-7">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2DD4C4]/15 via-[#3B82F6]/15 to-[#8B5CF6]/15">
        <Icon className="h-4 w-4 text-[#3B82F6]" />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8FA3]">{label}</div>
        <div className="mt-1 text-[15px] font-semibold leading-snug text-[#1A1D2E]">{value}</div>
      </div>
    </div>
  );
}

// Hero photo drifts slower than the page (cheap parallax, no re-renders).
function useParallax(factor = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translate3d(0, ${window.scrollY * factor}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [factor]);
  return ref;
}

// Timeline rail fills with the brand gradient as the reader scrolls through it.
function useScrollProgress() {
  const containerRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const el = containerRef.current;
      const fill = fillRef.current;
      if (!el || !fill) return;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.7;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / rect.height));
      fill.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return { containerRef, fillRef };
}

// ─── Page ───────────────────────────────────────────────────────────────

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { locale, content } = useLocale();
  const ui = content.projectsPage;
  const project = getProject(slug);
  const index = slug ? getProjectIndex(slug) : -1;
  const text = project?.text[locale];

  usePageMeta(text ? `${text.title} · Max Escobari` : undefined, text?.summary);

  const heroImageRef = useParallax(0.3);
  const { containerRef: timelineRef, fillRef: timelineFillRef } = useScrollProgress();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // New project → start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const galleryCount = project?.images.gallery.length ?? 0;
  const step = (dir: 1 | -1) =>
    setLightbox((i) => (i === null ? i : (i + dir + galleryCount) % galleryCount));

  // Lightbox: keyboard, scroll lock, focus
  useEffect(() => {
    if (lightbox === null) return;
    const move = (dir: 1 | -1) =>
      setLightbox((i) => (i === null ? i : (i + dir + galleryCount) % galleryCount));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, galleryCount]);

  const goToContact = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate('/#contact');
  };

  if (!project || !text) {
    return (
      <main className="about-dark font-jakarta flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center text-white">
        <h1 className="text-2xl font-bold">{ui.notFound}</h1>
        <Link
          to="/proyectos"
          className="rounded-full px-6 py-3 text-[15px] font-semibold text-white"
          style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
        >
          {ui.allProjects}
        </Link>
      </main>
    );
  }

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const gradient = gradientFor(index);
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className="font-jakarta min-h-screen bg-white">
      <Navigation revealDelay={150} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative h-[88vh] min-h-[620px] w-full overflow-hidden bg-[#0A0B14]">
          <div ref={heroImageRef} className="absolute inset-0 will-change-transform">
            <div className="case-hero-zoom absolute inset-0">
              <ProjectImage
                key={project.slug}
                src={project.images.cover}
                alt={text.coverAlt}
                gradient={gradient}
                label={text.title}
              />
            </div>
          </div>
          {/* Legibility: brand tint + bottom/side fades */}
          <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ background: gradient }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B14] via-[#0A0B14]/55 to-[#0A0B14]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B14]/70 via-transparent to-transparent" />

          <div className="absolute inset-x-0 bottom-0 pb-28 lg:pb-32">
            <div
              className="mx-auto w-full max-w-[1280px]"
              style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
            >
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="case-rise mb-6" style={{ animationDelay: '150ms' }}>
                <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/60">
                  <li>
                    <Link to="/" className="transition-colors hover:text-white">{ui.breadcrumbHome}</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to="/proyectos" className="transition-colors hover:text-white">{ui.breadcrumbProjects}</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white/85" aria-current="page">{text.sector}</li>
                </ol>
              </nav>

              <div className="case-rise mb-5 flex flex-wrap items-center gap-3" style={{ animationDelay: '250ms' }}>
                <span className="about-brand-text font-geist-mono text-[13px] font-semibold tracking-widest">
                  {number} / {String(projects.length).padStart(2, '0')}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#1A1D2E]">
                  {project.period}
                </span>
                <span className="rounded-full border border-white/25 px-3 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur-sm">
                  {text.sector}
                </span>
              </div>

              <h1
                className="case-rise max-w-4xl text-[clamp(34px,5.4vw,68px)] font-extrabold leading-[1.03] tracking-tight text-white"
                style={{ animationDelay: '350ms' }}
              >
                {text.title}
              </h1>
              <p
                className="case-rise mt-6 max-w-2xl text-[17px] leading-relaxed text-[#E4E7EF] lg:text-[19px]"
                style={{ animationDelay: '500ms' }}
              >
                {text.summary}
              </p>
            </div>
          </div>

          {/* Photo note (kept above the overlapping meta card) */}
          <span className="absolute bottom-24 right-6 hidden text-[11px] text-white/40 md:block">{ui.photoNote}</span>
        </section>

        {/* ── Meta card (overlaps the hero) ────────────────────────── */}
        <div
          className="relative z-10 mx-auto -mt-16 w-full max-w-[1280px]"
          style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
        >
          <Reveal>
            <div className="grid grid-cols-1 divide-y divide-black/[0.06] overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-[0_30px_60px_-20px_rgba(10,11,20,0.25)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              <MetaItem icon={Building2} label={ui.institution} value={text.institution} />
              <MetaItem icon={Calendar} label={ui.period} value={project.period} />
              <MetaItem icon={Briefcase} label={ui.role} value={text.role} />
              <MetaItem icon={Layers} label={ui.sector} value={text.sector} />
            </div>
          </Reveal>
        </div>

        {/* ── Story: context · challenge · solution ────────────────── */}
        <section className="w-full bg-white py-24 lg:py-32">
          <div
            className="mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-12 lg:gap-16"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <Eyebrow>{ui.storyLabel}</Eyebrow>
                  <h2 className="mt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#3B82F6]">
                    {ui.challengeLabel}
                  </h2>
                  <blockquote className="mt-3 text-[clamp(22px,2vw,28px)] font-bold leading-[1.28] tracking-tight text-[#1A1D2E]">
                    {text.challenge}
                  </blockquote>
                  <div className="mt-8 h-1 w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }} />
                </Reveal>
              </div>
            </div>

            <div className="space-y-14 lg:col-span-6 lg:col-start-7">
              {[
                { label: ui.contextLabel, body: text.context },
                { label: ui.solutionLabel, body: text.solution },
              ].map((block, i) => (
                <Reveal key={block.label} delay={i * 80}>
                  <div className="flex gap-6">
                    <span className="about-brand-text font-geist-mono text-[14px] font-semibold leading-[1.9]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="text-[22px] font-bold tracking-tight text-[#1A1D2E]">{block.label}</h2>
                      <p className="mt-4 text-[17px] leading-[1.75] text-[#4A4F63]">{block.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Impact (dark band) ───────────────────────────────────── */}
        <section className="about-dark relative w-full overflow-hidden py-24 lg:py-32">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, #2DD4C4 0%, transparent 70%)' }}
          />
          <div
            className="relative mx-auto w-full max-w-[1280px]"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            <Reveal className="max-w-2xl">
              <Eyebrow tone="light">{ui.impactLabel}</Eyebrow>
              <h2 className="mt-4 text-[clamp(28px,3.4vw,46px)] font-extrabold leading-tight tracking-tight text-white">
                {ui.impactHeading}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {text.results.map((r, i) => (
                <Reveal key={r.label} delay={i * 120}>
                  <div className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.05] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.45)]">
                    <CountUp
                      value={r.value}
                      className="about-brand-text block text-[clamp(44px,5vw,64px)] font-extrabold leading-none tracking-tight"
                    />
                    <div className="mt-5 h-px w-full bg-white/[0.08]" />
                    <p className="mt-5 text-[15px] leading-snug text-[#B7BCCB]">{r.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Delivery approach (timeline) ─────────────────────────── */}
        <section className="specialties-light w-full py-24 lg:py-32">
          <div
            className="mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-12 lg:gap-16"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            <div className="lg:col-span-4">
              <Reveal className="lg:sticky lg:top-28">
                <Eyebrow>{ui.approachLabel}</Eyebrow>
                <h2 className="mt-4 text-[clamp(28px,3vw,42px)] font-extrabold leading-tight tracking-tight text-[#1A1D2E]">
                  {ui.approachHeading}
                </h2>
              </Reveal>
            </div>

            <ol ref={timelineRef} className="relative lg:col-span-7 lg:col-start-6">
              {/* Rail + animated brand fill */}
              <div className="absolute bottom-6 left-[19px] top-6 w-px bg-[#1A1D2E]/10" aria-hidden="true" />
              <div
                ref={timelineFillRef}
                className="case-brand-line absolute bottom-6 left-[19px] top-6 w-px origin-top"
                style={{ transform: 'scaleY(0)' }}
                aria-hidden="true"
              />
              {text.approach.map((phase, i) => (
                <li key={phase.title} className="relative pb-10 pl-16 last:pb-0">
                  {/* Node sits outside <Reveal>: its transform would otherwise become the containing block */}
                  <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#1A1D2E]/10 bg-white font-geist-mono text-[13px] font-semibold text-[#1A1D2E] shadow-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Reveal delay={i * 60}>
                    <div className="rounded-2xl border border-black/[0.04] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,11,20,0.25)] transition-shadow duration-500 hover:shadow-[0_20px_40px_-18px_rgba(10,11,20,0.3)]">
                      <h3 className="text-[18px] font-bold tracking-tight text-[#1A1D2E]">{phase.title}</h3>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-[#5B6072]">{phase.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Role & outcomes ──────────────────────────────────────── */}
        <section className="w-full bg-white py-24 lg:py-32">
          <div
            className="mx-auto grid w-full max-w-[1280px] gap-6 lg:grid-cols-2"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            <Reveal className="h-full">
              <div className="h-full rounded-3xl border border-black/[0.06] bg-[#F7F8FB] p-8 lg:p-10">
                <Eyebrow>{ui.roleLabel}</Eyebrow>
                <p className="mt-3 text-[20px] font-bold leading-snug tracking-tight text-[#1A1D2E]">{text.role}</p>
                <ul className="mt-7 space-y-4">
                  {text.responsibilities.map((item) => (
                    <li key={item} className="flex gap-4 text-[16px] leading-relaxed text-[#4A4F63]">
                      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B82F6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <div className="about-dark relative h-full overflow-hidden rounded-3xl p-8 lg:p-10">
                <div
                  className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full opacity-40 blur-2xl"
                  style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
                />
                <Eyebrow tone="light">{ui.outcomesLabel}</Eyebrow>
                <ul className="relative mt-7 space-y-5">
                  {text.achievements.map((item) => (
                    <li key={item} className="flex gap-4 text-[16px] leading-relaxed text-[#E4E7EF]">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2DD4C4] via-[#3B82F6] to-[#8B5CF6]">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Gallery + toolkit ────────────────────────────────────── */}
        <section className="specialties-light w-full py-24 lg:py-32">
          <div
            className="mx-auto w-full max-w-[1280px]"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <Eyebrow>{ui.galleryLabel}</Eyebrow>
              <span className="text-[12px] text-[#8A8FA3]">{ui.photoNote}</span>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
              {project.images.gallery.map((src, i) => (
                <Reveal
                  key={src}
                  delay={i * 100}
                  className={cn(i === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1')}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`${ui.openImage}: ${text.gallery[i]}`}
                    className={cn(
                      'group relative block w-full overflow-hidden rounded-2xl text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2',
                      i === 0 ? 'aspect-[4/3] md:aspect-auto md:h-full md:min-h-[520px]' : 'aspect-[4/3] md:aspect-auto md:h-[250px]'
                    )}
                  >
                    <div className="absolute inset-0">
                      <ProjectImage
                        src={src}
                        alt={text.gallery[i]}
                        gradient={gradient}
                        label={text.gallery[i]}
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute right-4 top-4 flex h-9 w-9 scale-90 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Expand className="h-4 w-4 text-[#1A1D2E]" />
                    </div>
                    <p className="absolute inset-x-0 bottom-0 p-5 text-[14px] font-medium text-white">{text.gallery[i]}</p>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* Toolkit */}
            <div className="mt-20 grid gap-12 lg:grid-cols-2">
              <Reveal>
                <Eyebrow>{ui.capabilitiesLabel}</Eyebrow>
                <div className="mt-5 flex flex-wrap gap-3">
                  {text.capabilities.map((c) => (
                    <span
                      key={c}
                      className="rounded-full p-px"
                      style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
                    >
                      <span className="block rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-[#1A1D2E]">
                        {c}
                      </span>
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <Eyebrow>{ui.stackLabel}</Eyebrow>
                <div className="mt-5 flex flex-wrap gap-3">
                  {text.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#1A1D2E]/10 bg-white/70 px-4 py-2 text-[14px] font-medium text-[#4A4F63]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="w-full bg-white py-24 lg:py-28">
          <div
            className="mx-auto w-full max-w-[1280px]"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            <Reveal>
              <div className="about-dark relative overflow-hidden rounded-[28px] px-8 py-16 text-center lg:px-16 lg:py-20">
                <div
                  className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
                />
                <div className="relative">
                  <Eyebrow tone="light">{ui.ctaLabel}</Eyebrow>
                  <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(28px,3.6vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                    {ui.ctaHeading}
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#B7BCCB]">{ui.ctaText}</p>
                  <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
                    <AnimatedButton
                      href="/#contact"
                      onClick={goToContact}
                      variant="primary"
                      size="lg"
                      showIcon
                      className="bg-white text-exvia-black hover:bg-white/90"
                    >
                      {ui.ctaPrimary}
                    </AnimatedButton>
                    <a
                      href={`mailto:${content.ctaConfig.email}`}
                      className="group inline-flex items-center gap-2 text-[14px] text-white/75 transition-colors hover:text-white"
                    >
                      <Mail className="h-4 w-4" />
                      {content.ctaConfig.email}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Previous / next ──────────────────────────────────────── */}
        <nav aria-label={ui.allProjects} className="w-full bg-white pb-24">
          <div
            className="mx-auto grid w-full max-w-[1280px] gap-5 md:grid-cols-2"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            {[
              { p: prev, label: ui.previous, dir: 'prev' as const },
              { p: next, label: ui.next, dir: 'next' as const },
            ].map(({ p, label, dir }) => (
              <Link
                key={dir}
                to={`/proyectos/${p.slug}`}
                className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-md"
              >
                <div className="absolute inset-0">
                  <ProjectImage
                    src={p.images.cover}
                    alt=""
                    gradient={gradientFor(getProjectIndex(p.slug))}
                    label={p.text[locale].title}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-0 bg-[#0A0B14]/65 transition-colors duration-500 group-hover:bg-[#0A0B14]/50" />
                <div className={cn('absolute inset-0 flex flex-col justify-end p-7', dir === 'next' && 'items-end text-right')}>
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/60">
                    {dir === 'prev' && <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />}
                    {label}
                    {dir === 'next' && <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                  </span>
                  <span className="mt-2 max-w-md text-[20px] font-bold leading-tight text-white">{p.text[locale].title}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#5B6072] transition-colors hover:text-[#1A1D2E]"
            >
              <ArrowLeft className="h-4 w-4" /> {ui.allProjects}
            </Link>
          </div>
        </nav>
      </main>

      <Footer />

      {/* ── Lightbox ───────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={text.gallery[lightbox]}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A0B14]/95 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setLightbox(null)}
        >
          <figure className="case-lightbox-in relative mx-auto w-fit max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={project.images.gallery[lightbox]}
              alt={text.gallery[lightbox]}
              className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-[14px] text-white/80">
              <span>{text.gallery[lightbox]}</span>
              <span className="font-geist-mono text-white/50">
                {lightbox + 1} / {galleryCount}
              </span>
            </figcaption>
          </figure>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={ui.closeImage}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={content.uiText.previous}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={content.uiText.next}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
