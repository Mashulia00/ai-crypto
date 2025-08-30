export type Locale = 'en' | 'ru';

// Тип метаданих поста з опціональними RU-полями
export type LocalizablePost = {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  date?: string;
  // опціональні переклади (з фронтматтера)
  title_ru?: string;
  summary_ru?: string;
  tags_ru?: string[];
  // будь-які інші поля залишаємо як є
  [key: string]: any;
};

export function localizePost<T extends LocalizablePost>(p: T, locale: Locale): T {
  if (locale !== 'ru') return p;
  return {
    ...p,
    title: p.title_ru ?? p.title,
    summary: p.summary_ru ?? p.summary,
    tags: (p.tags_ru ?? p.tags) as any,
  };
}

export function localizePosts<T extends LocalizablePost>(posts: T[], locale: Locale): T[] {
  return posts.map((p) => localizePost(p, locale));
}
