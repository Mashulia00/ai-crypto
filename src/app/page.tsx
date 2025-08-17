import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { TextReveal } from "@/components/visual/TextReveal";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { StatsKPI } from "@/components/marketing/StatsKPI";
import { Activity, Shield, BarChart3, Clock4 } from "lucide-react";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(57,208,255,0.16),rgba(57,208,255,0)_60%),radial-gradient(60%_50%_at_80%_20%,rgba(255,255,255,0.06),rgba(255,255,255,0)_60%)]" />
        <SectionReveal>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            <TextReveal
              by="word"
              text="ШІ-бот, що- торгує 24/7. Прозоро. З ризик-менеджментом."
            />
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <p className="mt-4 max-w-3xl text-lg text-platinum-200/90 md:text-xl">
            Алгоритмічні стратегії з машинним навчанням допомагають автоматизувати
            рутинні рішення та дисципліновано працювати з ризиком.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2} cascade>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button className="bg-aqua text-ink hover:opacity-90">
                Спробувати демо
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" className="glass border-white/10">
                Дізнатися як це працює
              </Button>
            </Link>
          </div>
        </SectionReveal>
      </section>

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
  );
}
