
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
        setMsg("Thank you We will contact you shortly");
        form.reset();
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("error");
        setMsg(j?.errors ? "Check the form fields" : "An error occurred Please try again");
      }
    } catch {
      setStatus("error");
      setMsg("A network error occurred");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="block text-sm mb-1">Your name</label>
        <input name="name" className="w-full rounded-xl bg-transparent border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input name="email" type="email" required className="w-full rounded-xl bg-transparent border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Comment</label>
        <textarea name="message" rows={4} className="w-full rounded-xl bg-transparent border px-3 py-2" />
      </div>
      <div className="pt-2 flex items-center gap-3">
        <Button className="bg-aqua text-ink hover:opacity-90">Submit</Button>
        {status !== "idle" && (
          <span className={status === "ok" ? "text-green-400" : "text-red-400"}>{msg}</span>
        )}
      </div>
      <p className="mt-2 text-xs text-platinum-400">
        By submitting the form you agree to the terms and privacy policy
      </p>
    </form>
  );
}

