<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCardLinkGroup from './MapCardLinkGroup.svelte';

	export let name: string;
	export let bg: string;
	export let imageLinks: HomeLinkData[];
	export let groups: { label: string; routes: HomeLinkData[] }[];
	export let full: boolean = false;
	export let square: boolean = false;

	const image = import(`../../assets/images/countries/${bg}/blended.webp`);

	// If on mobile:
	// If more than one group, show the first link from the first two groups.
	// If one group only, show the first two links from that group.
	// If only one group with one link, show only that one link.
	// If no groups, you screwed up, but I was nice and wrote a fallback.
	const mobileLinks = !groups
		? []
		: groups.length > 1
			? [groups[0].routes[0], groups[1].routes[0]]
			: groups[0].routes.length > 1
				? [groups[0].routes[0], groups[0].routes[1]]
				: [groups[0].routes[0]];

	function openMoreMapsModal() {
		const arr: HomeLinkData[] = [];
		const links = groups.reduce((accum, group) => accum.concat(group.routes), arr);
		MoreMapsModalStore.set({
			buttons: links,
			title: `${name} Maps`,
			open: true
		});
	}

	function openAttributionModal() {
		MoreMapsModalStore.set({
			buttons: imageLinks,
			title: `${name} Images`,
			open: true
		});
	}
</script>

<div
	class="card before:!opacity-65 image-full h-58 lg:h-48 col-span-2 lg:col-span-2 3xl:max-w-4xl 3xl:col-span-1"
	class:sm:col-span-1={!square && !full}
	class:xl:col-span-1={square || !full}
	class:xl:row-span-2={square}
	class:xl:h-100={square}
>
	{#await image then image}
		<figure><img class="w-full object-left" src={image.default} alt={name} /></figure>
	{/await}
	<div class="card-body justify-between h-58 lg:h-48" class:xl:h-100={square}>
		<h2 class="card-title text-white truncate text-2xl lg:text-3xl overflow-visible">{name}</h2>
		<div
			class="hidden sm:flex flex-col items-end space-y-4 lg:flex-row lg:justify-between lg:space-y-0"
			class:xl:flex-col={square}
			class:xl:h-full={square}
			class:xl:mt-8={square}
		>
			<div
				class="inline-flex flex-row flex-wrap items-end overflow-hidden w-full h-22 gap-6 py-1 lg:w-4/5"
				class:xl:h-50={square}
				class:xl:w-full={square}
				class:xl:justify-center={square}
			>
				{#each groups as group}
					<MapCardLinkGroup name={group.label} links={group.routes} />
				{/each}
			</div>
			<button class="btn btn-md btn-primary" on:click={openMoreMapsModal}>Browse All Maps </button>
		</div>
		<!-- Mobile Buttons -->
		<div class="flex flex-col items-center space-y-2 sm:hidden">
			<div class="w-48 flex-wrap space-y-2">
				{#each mobileLinks as link}
					<a href={link.route} class="btn btn-sm btn-accent btn-block">
						{link.label}
					</a>
				{/each}
			</div>
			<button class="btn btn-sm btn-primary w-48" on:click={openMoreMapsModal}
				>Browse All Maps
			</button>
		</div>
		<button
			on:click={openAttributionModal}
			class="absolute top-0 right-0 w-6 m-2 cursor-pointer"
		>
			<InformationCircle />
		</button>
	</div>
</div>
