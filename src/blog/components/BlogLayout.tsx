import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ctaConfig } from '@/config';

export function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-jakarta min-h-screen bg-[#0A0B14] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0B14]/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="text-xl font-semibold tracking-tight text-white">
            MAX ESCOBARI
          </Link>
          <nav className="flex items-center gap-6 text-[14px]">
            <Link to="/" className="text-white/70 transition-colors hover:text-white">
              Inicio
            </Link>
            <Link to="/blog" className="text-white/70 transition-colors hover:text-white">
              Blog
            </Link>
            <a
              href={`mailto:${ctaConfig.email}`}
              className="rounded-full px-4 py-2 text-[13px] font-semibold text-white"
              style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
            >
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      {/* Minimal footer */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-between gap-4 px-6 text-[13px] text-[#8A8FA3] sm:flex-row lg:px-8">
          <span>© {new Date().getFullYear()} Max Escobari. Todos los derechos reservados.</span>
          <div className="flex items-center gap-5">
            <Link to="/" className="transition-colors hover:text-white">Inicio</Link>
            <Link to="/proyectos" className="transition-colors hover:text-white">Proyectos</Link>
            <Link to="/blog" className="transition-colors hover:text-white">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
