import { PocketBaseStore } from '$lib/stores/PocketBase';
import type { SortableEvent } from 'sortablejs';
import { get } from 'svelte/store';

export async function updateSavedMapFolder(evt: SortableEvent, newFolderID: string) {
	const mapID = evt.item.getAttribute('data-map-id');
	if (mapID) {
		return get(PocketBaseStore).collection('user_maps').update(mapID, {
			folder: newFolderID
		});
	}
}
