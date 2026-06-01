import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { portfolioConfig } from '@/config';

export function ProjectsListPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Proyectos · Max Escobari';
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? '';
    meta?.setAttribute(
      'content',
      'Trayectoria de proyectos tecnológicos estratégicos liderados por Max Escobari en banca, energía, salud, sector público y desarrollo social.'
    );
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute('content', prevDesc);
    };
  }, []);

  return (
    <main className="specialties-light font-jakarta min-h-screen w-full">
      {/* Top bar */}
      <header className="border-b border-black/[0.06]">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" className="text-xl font-semibold tracking-tight text-[#1A1D2E]">
            MAX ESCOBARI
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[14px] text-[#5B6072] transition-colors hover:text-[#1A1D2E]"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 lg:px-12 lg:py-20">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#5B6072]">
            {portfolioConfig.label || 'PROYECTOS'}
          </span>
          <h1 className="mt-4 text-[clamp(30px,4vw,52px)] font-bold leading-tight tracking-tight text-[#1A1D2E]">
            Trayectoria de proyectos
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[#5B6072]">
            {portfolioConfig.description}
          </p>
        </div>

        {/* All projects */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} variant="list" />
          ))}
        </div>
      </div>
    </main>
  );
}
