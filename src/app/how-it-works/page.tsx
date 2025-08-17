import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RiskBanner } from "@/components/marketing/RiskBanner";
import { SectionReveal } from "@/components/visual/SectionReveal";

export const metadata: Metadata = {
  title: "Як це працює — AI Crypto Bot",
  description:
    "Кроки роботи демо-бота: дані, сигнали ШІ, менеджмент угод, моніторинг і безпека.",
};

const steps = [
  {
    t: "Збір даних",
    d: "Ціни/обʼєми, деривативні метрики, режим ринку. Дані нормалізуються та фільтруються.",
  },
  {
    t: "Сигнали ШІ",
    d: "Класифікація режимів (тренд/флет/висока вола), імовірнісні сигнали входу/виходу.",
  },
  {
    t: "Менеджмент угод",
    d: "Розмір позиції, стоп-лос, тейк-профіт, ризик на угоду. Обмеження за портфелем.",
  },
  {
    t: "Моніторинг 24/7",
    d: "Логи дій, алерти, перегляд історії у дашборді. Прозора аналітика.",
  },
  {
    t: "Безпека",
    d: "У демо — лише читання. Для реального продукту — ключі з правами «trade», без виводу коштів.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionReveal>
        <h1 className="text-3xl font-semibold">Як це працює</h1>
        <p className="mt-2 text-platinum-300">
          Коротко про конвеєр: від сирих ринкових даних — до рішень і контролю ризиків.
        </p>
      </SectionReveal>

      <SectionReveal cascade>
        <div className="mt-8 space-y-6">
          {steps.map((s, i) => (
            <Card key={s.t} className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-aqua/15 text-aqua font-semibold">
                  <span className="motion-safe:animate-[bounce_.6s_ease-out_1]">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-platinum-200">{s.d}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <div className="mt-10">
          <Separator />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.12}>
        <div className="mt-10">
          <RiskBanner />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.16} cascade>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
          <Link
            href="/performance"
            className="rounded-2xl border border-white/10 px-5 py-3 hover:bg-white/5"
          >
            Переглянути продуктивність (демо)
          </Link>
          {/* Якщо потрібен другий CTA — просто розкоментуй:
          <Link
            href="/dashboard"
            className="rounded-2xl bg-aqua px-5 py-3 text-ink hover:opacity-90"
          >
            Відкрити демо-дашборд
          </Link>
          */}
        </div>
      </SectionReveal>
    </div>
  );
}
