"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { ArrowRight, Check, Loader2, Mail, MessageSquareText, User } from "lucide-react";

function useRipple() {
  return {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", `${e.clientX - r.left}px`);
      el.style.setProperty("--py", `${e.clientY - r.top}px`);
      el.classList.add("pressed");
    },
    onPointerUp: (e: any) => e.currentTarget.classList.remove("pressed"),
    onPointerLeave: (e: any) => e.currentTarget.classList.remove("pressed"),
    onPointerCancel: (e: any) => e.currentTarget.classList.remove("pressed"),
  };
}

const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s);

const ALL_TOPICS = [
  "I want demo",
  "Pricing questions",
  "Integrations / API",
  "Access issue",
  "Feedback / idea",
  "Partnership",
  "Security",
  "Compliance",
  "Other",
];

export default function ContactPage() {
  const rip = useRipple();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [customType, setCustomType] = useState("");

  const [errors, setErrors] = useState<{ name?: string; email?: string; msg?: string; type?: string }>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const left = useMemo(() => Math.max(0, 800 - msg.length), [msg]);
  const hasOther = topics.includes("Other");

  function toggleTopic(t: string) {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function validate() {
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = "Enter a name (min 2 characters)";
    if (!isEmail(email)) e.email = "Invalid email";
    if (msg.trim().length < 10) e.msg = "Please describe your request (min 10 characters)";
    if (topics.length === 0 && !customType.trim()) e.type = "Choose a type or enter your own";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: msg.trim(),
          topics,
          customType: customType.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-12">
      <SectionReveal>
        <header className="cta-cyber rounded-2xl p-5 md:p-7">
          <span className="badge-chip">Requests / Support</span>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Request demo <span className="mark-underline mark-underline--thick">/ Contact</span>
          </h1>
          <p className="mt-2 max-w-2xl text-platinum-200/90">
            Leave your contacts — we will send a demo tour and answer your questions All built mobile first
          </p>
        </header>
      </SectionReveal>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="badge-chip">support@aicryptobot.dev</span>
        <span className="badge-chip">Telegram (request by email)</span>
        <span className="badge-chip">UTC 09:00–18:00</span>
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5" noValidate>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3 text-sm">
            <span className={`badge-chip ${!sent && !sending ? "" : "opacity-60"}`}>1. Draft</span>
            <span className={`badge-chip ${sending ? "" : "opacity-60"}`}>2. Checking</span>
            <span className={`badge-chip ${sent ? "" : "opacity-60"}`}>3. Sent</span>
          </div>
        </div>

        <div className="feature-card rounded-2xl p-4" data-shown="true" {...rip}>
          <label className="text-sm text-platinum-300">Request type</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ALL_TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => toggleTopic(t)}
                className={`badge-chip transition ${topics.includes(t) ? "ring-1 ring-aqua/60" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>

          {hasOther && (
            <div className="mt-3">
              <label className="mb-2 block text-sm text-platinum-400">Custom option</label>
              <input
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-platinum-500 focus:border-aqua/50"
                placeholder="Describe your request type…"
              />
            </div>
          )}

          {errors.type && <p className="mt-2 text-sm text-red-400">{errors.type}</p>}
        </div>

        <div className="feature-card rounded-2xl p-4" data-shown="true" {...rip}>
          <label className="flex items-center gap-2 text-sm text-platinum-300">
            <User className="h-4 w-4" /> Your name
          </label>
          <div className="mt-2 group relative">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name Surname"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-platinum-500 focus:border-aqua/50 focus:shadow-[0_0_0_1px_rgba(57,208,255,.35),0_12px_34px_rgba(57,208,255,.20)]"
            />
          </div>
          {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div className="feature-card rounded-2xl p-4" data-shown="true" {...rip}>
          <label className="flex items-center gap-2 text-sm text-platinum-300">
            <Mail className="h-4 w-4" /> Email
          </label>
          <div className="mt-2 group relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-platinum-500 focus:border-aqua/50 focus:shadow-[0_0_0_1px_rgba(57,208,255,.35),0_12px_34px_rgba(57,208,255,.20)]"
            />
          </div>
          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div className="feature-card rounded-2xl p-4" data-shown="true" {...rip}>
          <label className="flex items-center gap-2 text-sm text-platinum-300">
            <MessageSquareText className="h-4 w-4" /> Comment
          </label>
          <div className="mt-2 group relative">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value.slice(0, 800))}
              rows={6}
              placeholder="Briefly describe your request or what you want to see in the demo…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-platinum-500 focus:border-aqua/50 focus:shadow-[0_0_0_1px_rgba(57,208,255,.35),0_12px_34px_rgba(57,208,255,.20)]"
            />
            <div className="absolute bottom-2 right-3 text-xs text-platinum-400">{left} characters</div>
          </div>
          {errors.msg && <p className="mt-2 text-sm text-red-400">{errors.msg}</p>}
        </div>

        {/* FIXED BUTTON ROW (only visuals changed) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            disabled={sending || sent}
            {...rip}
            className="
              rounded-full px-5 py-2.5 min-w-[10rem]
              bg-aqua text-ink font-semibold
              shadow-[0_10px_28px_rgba(57,208,255,0.35)]
              hover:shadow-[0_14px_32px_rgba(57,208,255,0.45)]
              transition-all duration-200 active:scale-[.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua/70
            "
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2">Sending…</span>
              </>
            ) : sent ? (
              <>
                <Check className="h-4 w-4" />
                <span className="ml-2">Sent</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {!sent ? (
            <p className="text-sm text-platinum-400 leading-snug">
              By clicking the button you agree to the terms and privacy policy
            </p>
          ) : (
            <p className="text-sm text-aqua leading-snug" aria-live="polite">
              Thank you We will contact you at {email} during the working day
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
