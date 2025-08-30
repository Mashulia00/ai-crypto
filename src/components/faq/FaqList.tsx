"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* Smooth auto expand/collapse height + soft fade-in */
function SmoothContent({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(open ? "auto" : 0);
  const [opacity, setOpacity] = useState(open ? 1 : 0);
  const [translate, setTranslate] = useState(open ? 0 : 6);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const full = el.scrollHeight;

    if (open) {
      setHeight(full);
      requestAnimationFrame(() => {
        setOpacity(1);
        setTranslate(0);
      });
    } else {
      setHeight(full);
      requestAnimationFrame(() => {
        setHeight(0);
        setOpacity(0);
        setTranslate(6);
      });
    }
  }, [open]);

  return (
    <div
      className="px-5 pb-4 overflow-hidden"
      style={{
        height: height === "auto" ? "auto" : `${height}px`,
        opacity,
        transform: `translateY(${translate}px)`,
        transition:
          "height 720ms cubic-bezier(.22,.8,.25,1), opacity 720ms cubic-bezier(.22,.8,.25,1), transform 720ms cubic-bezier(.22,.8,.25,1)",
      }}
      onTransitionEnd={(e) => {
        if (open && e.propertyName === "height") setHeight("auto");
      }}
    >
      <div ref={innerRef} className="pt-1.5 text-platinum-300">
        {children}
      </div>
    </div>
  );
}

type Item = { q: string; a: string };

export default function FaqList({ items }: { items: Item[] }) {
  const [openKey, setOpenKey] = useState<string | undefined>(undefined);

  return (
    <Accordion
      type="single"
      collapsible
      value={openKey}
      onValueChange={setOpenKey}
      className="w-full space-y-4"
    >
      {items.map((f, i) => {
        const key = `faq-${i}`;
        const isOpen = openKey === key;

        return (
          <AccordionItem key={key} value={key} className="border-none outline-none">
            <div
              className="feature-card rounded-2xl p-0 touch-manipulation menu-link-anim"
              style={{ animationDelay: `${i * 60}ms` }}
              onPointerDown={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                const r = el.getBoundingClientRect();
                el.style.setProperty("--px", `${e.clientX - r.left}px`);
                el.style.setProperty("--py", `${e.clientY - r.top}px`);
                el.classList.add("pressed");
              }}
              onPointerUp={(e) => e.currentTarget.classList.remove("pressed")}
              onPointerLeave={(e) => e.currentTarget.classList.remove("pressed")}
              onPointerCancel={(e) => e.currentTarget.classList.remove("pressed")}
            >
              {/* Three columns: number • question • one arrow */}
              <AccordionTrigger
                className="
                  group grid w-full grid-cols-[auto,1fr,auto] items-center gap-3
                  px-5 py-3 md:py-4 text-left text-base font-medium
                  [&>svg]:hidden
                "
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-aqua shadow-[0_0_0_1px_rgba(57,208,255,.15)]">
                  {i + 1}
                </span>

                <span className="title">{f.q}</span>

                <span
                  aria-hidden
                  className={`ml-1 h-5 w-5 drop-shadow-[0_0_10px_rgba(57,208,255,.55)] text-aqua transition-transform duration-[780ms] ease-[cubic-bezier(.20,.80,.20,1)] ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </AccordionTrigger>

              <SmoothContent open={isOpen}>
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </SmoothContent>
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
