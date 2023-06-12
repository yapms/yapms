<script lang="ts">
	import {
		ClearMapModalStore,
		MapModalStore,
		AddCandidateModalStore,
		ModeModalStore,
		ChartOptionsModalStore,
		StyleModalStore,
		ShareModalStore,
		LoginModalStore
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

	function openMapModal() {
		MapModalStore.set({
			...$MapModalStore,
			open: true
		});
	}

	function openAddCandidateModal() {
		AddCandidateModalStore.set({
			...$AddCandidateModalStore,
			open: true
		});
	}

	function openChartOptions() {
		ChartOptionsModalStore.set({
			...$ChartOptionsModalStore,
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
	<button class="btn btn-sm" on:click={openClearMapModal}>clear</button>
	<button class="btn btn-sm" on:click={openMapModal}>maps</button>
	<button class="btn btn-sm" on:click={openAddCandidateModal}>add candidate</button>
	<button class="btn btn-sm" on:click={openStyle}>style</button>
	<button class="btn btn-sm" on:click={openChartOptions}>chart options</button>
	<button class="btn btn-sm" on:click={openMode}>mode: {$ModeStore}</button>
	<button class="btn btn-sm" on:click={openShare}>share</button>
	<button class="btn btn-sm" on:click={openLogin}>login</button>
	<div class="grow" />
	<button class="btn btn-sm" on:click={toggleSidebar}>
		{#if $SideBarStore}
			<ChevronDoubleRight class="w-6 h-6" />
		{:else}
			<ChevronDoubleLeft class="w-6 h-6" />
		{/if}
	</button>
</div>
