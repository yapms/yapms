<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { SideBarStore } from '$lib/stores/SideBar';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';
	import { afterUpdate, onMount } from 'svelte';
	import Shortcuts from './sections/shortcuts/Shortcuts.svelte';
	import SavedMaps from './sections/savedmaps/SavedMaps.svelte';
	import Sources from './sections/sources/Sources.svelte';
	import SocialLinkGrid from '../links/SocialLinkGrid.svelte';
	import RegionSearch from './sections/regionsearch/RegionSearch.svelte';

	afterUpdate(reapplyPanZoom);

	onMount(() => {
		window.googletag.cmd.push(function () {
			window.googletag.display('div-gpt-ad-1698618618626-0');
		});
	});
</script>

<div
	class="z-10 h-full flex absolute right-0 md:relative md:basis-3/12 max-w-lg"
	class:hidden={$SideBarStore.open === false}
>
	<div class="divider divider-horizontal w-0 m-0 flex" />
	<div class="overflow-y-auto bg-base-100 w-full px-4 md:px-0">
		<div class="flex flex-wrap justify-center p-2">
			<SocialLinkGrid />
		</div>
		<h1 class="text-xl text-center font-bold">{$SideBarStore.title}</h1>

		<!-- /21838847269/yapms-sidebar -->
		<div
			id="div-gpt-ad-1698618618626-0"
			style="min-width: 200px; min-height: 200px;"
			class="flex justify-center"
		/>
		<Shortcuts />
		<RegionSearch />
		{#if $PocketBaseStore.authStore.isValid}
			<SavedMaps />
		{/if}
		<Sources />
	</div>
</div>
