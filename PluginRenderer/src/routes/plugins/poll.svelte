<script lang="ts">
	import { browser } from '$app/env';

	import type { Poll } from '../../../../Habile/src/core/classes';
	import PollWindow from '$lib/components/Window/Poll.svelte';

	export let poll: Poll = null;

	if (browser) {
		setInterval(async () => {
			try {
				poll = await (await fetch('/plugins/poll')).json();
			} catch (e) {
				poll = null;
			}
		}, 2_000);
	}
</script>

<main>
	{#if poll && poll.created}
		<PollWindow {poll} />
	{/if}
</main>
