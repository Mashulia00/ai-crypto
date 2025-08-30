// src/lib/posts-index.ts

export type Locale = "en" | "ru";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;       // ISO або будь-що, що парситься new Date()
  tags: string[];

  // ⬇️ опціональні RU-поля для локалізації (фолбек на EN, якщо не задані)
  title_ru?: string;
  excerpt_ru?: string;
  tags_ru?: string[];
};

export const postsIndex: PostMeta[] = [
  {
    slug: "risk-basics",
    title: "Risk management basics",
    excerpt:
      "What risk per trade means stop loss portfolio drawdown and why discipline matters more than emotions",
    date: "2025-08-10",
    tags: ["risk", "strategy"],
    // RU
    title_ru: "Основы управления рисками",
    excerpt_ru:
      "Что означает риск на сделку, стоп-лосс, просадка портфеля и почему дисциплина важнее эмоций",
    tags_ru: ["риски", "стратегия"],
  },
  {
    slug: "ml-signals",
    title: "ML signals for crypto market overview",
    excerpt:
      "Classification of market regimes entryexit probabilities and how we avoid overfitting",
    date: "2025-08-12",
    tags: ["ml", "signals"],
    // RU
    title_ru: "ML-сигналы и обзор рынка криптовалют",
    excerpt_ru:
      "Классификация рыночных режимов, вероятности входа/выхода и как мы избегаем переобучения",
    tags_ru: ["ml", "сигналы"],
  },
  {
    slug: "drawdown-control",
    title: "Portfolio drawdown control",
    excerpt:
      "How portfolio level risk limits and adaptive leverage reduce drawdown depth",
    date: "2025-08-14",
    tags: ["risk", "portfolio"],
    // RU
    title_ru: "Контроль просадки портфеля",
    excerpt_ru:
      "Как лимиты риска на уровне портфеля и адаптивное плечо уменьшают глубину просадки",
    tags_ru: ["риски", "портфель"],
  },
  {
    slug: "backtesting-metrics",
    title: "Backtesting and key metrics",
    excerpt:
      "APY SharpeSortino Max DD win rate risk profile How to read metrics without self deception",
    date: "2025-08-16",
    tags: ["metrics", "testing"],
    // RU
    title_ru: "Бэктест и ключевые метрики",
    excerpt_ru:
      "APY, Sharpe/Sortino, Max DD, win rate, риск-профиль. Как читать метрики без самообмана",
    tags_ru: ["метрики", "тестирование"],
  },
  {
    slug: "exchange-keys-security",
    title: "Exchange keys and security",
    excerpt:
      "Trade only keys limits IP allow lists and operational security processes",
    date: "2025-08-18",
    tags: ["security", "ops"],
    // RU
    title_ru: "Ключи биржи и безопасность",
    excerpt_ru:
      "Только торговые ключи, лимиты, списки разрешённых IP и операционная безопасность",
    tags_ru: ["безопасность", "ops"],
  },
];

// ───────────────────────────────────────────────────────────────────────────────
// Back-compat: твій існуючий код може і далі імпортувати findPostMeta / postsIndex
export const findPostMeta = (slug: string): PostMeta | null =>
  postsIndex.find((p) => p.slug === slug) ?? null;

// Маппер RU-локалізації з фолбеком на EN
function toRu(p: PostMeta): PostMeta {
  return {
    ...p,
    title: p.title_ru ?? p.title,
    excerpt: p.excerpt_ru ?? p.excerpt,
    tags: p.tags_ru ?? p.tags,
  };
}

// Зручні локалізовані геттери (можеш використовувати у списках/деталках)
export function getPostsIndex(locale: Locale = "en"): PostMeta[] {
  return locale === "ru" ? postsIndex.map(toRu) : postsIndex;
}

export function findPostMetaLocalized(
  slug: string,
  locale: Locale = "en",
): PostMeta | null {
  const p = findPostMeta(slug);
  if (!p) return null;
  return locale === "ru" ? toRu(p) : p;
}
