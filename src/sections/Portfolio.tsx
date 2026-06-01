import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';

const scrollToContact = (e: MouseEvent<HTMLAnchorElement>) => {
  const el = document.querySelector('#contact');
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export function Portfolio() {
  if (projects.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="portfolio" className="specialties-light font-jakarta w-full overflow-hidden py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-14 max-w-3xl">
          {portfolioConfig.label && (
            <div
              className={cn(
                'transition-all duration-700 ease-out',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#5B6072]">
                {portfolioConfig.label}
              </span>
            </div>
          )}
          {portfolioConfig.heading && (
            <h2
              className={cn(
                'mt-4 text-[clamp(28px,3.4vw,46px)] font-bold leading-tight tracking-tight text-[#1A1D2E] transition-all duration-700 ease-out',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {portfolioConfig.heading}
            </h2>
          )}
          {portfolioConfig.description && (
            <p
              className={cn(
                'mt-5 text-[17px] leading-relaxed text-[#5B6072] transition-all duration-700 ease-out',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              {portfolioConfig.description}
            </p>
          )}
        </div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          className={cn(
            'grid grid-cols-1 gap-5 transition-all duration-700 ease-out md:grid-cols-2 lg:grid-cols-3',
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {projects[0] && <ProjectCard project={projects[0]} index={0} />}
          {projects[1] && <ProjectCard project={projects[1]} index={1} />}
          {projects[2] && <ProjectCard project={projects[2]} index={2} />}
          {projects[3] && <ProjectCard project={projects[3]} index={3} />}

          {/* Dark CTA card */}
          <div className="about-dark relative flex h-[320px] flex-col justify-between overflow-hidden rounded-2xl p-7 shadow-md">
            <div>
              {portfolioConfig.cta.label && (
                <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/50">
                  {portfolioConfig.cta.label}
                </span>
              )}
              <h3 className="mt-3 text-[22px] font-bold leading-snug text-white">
                {portfolioConfig.cta.heading}
              </h3>
            </div>
            <a
              href={portfolioConfig.cta.linkHref || '#contact'}
              onClick={scrollToContact}
              className="group/cta inline-flex items-center gap-2 text-[15px] font-medium text-white/85 transition-colors hover:text-white"
            >
              {portfolioConfig.cta.linkText || 'Agendar consulta gratuita'}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </a>
            {/* Decorative brand glow */}
            <div
              className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
            />
          </div>

          {projects[4] && <ProjectCard project={projects[4]} index={4} />}
          {projects[5] && <ProjectCard project={projects[5]} index={5} />}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
            style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
          >
            {portfolioConfig.viewAllLabel || 'Ver todos los proyectos'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
