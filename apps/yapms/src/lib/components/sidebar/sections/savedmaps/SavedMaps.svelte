<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { updateSavedMapFolder } from '$lib/utils/savedMaps';
	import { useSortable } from '$lib/utils/sortableHook.svelte';
	import SavedMap from './SavedMap.svelte';
	import SavedMapFolder from './SavedMapFolder.svelte';
	import SaveMap from './SaveMap.svelte';

	let maps = $state(
		$PocketBaseStore.collection('user_maps').getFullList({
			filter: "folder = ''"
		})
	);

	let folders = $state($PocketBaseStore.collection('user_map_folders').getFullList());

	function refreshMaps() {
		maps = $PocketBaseStore.collection('user_maps').getFullList({ filter: "folder = ''" });
		folders = $PocketBaseStore.collection('user_map_folders').getFullList();
	}

	let mapList = $state<HTMLDivElement | undefined>(undefined);

	useSortable(() => mapList, {
		animation: 140,
		dragoverBubble: true,
		delay: 250,
		delayOnTouchOnly: true,
		group: 'user-maps',
		sort: false,
		async onAdd(evt) {
			await updateSavedMapFolder(evt, '');
			refreshMaps();
		}
	});

	let openFolders = $state<Map<string, boolean>>(new Map<string, boolean>());

	function onFolderToggle(folderID: string) {
		if (openFolders.get(folderID) === true) {
			openFolders.set(folderID, false);
		} else {
			openFolders.set(folderID, true);
		}
	}
</script>

<div class="divider">Saved Maps</div>
<div class="flex flex-col gap-2 p-4">
	<SaveMap onSubmitted={refreshMaps} />
	{#await folders}
		<div class="flex justify-center">
			<span class="loading loading-dots loading-lg"></span>
		</div>
	{:then folders}
		{#each folders.sort((a, b) => a.name.localeCompare(b.name)) as folder}
			<SavedMapFolder
				folderName={folder.name}
				folderID={folder.id}
				onUpdated={refreshMaps}
				open={openFolders.get(folder.id) === true}
				onToggle={onFolderToggle}
			/>
		{/each}
	{/await}

	{#await maps}
		<div class="flex justify-center">
			<span class="loading loading-dots loading-lg"></span>
		</div>
	{:then maps}
		<div class="flex flex-col gap-2" bind:this={mapList}>
			{#each maps.sort((a, b) => a.name.localeCompare(b.name)) as map}
				<SavedMap mapName={map.name} mapID={map.id} onUpdated={refreshMaps} />
			{/each}
		</div>
	{/await}
</div>
