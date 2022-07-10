<script lang="ts">
	import { browser } from '$app/env';

	import type { Poll } from '../../../../Habile/src/lib/classes/Poll';
	import PollWindow from '$lib/components/Window/Poll.svelte';
	import WindowBody from '$lib/components/Window/WindowBody.svelte';

	let poll = null;

	if (browser) {
		setInterval(async () => {
			try {
				poll = await (await fetch('/plugins/poll')).json();
			} catch (e) {
				poll = null;
			}
		}, 1000);
	}
</script>

{#if poll && poll.created}
	<PollWindow {poll} />
{/if}

<!-- <WindowBody label="Chat" icon="Twitch" width="400px" position="top-right">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quos animi provident optio
	perferendis, sapiente iure, corrupti tenetur inventore nostrum commodi! Sed fugit impedit porro
	laborum consectetur reprehenderit repellat voluptatibus.
</WindowBody> -->
