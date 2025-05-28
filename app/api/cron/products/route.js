// import prisma from '@/db';
import { NextResponse } from 'next/server';
import { connectToGoogleSheets, getDataFromSheets } from '@/googleSheets';

export async function GET() {
	const products = await connectToGoogleSheets('1_rrLq2wxY160h1Lwm_eRfpKAl4pXbGBgIJ9nvf_Yla8').then(data => getDataFromSheets(data, 'pricelist', 3).then(res => res));

	return new NextResponse(
		{ dupa: '' },
		{
			status: 200
		}
	);
}