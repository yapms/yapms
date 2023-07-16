<script lang="ts">
	import { page } from '$app/stores';
	import '$lib/styles/global.css';
	import '$lib/styles/roboto-swap.css';
	import { get } from 'svelte/store';
	import { loadPublicMap, loadUserMap } from '$lib/stores/LoadedMap';
	import { goto } from '$app/navigation';
	import ClearMapModal from '$lib/components/modals/clearmapmodal/ClearMapModal.svelte';
	import EditCandidateModal from '$lib/components/modals/editcandidatemodal/EditCandidateModal.svelte';
	import EditTossupModal from '$lib/components/modals/edittossupmodal/EditTossupModal.svelte';
	import SplitRegionModal from '$lib/components/modals/splitregionmodal/SplitRegionModal.svelte';
	import AddCandidateModal from '$lib/components/modals/addcandidatemodal/AddCandidateModal.svelte';
	import PresetColorsModal from '$lib/components/modals/presetcolorsmodal/PresetColorsModal.svelte';
	import EditRegionModal from '$lib/components/modals/editregionmodal/EditRegionModal.svelte';
	import MapModal from '$lib/components/modals/mapmodal/MapModal.svelte';
	import ChartOptionsModal from '$lib/components/modals/chartoptionsmodal/ChartOptionsModal.svelte';
	import ModeModal from '$lib/components/modals/modemodal/ModeModal.svelte';
	import StyleModal from '$lib/components/modals/stylemodal/StyleModal.svelte';
	import AuthModal from '$lib/components/modals/authmodal/AuthModal.svelte';
	import LoadingErrorModal from '$lib/components/modals/loadingerrormodal/LoadingErrorModal.svelte';
	import ShareModal from '$lib/components/modals/sharemodal/ShareModal.svelte';
	import ShareDisabledModal from '$lib/components/modals/sharedisabledmodal/ShareDisabledModal.svelte';
	import ImportModal from '$lib/components/modals/importmodal/ImportModal.svelte';
	import { InteractionStore } from '$lib/stores/Interaction';
	import { browser } from '$app/environment';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import { ChartPositionStore } from '$lib/stores/Chart';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import ChartArea from '$lib/components/chartarea/ChartArea.svelte';

	if (browser) {
		const url = get(page).url;

		const isInAppRoot = url.pathname === '/app';

		const publicMapKey = url.searchParams.get('m');
		const userMapKey = url.searchParams.get('um');

		if (publicMapKey !== null) {
			loadPublicMap(publicMapKey);
		} else if (userMapKey !== null) {
			loadUserMap(userMapKey);
		} else if (isInAppRoot) {
			goto('/app/usa/presidential/2024');
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		$InteractionStore.set(event.code, true);
	}

	function handleKeyUp(event: KeyboardEvent) {
		$InteractionStore.delete(event.code);
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
			<ChartArea />
			<div class="overflow-hidden w-full h-full">
				<CandidateBoxContainer />
				<slot />
			</div>
		</div>
		<SideBar />
	</div>
</div>

<MapModal />

<ClearMapModal />

<EditCandidateModal />

<EditTossupModal />

<EditRegionModal />

<SplitRegionModal />

<AddCandidateModal />

<PresetColorsModal />

<ChartOptionsModal />

<ModeModal />

<StyleModal />

<AuthModal />

<LoadingErrorModal />

<ShareModal />

<ShareDisabledModal />

<ImportModal />
