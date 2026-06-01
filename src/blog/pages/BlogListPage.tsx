import { useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { BlogLayout } from '../components/BlogLayout';
import { PostCard } from '../components/PostCard';
import { useSeo } from '../lib/useSeo';
import {
  getAllPosts,
  getPostsByCategory,
  getPostsByTag,
  getActiveCategories,
  categoryLabel,
  type Post,
} from '../lib/posts';

const PAGE_SIZE = 6;
const SITE = 'https://mescobari.iq.com.bo';

export function BlogListPage() {
  const { cat, tag } = useParams<{ cat: string; tag: string }>();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const page = Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1);

  const base: Post[] = cat ? getPostsByCategory(cat) : tag ? getPostsByTag(tag) : getAllPosts();

  const filtered = useMemo(() => {
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [base, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const heading = cat ? categoryLabel(cat) : tag ? `#${tag}` : 'Blog';
  const intro = cat
    ? `Artículos sobre ${categoryLabel(cat)}.`
    : tag
    ? `Artículos etiquetados con “${tag}”.`
    : 'Reflexiones sobre tecnología, arquitectura, IA, gestión de proyectos y transformación digital.';

  useSeo({
    title: `${heading} · Blog · Max Escobari`,
    description: intro,
    url: `${SITE}/blog${cat ? `/categoria/${cat}` : tag ? `/tag/${tag}` : ''}`,
    type: 'website',
  });

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page'); // reset pagination on new search
    setParams(next);
  };

  const goToPage = (p: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(p));
    setParams(next);
  };

  const categories = getActiveCategories();

  return (
    <BlogLayout>
      <div className="mx-auto w-full max-w-[1100px] px-6 py-14 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8A8FA3]">Blog</span>
          <h1 className="about-brand-text mt-3 text-[clamp(32px,5vw,52px)] font-extrabold leading-tight tracking-tight">
            {heading}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#A9AEC0]">{intro}</p>
        </div>

        {/* Category filter + search */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link
              to="/blog"
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                !cat && !tag ? 'bg-white text-[#0A0B14]' : 'border border-white/15 text-white/70 hover:text-white'
              }`}
            >
              Todos
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/blog/categoria/${c.slug}`}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  cat === c.slug ? 'bg-white text-[#0A0B14]' : 'border border-white/15 text-white/70 hover:text-white'
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8FA3]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setParam('q', e.target.value)}
              placeholder="Buscar artículos…"
              aria-label="Buscar artículos"
              className="w-full rounded-full border border-white/15 bg-white/[0.03] py-2.5 pl-10 pr-4 text-[14px] text-white placeholder:text-[#8A8FA3] focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        {pageItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-[#8A8FA3]">No se encontraron artículos.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                aria-current={p === current}
                className={`h-10 min-w-10 rounded-full px-3 text-[14px] font-medium transition-colors ${
                  p === current ? 'bg-white text-[#0A0B14]' : 'border border-white/15 text-white/70 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
