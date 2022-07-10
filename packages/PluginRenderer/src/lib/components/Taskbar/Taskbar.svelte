<script lang="ts">
	export let hide = false;
	export let minimal = false;
</script>

<div class="taskbar-wrapper" class:minimal class:hide>
	<div class="taskbar">
		<slot />
	</div>
</div>

<style lang="scss">
	.taskbar-wrapper {
		width: 100%;
		height: 100%;
		z-index: -1;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

		&.hide {
			transform: translateY(100%);
			transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}

		&.minimal {
			transform: scale(0.9) translateY(7%);
			transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
	}
	.taskbar {
		display: flex;
		flex-direction: row;
		background-color: rgba(255, 255, 255, 0.7);
		border: 2px solid rgba(255, 255, 255, 0.3);
		width: max-content;
		border-radius: 99rem;
		padding: 0 2px;
		transition: width 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	}
</style>
