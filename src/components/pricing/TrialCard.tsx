"use client";

import { useState } from "react";

export default function TrialCard() {
  const [status, setStatus] =
    useState<"idle" | "loading" | "ok" | "error">("idle");

  async function startTrial() {
    try {
      setStatus("loading");
      const res = await fetch("/api/trial", { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-900/30 p-6 sm:p-8 text-slate-200 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-cyan-300 font-medium">Free trial</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">
              3 days of full access
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Everything in Pro for 72 hours. No credit card required.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <button
              onClick={startTrial}
              disabled={status === "loading" || status === "ok"}
              className="rounded-xl px-5 py-3 text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "ok"
                ? "Activated"
                : status === "loading"
                ? "Activating…"
                : "Start free trial"}
            </button>
            <span className="text-xs text-slate-500">
              Access turns off automatically after 3 days.
            </span>
          </div>
        </div>

        {status === "ok" && (
          <div className="mt-4 text-sm text-emerald-400">
            Done! Trial activated. Reload the page if features don’t appear.
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 text-sm text-rose-400">
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </section>
  );
}
