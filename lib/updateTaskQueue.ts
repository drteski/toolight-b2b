import payload, { CollectionSlug } from 'payload';
import payloadConfig from '@/payload.config';

export const updateTaskQueue = async ({
	                                      action,
	                                      collection,
	                                      taskName,
	                                      start,
	                                      finish,
	                                      status
                                      }: {
	action: string
	collection: CollectionSlug
	taskName: string
	start: boolean
	finish: boolean
	status: string
}) => {
	return new Promise((resolve, reject) => {
		;(async () => {
			try {
				await payload.init({ config: payloadConfig });
				if (action === 'create') {
					const createTask = await payload.create({
						collection,
						data: {
							name: taskName
						}
					});
					return resolve(createTask);
				}
				if (action === 'delete') {
					const createTask = await payload.delete({
						collection,
						where: {
							name: {
								equals: taskName
							}
						}
					});
					return resolve(createTask);
				}
				if (action === 'update') {
					const task = await payload.find({
						collection,
						where: {
							name: {
								equals: taskName
							}
						}
					});

					if (task.docs.length === 0) return resolve(null);

					const updatedTask = await payload.update({
						collection,
						id: task.docs[0].id,
						data: {
							logs: JSON.stringify({
								status
							}),
							status,
							startedAt: start ? `${new Date()}` : task.docs[0].startedAt,
							finishedAt: finish ? `${new Date()}` : null
						}
					});

					return resolve(updatedTask);
				}
			} catch (error) {
				reject(error);
			}
		})();
	});
};
