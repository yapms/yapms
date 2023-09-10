<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
	import '$lib/styles/global.css';
	import { SavedMapSchema } from '$lib/types/SavedMap';
	import { onMount } from 'svelte';
	import { loadFromJson } from '$lib/utils/loadMap';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';
	import HorizontalBattleChart from '$lib/components/charts/battlechart/BattleChart.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import { loadRegionsForView } from '$lib/utils/loadRegions';
	import { applyAutoStroke } from '$lib/utils/applyPanZoom';

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

	let mapName: null | string = null;
	$: mapPromise = mapName !== null ? imports[mapName]() : null;

	onMount(async () => {
		const url = $page.url;
		const m = url.searchParams.get('m');
		const data = await fetch(`${PUBLIC_POCKETBASE_URI}/api/files/maps/${m}/data.json.gz`);
		const savedFile = SavedMapSchema.safeParse(await data.json());
		if (!savedFile.success) {
			return;
		}

		if (savedFile.data.map.year !== undefined && savedFile.data.map.variant !== undefined) {
			mapName =
				savedFile.data.map.country +
				'-' +
				savedFile.data.map.type +
				'-' +
				savedFile.data.map.year +
				'-' +
				savedFile.data.map.variant;
		} else {
			mapName = savedFile.data.map.country + '-' + savedFile.data.map.type;
		}

		mapName = `${mapName}.svg`;

		LoadedMapStore.set(savedFile.data);
	});

	function setupMap(node: HTMLDivElement) {
		const svg = node.querySelector<SVGElement>('svg');
		if (svg !== null) {
			applyAutoStroke(svg);
		}
		loadRegionsForView(node);
		if ($LoadedMapStore !== null) {
			loadFromJson($LoadedMapStore);
		}
	}
</script>

<svelte:head>
	<title>YAPms View</title>
</svelte:head>

{#if mapPromise !== null}
	{#await mapPromise then map}
		<div class="flex flex-col h-full p-3">
			<CandidateBoxContainer selectable={false} />
			<div class="grow" />
			<div use:setupMap id="map-div" class="overflow-hidden">
				{@html map.default}
			</div>
			<div class="grow" />
			<div>
				<HorizontalBattleChart />
			</div>
		</div>
	{/await}
{/if}
