import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Brand gradient used for the fallback placeholder */
  gradient: string;
  /** Label shown inside the placeholder when the image is missing */
  label: string;
  className?: string;
}

/**
 * Renders the project image, or — while the real photo doesn't exist yet —
 * a brand-gradient placeholder with the project name (keeps the layout intact).
 */
export function ProjectImage({ src, alt, gradient, label, className }: ProjectImageProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={cn('flex h-full w-full items-center justify-center p-6 text-center', className)}
        style={{ background: gradient }}
        role="img"
        aria-label={alt}
      >
        <span className="font-jakarta text-[15px] font-bold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          {label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={cn('h-full w-full object-cover', className)}
    />
  );
}
