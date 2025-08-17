// src/i18n/request.ts
import {getRequestConfig} from "next-intl/server";

const SUPPORTED = ["uk", "en"] as const;
type Locale = (typeof SUPPORTED)[number];

function normalizeLocale(l?: string): Locale {
  return SUPPORTED.includes(l as Locale) ? (l as Locale) : "uk";
}

export default getRequestConfig(async ({locale}) => {
  const safe: Locale = normalizeLocale(locale);
  const messages = (await import(`./messages/${safe}.json`)).default;

  return {
    locale: safe,                // завжди 'uk' або 'en' (не undefined)
    messages,
    timeZone: "Europe/Kyiv"
  };
});
