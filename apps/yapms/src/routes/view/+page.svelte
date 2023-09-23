<script lang="ts">
	import { page } from '$app/stores';
	import '$lib/styles/global.css';
	import { loadFromJson } from '$lib/utils/loadMap';
	import { LoadedMapStore, loadMapFromURL } from '$lib/stores/LoadedMap';
	import HorizontalBattleChart from '$lib/components/charts/battlechart/BattleChart.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import { loadRegionsForView } from '$lib/utils/loadRegions';
	import { applyAutoStroke, applyPanZoom } from '$lib/utils/applyPanZoom';
	import { browser } from '$app/environment';

	$: filename = undefined as string | undefined;
	$: countryPath = undefined as string | undefined;
	$: map =
		filename !== undefined && countryPath !== undefined
			? import(`../../lib/assets/maps/${countryPath}/${filename}.svg?raw`)
			: undefined;

	if (browser) {
		loadMapFromURL($page.url, false).then(() => {
			if ($LoadedMapStore === null) {
				return;
			}
			const { country, type, year, variant } = $LoadedMapStore.map;
			countryPath = country;
			filename = [country, type, year, variant].filter((path) => path !== undefined).join('-');
		});
	}

	function setupMap(node: HTMLDivElement) {
		const svg = node.querySelector<SVGElement>('svg');
		if (svg !== null) {
			applyAutoStroke(svg);
			applyPanZoom(svg);
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

{#if map !== undefined}
	{#await map then map}
		<div class="flex flex-col h-full p-3">
			<CandidateBoxContainer selectable={false} />
			<div class="grow" />
			<div use:setupMap id="map-div" class="overflow-hidden">
				{@html map.default}
			</div>
			<div class="grow" />
			<div>
				<HorizontalBattleChart transitions={true} />
			</div>
		</div>
	{/await}
{/if}
