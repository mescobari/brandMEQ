import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'highlight.js/styles/github-dark.css';
import { ArrowLeft, ArrowRight, Clock, CalendarDays, RefreshCw } from 'lucide-react';
import { BlogLayout } from '../components/BlogLayout';
import { PostCard } from '../components/PostCard';
import { ShareButtons } from '../components/ShareButtons';
import { ProjectImage } from '@/components/ProjectImage';
import { useSeo } from '../lib/useSeo';
import {
  getPostBySlug,
  getRelated,
  getAdjacent,
  categoryLabel,
  gradientForCategory,
  formatDate,
} from '../lib/posts';

const SITE = 'https://mescobari.iq.com.bo';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const url = `${SITE}/blog/${slug}`;
  const image = post?.cover ? `${SITE}${post.cover}` : undefined;

  useSeo({
    title: post ? `${post.title} · Max Escobari` : 'Artículo no encontrado · Max Escobari',
    description: post?.excerpt ?? '',
    url,
    image,
    type: 'article',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          author: { '@type': 'Person', name: post.author },
          ...(image ? { image } : {}),
          mainEntityOfPage: url,
        }
      : undefined,
  });

  if (!post) {
    return (
      <BlogLayout>
        <div className="mx-auto flex min-h-[50vh] max-w-[1100px] flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-2xl font-bold">Artículo no encontrado</h1>
          <Link
            to="/blog"
            className="rounded-full px-6 py-3 text-[15px] font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }}
          >
            Volver al blog
          </Link>
        </div>
      </BlogLayout>
    );
  }

  const related = getRelated(post);
  const { prev, next } = getAdjacent(post.slug);

  return (
    <BlogLayout>
      <article>
        {/* Hero */}
        <header className="mx-auto w-full max-w-[820px] px-6 pt-12 lg:pt-16">
          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <Link
              to={`/blog/categoria/${post.category}`}
              className="rounded-full border border-white/15 px-3 py-1 font-medium text-white/80 transition-colors hover:text-white"
            >
              {categoryLabel(post.category)}
            </Link>
            {post.topic && <span className="text-[#8A8FA3]">{post.topic}</span>}
          </div>

          <h1 className="mt-5 text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          {post.subtitle && <p className="mt-4 text-[19px] leading-relaxed text-[#A9AEC0]">{post.subtitle}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-white/[0.08] py-4 text-[13px] text-[#8A8FA3]">
            <span className="font-medium text-white/90">{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> {formatDate(post.date)}
            </span>
            {post.updated && post.updated !== post.date && (
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" /> Act. {formatDate(post.updated)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readingTime} min de lectura
            </span>
          </div>
        </header>

        {/* Cover */}
        <div className="mx-auto mt-8 w-full max-w-[980px] px-6">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.06]">
            <ProjectImage
              src={post.cover ?? ''}
              alt={post.title}
              gradient={gradientForCategory(post.category)}
              label={post.title}
            />
          </div>
        </div>

        {/* Body */}
        <div
          className="blog-prose mx-auto mt-10 w-full max-w-[760px] px-6"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Tags + share */}
        <div className="mx-auto mt-12 w-full max-w-[760px] px-6">
          <div className="flex flex-col gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  to={`/blog/tag/${encodeURIComponent(t)}`}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[13px] text-white/80 transition-colors hover:text-white"
                >
                  #{t}
                </Link>
              ))}
            </div>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto mt-16 w-full max-w-[1100px] px-6 lg:px-8">
          <h2 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8A8FA3]">
            Artículos relacionados
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <nav className="mx-auto mt-16 grid w-full max-w-[1100px] grid-cols-1 gap-4 px-6 pb-16 sm:grid-cols-2 lg:px-8">
        {prev ? (
          <Link
            to={`/blog/${prev.slug}`}
            className="rounded-2xl border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.03]"
          >
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-[#8A8FA3]">
              <ArrowLeft className="h-3.5 w-3.5" /> Anterior
            </span>
            <div className="mt-2 text-[16px] font-semibold text-white">{prev.title}</div>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/blog/${next.slug}`}
            className="rounded-2xl border border-white/[0.08] p-6 text-right transition-colors hover:bg-white/[0.03]"
          >
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-[#8A8FA3]">
              Siguiente <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <div className="mt-2 text-[16px] font-semibold text-white">{next.title}</div>
          </Link>
        )}
      </nav>
    </BlogLayout>
  );
}
