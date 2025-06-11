import { NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

export const locales = [
  {
    label: 'Polski',
    code: 'pl',
  },
  {
    label: 'English',
    code: 'en',
  },
  {
    label: 'Français',
    code: 'fr',
  },
]
const defaultLocale = 'pl'

function getLocale(request) {
  const negotiatorHeaders = {}
  for (const [key, value] of request.headers.entries()) {
    negotiatorHeaders[key] = value
  }

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return matchLocale(
    languages,
    locales.map((locale) => locale.code),
    defaultLocale,
  )
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/media') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}`
    return NextResponse.redirect(request.nextUrl)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`,
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|admin|media|favicon.ico|robots.txt).*)'],
}
