<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import PenToSquare from '$lib/icons/PenToSquare.svelte';
	import {
		drawLoadedMap,
		getUserMap,
		gotoLoadedMap,
		setLoadedMapFromJson
	} from '$lib/stores/LoadedMap';
	import { RenameSavedMapModalStore } from '$lib/stores/Modals';
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	const {
		mapName,
		mapID,
		onUpdated
	}: {
		mapName: string;
		mapID: string;
		onUpdated: () => void;
	} = $props();

	let submitting = $state(false);

	async function deleteMap() {
		submitting = true;
		await $PocketBaseStore.collection('user_maps').delete(mapID);
		submitting = false;
		onUpdated();
	}

	async function renameMap() {
		$RenameSavedMapModalStore = {
			open: true,
			name: mapName,
			onRename: async (newName: string) => {
				await $PocketBaseStore.collection('user_maps').update(mapID, { name: newName });
				onUpdated();
			}
		};
	}

	async function openMap() {
		getUserMap(mapID)
			.then(setLoadedMapFromJson)
			.then(() => gotoLoadedMap({ s: true }))
			.then(drawLoadedMap);
	}
</script>

<div class="join z-20" data-map-id={mapID}>
	<button
		class="btn btn-sm flex-shrink flex-grow join-item overflow-hidden"
		onclick={openMap}
		disabled={submitting}
	>
		{mapName}
	</button>
	<div class="tooltip tooltip-left" data-tip="Rename">
		<button
			class="btn btn-sm flex-shrink !rounded-none"
			class:rounded-br-none={open}
			class:rounded-bl-sm={open}
			onclick={renameMap}
			disabled={submitting}
		>
			<PenToSquare class="w-6 h-6" />
		</button>
	</div>
	<div class="tooltip tooltip-left" data-tip="Delete">
		<button
			class="btn btn-sm btn-error flex-shrink join-item"
			onclick={deleteMap}
			disabled={submitting}
		>
			<MinusCircle class="w-6 h-6" />
		</button>
	</div>
</div>
