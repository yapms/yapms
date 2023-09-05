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
	import ExternalLinkGrid from '../links/ExternalLinkGrid.svelte';
	import { getLinks } from '$lib/utils/getLinks';

	$: title = titles.find((elem) => elem.path === $page.url.pathname)?.title ?? 'YAPms';

	afterUpdate(reapplyPanZoom);
</script>

{#if $SideBarStore}
	<div class="divider divider-horizontal w-0 m-0 hidden md:flex" />
	<div class="basis-3/12 max-w-md hidden md:inline overflow-y-auto">
		<div class="flex flex-wrap justify-center p-2">
			<ExternalLinkGrid linkPromise={getLinks('social')} />
		</div>
		<h1 class="text-xl text-center font-bold">{title}</h1>
		<Shortcuts />
		{#if $PocketBaseStore.authStore.isValid}
			<SavedMaps />
		{/if}
		<Sources />
	</div>
{/if}
