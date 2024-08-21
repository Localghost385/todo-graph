<script lang="ts">
	import { onMount } from 'svelte';
	import type * as nodetypes from './nodetypes';
	import { createChart } from './forcegraph';

	let svgElement: SVGSVGElement | null = null;

	onMount(async () => {
		let file: nodetypes.File = await import('./data.json');

		createChart(svgElement, file);
	});
</script>
<svg class="w-full h-full" bind:this={svgElement}></svg>
