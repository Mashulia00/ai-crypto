export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;        // ISO або будь-який формат, який розуміє new Date()
  tags: string[];
};

export const postsIndex: PostMeta[] = [
  {
    slug: "risk-basics",
    title: "Ризик-менеджмент: базові принципи",
    excerpt:
      "Що таке ризик на угоду, стоп-лос, просідання портфеля й чому дисципліна важливіша за емоції.",
    date: "2025-08-10",
    tags: ["risk", "strategy"],
  },
  {
    slug: "ml-signals",
    title: "Сигнали ML для крипторинку: огляд",
    excerpt:
      "Класифікація ринкових режимів, імовірності входу/виходу та як ми уникаємо перенавчання.",
    date: "2025-08-12",
    tags: ["ml", "signals"],
  },
  {
    slug: "drawdown-control",
    title: "Контроль просідання портфеля",
    excerpt:
      "Як обмеження ризику на портфель і адаптивний леверидж зменшують глибину просідання.",
    date: "2025-08-14",
    tags: ["risk", "portfolio"],
  },
  {
    slug: "backtesting-metrics",
    title: "Бектестинг і ключові метрики",
    excerpt:
      "APY, Sharpe/Sortino, Max DD, win rate, профіль ризику. Як читати метрики без самообману.",
    date: "2025-08-16",
    tags: ["metrics", "testing"],
  },
  {
    slug: "exchange-keys-security",
    title: "Ключі бірж та безпека",
    excerpt:
      "Trade-only ключі, ліміти, списки дозволених IP, та операційні процеси безпеки.",
    date: "2025-08-18",
    tags: ["security", "ops"],
  },
];

export const findPostMeta = (slug: string) =>
  postsIndex.find((p) => p.slug === slug) || null;
