'use client';

import Link from 'next/link';
import Tr from '@/components/Tr';
import { useLocale, withLocale } from '@/lib/locale';

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="text-sm text-white/60">
            <Tr
              en="Demo website This is not investment advice"
              ru="Демонстрационный сайт. Это не инвестиционная рекомендация"
            />
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">
            <Tr en="Product" ru="Продукт" />
          </h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href={withLocale('/how-it-works', locale)}>
                <Tr en="How it works" ru="Как это работает" />
              </Link>
            </li>
            <li>
              <Link href={withLocale('/performance', locale)}>
                <Tr en="Performance" ru="Результаты" />
              </Link>
            </li>
            <li>
              <Link href={withLocale('/pricing', locale)}>
                <Tr en="Pricing" ru="Цены" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">
            <Tr en="Company" ru="Компания" />
          </h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href={withLocale('/blog', locale)}>
                <Tr en="Blog" ru="Блог" />
              </Link>
            </li>
            <li>
              <Link href={withLocale('/contact', locale)}>
                <Tr en="Contact" ru="Контакты" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">
            <Tr en="Legal" ru="Правовые документы" />
          </h4>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href={withLocale('/legal/risk', locale)}>
                <Tr en="Risks" ru="Риски" />
              </Link>
            </li>
            <li>
              <Link href={withLocale('/legal/terms', locale)}>
                <Tr en="Terms" ru="Условия" />
              </Link>
            </li>
            <li>
              <Link href={withLocale('/legal/privacy', locale)}>
                <Tr en="Privacy" ru="Конфиденциальность" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/50">
        © 2025 AI Crypto Bot. <Tr en="All rights reserved" ru="Все права защищены" />
      </div>
    </footer>
  );
}

export default Footer;
