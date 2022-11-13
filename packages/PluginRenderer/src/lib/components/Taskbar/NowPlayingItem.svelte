<script lang="ts">
	import { browser } from '$app/env';
	import type { Song } from '$lib/stores/music';
	import Item from './Item.svelte';

	let nowPlaying: Song = null;

	if (browser) {
		setInterval(async () => {
			nowPlaying = await (await fetch('/plugins/nowplaying/current')).json();
		}, 2000);
	}
</script>

{#if nowPlaying && nowPlaying?.playing}
	<Item>
		<img class="spin" alt="" slot="icon" src="/assets/icons/Disk.svg" />
		{nowPlaying?.title} • {nowPlaying?.author}
	</Item>
{/if}

<style lang="scss">
	.spin {
		animation: spin 5s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
