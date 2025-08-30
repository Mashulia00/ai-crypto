"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { SectionReveal } from "@/components/visual/SectionReveal";

export function CTASection() {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first === "ru" ? "ru" : "en";
  }, [pathname]);

  // Тексти RU/EN
  const badge = locale === "ru" ? "Демо доступ • Планы" : "Demo access • Plans";
  const title =
    locale === "ru"
      ? "Получите демо-доступ и краткий обзор стратегии и рисков"
      : "Get demo access and a short overview of the strategy and risks";
  const lead =
    locale === "ru"
      ? "Прозрачные тарифы, без спама, отмена в любой момент."
      : "Transparent plans • no spam • cancel anytime.";
  const bullets =
    locale === "ru"
      ? [
          "Публичные метрики и история доходности",
          "Управление рисками и прозрачная методология",
          "Честные цены без скрытых комиссий",
        ]
      : [
          "Public metrics and performance history",
          "Risk management and transparent methodology",
          "Fair prices with no hidden fees",
        ];
  const cta = locale === "ru" ? "К тарифам и ценам" : "To plans and pricing";
  const ariaLabel =
    locale === "ru" ? "Перейти к тарифам и ценам" : "Go to plans and pricing";

  // Хелпер для локалізованого лінка
  const hrefPricing = `/${locale}/pricing`;

  return (
    <section className="py-10 md:py-14">
      <SectionReveal>
        <Link
          href={hrefPricing}
          className="group cta-cyber block rounded-3xl p-6 sm:p-8 md:p-10 focus:outline-none"
          aria-label={ariaLabel}
        >
          {/* контент */}
          <div className="max-w-3xl">
            <span className="badge-chip">{badge}</span>

            <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl md:text-4xl">
              {title}
            </h2>

            <p className="mt-3 text-platinum-300">{lead}</p>

            <ul className="mt-4 space-y-2 text-platinum-300/90">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="bullet-dot" /> {b}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-6 sm:mt-8">
            <span className="cta-button">
              {cta}
              <svg
                className="arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </Link>
      </SectionReveal>
    </section>
  );
}

export default CTASection;
