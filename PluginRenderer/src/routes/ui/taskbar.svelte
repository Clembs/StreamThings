<script lang="ts">
	import Taskbar from '$lib/components/Taskbar/Taskbar.svelte';
	import Item from '$lib/components/Taskbar/Item.svelte';
	import { writable } from 'svelte/store';

	let game = null;
	let activeTab = game ?? 'camera';

	const hour = writable(new Date());

	setInterval(() => {
		hour.set(new Date());
	}, 10000);
</script>

<Taskbar>
	<Item icon="Clembs" state="idle" />
	<Item state={activeTab === 'camera' ? 'active' : 'inactive'}>Camera</Item>
	<Item state={activeTab === 'chat' ? 'active' : 'inactive'}>Chat</Item>
	{#if game}
		<Item state="active">{game}</Item>
	{/if}
	<Item icon="Twitch" state={activeTab === 'goals' ? 'active' : 'inactive'}>Following goals</Item>
	<Item icon="Habile" state="inactive">Habile</Item>
	<Item icon="Clock" state="inactive"
		>{$hour.getHours()}<span class="blink">:</span>{$hour.toTimeString().split(':')[1]}</Item
	>
</Taskbar>

<style lang="scss">
	.blink {
		animation: blink 1s steps(2, start) infinite;
	}

	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
