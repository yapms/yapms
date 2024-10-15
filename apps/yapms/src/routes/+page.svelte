<script lang="ts">
	import MapCardGrid from '$lib/components/mapcard/MapCardGrid.svelte';
	import Login from '$lib/icons/Login.svelte';
	import Swatch from '$lib/icons/Swatch.svelte';
	import ThemeModal from '$lib/components/modals/thememodal/ThemeModal.svelte';
	import { ImportModalStore, AuthModalStore, ThemeModalStore } from '$lib/stores/Modals';
	import MoreMapsModal from '$lib/components/modals/moremapsmodal/MoreMapsModal.svelte';
	import MapSearch from '$lib/components/mapsearch/MapSearch.svelte';
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import ImportModal from '$lib/components/modals/importmodal/ImportModal.svelte';
	import AuthModal from '$lib/components/modals/authmodal/AuthModal.svelte';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import type { PageData } from './$types';
	import UsaMapCard from '$lib/components/mapcard/mapcards/USAMapCard.svelte';
	import CanMapCard from '$lib/components/mapcard/mapcards/CANMapCard.svelte';
	import BraMapCard from '$lib/components/mapcard/mapcards/BRAMapCard.svelte';
	import MexMapCard from '$lib/components/mapcard/mapcards/MEXMapCard.svelte';
	import DeuMapCard from '$lib/components/mapcard/mapcards/DEUMapCard.svelte';
	import DnkMapCard from '$lib/components/mapcard/mapcards/DNKMapCard.svelte';
	import FraMapCard from '$lib/components/mapcard/mapcards/FRAMapCard.svelte';
	import GbrMapCard from '$lib/components/mapcard/mapcards/GBRMapCard.svelte';
	import ItaMapCard from '$lib/components/mapcard/mapcards/ITAMapCard.svelte';
	import NldMapCard from '$lib/components/mapcard/mapcards/NLDMapCard.svelte';
	import NzlMapCard from '$lib/components/mapcard/mapcards/NZLMapCard.svelte';
	import AusMapCard from '$lib/components/mapcard/mapcards/AUSMapCard.svelte';
	import UsaCongressionalMapCard from '$lib/components/mapcard/mapcards/USACongressionalMapCard.svelte';
	import UsaPresidentialMapCard from '$lib/components/mapcard/mapcards/USAPresidentialMapCard.svelte';
	import UsaStateSenateMapCard from '$lib/components/mapcard/mapcards/USAStateSenateMapCard.svelte';
	import UsaStateHouseMapCard from '$lib/components/mapcard/mapcards/USAStateHouseMapCard.svelte';
	import CanProvincesMapCard from '$lib/components/mapcard/mapcards/CANProvincesMapCard.svelte';
	import UpdatesSidebar from '$lib/components/updatessidebar/UpdatesSidebar.svelte';
	import ZafMapCard from '$lib/components/mapcard/mapcards/ZAFMapCard.svelte';
	import GlbMapCard from '$lib/components/mapcard/mapcards/GLBMapCard.svelte';
	import KorMapCard from '$lib/components/mapcard/mapcards/KORMapCard.svelte';
	import JpnMapCard from '$lib/components/mapcard/mapcards/JPNMapCard.svelte';
	import CanHistoricalMapCard from '$lib/components/mapcard/mapcards/CANHistoricalMapCard.svelte';
	import PrtMapCard from '$lib/components/mapcard/mapcards/PRTMapCard.svelte';
	import IrlMapCard from '$lib/components/mapcard/mapcards/IRLMapCard.svelte';
	import GrcMapCard from '$lib/components/mapcard/mapcards/GRCMapCard.svelte';
	import NorMapCard from '$lib/components/mapcard/mapcards/NORMapCard.svelte';
	import UsaPrimariesMapCard from '$lib/components/mapcard/mapcards/USAPrimariesMapCard.svelte';
	import SvnMapCard from '$lib/components/mapcard/mapcards/SVNMapCard.svelte';
	import IndMapCard from '$lib/components/mapcard/mapcards/INDMapCard.svelte';
	import UsaCanMapCard from '$lib/components/mapcard/mapcards/USACANMapCard.svelte';
	import EspMapCard from '$lib/components/mapcard/mapcards/ESPMapCard.svelte';

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
	<meta name="description" content="Create and share maps of countries across the world." />
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
		<UpdatesSidebar />
		<div class="divider md:divider-horizontal ml-0 w-0 !mr-0" />
		<div class="flex-1 md:px-5 overflow-auto overflow-x-clip pb-4">
			<MapSearch data={data.post.search} />

			<MapCardGrid>
				<UsaMapCard />
				<UsaPrimariesMapCard />
				<GbrMapCard />
				<CanMapCard />
				<AusMapCard />

				<BraMapCard />
				<DnkMapCard />
				<FraMapCard />
				<DeuMapCard />
				<GrcMapCard />
				<IndMapCard />
				<IrlMapCard />
				<ItaMapCard />
				<JpnMapCard />
				<MexMapCard />
				<NldMapCard />
				<NzlMapCard />
				<NorMapCard />
				<PrtMapCard />
				<SvnMapCard />
				<ZafMapCard />
				<KorMapCard />
				<EspMapCard />

				<GlbMapCard />
			</MapCardGrid>

			<MapCardGrid title="State & Provincial Maps">
				<UsaStateSenateMapCard />
				<UsaStateHouseMapCard />
				<CanProvincesMapCard />
			</MapCardGrid>

			<MapCardGrid title="Historical Maps">
				<UsaCongressionalMapCard />
				<UsaPresidentialMapCard />
				<CanHistoricalMapCard />
			</MapCardGrid>

			<MapCardGrid title="Fantasy">
				<UsaCanMapCard />
			</MapCardGrid>
		</div>
	</div>
</div>

<ImportModal />

<MoreMapsModal />

<ThemeModal />

<AuthModal />
