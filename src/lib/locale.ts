'use client';

import { usePathname } from 'next/navigation';

export type Locale = 'en' | 'ru';

export function useLocale(): Locale {
  const pathname = usePathname() || '/';
  const first = pathname.split('/').filter(Boolean)[0];
  return first === 'ru' ? 'ru' : 'en';
}

export function withLocale(href: string, locale: Locale) {
  return href.startsWith('/') ? `/${locale}${href}` : href;
}
