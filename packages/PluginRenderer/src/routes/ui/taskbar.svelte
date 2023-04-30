<script lang="ts">
	import Taskbar from '$lib/components/Taskbar/Taskbar.svelte';
	import Item from '$lib/components/Taskbar/Item.svelte';
	import { readable } from 'svelte/store';

	const links = [
		['discord', 'discord.gg/6uNwP46'],
		['twitch', 'twitch.tv/clembs'],
		['youtube', 'youtube.com/@ReClembs'],
		['donate', 'ko-fi.com/clembs'],
	];

	let hide = false;

	let currentLink = 0;
	setInterval(() => (currentLink = links.length === currentLink + 1 ? 0 : currentLink + 1), 10000);

	const hour = readable(new Date(), (set) => {
		setInterval(() => set(new Date()), 10000);
	});

	const date = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
</script>

<Taskbar {hide} solid>
	<!-- <Item>
		<img alt="" slot="icon" src="/assets/icons/Habile.svg" />
		Latest follower
	</Item> -->
	<Item>
		<img src="/assets/icons/{links[currentLink][0]}.svg" alt="" slot="icon" />
		{links[currentLink][1]}
	</Item>
	<Item>
		{date.format(new Date())} •
		{@html $hour
			.toLocaleTimeString('fr', {
				hour: '2-digit',
				minute: '2-digit',
			})
			.replace(':', '<span class="blink">:</span>')}
	</Item>
</Taskbar>
