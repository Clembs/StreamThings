<script lang="ts">
	export let state: 'inactive' | 'active' | 'idle';
	export let hideLabel = false;
</script>

<div class="item {state}" class:labelless={hideLabel}>
	<div class="item-row">
		<slot name="icon" />
		{#if !hideLabel}
			<div class="item-label">
				<p><slot /></p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.item {
		margin: 8px;
		transition: width 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);

		.item-row {
			display: flex;
			flex-direction: row;
			height: 45px;
			align-items: center;
			padding: 0px 11px;
			border-radius: 99rem;
			gap: 11px;

			:global([slot='icon']) {
				width: 30px;
				height: 30px;
			}
			.item-label {
				font-size: 20px;
				font-weight: 600;
				font-family: 'Manrope';
				& > p {
					margin-block-end: 0;
					margin-block-start: 0;
					max-width: 300px;
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
