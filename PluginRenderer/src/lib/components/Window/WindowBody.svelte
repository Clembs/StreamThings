<script lang="ts">
	export let icon: string;
	export let label: string;
	export let width = '100%';
	export let height = 'max-content';
	export let position: `${'top' | 'bottom'}-${'left' | 'right'}` | { x: number; y: number };
</script>

<div class="flex {typeof position === 'string' ? position.split('-')[0] : ''}">
	<div
		class="window-body {typeof position === 'string' ? position.split('-')[1] : 'absolute'}"
		style="--width: {width}; --height: {height}; --position-x: {typeof position === 'string'
			? ''
			: position.x + 'px'}; --position-y: {typeof position === 'string' ? '' : position.y + 'px'}"
	>
		<div class="window-titlebar">
			<div class="window-titlebar-text">
				<img src="/assets/icons/{icon}.svg" alt="" />
				<p>{label}</p>
			</div>
			<div class="window-titlebar-buttons">
				<span class="window-titlebar-button" />
				<span class="window-titlebar-button" />
				<span class="window-titlebar-button" />
			</div>
		</div>
		<div class="window-content">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.flex {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;

		&.top {
			justify-content: flex-start;
		}
		&.bottom {
			justify-content: flex-end;
		}
	}

	.window-body {
		width: var(--width);
		height: var(--height);

		&.absolute {
			position: absolute;
			transform: translate(var(--position-x), var(--position-y));
		}
		background-color: rgba(255, 255, 255, 0.8);
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 20px;
		display: flex;
		flex-direction: column;

		.window-titlebar {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			padding: 0 10px;
			border-radius: 20px 20px 0px 0px;

			.window-titlebar-text {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 20px;
				gap: 11px;
				img {
					width: 24px;
					height: 24px;
				}
				p {
					margin-block-end: 0;
					margin-block-start: 0;
				}
			}

			.window-titlebar-buttons {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 5px;
				height: 40px;
				border-radius: 0px 0px 20px 20px;

				.window-titlebar-button {
					width: 15px;
					height: 15px;
					background-color: rgba(0, 0, 0, 0.3);
					border-radius: 20px;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
				}
			}
		}

		&.right {
			align-self: flex-end;
		}

		&.left {
			align-self: flex-start;
		}

		.window-content {
			flex: 1;
			overflow: auto;
			padding: 10px;
			font-size: 20px;
			font-weight: 500;
		}
	}
</style>
