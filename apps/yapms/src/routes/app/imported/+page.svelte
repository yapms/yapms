<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import { ChartPositionStore, ChartTypeStore } from '$lib/stores/Chart';
	import { CandidatesStore } from '$lib/stores/Candidates';
	import HorizontalBattleChart from '$lib/components/chartbar/battlechart/BattleChart.svelte';
	import ChartBar from '$lib/components/chartbar/ChartBar.svelte';
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

<div class="flex flex-col h-full">
	{#if $ImportedSVGStore.loaded}
		<NavBar />
		<div class="flex flex-row h-full overflow-hidden">
			<div
				class="flex flex-grow basis-9/12"
				class:flex-col-reverse={$ChartPositionStore === 'bottom'}
				class:flex-row={$ChartPositionStore === 'left'}
			>
				<div
					class="flex justify-center items-center ml-3 mr-3 mt-3 mb-3"
					class:hidden={$ChartTypeStore === 'none'}
				>
					{#if $ChartTypeStore === 'battle' && $CandidatesStore.length <= 2}
						<HorizontalBattleChart />
					{:else if $ChartTypeStore === 'pie'}
						<ChartBar />
					{:else}
						<ChartBar />
					{/if}
				</div>

				<div
					class="divider"
					class:divider-vertical={$ChartPositionStore === 'bottom'}
					class:h-0={$ChartPositionStore === 'bottom'}
					class:mb-0={$ChartPositionStore === 'bottom'}
					class:mt-0={$ChartPositionStore === 'bottom'}
					class:divider-horizontal={$ChartPositionStore === 'left'}
					class:w-0={$ChartPositionStore === 'left'}
					class:mr-0={$ChartPositionStore === 'left'}
					class:ml-0={$ChartPositionStore === 'left'}
				/>

				<div class="overflow-hidden w-full h-full">
					<CandidateBoxContainer />
					<div
						use:setupMap
						id="map-div"
						class="overflow-hidden h-full"
						class:insetsHidden={$MapInsetsStore.hidden}
					>
						{@html $ImportedSVGStore.content}
					</div>
				</div>
			</div>
			<SideBar />
		</div>
	{/if}
</div>
