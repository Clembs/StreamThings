import { currentPoll } from '$lib/stores/currentPoll';
import { people } from '$lib/stores/people';
import type { RequestHandler } from '@sveltejs/kit';
import type { Poll } from '../../../../Habile/src/core/classes/Poll';

export const post: RequestHandler = async ({ request }) => {
	const res: Poll = await request.json();

	currentPoll.set(res);

	return {
		status: 200,
		body: {
			...res,
			message: 'ok'
		}
	};
};
