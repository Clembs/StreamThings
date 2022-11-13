<script lang="ts">
	import type { Poll } from '../../../../../Habile/src/lib/classes/Poll';
	export let poll: Poll = null;

	import WindowBody from './WindowBody.svelte';
</script>

<WindowBody label="Poll" icon="Habile" position="bottom-left" width="441px">
	<div class="poll">
		<h1 class="poll-title">{poll.title}</h1>
		<div class="poll-options">
			{#each poll.options as option, i}
				<div class="poll-option">
					<div class="poll-option-upper">
						<div class="poll-option-letter">
							<p>{String.fromCharCode(65 + i)}</p>
						</div>
						<h3 class="poll-option-name">{option.name}</h3>
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
				{poll.voters.length === 1 ? 'vote' : 'votes'} total • vote with
				<span class="poll-footer-command">:vote</span>
			</span>
		</div>
	</div>
</WindowBody>

<style lang="scss">
	.poll {
		font-size: 24px;
		color: #000020;
		display: flex;
		flex-direction: column;
		font-weight: 500;
		gap: 1rem;
		overflow: hidden;

		// transform: translateX(20px) translateY(-20px);

		h1,
		h3 {
			margin-block-start: 0;
			margin-block-end: 0;
		}

		.poll-title {
			font-size: 30px;
		}

		.poll-footer {
			font-size: 1.2rem;
			font-weight: bold;
			opacity: 0.7;

			.poll-footer-command {
				font-family: 'Cascadia Mono';
			}
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
