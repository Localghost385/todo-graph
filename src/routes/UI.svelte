<script lang="ts">
    import { AppRail, AppRailTile, AppRailAnchor, LightSwitch } from '@skeletonlabs/skeleton';

    let currentTile: number = 0;
</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" >(icon)</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>View Mode</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Edit Mode</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Create Mode</span>
	</AppRailTile>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span><LightSwitch /></span>
        </AppRailTile>
	</svelte:fragment>
</AppRail>
