import type { RequestHandler } from '@sveltejs/kit';
import { get as storeGet } from 'svelte/store';
import { currentPoll } from '$lib/stores/currentPoll';
import type { Poll } from '../../../../Habile/src/lib/classes/Poll';

export const get: RequestHandler = () => {
	const poll = storeGet(currentPoll);

	return {
		status: 200,
		body: poll ?? null,
	};
};

export const post: RequestHandler = async ({ request }) => {
	const res: Poll = await request.json();

	currentPoll.set(res);

	return {
		status: 200,
		body: {
			...res,
			message: 'ok',
		},
	};
};
