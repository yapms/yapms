<script lang="ts">
	import { page } from '$app/stores';
	import titles from '$lib/assets/other/Titles.json';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { SideBarStore } from '$lib/stores/SideBar';
	import SavedMaps from './sections/savedmaps/SavedMaps.svelte';
	import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';

	$: title = titles.find((elem) => elem.path === $page.url.pathname)?.title ?? 'YAPms';
</script>

{#if $SideBarStore}
	<div class="divider divider-horizontal w-0 m-0 hidden md:flex" />
	<div class="basis-3/12 max-w-md hidden md:inline overflow-y-auto">
		<div class="flex flex-wrap justify-center gap-2 p-2">
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faReddit} />
				Reddit
			</button>
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faTwitter} />
				Twitter
			</button>
		</div>
		<h1 class="text-xl text-center font-bold">{title}</h1>
		<div class="divider">Shortcuts</div>
		{#if $PocketBaseStore.authStore.isValid}
			<SavedMaps />
		{/if}
	</div>
{/if}
