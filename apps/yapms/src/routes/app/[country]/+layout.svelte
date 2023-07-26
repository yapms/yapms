<script lang="ts">
	import { loadFromJson } from '$lib/utils/loadMap';
	import { page } from '$app/stores';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';
	import { applyPanZoom } from '$lib/utils/applyPanZoom';
	import { loadRegionsForApp } from '$lib/utils/loadRegions';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	type ImportedFile = typeof import('*?raw');
	type ImportedFilePromise = () => Promise<ImportedFile>;

	// import all files from $lib/assets/maps/
	const importedFiles = import.meta.glob<ImportedFile>('$lib/assets/maps/*/*.svg', {
		query: { raw: '' }
	});

	const maps = new Map<string, ImportedFilePromise>();

	for (const key in importedFiles) {
		const filename = key.split('/').pop();
		const promise = importedFiles[key];
		if (filename !== undefined) {
			maps.set(filename, promise);
		}
	}

	const requestedMap = $page.url.pathname.replace('/app/', '').replaceAll('/', '-').concat('.svg');

	const currentMap = maps.get(requestedMap) ?? maps.get('usa-presidential-2022-blank.svg');

	if (browser && maps.has(requestedMap) === false) {
		goto('/app/usa/presidential/2022/blank', { replaceState: true });
	}

	let isLoaded = false;

	function setupMap(node: HTMLDivElement) {
		const svg = node.querySelector<SVGElement>('svg');
		if (svg !== null) {
			applyPanZoom(svg);
		}
		loadRegionsForApp(node);
		isLoaded = true;
	}

	$: if ($LoadedMapStore !== null && isLoaded) {
		loadFromJson($LoadedMapStore);
	}
</script>

{#if currentMap !== undefined}
	{#await currentMap()}
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
{/if}
