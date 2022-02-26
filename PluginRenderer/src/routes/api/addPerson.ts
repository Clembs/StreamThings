import { people } from '$lib/stores/people';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const res = await request.json();
	console.log(res);

	people.update((people) => {
		console.log([...people, res]);
		return [...people, res];
	});

	return {
		status: 200,
		body: {
			...res,
			message: 'ok'
		}
	};
};
