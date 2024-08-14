<script>
	import ForceGraph from './ForceGraph.svelte';
	import UI from './UI.svelte';
</script>

<!-- 
█▄ █ ▄▀▄ █▀▄ ██▀ ▄▀▀ 
█ ▀█ ▀▄▀ █▄▀ █▄▄ ▄██ 
-->
<div class="graph">
	<ForceGraph />
</div>

<!--
█ █ █ 
▀▄█ █ 
-->
<div class="ui">
	<UI />
	<div>test</div>
</div>

<style>
	.graph {
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.ui {
		overflow: hidden;
	}
</style>
