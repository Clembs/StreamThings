import { playlist, type Song } from '$lib/stores/music';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import NodeID3 from 'node-id3';

export const get: RequestHandler = () => {
	const filePath = './static/BGM';

	const songs = fs.readdirSync(filePath);

	const details = songs
		.map((song) => {
			const file = fs.readFileSync(`${filePath}/${song}`);
			const tags = NodeID3.read(file);

			return {
				author: tags.artist,
				fileName: song,
				title: tags.title,
			} as Song;
		})
		.sort((a, b) => Math.random() - 0.5);

	playlist.set(details);

	return {
		body: details,
	};
};
