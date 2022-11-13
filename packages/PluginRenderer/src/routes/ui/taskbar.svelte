<script lang="ts">
	import Taskbar from '$lib/components/Taskbar/Taskbar.svelte';
	import Item from '$lib/components/Taskbar/Item.svelte';
	import NowPlayingItem from '$lib/components/Taskbar/NowPlayingItem.svelte';
	import { readable } from 'svelte/store';

	const links = [
		['discord', 'clembs.com/discord'],
		['twitch', 'twitch.tv/clembs'],
		['youtube', 'youtube.com/@ReClembs'],
		['donate', 'clembs.com/donate'],
	];

	let hide = false;

	let currentLink = 0;
	setInterval(() => (currentLink = links.length === currentLink + 1 ? 0 : currentLink + 1), 10000);

	const hour = readable(new Date(), (set) => {
		setInterval(() => set(new Date()), 10000);
	});
</script>

<Taskbar {hide} solid>
	<Item>
		<img alt="" slot="icon" src="/assets/icons/Habile.svg" />
		Latest follower
	</Item>
	<NowPlayingItem />
	<Item>
		<img src="/assets/icons/{links[currentLink][0]}.svg" alt="" slot="icon" />
		{links[currentLink][1]}
	</Item>
	<Item>
		<img alt="" slot="icon" src="/assets/icons/Clock.svg" />
		{@html $hour
			.toLocaleTimeString('fr', {
				hour: '2-digit',
				minute: '2-digit',
			})
			.replace(':', '<span class="blink">:</span>')}</Item
	>
</Taskbar>
