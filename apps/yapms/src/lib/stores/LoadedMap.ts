import { goto } from '$app/navigation';
import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
import type SavedMap from '$lib/types/SavedMap';
import { SavedMapSchema } from '$lib/types/SavedMap';
import { writable } from 'svelte/store';
import { LoadingErrorModalStore } from './Modals';

export const LoadedMapStore = writable<SavedMap | null>(null);

async function loadMap(collection: 'maps' | 'user_maps', key: string, value: string) {
	const data = await fetch(
		`${PUBLIC_POCKETBASE_URI}/api/files/${collection}/${value}/data.json.gz`
	);
	const jsonData = await data.json();
	const savedFile = SavedMapSchema.safeParse(jsonData);

	if (!savedFile.success) {
		console.log(savedFile.error);
		LoadingErrorModalStore.set({
			open: true
		});
		await goto('/app/usa/presidential/2022');
		return;
	}

	LoadedMapStore.set(savedFile.data);

	console.log(savedFile.data);

	const country = encodeURIComponent(savedFile.data.map.country);
	const type = encodeURIComponent(savedFile.data.map.type);
	const year = encodeURIComponent(savedFile.data.map.year);

	await goto(`/app/${country}/${type}/${year}?${key}=${value}`);
}

export { loadMap };
