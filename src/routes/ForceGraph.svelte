<!-- /* c8 ignore start */ -->
<script lang="ts">
	import { onMount } from 'svelte';
	import type * as nodetypes from '$lib/types/nodetypes';
	import { createChart } from '$lib/chart/index';

	let svgElement: SVGSVGElement | null = null;

	onMount(async () => {
		let file: nodetypes.File = await import('./data.json');

		createChart(svgElement, file);
	});
</script>

<svg class="h-full w-full" bind:this={svgElement}></svg>
<!-- /* c8 ignore stop */ -->