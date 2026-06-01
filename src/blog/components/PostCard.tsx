import { Link } from 'react-router-dom';
import { ProjectImage } from '@/components/ProjectImage';
import { categoryLabel, gradientForCategory, formatDate, type Post } from '../lib/posts';

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.04]"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <ProjectImage
          src={post.cover ?? ''}
          alt={post.title}
          gradient={gradientForCategory(post.category)}
          label={post.title}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8FA3]">
          {categoryLabel(post.category)}
        </span>
        <h3 className="mt-2 text-[18px] font-bold leading-snug text-white">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[#A9AEC0]">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-[12px] text-[#8A8FA3]">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime} min de lectura</span>
        </div>
      </div>
    </Link>
  );
}
