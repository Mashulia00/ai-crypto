import type { Metadata } from "next";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Prose } from "@/components/visual/Prose";

export const metadata: Metadata = {
  title: "FAQ — AI Crypto Bot",
  description: "Відповіді на часті запитання про демо-бота та методологію.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Чи безпечно підключати біржові ключі?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "У цьому демо ключі не використовуються. Для реального продукту — лише ключі з правами trade (без виведення), і ви можете відкликати їх у будь-який момент."
      }
    },
    {
      "@type": "Question",
      "name": "Чи гарантує бот прибуток?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Ні. Це інструмент для дисципліни та автоматизації. Крипторинок ризиковий, а минулі результати не гарантують майбутніх."
      }
    },
    {
      "@type": "Question",
      "name": "Звідки беруться дані для графіків?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "На сайті використано демо-дані/бек-тести. У розділі «Продуктивність» наведена методологія з урахуванням комісій і умовного проскальзування."
      }
    },
    {
      "@type": "Question",
      "name": "Чи потрібен постійний моніторинг?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Ні. Бот працює 24/7; ми надаємо алерти, журнали дій і дашборд для контролю."
      }
    }
  ]
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Prose className="mb-6">
        <h1 className="!mb-2">FAQ</h1>
        <p className="text-platinum-300">Короткі відповіді на часті запитання.</p>
      </Prose>

      <Accordion type="single" collapsible className="mt-2">
        <AccordionItem value="a1">
          <AccordionTrigger>Чи безпечно підключати біржові ключі?</AccordionTrigger>
          <AccordionContent>
            У цьому демо ключі не використовуються. Для реального продукту — лише ключі з правами
            <em> trade (без виведення)</em>, і ви можете відкликати їх у будь-який момент.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="a2">
          <AccordionTrigger>Чи гарантує бот прибуток?</AccordionTrigger>
          <AccordionContent>
            Ні. Це інструмент для дисципліни та автоматизації. Крипторинок ризиковий, а минулі
            результати не гарантують майбутніх.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="a3">
          <AccordionTrigger>Звідки беруться дані для графіків?</AccordionTrigger>
          <AccordionContent>
            На сайті використано демо-дані/бек-тести. У розділі «Продуктивність» наведена
            методологія з урахуванням комісій і умовного проскальзування.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="a4">
          <AccordionTrigger>Чи потрібен постійний моніторинг?</AccordionTrigger>
          <AccordionContent>
            Ні. Бот працює 24/7; ми надаємо алерти, журнали дій і дашборд для контролю.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
