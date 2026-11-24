import { useEffect } from 'react';

/** Sets document.title and the meta description for an inner page, restoring them on leave. */
export function usePageMeta(title: string | undefined, description: string | undefined) {
  useEffect(() => {
    if (!title) return;
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? '';
    document.title = title;
    if (description) meta?.setAttribute('content', description);
    return () => {
      document.title = prevTitle;
      meta?.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}
