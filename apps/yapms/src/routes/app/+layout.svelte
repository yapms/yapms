<script lang="ts">
	import '$lib/styles/global.css';
	import ClearMapModal from '$lib/components/modals/clearmapmodal/ClearMapModal.svelte';
	import SplitRegionModal from '$lib/components/modals/splitregionmodal/SplitRegionModal.svelte';
	import EditRegionModal from '$lib/components/modals/editregionmodal/EditRegionModal.svelte';
	import OptionsModal from '$lib/components/modals/optionsmodal/OptionsModal.svelte';
	import ModeModal from '$lib/components/modals/modemodal/ModeModal.svelte';
	import AuthModal from '$lib/components/modals/authmodal/AuthModal.svelte';
	import LoadingErrorModal from '$lib/components/modals/loadingerrormodal/LoadingErrorModal.svelte';
	import ShareModal from '$lib/components/modals/sharemodal/ShareModal.svelte';
	import ImportModal from '$lib/components/modals/importmodal/ImportModal.svelte';
	import CandidateModal from '$lib/components/modals/candidatemodal/CandidateModal.svelte';
	import { InteractionStore } from '$lib/stores/Interaction';
	import { handleCandidateSelectionShortcut } from '$lib/stores/Candidates';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';
	import MapChartContainer from '$lib/components/mapchartcontainer/MapChartContainer.svelte';
	import EditCandidateModal from '$lib/components/modals/candidatemodal/EditCandidateModal.svelte';
	import EditTossupModal from '$lib/components/modals/candidatemodal/EditTossupModal.svelte';
	import AddCandidateModal from '$lib/components/modals/candidatemodal/AddCandidateModal.svelte';
	import PresetColorsModal from '$lib/components/modals/candidatemodal/presetcolors/PresetColorsModal.svelte';
	import AddCustomColorModal from '$lib/components/modals/candidatemodal/customcolors/AddCustomColorModal.svelte';
	import EditCustomColorModal from '$lib/components/modals/candidatemodal/customcolors/EditCustomColorModal.svelte';
	import ThemeModal from '$lib/components/modals/thememodal/ThemeModal.svelte';
	import RegionTooltip from '$lib/components/tooltips/RegionTooltip.svelte';
	import { browser } from '$app/environment';
	import { SideBarStore } from '$lib/stores/SideBar';
	import NavigateHomeModal from '$lib/components/modals/navigatehomemodal/NavigateHomeModal.svelte';
	import { PresentationModeStore } from '$lib/stores/PresentationMode';
	import PresentationNavBar from '$lib/components/navbar/PresentationNavBar.svelte';
	import ToolsModal from '$lib/components/modals/toolsmodal/ToolsModal.svelte';

	function handleKeyDown(event: KeyboardEvent) {
		$InteractionStore.set(event.code, true);

		if (event.target instanceof Element && event.target.id === 'map-div') {
			if (event.code === 'KeyR') {
				reapplyPanZoom();
			}
			handleCandidateSelectionShortcut(event.code);
		}
	}

	function handleKeyUp(event: KeyboardEvent) {
		$InteractionStore.delete(event.code);
	}

	function handleOnFocusOut() {
		$InteractionStore.clear();
	}

	if (browser) {
		if (innerWidth > 768) {
			$SideBarStore.open = true;
		}
	}
</script>

<svelte:head>
	<title>YAPms</title>
	<meta name="robots" content="nosnippet" />
</svelte:head>

<svelte:window
	on:keydown={handleKeyDown}
	on:keyup={handleKeyUp}
	on:resize={reapplyPanZoom}
	on:focusout={handleOnFocusOut}
/>

<div class="flex flex-col h-full">
	{#if $PresentationModeStore.enabled}
		<PresentationNavBar />
	{:else}
		<NavBar />
	{/if}
	<div class="flex flex-row h-full overflow-hidden">
		<MapChartContainer>
			<slot />
		</MapChartContainer>
		<SideBar />
	</div>
</div>

<NavigateHomeModal />

<ClearMapModal />

<CandidateModal />

<AddCandidateModal />

<EditCandidateModal />

<EditTossupModal />

<EditRegionModal />

<SplitRegionModal />

<PresetColorsModal />

<AddCustomColorModal />

<EditCustomColorModal />

<OptionsModal />

<ModeModal />

<ThemeModal />

<AuthModal />

<LoadingErrorModal />

<ShareModal />

<ImportModal />

<ToolsModal />

<RegionTooltip />
