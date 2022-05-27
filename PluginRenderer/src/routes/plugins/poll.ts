import type { RequestHandler } from '@sveltejs/kit';
import { get as storeGet } from 'svelte/store';
import { currentPoll } from '$lib/stores/currentPoll';

export const get: RequestHandler = () => {
	const poll = storeGet(currentPoll);

	return {
		status: 200,
		body: {
			poll: poll ?? null,
		},
	};
};
