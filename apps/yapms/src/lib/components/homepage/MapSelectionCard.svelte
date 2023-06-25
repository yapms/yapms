<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import type HomeLinkData from '$lib/types/HomeLinkData';

	export let name: string;
	export let bg: string;
	export let alt: string;
	export let doubleCols: boolean;
	export let attribution: string;
	export let links: HomeLinkData[];

	function openMoreModal(key: string) {
		MoreMapsModalStore.set({
			key,
			open: true
		});
	}
</script>

<div class="card card-bordered w-80 md:w-92 h-48 lg:h-52 bg-base-100 shadow-xl image-full">
	<figure><img src={`./countrybackgrounds/${bg}.webp`} {alt} /></figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title text-white">{name}</h2>
		<div class="grid gap-4" class:grid-cols-2={doubleCols}>
			{#each links as link}
				<a
					href={link.modal ? '' : link.route}
					class="btn btn-sm btn-primary w-full"
					on:click={() => {
						link.modal ? openMoreModal(link.route) : undefined;
					}}>{link.label}</a
				>
			{/each}
		</div>
		<div
			class="tooltip tooltip-left absolute top-0 right-0 w-6 m-2 before:w-64 before:max-w-max"
			data-tip={attribution}
		>
			<InformationCircle />
		</div>
	</div>
</div>
