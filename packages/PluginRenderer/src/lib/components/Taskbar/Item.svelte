<script lang="ts">
	import { fade } from 'svelte/transition';

	// export let state: 'inactive' | 'active' | 'idle';
	export let hideLabel = false;
</script>

<div class="item" transition:fade class:labelless={hideLabel}>
	<div class="item-row">
		<slot name="icon" />
		<!-- {#if state !== 'idle' && !hideLabel} -->
		<div class="item-label">
			<p><slot /></p>
		</div>
		<!-- {/if} -->
	</div>
</div>

<style lang="scss">
	.item {
		transition: width 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);

		.item-row {
			display: flex;
			flex-direction: row;
			// height: 45px;
			padding: 7px 0;
			align-items: center;
			border-radius: 99rem;
			gap: 11px;

			:global([slot='icon']) {
				width: 24px;
				height: 24px;
			}
			.item-label {
				font-size: 20px;
				// font-weight: 600;
				& > p {
					margin-block-end: 0;
					margin-block-start: 0;
					max-width: 100%;
					white-space: nowrap;
					overflow: hidden;
					display: inline-block;
					text-overflow: ellipsis;
					transform: translateY(2px);
				}
			}
		}
	}

	.item.labelless .item-row {
		gap: 0px;
	}
</style>
