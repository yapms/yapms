<script lang="ts">
	import { newImportedMap } from '$lib/utils/importMap';
	import {
		ClearMapModalStore,
		CandidateModalStore,
		ModeModalStore,
		OptionsModalStore,
		ShareModalStore,
		AuthModalStore,
		ThemeModalStore,
		NavigateHomeModalStore,
		ToolsModalStore
	} from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';
	import { PresentationModeStore } from '$lib/stores/PresentationMode';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte';
	import { SideBarStore } from '$lib/stores/SideBar';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import VideoCamera from '$lib/icons/VideoCamera.svelte';

	let content: HTMLDivElement | undefined;
	let offsetWidth: number | undefined = $state(undefined);

	const isOverflow = $derived(offsetWidth && offsetWidth < (content?.scrollWidth ?? 0));

	function openNavigateHomeModal() {
		$NavigateHomeModalStore.open = true;
	}

	function openClearMapModal() {
		$ClearMapModalStore.open = true;
	}

	function openCandidateModal() {
		$CandidateModalStore.open = true;
	}

	function openOptions() {
		$OptionsModalStore.open = true;
	}

	function openMode() {
		$ModeModalStore.open = true;
	}

	function openShare() {
		$ShareModalStore.open = true;
	}

	function openTheme() {
		$ThemeModalStore.open = true;
	}

	function openAuth() {
		$AuthModalStore.open = true;
	}

	function openTools() {
		$ToolsModalStore.open = true;
	}

	function toggleSidebar() {
		$SideBarStore.open = !$SideBarStore.open;
	}

	function togglePresentationMode() {
		$PresentationModeStore.enabled = !$PresentationModeStore.enabled;
	}
</script>

<div class="navbar bg-base-300 min-h-0 z-10">
	<div
		class="inline-flex gap-1 grow overflow-x-auto"
		style:scrollbar-width="thin"
		bind:this={content}
		bind:offsetWidth
	>
		<button class="btn btn-sm snap-start" onclick={openNavigateHomeModal}>Home</button>
		<button class="btn btn-sm btn-error snap-start" onclick={openClearMapModal}>Clear</button>
		<button class="btn btn-sm snap-start" onclick={openCandidateModal}>Candidates</button>
		<button class="btn btn-sm snap-start" onclick={newImportedMap}>Custom</button>
		<button class="btn btn-sm snap-start" onclick={openOptions}>Options</button>
		<button class="btn btn-sm snap-start" onclick={openMode}
			>Mode: <b>{$ModeStore.toUpperCase()}</b></button
		>
		<button class="btn btn-sm snap-start" onclick={openShare}>Share</button>
		<button class="btn btn-sm snap-start" onclick={openTheme}>Theme</button>
		<button class="btn btn-sm snap-start" onclick={openTools}>Tools</button>
		<button class="btn btn-sm snap-end" onclick={openAuth}
			>{$PocketBaseStore.authStore.isValid ? 'Account' : 'Login'}</button
		>
	</div>
	<div class="divider divider-horizontal m-0 w-0" class:hidden={isOverflow === false}></div>
	<button class="btn btn-sm btn-neutral" onclick={togglePresentationMode}>
		<VideoCamera class="w-6 h-6" />
	</button>
	<button class="btn btn-sm btn-neutral ml-1" onclick={toggleSidebar}>
		{#if $SideBarStore.open}
			<ChevronDoubleRight class="w-6 h-6" />
		{:else}
			<ChevronDoubleLeft class="w-6 h-6" />
		{/if}
	</button>
</div>
