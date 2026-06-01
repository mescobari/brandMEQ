import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useIsMobile } from '@/hooks/use-mobile';
import { servicesConfig, type ServiceItem } from '@/config';
import {
  Network,
  Code2,
  KanbanSquare,
  Settings2,
  Cpu,
  Bot,
  Circle,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Network,
  Code2,
  KanbanSquare,
  Settings2,
  Cpu,
  Bot,
};

const getIcon = (name: string): LucideIcon => iconMap[name] || Circle;

// One full revolution duration — tweak here to speed up / slow down the cylinder.
const SPIN_SECONDS = 36;

// Per-card DARK gradients across the brand spectrum (deep teal → blue → violet).
// `edge` is the extruded side color that gives each card its 3D thickness.
const CARD_GRADIENTS: { bg: string; edge: string }[] = [
  { bg: 'linear-gradient(160deg, #0EA5A5 0%, #0A363B 100%)', edge: '#072A2E' }, // deep teal
  { bg: 'linear-gradient(160deg, #0E7490 0%, #0A2A52 100%)', edge: '#071E3B' }, // cyan → deep blue
  { bg: 'linear-gradient(160deg, #1D4ED8 0%, #1A1840 100%)', edge: '#120F30' }, // blue → indigo
  { bg: 'linear-gradient(160deg, #4F46E5 0%, #271056 100%)', edge: '#190A3C' }, // indigo → violet
  { bg: 'linear-gradient(160deg, #7C3AED 0%, #2A1056 100%)', edge: '#1C0A3E' }, // violet
  { bg: 'linear-gradient(160deg, #9333EA 0%, #320A57 100%)', edge: '#230440' }, // deep purple
];

function SpecialtyCard({
  service,
  index,
  step,
  radius,
  width,
  height,
  gradient,
}: {
  service: ServiceItem;
  index: number;
  step: number;
  radius: number;
  width: number;
  height: number;
  gradient: { bg: string; edge: string };
}) {
  const Icon = getIcon(service.iconName);

  return (
    // Positioned on the cylinder wall, facing outward. Flat (not preserve-3d) +
    // hidden backface so cards turning past 90° simply disappear (never mirrored).
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
        transform: `rotateY(${index * step}deg) translateZ(${radius}px)`,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Inner box carries the volumetric 3D look + hover highlight (2D — keeps the 3D placement intact) */}
      <div
        className="spec-card-3d group relative flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-3xl p-7 text-white transition-all duration-300 hover:scale-[1.04]"
        style={{ background: gradient.bg, ['--card-edge' as string]: gradient.edge }}
      >
        {/* Subtle top-light sheen for a glossy 3D surface (kept low so cards stay dark) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(110% 70% at 78% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 52%)',
          }}
        />

        {/* Header */}
        <div className="relative">
          <h3 className="text-[24px] font-bold leading-tight">{service.title}</h3>
          <p className="mt-1 text-[14px] font-medium text-white/70">{service.subtitle}</p>
        </div>

        {/* Hero icon — frosted glass tile, evokes the 3D illustration */}
        <div className="relative grid flex-1 place-items-center py-3">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/25 bg-white/15 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Icon
              className="h-12 w-12 text-white"
              strokeWidth={1.5}
              style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.25))' }}
            />
          </div>
        </div>

        {/* Short description */}
        <p className="relative line-clamp-3 text-[13px] leading-relaxed text-white/85">
          {service.description}
        </p>

        {/* Footer — brand mark + category (echoes the reference's "brand / label") */}
        <div className="relative mt-5 flex items-center gap-2.5 border-t border-white/20 pt-4">
          <Icon className="h-4 w-4 text-white/90" strokeWidth={1.75} />
          <div className="leading-tight">
            <div className="text-[13px] font-bold">Max Escobari</div>
            <div className="text-[11px] text-white/60">{service.subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  if (!servicesConfig.heading && servicesConfig.services.length === 0) return null;

  const services = servicesConfig.services;
  const n = services.length;
  const step = 360 / n;
  const mobile = useIsMobile();

  const radius = mobile ? 300 : 460;
  const perspective = mobile ? 900 : 1300;
  const cardW = mobile ? 260 : 300;
  const cardH = mobile ? 400 : 420;

  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [angle, setAngle] = useState(0); // manual rotation (reduced-motion mode)

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: stageRef, isVisible: stageVisible } = useScrollAnimation({ threshold: 0.15 });

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const nudge = (dir: number) => setAngle((a) => a + dir * step);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nudge(1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nudge(-1);
    }
  };

  // Cylinder transform: CSS animation drives it normally; manual angle when reduced-motion
  const cylinderStyle: React.CSSProperties = {
    ['--spin-duration' as string]: `${SPIN_SECONDS}s`,
    animationPlayState: paused ? 'paused' : 'running',
    ...(reduced
      ? { transform: `rotateY(${angle}deg)`, transition: 'transform 0.6s ease' }
      : null),
  };

  return (
    <section
      id="services"
      className="specialties-light font-jakarta w-full overflow-hidden py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-14 max-w-2xl text-center">
          {servicesConfig.label && (
            <div
              className={cn(
                'transition-all duration-700 ease-out',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#5B6072]">
                {servicesConfig.label}
              </span>
            </div>
          )}
          {servicesConfig.heading && (
            <h2
              className={cn(
                'about-brand-text mt-4 text-[clamp(32px,4vw,52px)] font-extrabold leading-tight tracking-tight transition-all duration-700 ease-out',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {servicesConfig.heading}
            </h2>
          )}
        </div>

        {/* Entrance wrapper (kept separate so its transform never flattens the 3D scene) */}
        <div
          ref={stageRef}
          className={cn(
            'relative transition-all duration-1000 ease-out',
            stageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          {/* 3D stage */}
          <div
            role="group"
            aria-roledescription="carrusel"
            aria-label="Especialidades — rotación automática, pase el cursor para pausar"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onPointerDown={() => setPaused(true)}
            onPointerUp={() => setPaused(false)}
            className="relative mx-auto h-[420px] w-full max-w-[1100px] touch-pan-y outline-none sm:h-[480px]"
            style={{ perspective: `${perspective}px` }}
          >
            {/* Offset wrapper pushes the cylinder back so the front card sits at z≈0 */}
            <div
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{ transform: `translateZ(${-radius}px)` }}
            >
              {/* Rotating cylinder */}
              <div
                className={cn('absolute inset-0 [transform-style:preserve-3d]', !reduced && 'cylinder-spin')}
                style={cylinderStyle}
              >
                {services.map((service, i) => (
                  <SpecialtyCard
                    key={service.title}
                    service={service}
                    index={i}
                    step={step}
                    radius={radius}
                    width={cardW}
                    height={cardH}
                    gradient={CARD_GRADIENTS[i % CARD_GRADIENTS.length]}
                  />
                ))}
              </div>
            </div>

            {/* Manual controls — shown when auto-rotation is off (reduced-motion) */}
            {reduced && (
              <>
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={() => nudge(1)}
                  className="absolute left-1 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-[#1A1D2E] shadow-lg transition-transform hover:scale-105 sm:left-3"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={() => nudge(-1)}
                  className="absolute right-1 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white text-[#1A1D2E] shadow-lg transition-transform hover:scale-105 sm:right-3"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* CTA */}
          {servicesConfig.ctaText && (
            <div className="mt-12 flex justify-center">
              <a
                href={servicesConfig.ctaHref}
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
              >
                {servicesConfig.ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
