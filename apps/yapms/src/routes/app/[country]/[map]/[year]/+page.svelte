<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import EditCandidateModal from '$lib/components/modals/editcandidatemodal/EditCandidateModal.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MapModal from '$lib/components/modals/mapmodal/MapModal.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import loadRegions from './initialize/LoadRegions';
	import ClearMapModal from '$lib/components/modals/clearmapmodal/ClearMapModal.svelte';
	import applyPanZoom from './initialize/ApplyPanZoom';
	import EditRegionModal from '$lib/components/modals/editregionmodal/EditRegionModal.svelte';
	import ModeModal from '$lib/components/modals/modemodal/ModeModal.svelte';
	import { InteractionStore } from '$lib/stores/Interaction';
	import { ChartPositionStore, ChartTypeStore } from '$lib/stores/Chart';
	import { CandidatesStore } from '$lib/stores/Candidates';
	import AddCandidateModal from '$lib/components/modals/addcandidatemodal/AddCandidateModal.svelte';
	import HorizontalBattleChart from '$lib/components/chartbar/battlechart/BattleChart.svelte';
	import ChartBar from '$lib/components/chartbar/ChartBar.svelte';
	import PresetColorsModal from '$lib/components/modals/presetcolorsmodal/PresetColorsModal.svelte';
	import ChartTypeModal from '$lib/components/modals/charttypemodal/ChartTypeModal.svelte';
	import AuthModal from '$lib/components/modals/authmodal/AuthModal.svelte';
	import StyleModal from '$lib/components/modals/stylemodal/StyleModal.svelte';

	const imports = {
		usa: () => import('$lib/assets/usa.svg?raw'),
		nz: () => import('$lib/assets/nz.svg?raw')
	};

	const currentMap = 'usa' as keyof typeof imports;

	onMount(() => {
		themeChange(false);
	});

	function setupMap(node: HTMLDivElement) {
		applyPanZoom(node);
		loadRegions(node);
	}

	function handleKeyDown(e: KeyboardEvent) {
		$InteractionStore = $InteractionStore.set(e.code, true); //Set the key code to "true" in the map
	}

	function handleKeyUp(e: KeyboardEvent) {
		$InteractionStore.delete(e.code); //Remove the key code from the map.. map.delete() returns a boolean??
		$InteractionStore = $InteractionStore; //Tell the store it updated
	}
</script>

<svelte:head>
	<title>YAPms</title>
</svelte:head>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="flex flex-col h-full">
	<NavBar />
	<div class="flex flex-row h-full overflow-hidden">
		<div
			class="flex flex-grow basis-9/12"
			class:flex-col-reverse={$ChartPositionStore === 'bottom'}
			class:flex-row={$ChartPositionStore === 'left'}
		>
			<div class="flex justify-center items-center ml-3 mr-3 mt-3 mb-3">
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
				{#await imports[currentMap]() then module}
					<div use:setupMap class="overflow-hidden h-full">
						{@html module.default}
					</div>
				{/await}
			</div>
		</div>
		<SideBar />
	</div>
</div>

<ClearMapModal />

<EditCandidateModal />

<AddCandidateModal />

<PresetColorsModal />

<EditRegionModal />

<MapModal />

<ChartTypeModal />

<ModeModal />

<StyleModal />

<AuthModal />
