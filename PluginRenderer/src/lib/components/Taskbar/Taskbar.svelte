<div class="taskbar-wrapper">
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
	}
	.taskbar {
		display: flex;
		flex-direction: row;
		background-color: rgba(255, 255, 255, 0.7);
		border: 2px solid rgba(255, 255, 255, 0.3);
		width: max-content;
		border-radius: 99rem;
		padding: 0 2px;
	}
</style>
