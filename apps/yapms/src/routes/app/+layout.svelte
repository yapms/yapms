<script lang="ts">
	import { page } from '$app/stores';
	import '$lib/styles/global.css';
	import '$lib/styles/roboto-swap.css';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		const url = get(page).url;

		const isInAppRoot = url.pathname === '/app';

		const publicMapKey = url.searchParams.get('m');
		const userMapKey = url.searchParams.get('um');

		if (publicMapKey !== null) {
			await loadPublicMap(publicMapKey);
		} else if (userMapKey !== null) {
			await loadUserMap(userMapKey);
		} else if (isInAppRoot) {
			goto('/app/usa/presidential/2024');
		}
	});
</script>

<slot />

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
