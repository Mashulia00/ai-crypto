"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({ email: z.string().email() });

type Props = { className?: string; compact?: boolean };

export function NewsletterForm({ className, compact }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      setMsg("Введіть коректний email");
      return;
    }
    setStatus("loading");
    setMsg("");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setStatus("error");
        setMsg(j?.message ?? "Сталася помилка, спробуйте ще.");
        return;
      }
      setStatus("ok");
      setMsg("Готово! Перевірте скриньку 🙂");
      (window as any).plausible?.("newsletter_subscribe", {
        props: { email },
      });
      setEmail("");
    } catch {
      setStatus("error");
      setMsg("Мережева помилка, спробуйте ще.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex w-full gap-2", className)}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={cn(
          "min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3",
          "text-white placeholder:text-platinum-500",
          "focus:outline-none focus:ring-2 focus:ring-aqua/40"
        )}
      />
      <Button
        type="submit"
        className="bg-aqua text-ink hover:opacity-90"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Відправляю…" : "Підписатися"}
      </Button>

      {status !== "idle" && (
        <span
          className={cn(
            "self-center text-sm",
            status === "ok" ? "text-platinum-300" : "text-red-400"
          )}
        >
          {msg}
        </span>
      )}
    </form>
  );
}
