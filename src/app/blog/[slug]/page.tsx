"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { findPostMeta } from "@/lib/posts-index";
import { getPostContent } from "@/lib/posts-content";

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article-body");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const h = Math.max(1, r.height - window.innerHeight);
      const seen = Math.min(Math.max(-r.top, 0), h);
      setP(seen / h);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return p;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const meta = findPostMeta(params.slug);
  const content = getPostContent(params.slug);
  const progress = useScrollProgress();

  if (!meta || !content) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="glass rounded-2xl p-6">
          <h1 className="text-2xl font-semibold">Статтю не знайдено</h1>
          <p className="mt-2 text-platinum-300">Можливо, посилання застаріло.</p>
          <Link href="/blog" className="mt-4 inline-block badge-chip">← Повернутися до блогу</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
      {/* прогрес-бар читання (sticky) */}
      <div className="sticky top-[56px] z-20 mb-4 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, rgba(57,208,255,0), rgba(57,208,255,1))",
            boxShadow: "0 0 22px rgba(57,208,255,.35)",
          }}
        />
      </div>

      {/* шапка статті */}
      <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-6">
        <div className="text-sm text-platinum-400">
          {new Date(meta.date).toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" })}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl mt-1">
          <span className="mark-underline mark-underline--thick">{meta.title}</span>
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <span key={t} className="badge-chip">#{t}</span>
          ))}
        </div>
        <button
          className="pressable mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              (e => {
                const btn = e?.currentTarget as HTMLButtonElement | undefined;
                if (!btn) return;
                btn.textContent = "Скопійовано ✓";
                setTimeout(() => (btn.textContent = "Скопіювати посилання"), 1200);
              })({ currentTarget: document.activeElement as HTMLButtonElement });
            } catch {}
          }}
        >
          Скопіювати посилання
        </button>

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(700px 260px at 88% 0%, rgba(57,208,255,.14), transparent 60%), radial-gradient(600px 320px at 12% -10%, rgba(255,255,255,.07), transparent 60%)",
          }}
        />
      </header>

      {/* контент */}
      <article id="article-body" className="prose prose-invert mt-6 max-w-none prose-p:text-platinum-200/90">
        {content}
      </article>

      {/* навігація */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <Link href="/blog" className="badge-chip">← До блогу</Link>
        <Link href="/performance" className="cta-button w-auto">
          Переглянути продуктивність <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
