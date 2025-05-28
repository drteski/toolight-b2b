import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
	const { lang } = await params;
	const dictionary = await import((`../../../../dictionaries/${lang}.json`)).then(module => module.default);
	return new NextResponse(
		JSON.stringify(dictionary),
		{
			status: 200
		}
	);
}