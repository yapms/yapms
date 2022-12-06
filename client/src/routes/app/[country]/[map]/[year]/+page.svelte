<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import EditCandidateModal from '$lib/components/modals/editcandidatemodal/EditCandidateModal.svelte';
	import ChartBar from '$lib/components/chartbar/ChartBar.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MapModal from '$lib/components/modals/mapmodal/MapModal.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import loadRegions from './initialize/LoadRegions';
	import ClearMapModal from '$lib/components/modals/clearmapmodal/ClearMapModal.svelte';
	import applyPanZoom from './initialize/ApplyPanZoom';
	import EditRegionModal from '$lib/components/modals/editregionmodal/EditRegionModal.svelte';
	import { get } from 'svelte/store';
	import { InteractionStore } from '$lib/stores/Interaction';

	const imports = {
		usa: () => import('$lib/assets/usa.svg?raw'),
		nz: () => import('$lib/assets/nz.svg?raw')
	};

	let currentMap = 'usa' as keyof typeof imports;

	onMount(() => {
		themeChange(false);
	});

	function setupMap(node: HTMLDivElement) {
		applyPanZoom(node);
		loadRegions(node);
	}

	//Array of codes for keys used for functionality.
	const validKeyCodes = ["KeyF"];

	function handleKeyDown(e: KeyboardEvent) {
		if (validKeyCodes.indexOf(e.code) !== -1) { //Check if key used for functionality
			let interactions = get(InteractionStore);
			interactions.push("KeyF");
			InteractionStore.set(interactions);
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (validKeyCodes.indexOf(e.code) !== -1) { //Check if key used for functionality
			let interactions = get(InteractionStore);
			interactions = interactions.filter(code => code !== e.code); //Remove code for key released
			InteractionStore.set(interactions);
		}
	}
</script>

<svelte:head>
	<title>YAPms</title>
</svelte:head>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp}></svelte:window>

<div class="flex flex-col h-full">
	<NavBar />
	<div class="flex flex-row h-full">
		<div class="flex flex-grow flex-row basis-9/12">
			<div class="flex basis-3/12 justify-center items-center">
				<ChartBar />
			</div>
			<div class="divider divider-horizontal ml-0 mr-0 w-0" />
			<div class="basis-9/12 overflow-hidden">
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

<EditRegionModal />

<MapModal />
