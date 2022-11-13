<script context="module" lang="ts">
	export const load: Load = async ({ fetch }) => {
		const playlist = await (await fetch(`/plugins/nowplaying/getSongList`)).json();
		const nowPlaying = await (await fetch(`/plugins/nowplaying/current`)).json();

		return {
			props: {
				playlist,
				nowPlaying,
			},
		};
	};
</script>

<script lang="ts">
	import type { Song } from '$lib/stores/music';
	import { onMount } from 'svelte';
	import type { Load } from '@sveltejs/kit';

	export let nowPlaying: Song;
	export let playlist: Song[];
	let audioEl: HTMLAudioElement;

	async function changeSong(song: Song) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: song.title,
			artist: song.author,
		});

		nowPlaying = song;

		await fetch(`/plugins/nowplaying/current`, {
			method: 'POST',
			body: JSON.stringify(nowPlaying),
		});
	}

	function nextTrack() {
		const position = playlist.findIndex((song) => song.fileName === nowPlaying.fileName);

		let track = position + 1 === playlist.length ? playlist[0] : playlist[position + 1];

		changeSong({ ...track, playing: true });
	}

	onMount(() => {
		navigator.mediaSession.setActionHandler('nexttrack', async () => nextTrack());

		audioEl.onplay = () => changeSong({ ...nowPlaying, playing: true });
		audioEl.onpause = () => changeSong({ ...nowPlaying, playing: false });
		audioEl.onended = () => nextTrack();
	});
</script>

<audio autoplay controls bind:this={audioEl} src="/BGM/current/{nowPlaying?.fileName}" />

<table>
	<tr>
		<th> Title </th>
		<th>Artist</th>
		<th>File name</th>
	</tr>
	<tbody>
		{#each playlist as song}
			<tr on:click={() => changeSong(playlist.find((s) => s.fileName === song.fileName))}>
				<td>
					{song.title}
				</td>
				<td>{song.author}</td>
				<td>{song.fileName}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	:global(body) {
		background: white;
	}

	td,
	th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}
</style>
