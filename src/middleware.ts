import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пропускаємо api і статичні файли
  if (pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // якщо вже /en або /ru — нічого не робимо
  if (pathname === '/en' || pathname.startsWith('/en/')
   || pathname === '/ru' || pathname.startsWith('/ru/')) {
    return NextResponse.next();
  }

  // інакше перекидаємо на /en
  return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
