import { goto } from '$app/navigation';
import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
import { LoadedMapStore } from '$lib/stores/LoadedMap';
import { SavedMapSchema } from '$lib/types/SavedMap';

type Collection = 'maps' | 'account_maps';

async function openMap(collection: Collection, key: string, value: string): Promise<void> {
	const data = await fetch(
		`${PUBLIC_POCKETBASE_URI}/api/files/${collection}/${value}/data.json.gz`
	);
	const jsonData = await data.json();
	const savedFile = SavedMapSchema.safeParse(jsonData);

	if (!savedFile.success) {
		await goto('/app/usa/presidential/2022');
		return;
	}

	LoadedMapStore.set(savedFile.data);

	const country = encodeURIComponent(savedFile.data.map.country);
	const type = encodeURIComponent(savedFile.data.map.type);
	const year = encodeURIComponent(savedFile.data.map.year);

	await goto(`/app/${country}/${type}/${year}?${key}=${value}`);
}

export { openMap };
