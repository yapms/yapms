import { PocketBaseStore } from '$lib/stores/PocketBase';
import type ExternalLink from '$lib/types/ExternalLink';
import { get } from 'svelte/store';

export async function getLinks(category: string) {
	let links = Array<ExternalLink>();

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
