'use client';

import { ReactNode } from 'react';
import { useLocale } from '@/lib/locale';

export default function Tr({ en, ru }: { en: ReactNode; ru: ReactNode }) {
  const locale = useLocale();
  return <>{locale === 'ru' ? ru : en}</>;
}
