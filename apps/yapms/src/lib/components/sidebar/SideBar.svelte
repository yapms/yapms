<script lang="ts">
	import { page } from '$app/stores';
	import titles from '$lib/assets/other/Titles.json';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { SideBarStore } from '$lib/stores/SideBar';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';
	import { afterUpdate } from 'svelte';
	import Shortcuts from './sections/shortcuts/Shortcuts.svelte';
	import SavedMaps from './sections/savedmaps/SavedMaps.svelte';
	import Sources from './sections/sources/Sources.svelte';
	import SocialLinkGrid from '../links/SocialLinkGrid.svelte';

	$: title = titles.find((elem) => elem.path === $page.url.pathname)?.title ?? 'YAPms';

	afterUpdate(reapplyPanZoom);
</script>

{#if $SideBarStore}
	<div class="z-10 h-full flex absolute right-0 md:relative md:basis-3/12 max-w-lg">
		<div class="divider divider-horizontal w-0 m-0 flex" />
		<div class="overflow-y-auto bg-base-100 w-full px-4 md:px-0">
			<div class="flex flex-wrap justify-center p-2">
				<SocialLinkGrid />
			</div>
			<h1 class="text-xl text-center font-bold">{title}</h1>
			<Shortcuts />
			{#if $PocketBaseStore.authStore.isValid}
				<SavedMaps />
			{/if}
			<Sources />
		</div>
	</div>
{/if}
