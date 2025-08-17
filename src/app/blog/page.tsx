import type { Metadata } from "next";
import { posts } from "@/content/posts";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Блог — AI Crypto Bot",
  description: "Освітні матеріали про стратегії, ризики й методологію (демо).",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Блог / Освіта</h1>
      <p className="mt-2 text-platinum-300">
        Короткі статті про підхід до ризиків, використання ML та методологію.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.slug} className="glass rounded-2xl p-6 hover:bg-white/5">
            <a href={`/blog/${p.slug}`} className="block">
              <div className="text-sm text-platinum-400">{new Date(p.date).toLocaleDateString("uk-UA")}</div>
              <h2 className="mt-1 text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-platinum-200">{p.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-platinum-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
