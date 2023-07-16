<script lang="ts">
	import { loadRegionsForApp } from '../[country]/[map]/[year]/initialize/LoadRegions';
	import applyPanZoom from '../[country]/[map]/[year]/initialize/ApplyPanZoom';
	import { ImportModalStore } from '$lib/stores/Modals';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import { get } from 'svelte/store';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';

	const svg = get(ImportedSVGStore);
	if (!svg.loaded) {
		ImportModalStore.set({ open: true });
	}

	function setupMap(node: HTMLDivElement) {
		applyPanZoom(node);
		loadRegionsForApp(node);
	}
</script>

{#if $ImportedSVGStore.loaded === false}
	<h1>Loading Map...</h1>
{:else}
	<div
		use:setupMap
		id="map-div"
		class="overflow-hidden h-full"
		class:insetsHidden={$MapInsetsStore.hidden}
	>
		{@html $ImportedSVGStore.content}
	</div>
{/if}
