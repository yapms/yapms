<script lang="ts">
	import Fa from 'svelte-fa';
	import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
	import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	let links = $PocketBaseStore.collection('social_links').getFullList();

	function isIconDefinition(
		faItem: BrandIcons.IconDefinition | BrandIcons.IconPrefix | BrandIcons.IconPack
	): faItem is BrandIcons.IconDefinition {
		return (
			(faItem as BrandIcons.IconDefinition).iconName !== undefined &&
			(faItem as BrandIcons.IconDefinition).prefix !== undefined &&
			(faItem as BrandIcons.IconDefinition).icon !== undefined
		);
	}

	function getIcon(name: string) {
		const brandIcon = BrandIcons[name as keyof typeof BrandIcons];
		const solidIcon = SolidIcons[name as keyof typeof SolidIcons];

		if (isIconDefinition(brandIcon)) {
			return brandIcon;
		}

		if (isIconDefinition(solidIcon)) {
			return solidIcon;
		}

		return SolidIcons.faLink;
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
