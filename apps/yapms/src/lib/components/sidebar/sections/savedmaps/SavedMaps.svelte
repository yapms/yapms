<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import SavedMap from './SavedMap.svelte';
	import SaveMap from './SaveMap.svelte';

	$: maps = $PocketBaseStore.collection('user_maps').getFullList();

	function refreshMaps() {
		maps = $PocketBaseStore.collection('user_maps').getFullList();
	}
</script>

<div class="divider">Saved Maps</div>
<div class="flex flex-col gap-2 p-4">
	<SaveMap onSubmitted={refreshMaps} />
	{#await maps}
		<div class="flex justify-center">
			<span class="loading loading-dots loading-lg" />
		</div>
	{:then maps}
		{#each maps.sort((a, b) => a.name.localeCompare(b.name)) as map}
			<SavedMap mapName={map.name} mapID={map.id} onDeleted={refreshMaps} />
		{/each}
	{/await}
</div>
