// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  localePrefix: "never", // без /uk у URL
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
