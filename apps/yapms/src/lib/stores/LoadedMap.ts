import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
import type { SavedMap } from '$lib/types/SavedMap';
import { SavedMapSchema } from '$lib/types/SavedMap';
import { get, writable } from 'svelte/store';

export const LoadedMapStore = writable<SavedMap | null>(null);

export async function loadUserMapFromID(id: string) {
	const newURL = new URL(get(page).url);
	newURL.search = '';
	newURL.searchParams.set('um', id);
	loadMapFromURL(newURL);
}

export async function loadMapFromURL(url: URL, navigate: boolean = true): Promise<boolean> {
	const m = url.searchParams.get('m');
	const um = url.searchParams.get('um');

	const collection = m ? 'maps' : 'user_maps';
	const id = m ?? um;

	if (id === null) {
		return false;
	}

	const data = await fetch(`${PUBLIC_POCKETBASE_URI}/api/files/${collection}/${id}/data.json.gz`);
	const jsonData = await data.json();
	const parsedData = SavedMapSchema.safeParse(jsonData);

	if (parsedData.success === false) {
		return false;
	}

	const param = collection === 'maps' ? 'm' : 'um';
	const { country, type, year, variant } = parsedData.data.map;
	const neededURL = ['/app', country, type, year, variant]
		.filter((path) => path !== undefined)
		.join('/')
		.concat(`?${param}=${id}`);

	if (navigate) {
		await goto(neededURL);
	}

	LoadedMapStore.set(parsedData.data);
	return true;
}
