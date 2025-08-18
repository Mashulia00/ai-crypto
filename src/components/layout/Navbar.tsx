"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [visible, setVisible] = useState(false); // лишаємо в DOM на час exit-анімації

  // блок скролу + коректне розмонтування після анімації закриття
  useEffect(() => {
    if (open) {
      setVisible(true);
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
      const t = setTimeout(() => setVisible(false), 260); // має співпасти з panel-out
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc → закрити
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* brand */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10">
            <Image src="/brand/logo-mark.png" alt="AI Crypto Bot" width={28} height={28} priority />
          </span>
          <span className="font-semibold">AI Crypto Bot</span>
        </Link>

        {/* desktop */}
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link-neon text-platinum-300 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contact">
            <Button className="bg-aqua text-ink btn-neon hover:opacity-90">Запросити демо</Button>
          </Link>
        </div>

        {/* mobile toggle (tap-анімація + плавний rotate) */}
        <button
          className={`icon-btn pressable rounded-lg border border-white/10 p-2 md:hidden ${open ? "rotate-90" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU: повноекранний, непрозорий, з анімаціями */}
      {visible && (
        <div
          className="menu-sheet fixed inset-0 z-[1000] md:hidden"
          data-open={open}
          role="dialog"
          aria-modal="true"
          onClick={closeMenu} // клік поза панеллю
        >
          {/* оверлей */}
          <div className="menu-overlay" />

          {/* панель */}
          <div
            className="menu-panel menu-glass menu-glow bg-ink"
            onClick={(e) => e.stopPropagation()} // не закривати при кліку всередині
          >
            {/* top bar */}
            <div className="mb-2 flex items-center justify-between px-1">
              <Link href="/" onClick={closeMenu} className="group flex items-center gap-2">
                <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10">
                  <Image src="/brand/logo-mark.png" alt="AI Crypto Bot" width={28} height={28} />
                </span>
                <span className="font-semibold">AI Crypto Bot</span>
              </Link>

              <button
                onClick={closeMenu}
                className="pressable rounded-xl border border-white/15 p-2"
                aria-label="Закрити меню"
              >
                <X size={18} />
              </button>
            </div>

            <div className="neon-divider h-px w-full mb-3" />

            {/* навігація */}
            <nav className="px-1 py-1">
              <ul className="flex flex-col gap-1.5">
                {links.map((l, idx) => (
                  <li key={l.href} className="menu-link-anim" style={{ animationDelay: `${0.06 * idx + 0.05}s` }}>
                    <Link
                      href={l.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-3 text-xl link-neon link-underline text-platinum-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <div
              className="mt-3 menu-link-anim"
              style={{ animationDelay: `${0.06 * links.length + 0.05}s` }}
            >
              <Link href="/contact" onClick={closeMenu}>
                <Button className="w-full bg-aqua text-ink btn-neon pressable hover:opacity-90">
                  Запросити демо
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
