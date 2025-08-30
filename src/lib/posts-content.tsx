import type { ReactNode } from "react";

/**
 * Повертає контент поста. Якщо передати locale="ru" — віддає російську версію,
 * інакше англійську. Якщо для якогось slug RU-блок не заданий — фолбек на EN.
 */
export function getPostContent(
  slug: string,
  locale: "en" | "ru" = "en"
): ReactNode | null {
  const isRu = locale === "ru";

  switch (slug) {
    case "risk-basics":
      if (isRu) {
        return (
          <>
            <h2 className="text-xl font-semibold mt-6">
              Почему риск важнее доходности
            </h2>
            <p className="mt-3 text-platinum-300">
              Цель — выжить на длинной дистанции. Фиксируйте риск на сделку
              (например 0.5–1.5%), ставьте стоп-лоссы, избегайте избыточного
              плеча и соблюдайте лимиты позиций.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
              <li>Риск на сделку и максимальный дневной/недельный риск</li>
              <li>
                Риск-профиль стратегии: прибыль, волатильность, частота сделок,
                просадки
              </li>
              <li>Жёсткая дисциплина вместо интуиции</li>
            </ul>
          </>
        );
      }
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">
            Why risk matters more than returns
          </h2>
          <p className="mt-3 text-platinum-300">
            The goal is to survive in the long run. Fix risk per trade (e.g.
            0.5–1.5%), set stop losses, avoid excess leverage and respect
            position limits.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>Risk per trade and max daily/weekly risk</li>
            <li>
              Strategy risk profile: profit, volatility, trade frequency,
              drawdowns
            </li>
            <li>Strict discipline instead of intuition</li>
          </ul>
        </>
      );

    case "ml-signals":
      if (isRu) {
        return (
          <>
            <h2 className="text-xl font-semibold mt-6">Архитектура сигналов</h2>
            <p className="mt-3 text-platinum-300">
              Классифицируем рыночные режимы (тренд, флэт, высокая
              волатильность) и оцениваем вероятности входа/выхода. Чтобы
              избежать переобучения, используем разбиение по времени,
              регуляризацию и walk-forward-валидацию.
            </p>
            <h3 className="mt-5 font-semibold">Ключевые особенности</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1 text-platinum-300">
              <li>Ансамбль независимых моделей</li>
              <li>Простота предпочтительнее излишней сложности</li>
              <li>Онлайн-мониторинг смещения данных (data drift)</li>
            </ul>
          </>
        );
      }
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Signal architecture</h2>
          <p className="mt-3 text-platinum-300">
            We classify market regimes (trend, flat, high volatility) and
            estimate entry/exit probabilities. To avoid overfitting, we use time
            splits, regularization and walk-forward validation.
          </p>
          <h3 className="mt-5 font-semibold">Key features</h3>
          <ul className="mt-2 list-disc pl-6 space-y-1 text-platinum-300">
            <li>Ensemble of independent models</li>
            <li>Simplicity preferred over excessive complexity</li>
            <li>Online monitoring of data drift</li>
          </ul>
        </>
      );

    case "drawdown-control":
      if (isRu) {
        return (
          <>
            <h2 className="text-xl font-semibold mt-6">Контроль просадки</h2>
            <p className="mt-3 text-platinum-300">
              Задаём Max DD на уровне стратегии и портфеля. При превышении
              система выключается, снижает размер позиции или уходит в режим
              низкого риска.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
              <li>Динамическое плечо в зависимости от волатильности рынка</li>
              <li>
                Независимые стопы по инструментам и глобальный стоп по портфелю
              </li>
              <li>Проверки инфраструктуры и лимиты со стороны биржи</li>
            </ul>
          </>
        );
      }
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Drawdown control</h2>
          <p className="mt-3 text-platinum-300">
            We set max DD at strategy and portfolio levels. If breached, the
            system deactivates, reduces position size or switches to low-risk
            mode.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>Dynamic leverage depending on market volatility</li>
            <li>
              Independent stops per instrument and a global portfolio stop
            </li>
            <li>Infrastructure health checks and exchange limits</li>
          </ul>
        </>
      );

    case "backtesting-metrics":
      if (isRu) {
        return (
          <>
            <h2 className="text-xl font-semibold mt-6">
              Ключевые метрики в первую очередь
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
              <li>
                <strong>APY</strong> — годовая доходность (в демо; в live — с
                поправкой на риск)
              </li>
              <li>
                <strong>Sharpe/Sortino</strong> — отношения доходности к риску,
                штрафуют за просадки
              </li>
              <li>
                <strong>Max DD</strong> — максимальная историческая просадка
                портфеля
              </li>
              <li>
                <strong>Win rate</strong> и матрица прибыль/убыток по сделкам
              </li>
            </ul>
            <p className="mt-3 text-platinum-300">
              Проверяйте бэктесты циклами walk-forward, избегайте подгонки и
              логируйте все гиперпараметры в артефактах экспериментов.
            </p>
          </>
        );
      }
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Metrics to watch first</h2>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>
              <strong>APY</strong> — annualized return in demo; for live,
              adjusted for risk
            </li>
            <li>
              <strong>Sharpe/Sortino</strong> — return-to-risk ratios penalizing
              drawdowns
            </li>
            <li>
              <strong>Max DD</strong> — maximum historical portfolio drawdown
            </li>
            <li>
              <strong>Win rate</strong> and profit/loss matrix by trades
            </li>
          </ul>
          <p className="mt-3 text-platinum-300">
            Validate backtests with walk-forward cycles, avoid curve fitting and
            log all hyperparameters in experiment artifacts.
          </p>
        </>
      );

    case "exchange-keys-security":
      if (isRu) {
        return (
          <>
            <h2 className="text-xl font-semibold mt-6">Принципы вначале</h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
              <li>
                API-ключи только с правами{" "}
                <code className="px-1 rounded bg-white/5">trade</code>, без
                вывода средств
              </li>
              <li>Списки разрешённых IP, лимиты запросов, ротация ключей</li>
              <li>Отдельные роли для мониторинга и для торговли</li>
              <li>Аудит-логи и алерты на все критические события</li>
            </ul>
            <p className="mt-3 text-platinum-300">
              В демо-режиме система работает в режиме только чтения/симуляции —
              это безопасно для тестирования.
            </p>
          </>
        );
      }
      return (
        <>
          <h2 className="text-xl font-semibold mt-6">Principles first</h2>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-platinum-300">
            <li>
              API keys with{" "}
              <code className="px-1 rounded bg-white/5">trade</code> rights
              only, no withdrawal rights
            </li>
            <li>IP allow list, rate limits, key rotation</li>
            <li>Separate role for monitoring and another for trading</li>
            <li>Audit logs and alerts on all critical events</li>
          </ul>
          <p className="mt-3 text-platinum-300">
            In demo mode the system runs in read-only/simulation mode which is
            safe for testing.
          </p>
        </>
      );

    default:
      return null;
  }
}
