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
    title: "Risk management basics",
    excerpt:
      "What risk per trade means stop loss portfolio drawdown and why discipline matters more than emotions",
    date: "2025-08-10",
    tags: ["risk", "strategy"],
  },
  {
    slug: "ml-signals-overview",
    title: "ML signals for crypto market overview",
    excerpt:
      "Classification of market regimes entry exit probabilities and how we avoid overfitting",
    date: "2025-08-12",
    tags: ["ml", "signals"],
  },
];
