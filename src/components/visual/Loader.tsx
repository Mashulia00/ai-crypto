"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onReady = () => {
      // мінімальний час видимості, щоб не «мигало»
      setTimeout(() => setVisible(false), 300);
    };

    const onLoad = () => onReady();

    // якщо документ уже готовий
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onLoad);
    }

    // якщо довше ніж 1.2с — показати тонкий прогрес-бар
    const barTimer = setTimeout(() => setShowBar(true), 1200);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(barTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-ink/80 backdrop-blur-sm">
      {showBar && (
        <div className="absolute top-0 left-0 h-[2px] w-full">
          <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] bg-aqua/80" />
        </div>
      )}
      {prefersReduced ? (
        <div className="h-10 w-10 rounded-2xl bg-aqua shadow-[0_8px_40px_rgba(57,208,255,0.35)]" />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: [1, 1.08, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse" }}
          className="h-10 w-10 rounded-2xl bg-aqua shadow-[0_8px_40px_rgba(57,208,255,0.35)]"
        />
      )}
      <style jsx global>{`
        @keyframes loading {
          0% {
            transform: translateX(-20%);
            width: 20%;
          }
          50% {
            transform: translateX(40%);
            width: 35%;
          }
          100% {
            transform: translateX(100%);
            width: 20%;
          }
        }
      `}</style>
    </div>
  );
}
