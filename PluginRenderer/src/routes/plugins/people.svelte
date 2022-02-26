<script context="module" lang="ts">
	export const load: Load = async ({ fetch }) => {
		const people = await fetch('/api/getPeople').then((r) => r.json());
		return {
			props: {
				people
			}
		};
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Load } from '@sveltejs/kit';
	import { browser } from '$app/env';
	export let people;

	if (browser) {
		setInterval(async () => {
			people = await fetch('/api/getPeople').then((r) => r.json());
		}, 300);
	}

	// people.subscribe((p) => {
	// 	ppl = p;
	// });
</script>

<main class="bg-green-500">
	<div class="flex flex-row gap-2">
		{#each people as { name, avatar }}
			<img class="rounded-full h-24" src={avatar} alt={name} />
		{/each}
	</div>
</main>

<style>
	main {
		height: 100vh;
	}
</style>
