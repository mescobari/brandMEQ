import { useState } from 'react';
import { Linkedin, Twitter, Facebook, Link2, Check } from 'lucide-react';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    { label: 'Compartir en X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, Icon: Twitter },
    { label: 'Compartir en LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, Icon: Linkedin },
    { label: 'Compartir en Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, Icon: Facebook },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:bg-white/10 hover:text-white"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copiar enlace"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:bg-white/10 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4 text-[#2DD4C4]" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
