import { useEffect } from 'react';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  jsonLd?: object;
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/** Sets document title, meta description, Open Graph / Twitter tags, canonical and optional JSON-LD. */
export function useSeo(seo: SeoData) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = seo.title;

    upsertMeta('meta[name="description"]', 'name', 'description', seo.description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', seo.type ?? 'website');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);

    if (seo.image) {
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', seo.image);
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.image);
    }
    if (seo.url) {
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', seo.url);
      upsertCanonical(seo.url);
    }

    let script: HTMLScriptElement | null = null;
    if (seo.jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-blog-jsonld', 'true');
      script.text = JSON.stringify(seo.jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      if (script) script.remove();
    };
  }, [seo.title, seo.description, seo.image, seo.url, seo.type, seo.jsonLd]);
}
