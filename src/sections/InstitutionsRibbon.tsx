import { useState } from 'react';
import { institutionsConfig, type Institution } from '@/config';

interface InstitutionsRibbonProps {
  label?: string;
  items?: Institution[];
}

/** Single logo + name. Falls back to an initials pill if the image is missing. */
function LogoItem({ item }: { item: Institution }) {
  const [errored, setErrored] = useState(false);

  return (
    // margin-right (not flex gap) keeps the duplicated track's -50% loop seamless
    <div className="mr-16 flex shrink-0 flex-col items-center justify-center gap-2">
      {errored || !item.logo ? (
        <div className="flex h-12 min-w-[80px] items-center justify-center rounded-lg bg-white px-4 shadow-sm">
          <span className="text-[15px] font-bold tracking-wide text-[#2A2D3A]">
            {item.initials}
          </span>
        </div>
      ) : (
        <img
          src={item.logo}
          alt={item.name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-12 w-auto object-contain"
        />
      )}
      <span className="max-w-[180px] text-center text-[14px] font-semibold leading-tight tracking-[0.04em] text-[#2A2D3A]">
        {item.name}
      </span>
    </div>
  );
}

export function InstitutionsRibbon({
  label = institutionsConfig.label,
  items = institutionsConfig.items,
}: InstitutionsRibbonProps) {
  if (!items || items.length === 0) return null;

  // Duplicate the list so the -50% translate produces an invisible loop
  const loopItems = [...items, ...items];

  return (
    <section
      aria-label={label || 'Instituciones con las que he trabajado'}
      className="relative w-full"
    >
      {/* Brand-gradient accent line (the only color in the light band) */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#2DD4C4] via-[#3B82F6] to-[#8B5CF6]" />

      {/* Light band — subtle white hairline borders soften the cut against the dark sections */}
      <div
        className="border-y border-white/[0.06] py-7"
        style={{ background: 'linear-gradient(180deg, #E8EAF0 0%, #DDE0EA 100%)' }}
      >
        {label && (
          <p className="mb-4 text-center text-[12px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]">
            {label}
          </p>
        )}

        {/* Marquee viewport: pauses on hover, fades out at the edges */}
        <div className="marquee-viewport marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center">
            {loopItems.map((item, index) => (
              <LogoItem key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
