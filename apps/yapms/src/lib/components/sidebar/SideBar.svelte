<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { SideBarStore } from '$lib/stores/SideBar';
	import { PresentationModeStore } from '$lib/stores/PresentationMode';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';
	import { afterUpdate, onMount } from 'svelte';
	import Shortcuts from './sections/shortcuts/Shortcuts.svelte';
	import SavedMaps from './sections/savedmaps/SavedMaps.svelte';
	import Sources from './sections/sources/Sources.svelte';
	import SocialLinkGrid from '../links/SocialLinkGrid.svelte';
	import RegionSearch from './sections/regionsearch/RegionSearch.svelte';

	afterUpdate(reapplyPanZoom);

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	let ads: any;
	onMount(async () => {
		ads = (await import('$lib/components/sidebar/sections/ads/SideBarAds.svelte')).default;
	});
</script>

<div
	class="z-10 h-full flex absolute right-0 md:relative md:basis-3/12 max-w-lg"
	class:hidden={$SideBarStore.open === false || $PresentationModeStore.enabled === true}
>
	<div class="divider divider-horizontal w-0 m-0 flex" />
	<div class="overflow-y-auto bg-base-100 w-full px-4 md:px-0">
		<div class="flex flex-wrap justify-center p-2">
			<SocialLinkGrid />
		</div>
		<h1 class="text-xl text-center font-bold">{$SideBarStore.title}</h1>

		<svelte:component this={ads} />
		<Shortcuts />
		<RegionSearch />
		{#if $PocketBaseStore.authStore.isValid}
			<SavedMaps />
		{/if}
		<Sources />
	</div>
</div>
