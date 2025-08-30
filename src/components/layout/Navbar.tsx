"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoldBrand from "@/components/visual/GoldBrand";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { withLocale } from "@/lib/locale";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const pathname = usePathname() || "/";

  // поточна локаль з URL
  const locale = useMemo(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first === "ru" ? "ru" : "en";
  }, [pathname]);

  // словник підписів
  const t = useMemo(
    () =>
      locale === "ru"
        ? {
            how: "Как это работает",
            perf: "Результаты",
            blog: "Блог",
            pricing: "Цены",
            faq: "FAQ",
            contact: "Контакты",
            cta: "Запросить демо",
          }
        : {
            how: "How it works",
            perf: "Performance",
            blog: "Blog",
            pricing: "Pricing",
            faq: "FAQ",
            contact: "Contact",
            cta: "Request a demo",
          },
    [locale]
  );

  const navLinks = [
    { href: "/how-it-works", label: t.how },
    { href: "/performance", label: t.perf },
    { href: "/blog", label: t.blog },
    { href: "/pricing", label: t.pricing },
    { href: "/faq", label: t.faq },
    { href: "/contact", label: t.contact },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      setVisible(true);
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
      setHidden(false);
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
      const t = setTimeout(() => setVisible(false), 260);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Hide-on-scroll logic
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const THRESHOLD = 8;

    const update = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      const goingDown = dy > 0;
      const abs = Math.abs(dy);

      setAtTop(y < 8);

      if (!open) {
        if (goingDown && y > 72 && abs > THRESHOLD) setHidden(true);
        else if (!goingDown && abs > THRESHOLD) setHidden(false);
      } else {
        setHidden(false);
      }

      lastY = y;
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
   className="site-header sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl 
            [--header-h:64px] md:[--header-h:72px]"      data-hidden={hidden && !open}
      data-scrolled={!atTop}
    >
      <div className="mx-auto flex h-16 md:h-[4.5rem] max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <GoldBrand size={42} emph="xl" />

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={withLocale(l.href, locale)}
              className="nav-link-neon text-platinum-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link href={withLocale("/contact", locale)}>
            <Button className="bg-aqua text-ink btn-neon hover:opacity-90">
              {t.cta}
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`icon-btn pressable rounded-lg border border-white/10 p-2 md:hidden ${open ? "rotate-90" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {visible && (
        <div
          className="menu-sheet fixed inset-0 z-[1000] md:hidden"
          data-open={open}
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          {/* overlay */}
          <div className="menu-overlay" />

          {/* panel */}
          <div
            className="menu-panel menu-glass menu-glow bg-ink"
            onClick={(e) => e.stopPropagation()}
          >
            {/* top bar */}
            <div className="mb-2 flex items-center justify-between px-1">
              <div onClick={closeMenu}>
                <GoldBrand size={32} emph="xl" />
              </div>
              <button
                onClick={closeMenu}
                className="pressable rounded-xl border border-white/15 p-2"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="neon-divider h-px w-full mb-3" />

            {/* nav links */}
            <nav className="px-1 py-1">
              <ul className="flex flex-col gap-1.5">
                {navLinks.map((l, idx) => (
                  <li
                    key={l.href}
                    className="menu-link-anim"
                    style={{ animationDelay: `${0.06 * idx + 0.05}s` }}
                  >
                    <Link
                      href={withLocale(l.href, locale)}
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-3 text-xl link-neon link-underline text-platinum-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Language switcher inside burger */}
            <div
              className="px-1 mt-2 menu-link-anim"
              style={{ animationDelay: `${0.06 * navLinks.length + 0.05}s` }}
              onClick={closeMenu}
            >
              <LanguageSwitcher />
            </div>

            {/* CTA */}
            <div
              className="mt-3 menu-link-anim"
              style={{ animationDelay: `${0.06 * navLinks.length + 0.12}s` }}
            >
              <Link href={withLocale("/contact", locale)} onClick={closeMenu}>
                <Button className="w-full bg-aqua text-ink btn-neon pressable hover:opacity-90">
                  {t.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
