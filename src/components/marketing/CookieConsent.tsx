"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const KEY = "cookie-consent-v1";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const pathname = usePathname() || "/";

  // визначаємо локаль з першого сегмента URL
  const locale = useMemo(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first === "ru" ? "ru" : "en";
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  const text =
    locale === "ru"
      ? "Мы используем минимальные cookies для аналитики и улучшения работы сайта. Подробнее — в политике конфиденциальности."
      : "We use minimal cookies for analytics and to improve the experience. Details are in the privacy policy.";
  const agree = locale === "ru" ? "Согласен" : "I agree";
  const onlyNecessary = locale === "ru" ? "Только необходимые" : "Only necessary";

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[95%] max-w-3xl rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-platinum-200">{text}</p>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              localStorage.setItem(KEY, "accepted");
              setShow(false);
            }}
            className="bg-aqua text-ink hover:opacity-90"
          >
            {agree}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShow(false)}
            className="border border-white/10 hover:bg-white/5"
          >
            {onlyNecessary}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
