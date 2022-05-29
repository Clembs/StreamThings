<script lang="ts">
	import Taskbar from '$lib/components/Taskbar/Taskbar.svelte';
	import Item from '$lib/components/Taskbar/Item.svelte';
	import NowPlayingItem from '$lib/components/Taskbar/NowPlayingItem.svelte';
	import { readable } from 'svelte/store';

	let startingSoon = false;
	let game = null;
	let activeTab = startingSoon ? 'calendar' : game ?? 'camera';
	let hide = false;

	const hour = readable(new Date(), (set) => {
		setInterval(() => {
			set(new Date());
		}, 10000);
	});
</script>

<Taskbar {hide} minimal={!!game}>
	<Item state="idle" hideLabel>
		<img alt="" slot="icon" src="/assets/icons/Clembs.svg" />
	</Item>
	{#if !startingSoon}
		<Item hideLabel={!!game} state={activeTab === 'camera' ? 'active' : 'inactive'}>
			<img alt="" slot="icon" src="/assets/icons/Camera.svg" />
			Camera
		</Item>
	{:else}
		<Item state="inactive">
			<img alt="" slot="icon" src="/assets/icons/Twitch.svg" />
			Starting soon</Item
		>
	{/if}
	<!-- <Item state={activeTab === 'chat' ? 'active' : 'inactive'}>
		<img alt="" slot="icon" src="/assets/icons/Chat.svg" />
		Chat</Item
	> -->
	{#if game}
		<Item state="active">{game}</Item>
	{/if}
	<!-- <Item state={activeTab === 'goals' ? 'active' : 'inactive'}>
		<img alt="" slot="icon" src="/assets/icons/Twitch.svg" />
		Following goals</Item
	> -->
	<NowPlayingItem />
	<Item hideLabel={!!game} state="inactive">
		<img alt="" slot="icon" src="/assets/icons/Habile.svg" />
		Habile
	</Item>
	{#if startingSoon}
		<Item state={activeTab === 'calendar' ? 'active' : 'inactive'}>
			<img alt="" slot="icon" src="/assets/icons/Calendar.svg" />
			Calendar
		</Item>
	{/if}
	{#if !game}
		<Item state="inactive">
			<img alt="" slot="icon" src="/assets/icons/Clock.svg" />
			{$hour.getHours()}<span class="blink">:</span>{$hour.toTimeString().split(':')[1]}</Item
		>
	{/if}
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
