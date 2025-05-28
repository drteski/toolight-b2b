import { NextResponse } from 'next/server';

// Zdefiniowane dostępne lokalizacje i domyślna lokalizacja
const locales = ['en', 'pl'];
const defaultLocale = 'pl';

// Ścieżki, które powinny być wykluczone z obsługi lokalizacji


export function middleware(request) {
	const {
		      pathname
	      } = request.nextUrl;

	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];

	const hasValidLocale = locales.includes(firstSegment);

	if (hasValidLocale) {
		return NextResponse.next();
	} else {

		const newUrl = new URL(`/${defaultLocale}`, request.url);
		return NextResponse.redirect(newUrl);
	}
}

export const config = {
	// Dopasuj wszystkie ścieżki oprócz wykluczonych
	matcher: [
		'/(pl|en)/:path*',
		'/((?!_next|api|favicon.ico|images|.*\\.[a-z]+).*)'
	]
};