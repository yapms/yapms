<script lang="ts">
	import { ImportModalStore } from '$lib/stores/Modals';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import { get } from 'svelte/store';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { RegionTextsStore } from '$lib/stores/RegionTextsStore';
	import { applyAutoStroke, applyPanZoom } from '$lib/utils/applyPanZoom';
	import { loadRegionsForApp } from '$lib/utils/loadRegions';
	import { setRegionStrokeColor } from '$lib/stores/RegionStrokeColorStore';
	import { loadActionGroups } from '$lib/stores/ActionGroups';
	import { loadSidebarSources, loadSidebarTitle } from '$lib/stores/SideBar';

	const svg = get(ImportedSVGStore);
	if (!svg.loaded) {
		ImportModalStore.set({ open: true });
	}

	function setupMap(node: HTMLDivElement) {
		const svg = node.querySelector<SVGElement>('svg');
		if (svg !== null) {
			applyPanZoom(svg);
			applyAutoStroke(svg);
			setRegionStrokeColor(svg);
			loadSidebarTitle(svg);
			loadSidebarSources(svg);
			loadActionGroups(svg);
		}
		loadRegionsForApp(node);
	}
</script>

{#if $ImportedSVGStore.loaded === false}
	<div class="flex justify-center w-full h-full">
		<span class="loading loading-ring loading-lg text-primary"></span>
	</div>
{:else}
	<div
		use:setupMap
		id="map-div"
		class="overflow-hidden h-full"
		class:insets-hidden={$MapInsetsStore.hidden}
		class:texts-hidden={$RegionTextsStore.hidden}
	>
		{@html $ImportedSVGStore.content}
	</div>
{/if}
