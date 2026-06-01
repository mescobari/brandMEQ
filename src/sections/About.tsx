import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { aboutConfig } from '@/config';

export function About() {
  if (!aboutConfig.description && aboutConfig.stats.length === 0 && !aboutConfig.bioImage?.src) return null;

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="about"
      className="about-dark font-jakarta flex w-full items-center overflow-hidden py-16 lg:min-h-screen lg:py-20"
    >
      <div
        className="mx-auto w-full max-w-[1280px]"
        style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}
      >
        <div
          ref={sectionRef}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        >
          {/* ── Left Column — Content ──────────────────────────────── */}
          <div className="space-y-5">
            {/* Section Label */}
            {aboutConfig.label && (
              <div
                className={cn(
                  'transition-all duration-700 ease-out',
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#8A8FA3]">
                  {aboutConfig.label}
                </span>
              </div>
            )}

            {/* Headline — second line shares the exact same animated brand gradient as "25+" */}
            <div
              className={cn(
                'transition-all duration-700 ease-out',
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              )}
              style={{ transitionDelay: '80ms' }}
            >
              <h2 className="mb-5 text-[clamp(28px,3vw,46px)] font-extrabold leading-[1.05] tracking-tight">
                <span className="block text-white md:whitespace-nowrap">Project Manager Senior</span>
                <span className="about-brand-text block">Arquitecto de Soluciones TI</span>
              </h2>
            </div>

            {/* Biography */}
            {aboutConfig.description && (
              <div
                className={cn(
                  'transition-all duration-700 ease-out',
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '100ms' }}
              >
                <p
                  lang="es"
                  className="hyphens-auto text-left text-[16px] font-normal leading-[1.65] text-[#E4E7EF] md:text-justify lg:text-[17px]"
                  style={{ textJustify: 'inter-word' }}
                >
                  {aboutConfig.description}
                </p>
              </div>
            )}

            {/* Featured metric — animated brand gradient */}
            {aboutConfig.experienceValue && (
              <div
                className={cn(
                  'flex items-end gap-4 pt-2 transition-all duration-700 ease-out',
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '200ms' }}
              >
                <span className="about-brand-text text-[48px] font-extrabold leading-none tracking-tight lg:text-[56px]">
                  {aboutConfig.experienceValue}
                </span>
                {aboutConfig.experienceLabel && (
                  <span className="whitespace-pre-line pb-2.5 text-[13px] leading-snug text-[#8A8FA3]">
                    {aboutConfig.experienceLabel}
                  </span>
                )}
              </div>
            )}

            {/* Secondary metrics */}
            {aboutConfig.stats.length > 0 && (
              <div
                className={cn(
                  'grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-5 transition-all duration-700 ease-out',
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '300ms' }}
              >
                {aboutConfig.stats.map((stat, index) => (
                  <div key={index}>
                    <span className="about-brand-text block text-[24px] font-bold leading-none">
                      {stat.value}
                    </span>
                    <span className="mt-2 block whitespace-pre-line text-[12px] leading-snug text-[#8A8FA3]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column — Single floating image ───────────────── */}
          {aboutConfig.bioImage?.src && (
            <div
              className={cn(
                'flex justify-center transition-all duration-1000 ease-out lg:justify-end',
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="about-float about-image-glow relative w-full max-w-[480px]">
                <div
                  className="relative z-10 aspect-[4/5] overflow-hidden rounded-[20px] border border-white/[0.08]"
                  style={{
                    boxShadow:
                      '0 30px 60px -15px rgba(0,0,0,0.7), 0 0 50px -10px rgba(59,130,246,0.35), 0 0 80px -20px rgba(139,92,246,0.30)',
                  }}
                >
                  <img
                    src={aboutConfig.bioImage.src}
                    alt={aboutConfig.bioImage.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
