"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/visual/SectionReveal";

export function CTASection() {
  return (
    <section className="py-10 md:py-14">
      <SectionReveal>
        {/* Уся панель клікабельна */}
        <Link
          href="/pricing"
          className="group cta-cyber block rounded-3xl p-6 sm:p-8 md:p-10 focus:outline-none"
          aria-label="Перейти до планів і цін"
        >
          {/* контент */}
          <div className="max-w-3xl">
            <span className="badge-chip">Демо-доступ • Плани</span>

            <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl md:text-4xl">
              Отримайте демо-доступ і короткий огляд стратегії та ризиків
            </h2>

            <p className="mt-3 text-platinum-300">
              Прозорі плани. Ніякого спаму. Можна скасувати будь-коли.
            </p>

            <ul className="mt-4 space-y-2 text-platinum-300/90">
              <li className="flex items-center gap-2">
                <span className="bullet-dot" /> Публічні метрики та історія перформансу
              </li>
              <li className="flex items-center gap-2">
                <span className="bullet-dot" /> Ризик-менеджмент і прозора методологія
              </li>
              <li className="flex items-center gap-2">
                <span className="bullet-dot" /> Справедливі ціни без прихованих платежів
              </li>
            </ul>
          </div>

          {/* кнопка: моб—повна ширина, десктоп—справа */}
          <div className="mt-6 sm:mt-8">
            <span className="cta-button">
              До планів і цін
              <svg
                className="arrow"
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </Link>
      </SectionReveal>
    </section>
  );
}
