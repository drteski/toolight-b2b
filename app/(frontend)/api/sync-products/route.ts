import { NextResponse } from 'next/server'
import { updateTaskQueue } from '@/lib/updateTaskQueue'
import { uploadProducts } from '@/lib/uploadProducts'

export async function GET() {
  // await updateTaskQueue({
  //   action: 'create',
  //   collection: 'task-queue',
  //   taskName: 'test',
  //   start: false,
  //   finish: true,
  //   status: 'pending',
  // })
  await uploadProducts()

  return new NextResponse(JSON.stringify({ message: 'ok' }), {
    status: 200,
  })
}
