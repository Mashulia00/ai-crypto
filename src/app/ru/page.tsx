// src/app/page.tsx
import { SectionReveal } from "@/components/visual/SectionReveal";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { StatsKPI } from "@/components/marketing/StatsKPI";
import { Activity, Shield, BarChart3, Clock4 } from "lucide-react";
import { CTASection } from "@/components/marketing/CTASection";
import Hero from "@/components/marketing/Hero";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Hero />

      <div className="mx-auto max-w-6xl px-4">
        {/* ОСОБЕННОСТИ */}
        <section className="space-y-8 py-10">
          <SectionReveal>
            <div className="grid gap-6 md:grid-cols-2">
              <FeatureCard
                icon={<Activity size={18} />}
                title="Дисциплина вместо эмоций"
                desc="Бот действует по правилам, а не по настроению рынка"
              />
              <FeatureCard
                icon={<Shield size={18} />}
                title="Встроенный риск-менеджмент"
                desc="Стоп-лоссы, лимиты по позициям, адаптивное плечо"
              />
              <FeatureCard
                icon={<BarChart3 size={18} />}
                title="Данные и прозрачность"
                desc="Живые графики, журналы операций, периодические отчёты"
              />
              <FeatureCard
                icon={<Clock4 size={18} />}
                title="Работает 24/7"
                desc="Крипторынок не спит, и бот тоже"
              />
            </div>
          </SectionReveal>
        </section>

        {/* KPI */}
        <section className="py-8">
          <SectionReveal>
            <StatsKPI />
            <p className="mt-3 text-sm text-platinum-500">
              * Демонстрационные цифры — не являются инвестиционной рекомендацией
            </p>
          </SectionReveal>
        </section>

        {/* ПРИЗЫВ К ДЕЙСТВИЮ */}
        <CTASection />
      </div>
    </>
  );
}
