// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  localePrefix: "never", // без /uk у URL
});

// ВАЖЛИВО: не чіпаємо статичні файли, _next і все з розширенням (.js, .png, .json, ...)
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
