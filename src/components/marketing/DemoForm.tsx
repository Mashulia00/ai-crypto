"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DemoForm() {
  const [status, setStatus] = useState<"idle"|"ok"|"error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("ok");
        setMsg("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
        form.reset();
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("error");
        setMsg(j?.errors ? "Перевірте поля форми." : "Сталася помилка. Спробуйте ще раз.");
      }
    } catch {
      setStatus("error");
      setMsg("Сталася помилка мережі.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="block text-sm mb-1">Ваше ім’я</label>
        <input name="name" className="w-full rounded-xl bg-transparent border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input name="email" type="email" required className="w-full rounded-xl bg-transparent border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Коментар</label>
        <textarea name="message" rows={4} className="w-full rounded-xl bg-transparent border px-3 py-2" />
      </div>
      <div className="pt-2 flex items-center gap-3">
        <Button className="bg-aqua text-ink hover:opacity-90">Надіслати</Button>
        {status !== "idle" && (
          <span className={status === "ok" ? "text-green-400" : "text-red-400"}>{msg}</span>
        )}
      </div>
      <p className="mt-2 text-xs text-platinum-400">
        Надсилаючи форму, ви погоджуєтесь з умовами і політикою приватності.
      </p>
    </form>
  );
}
