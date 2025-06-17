import { NextResponse } from 'next/server'
import { updateProducts } from '@/lib/updateProducts'

export async function GET() {
  await updateProducts()

  return new NextResponse(JSON.stringify({ message: 'ok' }), {
    status: 200,
  })
}
