import fs from "fs";
import path from "path";

const MAP = [
  // Навігація / CTA
  ["Як це працює", "How it works"],
  ["Продуктивність", "Performance"],
  ["Блог", "Blog"],
  ["Ціни", "Pricing"],
  ["Контакти", "Contact"],
  ["Запросити демо", "Request a demo"],
  ["Спробувати демо", "Request a demo"],
  ["Дізнатися як це працює", "Learn how it works"],

  // Pricing блок
  ["Рекомендовано", "Recommended"],
  ["Період оплати", "Billing period"],
  ["Місячно", "Monthly"],
  ["Річно (-20%)", "Yearly (-20%)"],
  ["Оплатити криптою", "Pay with crypto"],
  ["Деталі", "Details"],
  ["≈/міс", "≈/mo"],

  ["Демо-дашборд (read-only)", "Demo dashboard (read-only)"],
  ["Журнал угод (плейсхолдер)", "Trade journal (placeholder)"],
  ["Ризик-параметри за замовч.", "Default risk parameters"],
  ["Повний дашборд (демо-дані)", "Full dashboard (demo data)"],
  ["Метрики PnL / DD / WinRate", "PnL / DD / WinRate metrics"],
  ["Експорт звітів (плейсхолдер)", "Export reports (placeholder)"],
  ["API-ключі read-only", "Read-only API keys"],
  ["Кастомні метрики/репорти", "Custom metrics/reports"],
  ["Пілот із командою (опис)", "Pilot with the team (overview)"],
  ["Підтримка інтеграцій", "Integration support"],
  ["SLA та пріоритетні оновлення", "SLA & priority updates"],

  // Хедлайни/фічі з головної (з твого скріну)
  ["Дисципліна замість емоцій", "Discipline over emotions"],
  ["Бот діє за правилами, а не за настроєм ринку.", "The bot acts by rules, not market mood."],
  ["Ризик-менеджмент вбудований", "Built-in risk management"],
];

const root = path.resolve("src");

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(ts|tsx|js|jsx|mdx|md|css)$/.test(name)) replaceInFile(p);
  }
}

function replaceAll(str, from, to) {
  const safe = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return str.replace(new RegExp(safe, "g"), to);
}

function replaceInFile(file) {
  let text = fs.readFileSync(file, "utf8");
  const orig = text;
  for (const [ua, en] of MAP) {
    text = replaceAll(text, ua, en);
  }
  if (text !== orig) {
    fs.writeFileSync(file, text, "utf8");
    console.log("updated:", file);
  }
}

walk(root);
