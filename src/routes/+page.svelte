<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import ForceGraph from './ForceGraph.svelte';
	import UI from './UI.svelte';

	let forceGraph: SvelteComponent;

	function createNode() {
		console.log('createNode');
		forceGraph.createNode('Z');
		forceGraph.createLink('A', 'Z');
	}
</script>

<!-- 
█▄ █ ▄▀▄ █▀▄ ██▀ ▄▀▀ 
█ ▀█ ▀▄▀ █▄▀ █▄▄ ▄██ 
-->
<div class="graph">
	<ForceGraph bind:this={forceGraph} />
</div>

<!--
█ █ █ 
▀▄█ █ 
-->
<div class="ui">
	<UI {createNode} />
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

