import { goto } from '$app/navigation';
import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
import type SavedMap from '$lib/types/SavedMap';
import { SavedMapSchema } from '$lib/types/SavedMap';
import { writable } from 'svelte/store';
import { LoadingErrorModalStore } from './Modals';

export const LoadedMapStore = writable<SavedMap | null>(null);

export async function loadUserMap(mapKey: string) {
	await loadMap('user_maps', 'um', mapKey);
}

export async function loadPublicMap(mapKey: string) {
	await loadMap('maps', 'm', mapKey);
}

async function loadMap(collection: string, urlKey: string, mapKey: string) {
	const data = await fetch(
		`${PUBLIC_POCKETBASE_URI}/api/files/${collection}/${mapKey}/data.json.gz`
	);
	const jsonData = await data.json();
	const savedFile = SavedMapSchema.safeParse(jsonData);

	if (savedFile.success === false) {
		LoadingErrorModalStore.set({
			open: true
		});
		await goto('/app/usa/presidential/2022/blank');
		return;
	}

	LoadedMapStore.set(savedFile.data);

	const country = encodeURIComponent(savedFile.data.map.country);
	const type = encodeURIComponent(savedFile.data.map.type);
	const year = encodeURIComponent(savedFile.data.map.year);
	const variant = encodeURIComponent(savedFile.data.map.variant);

	await goto(`/app/${country}/${type}/${year}/${variant}?${urlKey}=${mapKey}`);
}
