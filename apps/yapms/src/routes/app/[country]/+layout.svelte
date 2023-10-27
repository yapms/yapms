<script lang="ts">
	import { loadFromJson } from '$lib/utils/loadMap';
	import { page } from '$app/stores';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { applyAutoStroke, applyPanZoom } from '$lib/utils/applyPanZoom';
	import { loadRegionsForApp } from '$lib/utils/loadRegions';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { loadMapFromURL, LoadedMapStore } from '$lib/stores/LoadedMap';
	import { loadSidebarTitle } from '$lib/stores/SideBar';
	import { loadMapIdentifier } from '$lib/stores/MapIdentifier';

	$: requestedMap = $page.url.pathname.replace('/app/', '').replaceAll('/', '-');
	$: country = requestedMap.split('-').at(0);
	$: map = import(`../../../lib/assets/maps/${country}/${requestedMap}.svg?raw`);

	$: map.catch(() => {
		if (browser) goto('/');
	});

	function setupMap(node: HTMLDivElement) {
		const svg = node.querySelector<SVGElement>('svg');
		if (svg !== null) {
			applyPanZoom(svg);
			applyAutoStroke(svg);
			loadSidebarTitle(svg);
			loadMapIdentifier(svg);
		}
		loadRegionsForApp(node);
		loadMapFromURL($page.url);
	}

	$: if ($LoadedMapStore) loadFromJson($LoadedMapStore);
</script>

{#await map}
	<div class="flex justify-center w-full h-full">
		<span class="loading loading-ring loading-lg text-primary"></span>
	</div>
{:then map}
	<div
		use:setupMap
		id="map-div"
		class="overflow-hidden h-full"
		class:insets-hidden={$MapInsetsStore.hidden}
	>
		{@html map.default}
	</div>
{/await}
