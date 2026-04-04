<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCardLinkGroup from './MapCardLinkGroup.svelte';

	export let name: string;
	export let bg: string;
	export let attribution: HomeLinkData[];
	export let groups: HomeGroupData[];
	export let full: boolean = false;
	export let square: boolean = false;

	const image = import(`../../assets/images/countries/${bg}/blended.webp`);

	// If on Mobile:
	// If 4 groups or greater, show the first link from the first four groups.
	// If two groups, show the first two links from the first two groups. Show less if two per group are not available.
	// If one group, show the first 4 links from that group, showing less if less than 4 are available.
	// If no groups, you messed up. This will return an empty array and show nothing.
	function getMobileLinks() {
		if (groups.length >= 4) {
			return [groups[0].routes[0], groups[1].routes[0], groups[2].routes[0], groups[3].routes[0]];
		} else if (groups.length >= 2) {
			return [...groups[0].routes.slice(0, 2), ...groups[1].routes.slice(0, 2)];
		} else if (groups.length === 1) {
			return groups[0].routes.slice(0, 4);
		} else {
			return [];
		}
	}

	const mobileLinks = getMobileLinks();

	function openMoreMapsModal() {
		const arr: HomeLinkData[] = [];
		const links = groups.reduce(
			(accum, group) => (group.showInModal ? accum.concat(group.routes) : accum),
			arr
		);
		MoreMapsModalStore.set({
			buttons: links,
			title: `${name} Maps`,
			open: true
		});
	}

	function openAttributionModal() {
		MoreMapsModalStore.set({
			buttons: attribution,
			title: `${name} Images`,
			open: true
		});
	}
</script>

<div
	class="card before:!opacity-65 image-full h-52 lg:h-40 col-span-2 lg:col-span-2"
	class:sm:col-span-1={!square && !full}
	class:xl:col-span-1={square || !full}
	class:xl:row-span-2={square}
	class:xl:h-82={square}
>
	{#await image}
		<figure><div class="w-full h-full bg-base-content"></div></figure>
	{:then image}
		<figure><img class="w-full object-center" src={image.default} alt={name} /></figure>
	{/await}
	<div class="card-body justify-between h-52 lg:h-40 overflow-hidden py-4" class:xl:h-82={square}>
		<h2 class="card-title text-white text-lg sm:text-xl lg:text-2xl max-h-10">
			{name}
		</h2>
		<div
			class="hidden sm:flex flex-col items-end space-y-2 lg:flex-row lg:justify-between lg:space-y-0"
			class:xl:flex-col={square}
			class:xl:h-full={square}
			class:xl:mt-4={square}
		>
			<div
				class="inline-flex flex-row flex-wrap items-end overflow-hidden w-full h-20 gap-4 py-1 lg:pr-4 lg:w-4/5"
				class:xl:h-45={square}
				class:xl:w-full={square}
				class:xl:justify-center={square}
			>
				{#each groups.filter((g) => g.showOnCard) as group}
					<MapCardLinkGroup label={group.label} links={group.routes} />
				{/each}
			</div>
			<button class="btn btn-md btn-primary" on:click={openMoreMapsModal}>All Maps </button>
		</div>
		<!-- Mobile Buttons -->
		<div class="flex flex-col items-center space-y-2 sm:hidden">
			<div
				class="grid gap-2 w-full"
				class:grid-rows-2={mobileLinks.length > 1}
				class:grid-cols-2={mobileLinks.length > 2}
			>
				{#each mobileLinks as link}
					<a
						href={link.route}
						class="btn btn-sm btn-primary btn-block"
						class:first:col-span-2={mobileLinks.length === 3}
					>
						{link.label}
					</a>
				{/each}
			</div>
			<button class="btn btn-sm btn-accent w-full" on:click={openMoreMapsModal}>All Maps </button>
		</div>
		<button on:click={openAttributionModal} class="absolute top-0 right-0 w-6 m-2 cursor-pointer">
			<InformationCircle />
		</button>
	</div>
</div>
