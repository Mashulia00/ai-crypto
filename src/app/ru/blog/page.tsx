"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { postsIndex, PostMeta } from "@/lib/posts-index";

// локалізовані геттери з фолбеком на EN
const titleOf   = (p: PostMeta & any) => p.title_ru   ?? p.title;
const excerptOf = (p: PostMeta & any) => p.excerpt_ru ?? p.excerpt;
const tagsOf    = (p: PostMeta & any) => (p.tags_ru ?? p.tags) as string[];

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });

const readTime = (text: string, wpm = 220) =>
  `${Math.max(1, Math.round(text.split(/\s+/).length / wpm))} мин`;

function PostCard({ p, index }: { p: PostMeta & any; index: number }) {
  const title = titleOf(p);
  const excerpt = excerptOf(p);
  const tags = tagsOf(p);
  return (
    <Link href={`/ru/blog/${p.slug}`} className="block outline-none">
      <article
        className="relative feature-card rounded-2xl p-5 md:p-6 touch-manipulation menu-link-anim"
        style={{ animationDelay: `${index * 60}ms` }}
        onPointerDown={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--px", `${e.clientX - r.left}px`);
          el.style.setProperty("--py", `${e.clientY - r.top}px`);
          el.classList.add("pressed");
        }}
        onPointerUp={(e) => e.currentTarget.classList.remove("pressed")}
        onPointerLeave={(e) => e.currentTarget.classList.remove("pressed")}
        onPointerCancel={(e) => e.currentTarget.classList.remove("pressed")}
      >
        <div className="text-platinum-400 text-sm">{fmtDate(p.date)}</div>
        <h3 className="title mt-1 text-xl font-semibold md:text-2xl">{title}</h3>
        <p className="mt-3 text-platinum-300">{excerpt}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span key={t} className="badge-chip">#{t}</span>
          ))}
          <span className="ml-auto text-sm text-platinum-400">
            {readTime(excerpt)}
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    postsIndex.forEach((p: any) => tagsOf(p).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ru"));
  }, []);

  const filtered = useMemo(() => {
    const byTag = activeTag
      ? postsIndex.filter((p: any) => tagsOf(p).includes(activeTag))
      : postsIndex;

    const byQuery = q.trim()
      ? byTag.filter((p: any) => {
          const t = titleOf(p).toLowerCase();
          const e = excerptOf(p).toLowerCase();
          const ql = q.toLowerCase();
          return t.includes(ql) || e.includes(ql);
        })
      : byTag;

    return byQuery.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [q, activeTag]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      <SectionReveal cascade>
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-5 md:p-7">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            <span className="mark-underline mark-underline--thick">Блог</span> / Обучение
          </h1>
          <p className="mt-3 max-w-3xl text-platinum-200/90 md:text-lg">
            Короткие статьи о подходе к риску, ML и методологии — mobile first с микроанимациями
          </p>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(700px 320px at 12% -10%, rgba(255,255,255,.07), transparent 60%), radial-gradient(600px 240px at 88% 0%, rgba(57,208,255,.14), transparent 60%)",
            }}
          />
        </header>
      </SectionReveal>

      <div className="sticky top-[64px] z-10 mt-6 rounded-xl border border-white/10 bg-ink/70 p-3 backdrop-blur-xl">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск статей…"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-platinum-500 focus:border-aqua/50"
        />

        <div className="mt-3 scroller-fade">
          <div className="flex snap-x gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            <button
              onClick={() => setActiveTag(null)}
              className={`badge-chip whitespace-nowrap ${activeTag === null ? "ring-1 ring-aqua/60" : ""}`}
            >
              Все
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag((v) => (v === t ? null : t))}
                className={`badge-chip whitespace-nowrap ${activeTag === t ? "ring-1 ring-aqua/60" : ""}`}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {filtered.map((p: any, i: number) => (
          <PostCard key={p.slug} p={p} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="glass rounded-2xl p-6 text-platinum-300">Ничего не найдено</div>
        )}
      </div>
    </div>
  );
}
