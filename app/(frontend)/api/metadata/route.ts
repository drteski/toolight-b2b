import { NextRequest, NextResponse } from 'next/server'
import PayloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')
  const value = searchParams.get('value')

  const payload = await getPayload({ config: PayloadConfig })

  let data = null

  if (type === 'product')
    await payload
      .find({
        collection: 'products',
        where: {
          slug: {
            equals: value,
          },
        },
      })
      .then(
        (res) =>
          (data = {
            title: res?.docs[0]?.title,
            description: res?.docs[0]?.description,
          }),
      )
  if (type === 'category')
    await payload
      .find({
        collection: 'categories',
        where: {
          slug: {
            equals: value,
          },
        },
      })
      .then(
        (res) =>
          (data = {
            title: res?.docs[0]?.title,
            description:
              'Sprawdź najlepsze oświetlenie wewnętrzne w sklepie Toolight. W naszej ofercie: ☑️ lampy sufitowe ☑️ kinkiety ☑️ źródła światła - ☑️ Toolight Białystok',
          }),
      )
  return new NextResponse(JSON.stringify(data), {
    status: 200,
  })
}
