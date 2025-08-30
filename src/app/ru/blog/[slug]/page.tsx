"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function BlogPostPage() {
  // Next 15: slug беремо через useParams
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const metaRaw = slug ? findPostMeta(slug) : null;
  const content = slug ? getPostContent(slug, "ru") : null;
  const progress = useScrollProgress();

  // Локалізуємо метадані з фолбеком
  const meta =
    metaRaw && ({
      ...metaRaw,
      title: (metaRaw as any).title_ru ?? metaRaw.title,
      excerpt: (metaRaw as any).excerpt_ru ?? (metaRaw as any).excerpt,
      tags: (metaRaw as any).tags_ru ?? metaRaw.tags,
    });

  if (!meta || !content) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="glass rounded-2xl p-6">
          <h1 className="text-2xl font-semibold">Пост не найден</h1>
          <p className="mt-2 text-platinum-300">Ссылка может быть устаревшей</p>
          <Link href="/ru/blog" className="mt-4 inline-block badge-chip">
            ← Назад в блог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
      {/* полоса прогресса чтения (липкая под хедером) */}
      <div className="sticky top-[calc(var(--header-h)+8px)] z-40 mb-4 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full"
          style={{
            width: `${progress * 100}%`,
            background:
              "linear-gradient(90deg, rgba(57,208,255,0), rgba(57,208,255,1))",
            boxShadow: "0 0 22px rgba(57,208,255,.35)",
          }}
        />
      </div>

      {/* заголовок поста */}
      <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-6">
        <div className="text-sm text-platinum-400">
          {new Date(meta.date).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
          <span className="mark-underline mark-underline--thick">
            {meta.title}
          </span>
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {meta.tags.map((t: string) => (
            <span key={t} className="badge-chip">
              #{t}
            </span>
          ))}
        </div>
        <button
          className="pressable mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              const btn = document.activeElement as HTMLButtonElement;
              if (btn) {
                btn.textContent = "Скопировано ✓";
                setTimeout(() => (btn.textContent = "Скопировать ссылку"), 1200);
              }
            } catch {}
          }}
        >
          Скопировать ссылку
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

      {/* контент поста */}
      <article
        id="article-body"
        className="prose prose-invert mt-6 max-w-none prose-p:text-platinum-200/90"
      >
        {content}
      </article>

      {/* навигация */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <Link href="/ru/blog" className="badge-chip">
          ← Назад в блог
        </Link>
        <Link href="/ru/performance" className="cta-button w-auto">
          Смотреть результаты <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
