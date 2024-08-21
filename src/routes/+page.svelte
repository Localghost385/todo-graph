<script lang="ts">
	import UI from './UI.svelte';
	import ForceGraph from './ForceGraph.svelte';
</script>

<div class="flex h-full w-full flex-row items-start justify-between">
	<!--
		█ █ █ 
		▀▄█ █ 
	-->
	<div class="h-full">
		<UI />
	</div>

	<!-- 
		█▄ █ ▄▀▄ █▀▄ ██▀ ▄▀▀ 
		█ ▀█ ▀▄▀ █▄▀ █▄▄ ▄██ 
	-->
	<div class="h-full">
		<ForceGraph />
		<!-- <div>tst</div> -->
	</div>
</div>
