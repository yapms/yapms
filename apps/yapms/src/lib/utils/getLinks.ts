import { PocketBaseStore } from '$lib/stores/PocketBase';
import type { Record } from 'pocketbase';
import { get } from 'svelte/store';

export async function getLinks(category: string) {
	let links = Array<Record>();

	try {
		const records = await get(PocketBaseStore)
			.collection('links')
			.getFullList({
				filter: `category = "${category}"`
			});
		links = records;
	} catch (error) {
		console.log(`Failed to fetch links:\n${error}`);
	}

	return links;
}
