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

	function updateMetadata() {
		navigator.mediaSession.setActionHandler('nexttrack', async () => nextTrack());

		navigator.mediaSession.metadata = new MediaMetadata({
			title: nowPlaying.title,
			artist: nowPlaying.author,
		});
	}

	async function nextTrack() {
		const position = playlist.findIndex((song) => song === nowPlaying);
		if (position + 1 === playlist.length) {
			nowPlaying = playlist[0];
		} else {
			nowPlaying = playlist[position + 1];
		}

		await fetch(`/plugins/nowplaying/current`, {
			method: 'POST',
			body: JSON.stringify(nowPlaying),
		});

		updateMetadata();
	}

	onMount(() => {
		updateMetadata();

		audioEl.onended = async () => await nextTrack();
	});
</script>

<audio autoplay controls bind:this={audioEl} src="/BGM/{nowPlaying?.fileName}" />

<style lang="scss">
	:global(body) {
		background: #987fff;
	}
</style>
