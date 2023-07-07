<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import EditCandidateModal from '$lib/components/modals/editcandidatemodal/EditCandidateModal.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MapModal from '$lib/components/modals/mapmodal/MapModal.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import ClearMapModal from '$lib/components/modals/clearmapmodal/ClearMapModal.svelte';
	import applyPanZoom from './initialize/ApplyPanZoom';
	import EditRegionModal from '$lib/components/modals/editregionmodal/EditRegionModal.svelte';
	import ModeModal from '$lib/components/modals/modemodal/ModeModal.svelte';
	import { InteractionStore } from '$lib/stores/Interaction';
	import { ChartPositionStore, ChartTypeStore } from '$lib/stores/Chart';
	import { CandidatesStore } from '$lib/stores/Candidates';
	import { LogoStore } from '$lib/stores/Logo';
	import AddCandidateModal from '$lib/components/modals/addcandidatemodal/AddCandidateModal.svelte';
	import BattleChart from '$lib/components/chartbar/battlechart/BattleChart.svelte';
	import ChartBar from '$lib/components/chartbar/ChartBar.svelte';
	import PresetColorsModal from '$lib/components/modals/presetcolorsmodal/PresetColorsModal.svelte';
	import ChartOptionsModal from '$lib/components/modals/chartoptionsmodal/ChartOptionsModal.svelte';
	import AuthModal from '$lib/components/modals/authmodal/AuthModal.svelte';
	import StyleModal from '$lib/components/modals/stylemodal/StyleModal.svelte';
	import ShareModal from '$lib/components/modals/sharemodal/ShareModal.svelte';
	import { loadFromJson } from '$lib/utils/loadMap';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';
	import LoadingErrorModal from '$lib/components/modals/loadingerrormodal/LoadingErrorModal.svelte';
	import { page } from '$app/stores';
	import SplitRegionModal from '$lib/components/modals/splitregionmodal/SplitRegionModal.svelte';
	import EditTossupModal from '$lib/components/modals/edittossupmodal/EditTossupModal.svelte';
	import { loadRegionsForApp } from './initialize/LoadRegions';
	import ImportModal from '$lib/components/modals/importmodal/ImportModal.svelte';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';

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

	//Take the path (/app/[country]/[name]/[year]), remove /app/ & replace the remaining / with - to match map file names.
	const mapName = $page.url.pathname.replace('/app/', '').replaceAll('/', '-');

	//Make sure that even if map requested doesn't load, something loads.
	let currentMap = 'usa-presidential-2022.svg';
	//If the map defined by slugs is found, use that map
	if (imports[`${mapName}.svg`] !== undefined) {
		currentMap = `${mapName}.svg`;
	}

	let isLoaded = false;

	// this should execute if the user enters
	// this page with a map ID
	$: if ($LoadedMapStore !== null && isLoaded) {
		loadFromJson($LoadedMapStore);
	}

	let logoSize: { width: string | undefined; height: string | undefined } = {
		width: '100%',
		height: '100%'
	};

	$: if ($ChartPositionStore === 'bottom' && $ChartTypeStore !== 'battle') {
		logoSize = { width: 'auto', height: '50%' };
	} else if ($ChartPositionStore === 'bottom' && $ChartTypeStore === 'battle') {
		logoSize = { width: 'auto', height: '100%' };
	} else if ($ChartPositionStore === 'left' && $ChartTypeStore !== 'battle') {
		logoSize = { width: '50%', height: 'auto' };
	} else if ($ChartPositionStore === 'left' && $ChartTypeStore === 'battle') {
		logoSize = { width: '100%', height: 'auto' };
	}

	onMount(() => {
		themeChange(false);
	});

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
			<div
				class="flex justify-center items-center m-3 gap-4 overflow-hidden"
				class:hidden={$ChartTypeStore === 'none'}
				class:flex-row={$ChartPositionStore === 'bottom'}
				class:flex-col={$ChartPositionStore === 'left'}
				class:w-32={$ChartPositionStore === 'left' && $ChartTypeStore === 'battle'}
				class:h-32={$ChartPositionStore === 'bottom' && $ChartTypeStore === 'battle'}
				class:w-96={$ChartPositionStore === 'left' && $ChartTypeStore !== 'battle'}
				class:h-80={$ChartPositionStore === 'bottom' && $ChartTypeStore !== 'battle'}
			>
				{#if $ChartTypeStore === 'battle' && $CandidatesStore.length <= 2}
					<BattleChart />
				{:else}
					<ChartBar />
				{/if}
				{#if $LogoStore !== null}
					<img
						class="aspect-square"
						style:width={logoSize.width}
						style:height={logoSize.height}
						alt=""
						src={$LogoStore}
					/>
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
			</div>
		</div>
		<SideBar />
	</div>
</div>

<ClearMapModal />

<EditCandidateModal />

<EditTossupModal />

<SplitRegionModal />

<AddCandidateModal />

<PresetColorsModal />

<EditRegionModal />

<MapModal />

<ChartOptionsModal />

<ModeModal />

<StyleModal />

<ShareModal />

<AuthModal />

<LoadingErrorModal />

<ImportModal />
