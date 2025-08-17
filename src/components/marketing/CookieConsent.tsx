"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "cookie-consent-v1";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[95%] max-w-3xl rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-platinum-200">
          Ми використовуємо мінімальні cookie для аналітики та покращення досвіду. Деталі в політиці приватності.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              localStorage.setItem(KEY, "accepted");
              setShow(false);
            }}
            className="bg-aqua text-ink hover:opacity-90"
          >
            Погоджуюсь
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShow(false)}
            className="border border-white/10 hover:bg-white/5"
          >
            Лише необхідне
          </Button>
        </div>
      </div>
    </div>
  );
}
