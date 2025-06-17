import { NextResponse } from 'next/server'
import { uploadProducts } from '@/lib/uploadProducts'

export async function GET() {
  await uploadProducts()

  return new NextResponse(JSON.stringify({ message: 'ok' }), {
    status: 200,
  })
}
