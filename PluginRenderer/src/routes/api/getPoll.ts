import { get as storeGet } from 'svelte/store';
import { currentPoll } from '$lib/stores/currentPoll';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => {
	return {
		status: 200,
		body: JSON.stringify(storeGet(currentPoll))
	};
};
