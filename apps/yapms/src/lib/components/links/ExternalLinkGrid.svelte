<script lang="ts">
	import Fa from 'svelte-fa';
	import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
	import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
	import type { Record } from 'pocketbase';
	import type { IconDefinition, IconPack, IconPrefix } from '@fortawesome/free-brands-svg-icons';

	export let linkPromise: Promise<Array<Record>>;

	let icons = Array<IconDefinition | IconPrefix | IconPack | undefined>();

	linkPromise.then((links) => {
		icons = links.map((link) => {
			if (BrandIcons[link.faIcon as keyof typeof BrandIcons] !== undefined) {
				return BrandIcons[link.faIcon as keyof typeof BrandIcons];
			}
			if (SolidIcons[link.faIcon as keyof typeof SolidIcons] !== undefined) {
				return SolidIcons[link.faIcon as keyof typeof SolidIcons];
			}
			return undefined;
		});
	});
</script>

<div class="flex flex-row flex-wrap gap-2 justify-center">
	{#await linkPromise}
		<span class="loading loading-ring"></span>
	{:then links}
		{#each links as link, index}
			<a class="btn btn-block btn-sm w-fit px-4 flex-nowrap flex-grow gap-2" href={link.URL}>
				<Fa icon={icons[index]} />
				<span>{link.label}</span>
			</a>
		{/each}
	{/await}
</div>
