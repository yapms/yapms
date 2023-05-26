<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
	import { SavedMapSchema } from '$lib/types/SavedMap';
	import { onMount } from 'svelte';
	import { loadFromJson } from '$lib/utils/loadMap';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';
	import HorizontalBattleChart from '$lib/components/chartbar/battlechart/BattleChart.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import { loadRegionsForView } from '../app/[country]/[map]/[year]/initialize/LoadRegions';

	const imports = import.meta.glob<typeof import('*?raw')>('$lib/assets/maps/*.svg', {
		query: { raw: '' }
	});

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

		mapName =
			savedFile.data.map.country + '-' + savedFile.data.map.type + '-' + savedFile.data.map.year;
		mapName = `/src/lib/assets/maps/${mapName}.svg`;

		LoadedMapStore.set(savedFile.data);
	});

	function setupMap(node: HTMLDivElement) {
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
		<div class="p-3">
			<CandidateBoxContainer />
			<div use:setupMap>
				{@html map.default}
			</div>
			<HorizontalBattleChart />
		</div>
	{/await}
{/if}
