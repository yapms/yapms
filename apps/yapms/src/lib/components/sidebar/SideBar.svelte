<script lang="ts">
	import { page } from '$app/stores';
	import titles from '$lib/assets/other/Titles.json';
	import { SideBarStore } from '$lib/stores/SideBar';
	import SavedMaps from './sections/savedmaps/SavedMaps.svelte';
	import SocialMedia from './sections/SocialMedia.svelte';

	$: title = titles.find((elem) => elem.path === $page.url.pathname)?.title ?? 'YAPms';
</script>

{#if $SideBarStore}
	<div class="divider divider-horizontal w-0 m-0 hidden md:flex" />
	<div class="basis-3/12 max-w-md hidden md:inline overflow-hidden">
		<SocialMedia />
		<h1 class="text-xl text-center font-bold">{title}</h1>
		<div class="divider">Shortcuts</div>
		<SavedMaps />
	</div>
{/if}
