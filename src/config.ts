// Site configuration for Max Escobari - Senior IT Project Manager
// Bilingual personal brand website: English (default) + Spanish.
//
// Content lives in one file per locale (src/content/en.ts, src/content/es.ts).
// Home-page components read the active locale through useContent() (src/i18n/LocaleProvider.tsx).

import { en } from './content/en';
import { es } from './content/es';
import type { Locale, SiteContent } from './content/types';

export type * from './content/types';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es'];

export const contentByLocale: Record<Locale, SiteContent> = { en, es };

// Default-locale site metadata.
export const siteConfig = contentByLocale[defaultLocale].siteConfig;

// ── Legacy exports for pages that are still Spanish-only (blog, /proyectos) ──
// The blog derives its category slugs and labels from servicesConfig titles
// (src/blog/lib/posts.ts), so this export must stay in Spanish to keep blog URLs stable.
// Each service also carries a stable `categoryKey` equal to that slug.
export const servicesConfig = es.servicesConfig;
export const portfolioConfig = es.portfolioConfig;
export const ctaConfig = es.ctaConfig;
