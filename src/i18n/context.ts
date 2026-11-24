import { createContext, useContext } from 'react';
import { contentByLocale, defaultLocale, locales, type Locale, type SiteContent } from '@/config';

export const STORAGE_KEY = 'mescobari.locale';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: SiteContent;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  content: contentByLocale[defaultLocale],
});

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as string[]).includes(value);

/** Initial locale: ?lang= query param, then saved preference, then English. */
export function readInitialLocale(): Locale {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(fromQuery)) return fromQuery;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // Storage blocked (private mode, disabled cookies) → fall back to the default.
  }
  return defaultLocale;
}

export function saveLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ignore: the choice just won't persist across visits.
  }
}

export const useLocale = () => useContext(LocaleContext);
export const useContent = () => useContext(LocaleContext).content;
