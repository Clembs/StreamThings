<script lang="ts">
	export let state: 'inactive' | 'active' | 'idle';
	export let showLabel = true;
	export let icon: string = '';
</script>

<div class="item {state}" class:labelless={!showLabel}>
	<div class="item-row">
		{#if icon}
			<img alt="" src="/assets/icons/{icon}.svg" />
		{/if}
		{#if showLabel}
			<div class="item-label">
				<p><slot /></p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.item {
		margin: 8px;

		.item-row {
			display: flex;
			flex-direction: row;
			height: 45px;
			align-items: center;
			padding: 0px 11px;
			border-radius: 99rem;

			.item-label {
				font-size: 20px;
				font-weight: 600;
				font-family: 'Manrope';
				p {
					margin-block-end: 0;
					margin-block-start: 0;
				}
			}
		}
	}

	.item:not(.labelless) .item-row {
		gap: 11px;
	}

	.inactive {
		.item-row {
			background-color: rgba(255, 255, 255, 0.4);
		}
	}
	.active {
		.item-row {
			background-color: rgba(255, 255, 255, 0.7);
			box-shadow: inset 0px -1px 2px 0px rgb(0 0 0 / 30%);
		}
	}
</style>
