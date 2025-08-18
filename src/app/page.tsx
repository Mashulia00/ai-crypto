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

      {/* інші секції сторінки */}
      <div className="mx-auto max-w-6xl px-4">
        {/* FEATURES */}
        <section className="space-y-8 py-10">
          <SectionReveal>
            <div className="grid gap-6 md:grid-cols-2">
              <FeatureCard
                icon={<Activity size={18} />}
                title="Дисципліна замість емоцій"
                desc="Бот діє за правилами, а не за настроєм ринку."
              />
              <FeatureCard
                icon={<Shield size={18} />}
                title="Ризик-менеджмент вбудований"
                desc="Стоп-лоси, позиційне обмеження, адаптивний леверидж."
              />
              <FeatureCard
                icon={<BarChart3 size={18} />}
                title="Дані та прозорість"
                desc="Живі графіки, лог операцій, періодичні звіти."
              />
              <FeatureCard
                icon={<Clock4 size={18} />}
                title="Працює 24/7"
                desc="Крипторинок не спить — і бот теж."
              />
            </div>
          </SectionReveal>
        </section>

        {/* KPIs */}
        <section className="py-8">
          <SectionReveal>
            <StatsKPI />
            <p className="mt-3 text-sm text-platinum-500">
              * Демонстраційні числа — не є інвестпорадою.
            </p>
          </SectionReveal>
        </section>

        {/* CTA + підписка */}
        <CTASection />
      </div>
    </>
  );
}
