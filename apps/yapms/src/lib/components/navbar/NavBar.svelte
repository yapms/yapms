<script lang="ts">
	import { page } from '$app/stores';
	import { newImportedMap } from '$lib/utils/importMap';
	const importPage = $page.url.pathname === '/app/imported';
	import {
		ClearMapModalStore,
		CandidateModalStore,
		ModeModalStore,
		OptionsModalStore,
		StyleModalStore,
		ShareModalStore,
		LoginModalStore,
		ShareDisabledModalStore
	} from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';
	import ChevronDoubleRight from '$lib/icons/ChevronDoubleRight.svelte';
	import ChevronDoubleLeft from '$lib/icons/ChevronDoubleLeft.svelte';
	import { SideBarStore } from '$lib/stores/SideBar';

	function openClearMapModal() {
		ClearMapModalStore.set({
			...$ClearMapModalStore,
			open: true
		});
	}

	function openCandidateModal() {
		$CandidateModalStore.open = true;
	}

	function openOptions() {
		OptionsModalStore.set({
			...$OptionsModalStore,
			open: true
		});
	}

	function openMode() {
		ModeModalStore.set({
			...$ModeModalStore,
			open: true
		});
	}

	function openStyle() {
		StyleModalStore.set({
			...$StyleModalStore,
			open: true
		});
	}

	function openShare() {
		ShareModalStore.set({
			...$ShareModalStore,
			open: true
		});
	}

	function openShareDisabled() {
		ShareDisabledModalStore.set({
			...$ShareDisabledModalStore,
			open: true
		});
	}

	function openLogin() {
		LoginModalStore.set({
			...$LoginModalStore,
			open: true
		});
	}

	function toggleSidebar() {
		$SideBarStore = !$SideBarStore;
	}
</script>

<div
	class="navbar flex-row bg-base-200 gap-3 overflow-x-scroll overflow-y-clip lg:overflow-x-clip min-h-0"
>
	<a href="/" class="btn btn-sm">home</a>
	<button class="btn btn-sm btn-error" on:click={openClearMapModal}>clear</button>
	<button class="btn btn-sm" on:click={openCandidateModal}>candidates</button>
	<button class="btn btn-sm" on:click={newImportedMap}>import</button>
	<button class="btn btn-sm" on:click={openStyle}>style</button>
	<button class="btn btn-sm" on:click={openOptions}>options</button>
	<button class="btn btn-sm" on:click={openMode}>mode: {$ModeStore}</button>
	{#if importPage}
		<button class="btn btn-sm" on:click={openShareDisabled}>share</button>
	{:else}
		<button class="btn btn-sm" on:click={openShare}>share</button>
	{/if}
	<button class="btn btn-sm" on:click={openLogin}>login</button>
	<div class="grow" />
	<button class="btn btn-sm hidden md:flex" on:click={toggleSidebar}>
		{#if $SideBarStore}
			<ChevronDoubleRight class="w-6 h-6" />
		{:else}
			<ChevronDoubleLeft class="w-6 h-6" />
		{/if}
	</button>
</div>
