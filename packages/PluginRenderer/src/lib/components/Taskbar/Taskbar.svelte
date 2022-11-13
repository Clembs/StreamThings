<script lang="ts">
	export let hide = false;
	export let solid = false;
</script>

<!-- <div class="taskbar-wrapper" class:minimal class:hide> -->
<div class="taskbar" class:solid class:hide>
	<slot />
</div>

<!-- </div> -->
<style lang="scss">
	.taskbar {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: -1;

		&.hide {
			transform: translateY(100%);
			transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}

		&.solid {
			background-color: rgb(255 255 255);
		}

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: rgb(255 255 255 / 0.7);
		border-top: 2px solid rgb(255 255 255 / 0.3);
		padding: 0 2rem;
		transition: width 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	}
</style>
