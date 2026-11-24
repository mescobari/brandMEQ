import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectImage } from './ProjectImage';
import { gradientFor, type Project } from '@/data/projects';
import { useLocale } from '@/i18n/context';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** 'grid' honours project.size (large = 2 columns); 'list' keeps every card the same size. */
  variant?: 'grid' | 'list';
  className?: string;
}

export function ProjectCard({ project, index, variant = 'grid', className }: ProjectCardProps) {
  const { locale } = useLocale();
  const text = project.text[locale];
  const large = variant === 'grid' && project.size === 'large';

  return (
    <Link
      to={`/proyectos/${project.slug}`}
      aria-label={`${text.title} — ${text.sector}, ${project.year}`}
      className={cn(
        'group relative block h-[320px] overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl',
        large && 'md:col-span-2 lg:col-span-2',
        className
      )}
    >
      {/* Cover (or brand-gradient placeholder) */}
      <div className="absolute inset-0">
        <ProjectImage
          src={project.images.cover}
          alt={text.coverAlt}
          gradient={gradientFor(index)}
          label={text.title}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Brand tint + bottom gradient for legibility */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: gradientFor(index) }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/0" />

      {/* Year badge */}
      <div className="absolute right-4 top-4">
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#1A1D2E] backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <ArrowUpRight className="h-4 w-4 text-[#1A1D2E]" />
        </div>
      </div>

      {/* Title + sector */}
      <div className="absolute inset-x-0 bottom-0 p-6 pr-16">
        <h3 className="text-[19px] font-bold leading-tight text-white">{text.title}</h3>
        <p className="mt-1 text-[13px] text-white/70">{text.sector}</p>
      </div>
    </Link>
  );
}
