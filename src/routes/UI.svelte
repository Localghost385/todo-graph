<script lang="ts">
	export let createNode: () => void;
</script>

<div class="left-ui-container">da</div>

<button on:click={createNode} class="right-ui-container">+</button>

<style>
	.left-ui-container {
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 20vw;
		border-right: 1px solid #41445a;
		background-color: #ffffff;
	}
	.right-ui-container {
		z-index: 1;
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 2rem;
		height: 4rem;
		width: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #41445a;
		background-color: #ffffff;
		font-size: 2rem;
	}

	.right-ui-container:hover {
		cursor: pointer;
	}

	.right-ui-container:active {
		background-color: #edeef0;
	}
</style>
