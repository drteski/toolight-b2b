import { NextRequest, NextResponse } from 'next/server'
import payload, { GlobalSlug } from 'payload'
import config from '@/payload.config'

interface Global {
  params: {
    slug: GlobalSlug
  }
}

export async function GET(request: NextRequest, { params }: Global) {
  const { slug } = await params
  await payload.init({ config })
  const locale = request.nextUrl.searchParams.get('locale') || 'pl'
  const result = await payload.findGlobal({
    slug, // required
    depth: 2,
    locale,
  })
  console.log(result)
  return new NextResponse(
    JSON.stringify({
      result,
    }),
    {
      status: 200,
    },
  )
}
