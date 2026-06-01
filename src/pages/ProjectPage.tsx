import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Layers,
  Calendar,
  Briefcase,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { projects, getProject, getProjectIndex, gradientFor } from '@/data/projects';
import { ProjectImage } from '@/components/ProjectImage';
import { ctaConfig } from '@/config';

function MetaChip({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]" />
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8FA3]">{label}</div>
        <div className="text-[14px] font-medium text-white">{value}</div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8A8FA3]">{children}</span>
  );
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const index = slug ? getProjectIndex(slug) : -1;

  // SEO + scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) return;
    const prevTitle = document.title;
    document.title = `${project.titulo} · Max Escobari`;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? '';
    meta?.setAttribute('content', project.resumen);
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute('content', prevDesc);
    };
  }, [project]);

  if (!project) {
    return (
      <main className="font-jakarta flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0A0B14] px-6 text-center text-white">
        <h1 className="text-2xl font-bold">Proyecto no encontrado</h1>
        <Link
          to="/proyectos"
          className="rounded-full px-6 py-3 text-[15px] font-semibold text-white"
          style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
        >
          Volver a proyectos
        </Link>
      </main>
    );
  }

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const gradient = gradientFor(index);

  return (
    <main className="font-jakarta min-h-screen bg-[#0A0B14] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0B14]/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="text-xl font-semibold tracking-tight text-white">
            MAX ESCOBARI
          </Link>
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Proyectos
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[58vh] min-h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ProjectImage src={project.imagenes.cover} alt={project.titulo} gradient={gradient} label={project.titulo} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B14] via-[#0A0B14]/60 to-[#0A0B14]/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 lg:px-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#1A1D2E]">
                {project.anio}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1.5 text-[12px] font-medium text-white/80">
                {project.sector}
              </span>
            </div>
            <h1 className="max-w-4xl text-[clamp(30px,5vw,56px)] font-extrabold leading-[1.05] tracking-tight">
              {project.titulo}
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#E4E7EF]">{project.resumen}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        {/* Metadata bar */}
        <div className="-mt-2 grid grid-cols-1 gap-3 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <MetaChip icon={Building2} label="Institución" value={project.institucion} />
          <MetaChip icon={Layers} label="Sector" value={project.sector} />
          <MetaChip icon={Calendar} label="Periodo" value={project.periodo} />
          <MetaChip icon={Briefcase} label="Rol" value={project.rol} />
        </div>

        {/* Reto + Solución */}
        <div className="grid gap-12 border-t border-white/[0.08] py-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionLabel>El reto</SectionLabel>
            <p className="mt-4 text-[17px] leading-relaxed text-[#E4E7EF]">{project.reto}</p>
          </div>
          <div>
            <SectionLabel>La solución</SectionLabel>
            <p className="mt-4 text-[17px] leading-relaxed text-[#E4E7EF]">{project.solucion}</p>
          </div>
        </div>

        {/* Resultados */}
        <div className="border-t border-white/[0.08] py-14">
          <SectionLabel>Resultados / Impacto</SectionLabel>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {project.resultados.map((r) => (
              <div key={r.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="about-brand-text text-[34px] font-extrabold leading-none">{r.value}</div>
                <div className="mt-2 text-[14px] leading-snug text-[#8A8FA3]">{r.label}</div>
              </div>
            ))}
          </div>
          {project.logros.length > 0 && (
            <ul className="mt-8 space-y-3">
              {project.logros.map((l) => (
                <li key={l} className="flex items-start gap-3 text-[16px] text-[#E4E7EF]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/20">
                    <Check className="h-3 w-3 text-[#2DD4C4]" />
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stack */}
        <div className="border-t border-white/[0.08] py-14">
          <SectionLabel>Stack tecnológico</SectionLabel>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[14px] font-medium text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Galería */}
        <div className="border-t border-white/[0.08] py-14">
          <SectionLabel>Galería</SectionLabel>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.imagenes.gallery.map((g, i) => (
              <div
                key={g}
                className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06]"
              >
                <ProjectImage src={g} alt={`${project.titulo} — imagen ${i + 1}`} gradient={gradient} label={project.titulo} />
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="border-t border-white/[0.08] py-16 text-center">
          <h2 className="text-[clamp(24px,3vw,38px)] font-extrabold tracking-tight text-white">
            ¿Tienes un proyecto similar? Hablemos
          </h2>
          <div className="mt-7">
            <a
              href={`mailto:${ctaConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
              style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
            >
              Contáctame
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Prev / Next */}
        <nav className="grid grid-cols-1 gap-4 border-t border-white/[0.08] py-12 sm:grid-cols-2">
          <Link
            to={`/proyectos/${prev.slug}`}
            className="group rounded-2xl border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.03]"
          >
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-[#8A8FA3]">
              <ArrowLeft className="h-3.5 w-3.5" /> Proyecto anterior
            </span>
            <div className="mt-2 text-[16px] font-semibold text-white">{prev.titulo}</div>
          </Link>
          <Link
            to={`/proyectos/${next.slug}`}
            className="group rounded-2xl border border-white/[0.08] p-6 text-right transition-colors hover:bg-white/[0.03]"
          >
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-[#8A8FA3]">
              Siguiente proyecto <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <div className="mt-2 text-[16px] font-semibold text-white">{next.titulo}</div>
          </Link>
        </nav>

        <div className="pb-16 text-center">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a todos los proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}
