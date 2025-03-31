<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import type { HomeLinkData } from '$lib/types/HomeData';

	export let name: string;
	export let bg: string;
	export let attribution: string;
	export let attributionLink: string | undefined = undefined;
	export let links: { label: string; route: string }[];

	const image = import(`../../assets/images/countries/${bg}.webp`);

	function openMoreModal(buttons: HomeLinkData[]) {
		MoreMapsModalStore.set({
			buttons,
			title: name,
			open: true
		});
	}
</script>

<div class="card w-80 h-48 bg-base-100 image-full">
	{#await image then image}
		<figure><img src={image.default} alt={name} /></figure>
	{/await}
	<div class="card-body items-center text-center">
		<h2 class="card-title text-white">{name}</h2>
		<div class:grid-cols-2={links.length > 1} class="grid gap-4">
			{#if links.length <= 4}
				{#each links as link}
					<a href={link.route} class="btn btn-sm btn-primary w-full leading-3.5">{link.label}</a>
				{/each}
			{:else}
				{#each links as link, index}
					<!-- hidden links will be prerendered -->
					<a
						href={link.route}
						class="btn btn-sm btn-primary w-full -bg-linear-30 leading-3.5"
						class:hidden={index >= 3}
					>
						{link.label}
					</a>
				{/each}
				<button
					class="btn btn-sm btn-primary w-full"
					on:click={() => {
						openMoreModal(links.slice(3));
					}}
					>More
				</button>
			{/if}
		</div>
		<a
			target="_blank"
			href={attributionLink}
			class="tooltip tooltip-left absolute top-0 right-0 w-6 m-2 before:w-64 before:max-w-max"
			data-tip={attribution}
		>
			<InformationCircle />
		</a>
	</div>
</div>
