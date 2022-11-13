<script lang="ts">
	import { browser } from '$app/env';

	import PollWindow from '$lib/components/Window/Poll.svelte';

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
