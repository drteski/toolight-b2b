import { NextRequest, NextResponse } from 'next/server'
import payload, { CollectionSlug } from 'payload'
import config from '@/payload.config'

interface Collections {
  params: {
    slug: CollectionSlug
  }
}

export async function GET(request: NextRequest, { params }: Collections) {
  const { slug } = await params
  await payload.init({ config })
  const locale: string = request.nextUrl.searchParams.get('locale') || 'pl'
  const result = await payload.find({
    collection: slug, // required
    depth: 2,
    // page: 1,
    limit: 10,
    pagination: false, // If you want to disable pagination count, etc.
    where: {
      active: {
        equals: true,
      },
    }, // pass a `where` query here
    sort: 'priority',
    locale,
    fallbackLocale: false,
    overrideAccess: false,
    showHiddenFields: true,
  })
  return new NextResponse(
    JSON.stringify({
      result,
    }),
    {
      status: 200,
    },
  )
}
