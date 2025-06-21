<script lang="ts">
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { applyAutoStroke, applyPanZoom } from '$lib/utils/applyPanZoom';
	import { loadRegionsForApp } from '$lib/utils/loadRegions';
	import { loadSidebarTitle, loadSidebarSources } from '$lib/stores/SideBar';
	import { loadMapIdentifier } from '$lib/stores/MapIdentifier';
	import { loadActionGroups } from '$lib/stores/ActionGroups';
	import { RegionTextsStore } from '$lib/stores/RegionTextsStore';
	import { setRegionStrokeColor } from '$lib/stores/RegionStrokeColorStore';
	import { page } from '$app/state';
	import {
		getMap,
		drawLoadedMap,
		getUserMap,
		setLoadedMapFromJson,
		gotoLoadedMap
	} from '$lib/stores/LoadedMap';

	let requestedMap = $derived(page.url.pathname.replace('/app/', '').replaceAll('/', '-'));
	let country = $derived(requestedMap.split('-').at(0));

	let map = $derived(import(`../../../lib/assets/maps/${country}/${requestedMap}.svg?raw`));

	function setupMap(node: HTMLDivElement) {
		$effect(() => {
			const svg = node.querySelector<SVGElement>('svg');
			if (svg !== null) {
				applyPanZoom(svg);
				applyAutoStroke(svg);
				setRegionStrokeColor(svg);
				loadSidebarTitle(svg);
				loadSidebarSources(svg);
				loadMapIdentifier(svg);
				loadActionGroups(svg);
			}
			loadRegionsForApp(node);

			const mapID = page.url.searchParams.get('m');
			const userMapID = page.url.searchParams.get('um');
			const useStore = page.url.searchParams.has('s');
			if (mapID) {
				getMap(mapID)
					.then(setLoadedMapFromJson)
					.then(() => gotoLoadedMap())
					.then(drawLoadedMap);
			} else if (userMapID) {
				getUserMap(userMapID)
					.then(setLoadedMapFromJson)
					.then(() => gotoLoadedMap())
					.then(drawLoadedMap);
			} else if (useStore) {
				drawLoadedMap();
			}
		});
	}
</script>

{#await map}
	<div class="flex justify-center w-full h-full">
		<span class="loading loading-ring loading-lg text-primary"></span>
	</div>
{:then map}
	<div
		use:setupMap
		id="map-div"
		class="overflow-hidden h-full outline-none"
		class:insets-hidden={$MapInsetsStore.hidden}
		class:texts-hidden={$RegionTextsStore.hidden}
	>
		{@html map.default}
	</div>
{/await}

<slot />
