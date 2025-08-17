import { SectionReveal } from "@/components/visual/SectionReveal";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";

export function CTASection() {
  return (
    <section className="relative my-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(57,208,255,0.15),rgba(57,208,255,0)_60%)]" />
      <SectionReveal>
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          Отримайте демо-доступ і короткий огляд стратегії та ризиків
        </h2>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <p className="mt-2 max-w-2xl text-platinum-300">
          Без спаму. Тільки корисні апдейти та посилання на демо-тур.
        </p>
      </SectionReveal>
      <SectionReveal delay={0.18}>
        <div className="mt-6 max-w-xl">
          <NewsletterForm />
        </div>
      </SectionReveal>
    </section>
  );
}
