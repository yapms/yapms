<script lang="ts">
	import { newImportedMap } from '$lib/utils/importMap';
	import {
		ClearMapModalStore,
		CandidateModalStore,
		ModeModalStore,
		OptionsModalStore,
		ShareModalStore,
		AuthModalStore,
		ThemeModalStore
	} from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte';
	import { SideBarStore } from '$lib/stores/SideBar';
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	let content: HTMLDivElement | undefined;
	let offsetWidth: number | undefined;

	$: isOverflow = offsetWidth && offsetWidth < (content?.scrollWidth ?? 0);

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

	function toggleSidebar() {
		$SideBarStore = !$SideBarStore;
	}
</script>

<div class="navbar bg-base-200 overflow-y-clip min-h-0 z-10 px-0">
	<div
		class="flex-row overflow-x-scroll snap-x grow"
		bind:this={content}
		bind:offsetWidth
		class:pt-2={isOverflow}
		class:pb-3={isOverflow}
	>
		<a href="/" class="btn btn-sm snap-start">home</a>
		<button class="btn btn-sm btn-error snap-start" on:click={openClearMapModal}>clear</button>
		<button class="btn btn-sm snap-start" on:click={openCandidateModal}>candidates</button>
		<button class="btn btn-sm snap-start" on:click={newImportedMap}>import</button>
		<button class="btn btn-sm snap-start" on:click={openOptions}>options</button>
		<button class="btn btn-sm snap-start" on:click={openMode}>mode: {$ModeStore}</button>
		<button class="btn btn-sm snap-start" on:click={openShare}>share</button>
		<button class="btn btn-sm snap-start" on:click={openTheme}>theme</button>
		<button class="btn btn-sm snap-end" on:click={openAuth}
			>{$PocketBaseStore.authStore.isValid ? 'account' : 'login'}</button
		>
	</div>
	<div class="divider divider-horizontal m-0 w-0" class:hidden={isOverflow === false} />
	<button class="btn btn-sm btn-neutral mx-2" on:click={toggleSidebar}>
		{#if $SideBarStore}
			<ChevronDoubleRight class="w-6 h-6" />
		{:else}
			<ChevronDoubleLeft class="w-6 h-6" />
		{/if}
	</button>
</div>
