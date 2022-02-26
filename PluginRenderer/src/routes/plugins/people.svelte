<script context="module" lang="ts">
	export const load: Load = async ({ fetch }) => {
		const people = await fetch('/api/getPeople').then((r) => r.json());
		return {
			props: { people },
		};
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { Load } from '@sveltejs/kit';
	import { browser } from '$app/env';
	import { linear } from 'svelte/easing';
	export let people;

	if (browser) {
		setInterval(async () => {
			people = await fetch('/api/getPeople').then((r) => r.json());
		}, 2000);
	}
</script>

<main class="aspect-video image bg-contain">
	{#each people as { name, avatar, x, y, s }}
		<img
			transition:scale={{
				duration: 500,
				easing: linear,
				opacity: 0,
			}}
			style="
			position: absolute;
			left: {x}px;
			top: {y}px;
			height: {s}px;
			width: {s}px;
				"
			class="shadow-xl rounded-full h-12"
			src={avatar}
			alt={name}
		/>
	{/each}
</main>

<style lang="scss">
	.image {
		background-image: url('/assets/starting-soon.png');
	}
</style>
