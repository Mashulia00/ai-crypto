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
        {/* FEATURES */}
        <section className="space-y-8 py-10">
          <SectionReveal>
            <div className="grid gap-6 md:grid-cols-2">
              <FeatureCard
                icon={<Activity size={18} />}
                title="Discipline instead of emotions"
                desc="The bot acts according to rules not market mood"
              />
              <FeatureCard
                icon={<Shield size={18} />}
                title="Built in risk management"
                desc="Stop losses position limits adaptive leverage"
              />
              <FeatureCard
                icon={<BarChart3 size={18} />}
                title="Data and transparency"
                desc="Live charts operation logs periodic reports"
              />
              <FeatureCard
                icon={<Clock4 size={18} />}
                title="Works 24/7"
                desc="The crypto market never sleeps and neither does the bot"
              />
            </div>
          </SectionReveal>
        </section>

        {/* KPIs */}
        <section className="py-8">
          <SectionReveal>
            <StatsKPI />
            <p className="mt-3 text-sm text-platinum-500">
              * Demo numbers — not investment advice
            </p>
          </SectionReveal>
        </section>

        {/* CALL TO ACTION */}
        <CTASection />
      </div>
    </>
  );
}
