"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/how-it-works", label: "Як це працює" },
  { href: "/performance", label: "Продуктивність" },
  { href: "/blog", label: "Блог" },
  { href: "/pricing", label: "Ціни" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Контакти" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* brand */}
        <Link href="/" className="group flex items-center gap-2">
          {/* ЗАМІНА кружка на лого */}
          <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10">
            <Image
              src="/brand/logo-mark.png"
              alt="AI Crypto Bot"
              width={28}
              height={28}
              priority
            />
          </span>
          <span className="font-semibold">AI Crypto Bot</span>
        </Link>

        {/* desktop */}
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-platinum-300 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contact">
            <Button variant="default" className="bg-aqua text-ink hover:opacity-90">
              Запросити демо
            </Button>
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          className="rounded-lg border border-white/10 p-2 md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-ink/95 md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-platinum-300 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button className="mt-2 bg-aqua text-ink hover:opacity-90">Запросити демо</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
