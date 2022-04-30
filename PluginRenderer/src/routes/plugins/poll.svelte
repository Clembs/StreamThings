<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const poll = await fetch('/api/getPoll').then((r) => r.text());
		return {
			props: {
				poll: poll !== '{}' ? JSON.parse(poll) : null,
			},
		};
	};
</script>

<script lang="ts">
	import { browser } from '$app/env';

	import type { Poll } from '../../../../Habile/src/core/classes';
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	export let poll: Poll = null;

	if (browser) {
		setInterval(async () => {
			poll = await fetch('/api/getPoll').then((r) => r.json());
		}, 1000);
	}
</script>

<main>
	{#if poll && poll.created}
		<div
			class="poll"
			transition:fly={{ duration: 500, delay: 500, x: -1000, opacity: 1, easing: quintInOut }}
		>
			<div class="poll-bg" />
			<div class="poll-header">
				<h2 class="poll-subtext">Poll</h2>
				<h1 class="poll-title">{poll.title}</h1>
			</div>
			<div class="poll-options">
				{#each poll.options as option, i}
					<div class="poll-option">
						<div class="poll-option-upper">
							<div class="poll-option-letter">
								<p>{String.fromCharCode(65 + i)}</p>
							</div>
							<h1 class="poll-option-name">{option.name}</h1>
							<span class="percentage"
								>{option.votes.toString() === '0'
									? '0'
									: Math.floor((option.votes / poll.voters.length) * 100)}%</span
							>
						</div>
						<div class="progress">
							<div
								class="progress-bar"
								role="progressbar"
								style="width: {option.votes.toString() === '0'
									? '0'
									: Math.floor((option.votes / poll.voters.length) * 100)}%"
							/>
						</div>
					</div>
				{/each}
				<span class="poll-footer">
					{poll.voters.length}
					{poll.voters.length === 1 ? 'vote' : 'votes'} total • vote with ,vote [letter]
				</span>
			</div>
		</div>
	{/if}
</main>

<style lang="scss">
	.poll {
		font: 24px 'Manrope', sans-serif;
		color: #000020;
		border-radius: 35px;
		display: flex;
		flex-direction: column;
		width: 441px;
		padding: 1.7rem;
		font-weight: 500;
		gap: 1rem;
		overflow: hidden;

		position: fixed;
		bottom: 0;
		left: 0;
		transform: translateX(20px) translateY(-20px);

		.poll-bg {
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(250, 250, 250, 0.8);
			// backdrop-filter: blur(50px);
		}

		.poll-header {
			.poll-subtext {
				margin: 0;
				text-transform: uppercase;
				font-size: 1.2rem;
				font-weight: bold;
			}
			.poll-title {
				font-size: 30px;
			}
		}

		.poll-footer {
			font-size: 1.2rem;
			font-weight: bold;
			opacity: 0.7;
		}

		.poll-options {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.poll-option {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.poll-option-upper {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 0.5rem;

				.poll-option-letter {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30px;
					height: 30px;
					background: #fff;
					font-weight: bold;
					color: #000020;
					border-radius: 50%;
					font-size: 1.4rem;
				}

				.percentage {
					margin-left: auto;
					opacity: 0.7;
				}
			}

			.progress {
				height: 19px;
				width: 100%;
				background-color: #eaeaea;
				border-radius: 99rem;
				background: rgba(0, 0, 20, 20%);

				.progress-bar {
					height: 100%;
					width: 0%;
					background: linear-gradient(45deg, #8c68fc, #4c7ffc);
					border-radius: 99rem;
					transition: width 0.5s ease-in-out;
				}
			}
		}
	}
</style>
