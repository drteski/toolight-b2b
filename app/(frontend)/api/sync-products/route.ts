import { NextResponse } from 'next/server';
import { updateTaskQueue } from '@/lib/updateTaskQueue';
import { uploadProducts } from '@/lib/uploadProducts';

export async function GET() {
	await updateTaskQueue({
		action: 'update',
		collection: 'task-queue',
		taskName: 'products-sync',
		start: true,
		finish: false,
		status: 'W trakcie'
	});
	await uploadProducts();

	return new NextResponse(JSON.stringify({ message: 'ok' }), {
		status: 200
	});
}
