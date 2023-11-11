<script lang="ts">
	import Fa from 'svelte-fa';
	import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
	import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	let links = $PocketBaseStore.collection('social_links').getFullList();

	function getIcon(name: string) {
		const brandIcon = BrandIcons[name as keyof typeof BrandIcons];
		const solidIcon = SolidIcons[name as keyof typeof SolidIcons];

		if (brandIcon !== undefined) {
			return brandIcon;
		} else if (solidIcon !== undefined) {
			return solidIcon;
		}
	}
</script>

<div class="flex flex-row flex-wrap gap-2 justify-center">
	{#await links}
		<span class="loading loading-ring"></span>
	{:then links}
		{#each links as link}
			<a class="btn btn-sm px-4 flex-nowrap flex-grow gap-2" target="_blank" href={link.URL}>
				<Fa icon={getIcon(link.faIcon)} />
				<span>{link.label}</span>
			</a>
		{/each}
	{:catch error}
		{error.status}
	{/await}
</div>
