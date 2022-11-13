<script>
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		// padding: 20px;
		z-index: -1;
		overflow: hidden;
	}
</style>
