<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import SavedMap from './SavedMap.svelte';
	import SaveMap from './SaveMap.svelte';

	let maps = getMaps();

	function getMaps() {
		return $PocketBaseStore.collection('user_maps').getFullList();
	}

	function refreshMaps() {
		maps = getMaps();
	}
</script>

<div class="divider">Saved Maps</div>
<div class="flex flex-col gap-2 p-4">
	<SaveMap on:submitted={refreshMaps} />
	{#await maps}
		<div class="flex justify-center">
			<span class="loading loading-dots loading-lg" />
		</div>
	{:then theMaps}
		{#each theMaps as map}
			<SavedMap mapName={map.name} mapId={map.id} on:submitted={refreshMaps} />
		{/each}
	{/await}
</div>
