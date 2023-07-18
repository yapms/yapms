<script lang="ts">
	import applyPanZoom from './initialize/ApplyPanZoom';
	import { loadFromJson } from '$lib/utils/loadMap';
	import { page } from '$app/stores';
	import { loadRegionsForApp } from './initialize/LoadRegions';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';

	//Glob import all maps in the maps directory so that we can check if a map exists and then load it.
	//Query section makes sure the SVG contents are imported raw.
	const imports = import.meta.glob<typeof import('*?raw')>('$lib/assets/maps/*/*.svg', {
		//Import from subdirectories
		query: { raw: '' }
	});

	//Strip directory information from import keys ("/src/lib/assets/maps/usa/usa-governors-2025.svg" to "usa-governors-2025.svg")
	for (const path in imports) {
		const fileName = path.split('/').pop();
		if (fileName !== undefined) {
			imports[fileName] = imports[path];
		}
		delete imports[path];
	}

	$: requestedMap = $page.url.pathname.replace('/app/', '').replaceAll('/', '-').concat('.svg');

	$: currentMap = imports[requestedMap] !== undefined ? requestedMap : 'usa-presidential-2022.svg';

	let isLoaded = false;

	// this should execute if the user enters
	// this page with a map ID
	$: if ($LoadedMapStore !== null && isLoaded) {
		loadFromJson($LoadedMapStore);
	}

	function setupMap(node: HTMLDivElement) {
		applyPanZoom(node);
		loadRegionsForApp(node);
		isLoaded = true;
		// this should execute if the users enters the
		// /app/ page with a map id
		if ($LoadedMapStore !== null) {
			loadFromJson($LoadedMapStore);
		}
	}
</script>

{#await imports[currentMap]()}
	<h1>Loading Map...</h1>
{:then importedMap}
	<div
		use:setupMap
		id="map-div"
		class="overflow-hidden h-full"
		class:insets-hidden={$MapInsetsStore.hidden}
	>
		{@html importedMap.default}
	</div>
{/await}
