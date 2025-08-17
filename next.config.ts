// next.config.ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Формуємо CSP без переносів рядків
const directives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": ["'self'", ...(isDev ? ["'unsafe-eval'"] : []), "'unsafe-inline'", "https://plausible.io"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:"],
  "font-src": ["'self'"],
  "connect-src": ["'self'", "https://plausible.io", ...(isDev ? ["ws://localhost:*", "http://localhost:*"] : [])],
  "frame-src": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
};
const csp = Object.entries(directives)
  .map(([k, v]) => `${k} ${v.join(" ")}`)
  .join("; ");

const nextConfig: NextConfig = {
   eslint: { ignoreDuringBuilds: true },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
