<script lang="ts">
	import { page } from '$app/state';
	import '$lib/styles/global.css';
	import {
		drawLoadedMap,
		getMap,
		getUserMap,
		LoadedMapStore,
		setLoadedMapFromJson
	} from '$lib/stores/LoadedMap';
	import HorizontalBattleChart from '$lib/components/charts/battlechart/BattleChart.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import { loadRegionsForView } from '$lib/utils/loadRegions';
	import { applyAutoStroke, applyFastPanZoom } from '$lib/utils/applyPanZoom';
	import { browser } from '$app/environment';
	import { setRegionStrokeColor } from '$lib/stores/RegionStrokeColorStore';

	let filename = $state(undefined as string | undefined);
	let countryPath = $state(undefined as string | undefined);
	let map = $derived(
		filename !== undefined && countryPath !== undefined
			? import(`../../lib/assets/maps/${countryPath}/${filename}.svg?raw`)
			: undefined
	);

	if (browser) {
		const mapID = page.url.searchParams.get('m');
		const userMapID = page.url.searchParams.get('um');

		if (mapID) {
			getMap(mapID)
				.then(setLoadedMapFromJson)
				.then(() => {
					if ($LoadedMapStore) {
						const { country, type, year, variant } = $LoadedMapStore.map;
						countryPath = country;
						filename = [country, type, year, variant]
							.filter((path) => path !== undefined)
							.join('-');
					}
				});
		} else if (userMapID) {
			getUserMap(userMapID)
				.then(setLoadedMapFromJson)
				.then(() => {
					if ($LoadedMapStore) {
						const { country, type, year, variant } = $LoadedMapStore.map;
						countryPath = country;
						filename = [country, type, year, variant]
							.filter((path) => path !== undefined)
							.join('-');
					}
				});
		}
	}

	function setupMap(node: HTMLDivElement) {
		$effect(() => {
			const svg = node.querySelector<SVGElement>('svg');
			if (svg !== null) {
				applyAutoStroke(svg);
				applyFastPanZoom(svg);
				setRegionStrokeColor(svg);
			}
			loadRegionsForView(node);
			drawLoadedMap();
		});
	}
</script>

<svelte:head>
	<title>YAPms View</title>
</svelte:head>

{#if map !== undefined}
	{#await map then map}
		<div class="flex flex-col h-full p-3">
			<CandidateBoxContainer selectable={false} transitions={false} />
			<div class="grow"></div>
			<div use:setupMap id="map-div" class="overflow-hidden">
				{@html map.default}
			</div>
			<div class="grow"></div>
			<div>
				<HorizontalBattleChart transitions={false} />
			</div>
		</div>
	{/await}
{/if}
