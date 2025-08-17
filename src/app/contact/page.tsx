import { DemoForm } from "@/components/marketing/DemoForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Запит демо / Контакти</h1>
      <p className="mt-3 text-platinum-300">
        Залиште контакти — надішлемо демо-тур і відповімо на запитання.
      </p>
      <DemoForm />
    </div>
  );
}
