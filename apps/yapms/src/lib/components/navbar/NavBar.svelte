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
	import VideoCamera from '$lib/icons/VideoCamera.svelte';
	import TrashSolid from '$lib/icons/TrashSolid.svelte';
	import HomeSolid from '$lib/icons/HomeSolid.svelte';
	import ArrowDownTray from '$lib/icons/ArrowDownTray.svelte';
	import Cog6Tooth from '$lib/icons/Cog6Tooth.svelte';
	import ShareSolid from '$lib/icons/ShareSolid.svelte';
	import PaintBrushSolid from '$lib/icons/PaintBrushSolid.svelte';
	import WrenchSolid from '$lib/icons/WrenchSolid.svelte';
	import UserCircleSolid from '$lib/icons/UserCircleSolid.svelte';
	import UserSolid from '$lib/icons/UserSolid.svelte';
	import CursorArrowRaysSolid from '$lib/icons/CursorArrowRaysSolid.svelte';

	let content: HTMLDivElement | undefined;
	let offsetWidth: number | undefined;

	$: isOverflow = offsetWidth && offsetWidth < (content?.scrollWidth ?? 0);

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
		<button class="btn btn-sm snap-start" on:click={openNavigateHomeModal}>
			<HomeSolid class="w-5 h-5" />
		</button>
		<button class="btn btn-sm btn-error snap-start" on:click={openClearMapModal}>
			<TrashSolid class="w-5 h-5" />
		</button>
		<div class="tooltip tooltip-right" data-tip="Edit Candidates">
			<button class="btn btn-sm snap-start" on:click={openCandidateModal}>
				<UserSolid class="w-5 h-5" />
			</button>
		</div>
		<button class="btn btn-sm snap-start" on:click={newImportedMap}>
			<ArrowDownTray class="w-5 h-5" />
		</button>
		<button class="btn btn-sm snap-start" on:click={openOptions}>
			<Cog6Tooth class="w-5 h-5" />
		</button>
		<button class="btn btn-sm snap-start" on:click={openMode}>
			<CursorArrowRaysSolid class="w-5 h-5" />
			<p class="font-bold">{$ModeStore.toUpperCase()}</p>
		</button>
		<button class="btn btn-sm snap-start" on:click={openShare}>
			<ShareSolid class="w-5 h-5" />
		</button>
		<button class="btn btn-sm snap-start" on:click={openTheme}>
			<PaintBrushSolid class="w-5 h-5" />
		</button>
		<button class="btn btn-sm snap-start" on:click={openTools}>
			<WrenchSolid class="w-5 h-5" />
		</button>
		<button class="btn btn-sm snap-end" on:click={openAuth}>
			<UserCircleSolid class="w-5 h-5" />
		</button>
	</div>
	<div class="divider divider-horizontal m-0 w-0" class:hidden={isOverflow === false}></div>
	<button class="btn btn-sm btn-neutral" on:click={togglePresentationMode}>
		<VideoCamera class="w-6 h-6" />
	</button>
	<button class="btn btn-sm btn-neutral ml-1" on:click={toggleSidebar}>
		{#if $SideBarStore.open}
			<ChevronDoubleRight class="w-6 h-6" />
		{:else}
			<ChevronDoubleLeft class="w-6 h-6" />
		{/if}
	</button>
</div>
