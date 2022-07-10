import { writable } from 'svelte/store';

export type Song = {
	fileName: string;
	author: string;
	title: string;
	cc?: 'cc-3.0' | 'illegal' | null;
};

export const nowPlaying = writable<Song>(null);

export const playlist = writable<Song[]>([]);
