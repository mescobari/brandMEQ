import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projects, gradientFor } from '@/data/projects';
import { ProjectImage } from '@/components/ProjectImage';
import { Navigation } from '@/components/Navigation';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { Footer } from '@/sections/Footer';
import { useLocale } from '@/i18n/context';
import { usePageMeta } from '@/hooks/usePageMeta';

// Countries across the featured projects: Bolivia, Chile and Argentina (VIPFE missions), Peru and Ecuador (Cuna M&E).
const COUNTRIES = '5';

export function ProjectsListPage() {
  const { locale, content } = useLocale();
  const ui = content.projectsPage;
  usePageMeta(ui.metaTitle, ui.metaDescription);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: content.aboutConfig.experienceValue, label: ui.statYears },
    { value: String(projects.length), label: ui.statProjects },
    { value: COUNTRIES, label: ui.statCountries },
  ];

  return (
    <div className="font-jakarta min-h-screen bg-white">
      <Navigation revealDelay={150} />

      <main>
        {/* ── Header ───────────────────────────────────────────────── */}
        <section className="about-dark relative w-full overflow-hidden pb-20 pt-40 lg:pb-28 lg:pt-48">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-48 left-1/4 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #2DD4C4 0%, transparent 70%)' }}
          />
          <div
            className="relative mx-auto w-full max-w-[1280px]"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            <span className="case-rise block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8A8FA3]" style={{ animationDelay: '100ms' }}>
              {ui.label}
            </span>
            <h1
              className="case-rise mt-5 max-w-4xl text-[clamp(38px,6vw,76px)] font-extrabold leading-[1.02] tracking-tight text-white"
              style={{ animationDelay: '200ms' }}
            >
              {ui.heading}
            </h1>
            <p
              className="case-rise mt-6 max-w-2xl text-[17px] leading-relaxed text-[#B7BCCB] lg:text-[19px]"
              style={{ animationDelay: '320ms' }}
            >
              {ui.intro}
            </p>

            <div
              className="case-rise mt-14 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/[0.08] pt-8"
              style={{ animationDelay: '440ms' }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <CountUp value={s.value} className="about-brand-text block text-[clamp(32px,4vw,52px)] font-extrabold leading-none tracking-tight" />
                  <span className="mt-3 block text-[13px] leading-snug text-[#8A8FA3]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Editorial list ───────────────────────────────────────── */}
        <section className="specialties-light w-full py-24 lg:py-32">
          <div
            className="mx-auto w-full max-w-[1280px] space-y-20 lg:space-y-28"
            style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
          >
            {projects.map((project, i) => {
              const text = project.text[locale];
              const flip = i % 2 === 1;
              return (
                <article key={project.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Image */}
                  <Reveal className={cn('lg:col-span-7', flip && 'lg:order-2')}>
                    <Link
                      to={`/proyectos/${project.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="group relative block aspect-[16/10] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-25px_rgba(10,11,20,0.45)]"
                    >
                      <div className="absolute inset-0">
                        <ProjectImage
                          src={project.images.cover}
                          alt={text.coverAlt}
                          gradient={gradientFor(i)}
                          label={text.title}
                          className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <div
                        className="absolute inset-0 opacity-30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10"
                        style={{ background: gradientFor(i) }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#1A1D2E]">
                        {project.period}
                      </span>
                      {/* Lead metric floating on the photo */}
                      <div className="absolute bottom-5 left-5 hidden rounded-2xl sm:block border border-white/15 bg-[#0A0B14]/70 px-5 py-4 backdrop-blur-md">
                        <span className="about-brand-text block text-[28px] font-extrabold leading-none">{text.results[0].value}</span>
                        <span className="mt-1.5 block max-w-[220px] text-[12px] leading-snug text-white/75">{text.results[0].label}</span>
                      </div>
                    </Link>
                  </Reveal>

                  {/* Copy */}
                  <Reveal delay={120} className={cn('lg:col-span-5', flip && 'lg:order-1')}>
                    <div className="flex items-center gap-4">
                      <span className="about-brand-text font-geist-mono text-[14px] font-semibold tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-[#1A1D2E]/10" />
                      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5B6072]">{text.sector}</span>
                    </div>
                    <h2 className="mt-6 text-[clamp(26px,2.6vw,36px)] font-extrabold leading-[1.1] tracking-tight text-[#1A1D2E]">
                      <Link to={`/proyectos/${project.slug}`} className="transition-colors hover:text-[#3B82F6]">
                        {text.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[14px] font-medium text-[#8A8FA3]">{text.institution}</p>
                    <p className="mt-5 text-[16.5px] leading-relaxed text-[#4A4F63]">{text.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {text.capabilities.slice(0, 3).map((c) => (
                        <span key={c} className="rounded-full border border-[#1A1D2E]/10 bg-white/70 px-3 py-1.5 text-[12.5px] font-medium text-[#4A4F63]">
                          {c}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/proyectos/${project.slug}`}
                      className="group mt-8 inline-flex items-center gap-3 text-[15px] font-semibold text-[#1A1D2E]"
                    >
                      <span className="relative">
                        {ui.viewCaseStudy}
                        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#1A1D2E] transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1D2E] text-white transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
