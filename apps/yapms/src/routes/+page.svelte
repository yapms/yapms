<script lang="ts">
	import HomePageSidebar from '$lib/components/homepage/HomePageSidebar.svelte';
	import MapSelectionGrid from '$lib/components/homepage/MapSelectionGrid.svelte';
	import MapSelectionTitle from '$lib/components/homepage/MapSelectionTitle.svelte';
	import Login from '$lib/icons/Login.svelte';
	import Swatch from '$lib/icons/Swatch.svelte';
	import mapSelectSections from '$lib/assets/homedata/MapSelection.json';
	import ThemeModal from '$lib/components/modals/thememodal/ThemeModal.svelte';
	import { ImportModalStore, AuthModalStore, ThemeModalStore } from '$lib/stores/Modals';
	import MapSelectionCard from '$lib/components/homepage/MapSelectionCard.svelte';
	import MoreMapsModal from '$lib/components/modals/moremapsmodal/MoreMapsModal.svelte';
	import MapSearch from '$lib/components/homepage/MapSearch.svelte';
	import BetaModal from '$lib/components/modals/betamodal/BetaModal.svelte';
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import ImportModal from '$lib/components/modals/importmodal/ImportModal.svelte';
	import AuthModal from '$lib/components/modals/authmodal/AuthModal.svelte';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import type { PageData } from './$types';

	export let data: PageData;

	function openThemeModal() {
		ThemeModalStore.set({
			...$ThemeModalStore,
			open: true
		});
	}

	function openImportModal() {
		ImportModalStore.set({
			...$ImportModalStore,
			open: true
		});
	}

	function openAuthModal() {
		AuthModalStore.set({
			...$AuthModalStore,
			open: true
		});
	}
</script>

<svelte:head>
	<title>YAPms - Yet Another Political Map Simulator</title>
</svelte:head>

<div class="flex flex-col h-full overflow-hidden">
	<div class="navbar bg-base-200">
		<div class="navbar-start">
			<button class="btn px-8 btn-primary mr-2 hidden md:inline" on:click={openImportModal}
				>Import</button
			>
			<button class="btn btn-square mr-2 inline md:hidden" on:click={openImportModal}
				><ArrowUpTray class="h-8 m-auto" /></button
			>
		</div>
		<div class="navbar-center">
			<h1 class="text-2xl font-bold m-auto hidden lg:inline">
				Yet Another Political Map Simulator
			</h1>
			<h1 class="text-2xl font-bold m-auto inline lg:hidden">YAPms</h1>
		</div>
		<div class="navbar-end">
			<button class="btn px-8 btn-primary mr-2 hidden md:inline" on:click={openThemeModal}
				>Theme</button
			>
			<button class="btn btn-square mr-2 inline md:hidden" on:click={openThemeModal}
				><Swatch class="h-8 m-auto" /></button
			>
			<button class="btn px-8 btn-primary mr-2 hidden md:inline" on:click={openAuthModal}
				>{$PocketBaseStore.authStore.isValid ? 'Account' : 'Login'}</button
			>
			<button class="btn btn-square mr-2 inline md:hidden" on:click={openAuthModal}
				><Login class="h-8 m-auto" /></button
			>
		</div>
	</div>

	<div class="flex flex-row h-full overflow-hidden">
		<HomePageSidebar />
		<div class="divider md:divider-horizontal ml-0 w-0 !mr-0" />
		<div class="flex-1 md:px-5 overflow-auto overflow-x-clip pb-4">
			<MapSearch data={data.post.search} />
			{#each mapSelectSections as section}
				<MapSelectionTitle title={section.title} />
				<MapSelectionGrid>
					{#each section.cards as card}
						<MapSelectionCard
							name={card.name}
							bg={card.bg}
							alt={card.alt}
							doubleCols={card.doubleCols}
							attribution={card.attribution}
							links={card.links}
							modals={card.modals}
						/>
					{/each}
				</MapSelectionGrid>
			{/each}
		</div>
	</div>
</div>

<ImportModal />

<MoreMapsModal />

<ThemeModal />

<AuthModal />

<BetaModal />
