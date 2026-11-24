import { cn } from '@/lib/utils';
import { locales } from '@/config';
import { useLocale } from '@/i18n/context';

interface LanguageSwitcherProps {
  /** Light text over the dark hero, dark text once the navbar turns white. */
  tone: 'light' | 'dark';
  className?: string;
}

/** Compact "EN | ES" toggle that matches the navbar's typography. */
export function LanguageSwitcher({ tone, className }: LanguageSwitcherProps) {
  const { locale, setLocale, content } = useLocale();

  return (
    <div
      role="group"
      aria-label={content.uiText.languageSwitcherLabel}
      className={cn('flex items-center gap-1.5 text-sm font-medium', className)}
    >
      {locales.map((code, i) => (
        <span key={code} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" className={tone === 'light' ? 'text-white/40' : 'text-exvia-black/30'}>
              |
            </span>
          )}
          <button
            type="button"
            lang={code}
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            className={cn(
              'uppercase tracking-wide transition-colors duration-300',
              tone === 'light'
                ? locale === code ? 'text-white' : 'text-white/55 hover:text-white'
                : locale === code ? 'text-exvia-black' : 'text-exvia-black/45 hover:text-exvia-black'
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
