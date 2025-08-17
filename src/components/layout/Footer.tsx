import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/10 bg-slate">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* Brand */}
            <Link href="/" className="mb-3 flex items-center gap-2">
              <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image
                  src="/brand/logo-mark.png" // файл у public/brand/
                  alt="AI Crypto Bot"
                  width={28}
                  height={28}
                  priority
                />
              </span>
              <span className="font-semibold"></span>
            </Link>

            <p className="text-sm text-platinum-300">
              Демонстраційний сайт. Це не інвестиційна порада.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-medium">Продукт</h4>
            <ul className="space-y-2 text-platinum-300">
              <li><Link href="/how-it-works" className="hover:text-white">Як це працює</Link></li>
              <li><Link href="/performance" className="hover:text-white">Продуктивність</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Ціни</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium">Компанія</h4>
            <ul className="space-y-2 text-platinum-300">
              <li><Link href="/blog" className="hover:text-white">Блог</Link></li>
              <li><Link href="/contact" className="hover:text-white">Контакти</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium">Правові</h4>
            <ul className="space-y-2 text-platinum-300">
              <li><Link href="/legal/risk" className="hover:text-white">Ризики</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white">Умови</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white">Приватність</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-platinum-400">
          © {year} AI Crypto Bot. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
