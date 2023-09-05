<script lang="ts">
	import Fa from 'svelte-fa';
	import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
	import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
	import type { Record } from 'pocketbase';
	import type { IconDefinition, IconPack, IconPrefix } from '@fortawesome/free-brands-svg-icons';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { onMount } from 'svelte';

	export let category: string;

	let linkPromise: Promise<Array<Record>> = Promise.resolve([]);

	onMount(() => {
		linkPromise = getLinks(category);
	});

	async function getLinks(category: string) {
		let links = Array<Record>();

		try {
			const records = await $PocketBaseStore.collection('links').getFullList({
				filter: `category = "${category}"`
			});
			links = records;
		} catch (error) {
			console.log(`Failed to fetch links:\n${error}`);
		}

		return links;
	}

	function getIcon(name: string) {
		const brandIcon = BrandIcons[name as keyof typeof BrandIcons];
		const solidIcon = SolidIcons[name as keyof typeof SolidIcons];

		if (brandIcon !== undefined) {
			return brandIcon;
		} else if (solidIcon !== undefined) {
			return solidIcon;
		}
	}

	let icons = Array<IconDefinition | IconPrefix | IconPack | undefined>();
</script>

<div class="flex flex-row flex-wrap gap-2 justify-center">
	{#await linkPromise}
		<span class="loading loading-ring"></span>
	{:then links}
		{#each links as link}
			<a class="btn btn-block btn-sm w-fit px-4 flex-nowrap flex-grow gap-2" href={link.URL}>
				<Fa icon={getIcon(link.faIcon)} />
				<span>{link.label}</span>
			</a>
		{/each}
	{/await}
</div>
