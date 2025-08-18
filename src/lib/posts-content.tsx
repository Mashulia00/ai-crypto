import type { ReactNode } from "react";

export function getPostContent(slug: string): ReactNode | null {
  switch (slug) {
    case "risk-basics":
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Чому ризик важливіший за дохідність</h2>
          <p className="mt-3 text-platinum-300">
            Мета — вижити на довгій дистанції. Фіксуємо ризик на угоду (напр., 0.5–1.5%),
            встановлюємо стоп-лоси, не перевищуємо леверидж, працюємо з позиційними лімітами.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>Risk per trade та max risk на день/тиждень.</li>
            <li>Профіль ризику стратегії: волатильність прибутку, частота угод, просідання.</li>
            <li>Жорстка дисципліна замість інтуїції.</li>
          </ul>
        </>
      );

    case "ml-signals":
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Архітектура сигналів</h2>
          <p className="mt-3 text-platinum-300">
            Класифікуємо ринкові режими (тренд/флет/висока волога) та оцінюємо ймовірності
            входу/виходу. Для уникнення перенавчання — таймспліти, регуляризація, walk-forward.
          </p>
          <h3 className="mt-5 font-semibold">Особливості</h3>
          <ul className="mt-2 list-disc pl-6 space-y-1 text-platinum-300">
            <li>Сукупність незалежних моделей (енсемблінг).</li>
            <li>Перевага простоти над надмірною складністю.</li>
            <li>Онлайн-моніторинг дрейфу даних.</li>
          </ul>
        </>
      );

    case "drawdown-control":
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Обмеження просідання</h2>
          <p className="mt-3 text-platinum-300">
            Вводимо max DD на стратегію і портфель. При перевищенні — деактивація,
            зменшення розміру позицій або перехід у low-risk режим.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>Динамічний леверидж залежно від волатильності ринку.</li>
            <li>Незалежні стопи по інструментах і глобальний стоп портфеля.</li>
            <li>Health-чеки інфраструктури та ліміти бірж.</li>
          </ul>
        </>
      );

    case "backtesting-metrics":
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Що дивитися в першу чергу</h2>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>
              <strong>APY</strong> — агрегована дохідність за рік у демо; для реала — коригуємо на ризики.
            </li>
            <li>
              <strong>Sharpe/Sortino</strong> — співвідношення прибутку до ризику (з штрафом за просідання).
            </li>
            <li>
              <strong>Max DD</strong> — максимальне історичне просідання портфеля.
            </li>
            <li>
              <strong>Win rate</strong> та матриця прибуток/збиток за угодами.
            </li>
          </ul>
          <p className="mt-3 text-platinum-300">
            Валідовуємо бектест walk-forward-циклом, уникаємо «підгонки» та фіксуємо усі
            гіперпараметри в артефактах експериментів.
          </p>
        </>
      );

    case "exchange-keys-security":
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Principles first</h2>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>API-ключі лише з правами <code className="px-1 rounded bg-white/5">trade</code>, без прав на вивід.</li>
            <li>IP allow-list, ліміти швидкості, ротація ключів.</li>
            <li>Окрема роль для моніторингу та окрема — для трейдингу.</li>
            <li>Журнали аудиту та алерти на всі критичні події.</li>
          </ul>
          <p className="mt-3 text-platinum-300">
            У демо-версії система працює лише в режимі читання/симуляції — це безпечно для тесту.
          </p>
        </>
      );

    default:
      return null;
  }
}
