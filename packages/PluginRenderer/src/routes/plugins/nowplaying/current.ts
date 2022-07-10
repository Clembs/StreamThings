import { nowPlaying, playlist, type Song } from '$lib/stores/music';
import type { RequestHandler } from '@sveltejs/kit';
import { get as storeGet } from 'svelte/store';

export const get: RequestHandler = () => {
	const data = storeGet(nowPlaying);

	return {
		body: data ?? storeGet(playlist)[0],
	};
};

export const post: RequestHandler = async ({ request }) => {
	const song: Song = await request.json();

	nowPlaying.set(song);

	return {
		body: song,
	};
};
