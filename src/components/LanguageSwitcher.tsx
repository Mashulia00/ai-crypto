'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // рендеримо тільки на клієнті, щоб не було hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // поточна мова з першого сегмента (default: en)
  const parts = pathname.split('/').filter(Boolean); // ['en', 'route'] | []
  const current = parts[0] === 'ru' ? 'ru' : 'en';
  const next = current === 'en' ? 'ru' : 'en';

  function switchLocale() {
    const newParts = [...parts];
    if (newParts.length === 0) newParts.unshift(next);
    else newParts[0] = next;

    const newPath = '/' + newParts.join('/');
    const q = searchParams?.toString();
    router.push(q ? `${newPath}?${q}` : newPath);
  }

  return (
    <button
      onClick={switchLocale}
      aria-label="Switch language"
      data-testid="language-switcher"
      className="
        relative inline-flex items-center gap-2
        rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide
        border border-cyan-300/30 bg-gradient-to-r from-cyan-500/15 to-blue-500/15
        shadow-[0_0_20px_-6px_rgba(0,255,255,0.5)]
        hover:shadow-[0_0_28px_-4px_rgba(0,255,255,0.8)]
        hover:from-cyan-400/20 hover:to-blue-400/20
        transition-transform duration-200 hover:-translate-y-0.5
        backdrop-blur text-white
      "
    >
      <Languages size={14} className="opacity-80" />
      <span className="tabular-nums">{current.toUpperCase()} → {next.toUpperCase()}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-cyan-300/30"
      />
    </button>
  );
}
