import { load as yamlLoad } from 'js-yaml';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import sql from 'highlight.js/lib/languages/sql';
import java from 'highlight.js/lib/languages/java';
import { servicesConfig } from '@/config';

// Register only the languages we expect in posts (keeps the bundle small)
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('java', java);

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Category {
  slug: string;
  label: string;
  description: string;
  icon: string;
  topics: string[];
}

export interface Post {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  author: string;
  category: string; // category slug
  topic?: string;
  tags: string[];
  cover?: string;
  ogImage?: string;
  draft: boolean;
  publishAt?: string;
  content: string; // raw markdown body
  html: string; // rendered HTML
  readingTime: number; // minutes
}

// Slug helper (accent-insensitive)
const slugify = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[^\x00-\x7f]/g, '') // strip combining accents (non-ASCII after NFD)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Secondary topics per specialty (referential — amplíalos a voluntad)
const TOPICS: Record<string, string[]> = {
  'arquitectura-de-soluciones': ['Cloud', 'Microservicios', 'Integración', 'Escalabilidad', 'Seguridad', 'Backend'],
  'desarrollo-de-software': ['Java', 'Node.js', 'APIs', 'Bases de Datos', 'DevOps', 'Blockchain'],
  'gestion-de-proyectos-ti': ['Scrum', 'Kanban', 'PMBOK', 'Riesgos', 'Stakeholders'],
  'implementacion-itil': ['Service Desk', 'Incidentes', 'Cambios', 'Disponibilidad', 'ITIL 4'],
  'gemelos-digitales': ['Simulación', 'IoT', 'Mantenimiento predictivo', 'Optimización'],
  'ia-agentica': ['LLMs', 'Agentes', 'Prompt Engineering', 'Automatización', 'Machine Learning'],
};

// Single source of truth: blog categories ARE the specialties from the Especialidades section
export const categories: Category[] = servicesConfig.services.map((s) => {
  const slug = slugify(s.title);
  return {
    slug,
    label: s.title,
    description: s.subtitle || s.description,
    icon: s.iconName,
    topics: TOPICS[slug] ?? [],
  };
});

// ─── Markdown renderer (syntax highlighting + raw HTML for embeds) ────────────
const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch {
        /* fall through */
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toDateStr(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v ? String(v) : '';
}

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = (yamlLoad(match[1]) as Record<string, unknown>) || {};
  return { data, body: match[2] };
}

// ─── Load all markdown posts at build time ───────────────────────────────────
const modules = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const allPosts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      subtitle: data.subtitle as string | undefined,
      excerpt: (data.excerpt as string) ?? '',
      date: toDateStr(data.date),
      updated: data.updated ? toDateStr(data.updated) : undefined,
      author: (data.author as string) ?? 'Max Escobari',
      category: (data.category as string) ?? '',
      topic: data.topic as string | undefined,
      tags: (data.tags as string[]) ?? [],
      cover: data.cover as string | undefined,
      ogImage: data.ogImage as string | undefined,
      draft: (data.draft as boolean) ?? false,
      publishAt: data.publishAt ? toDateStr(data.publishAt) : undefined,
      content: body,
      html: md.render(body),
      readingTime: readingTime(body),
    } satisfies Post;
  });

function isPublished(p: Post): boolean {
  if (p.draft) return false;
  const when = p.publishAt || p.date;
  if (when && new Date(when).getTime() > Date.now()) return false; // scheduled in the future
  return true;
}

const published: Post[] = allPosts
  .filter(isPublished)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// ─── Public API ───────────────────────────────────────────────────────────────
export const getAllPosts = (): Post[] => published;

export const getPostBySlug = (slug: string | undefined): Post | undefined =>
  slug ? published.find((p) => p.slug === slug) : undefined;

export const getPostsByCategory = (categorySlug: string): Post[] =>
  published.filter((p) => p.category === categorySlug);

export const getPostsByTag = (tag: string): Post[] =>
  published.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const categoryLabel = (slug: string): string =>
  getCategoryBySlug(slug)?.label ?? slug;

/** Categories that actually have at least one published post. */
export const getActiveCategories = (): Category[] =>
  categories.filter((c) => published.some((p) => p.category === c.slug));

export interface TagCount {
  tag: string;
  count: number;
}

export const getAllTags = (): TagCount[] => {
  const map = new Map<string, number>();
  for (const p of published) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
};

/** Related posts: same category first, then shared tags. */
export const getRelated = (post: Post, limit = 3): Post[] => {
  const scored = published
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 3;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.p);
};

export const getAdjacent = (slug: string): { prev?: Post; next?: Post } => {
  const i = published.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? published[i - 1] : undefined,
    next: i < published.length - 1 ? published[i + 1] : undefined,
  };
};

export const formatDate = (iso: string): string => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
};

// Brand gradients for cover placeholders (by category order)
const GRADIENTS = [
  'linear-gradient(150deg, #0EA5A5 0%, #3B82F6 100%)',
  'linear-gradient(150deg, #3B82F6 0%, #6366F1 100%)',
  'linear-gradient(150deg, #6366F1 0%, #8B5CF6 100%)',
  'linear-gradient(150deg, #0E7490 0%, #2DD4C4 100%)',
  'linear-gradient(150deg, #7C3AED 0%, #9333EA 100%)',
  'linear-gradient(150deg, #2DD4C4 0%, #3B82F6 100%)',
];

export const gradientForCategory = (categorySlug: string): string => {
  const i = Math.max(0, categories.findIndex((c) => c.slug === categorySlug));
  return GRADIENTS[i % GRADIENTS.length];
};
