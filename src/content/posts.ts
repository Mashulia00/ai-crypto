export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  tags: string[];
};

export const posts: PostMeta[] = [
  {
    slug: "risk-management-basics",
    title: "Ризик-менеджмент: базові принципи",
    excerpt:
      "Що таке ризик на угоду, стоп-лос, просідання портфеля й чому дисципліна важливіша за емоції.",
    date: "2025-08-10",
    tags: ["risk", "strategy"],
  },
  {
    slug: "ml-signals-overview",
    title: "Сигнали ML для крипторинку: огляд",
    excerpt:
      "Класифікація ринкових режимів, імовірності входу/виходу та як ми уникаємо перенавчання.",
    date: "2025-08-12",
    tags: ["ml", "signals"],
  },
];
