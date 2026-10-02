<script lang="ts">
	import { PerRegionWeightModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import ModalBase from '../ModalBase.svelte';
	import RegionWeights from './RegionWeights.svelte';

	let filterInput = $state('');

	let sortedAndFilteredRegions = $derived(
		$PerRegionWeightModalStore.open
		? $RegionsStore
				.filter((region) => !region.disabled)
				.filter((region) => {
					const lowerSearch = filterInput.toLowerCase().trim();
					return region.longName.toLowerCase().trim().includes(lowerSearch) || lowerSearch == '';
				})
				.sort((regionA, regionB) => {
					return regionA.longName > regionB.longName ? 1 : -1;
				})
		: []
	);
</script>

<ModalBase title="Set Region Weights" store={PerRegionWeightModalStore}>
	<div slot="content" class="flex flex-col gap-2">
		<input class="input w-full" placeholder="Filter Regions" bind:value={filterInput}/>
		{#each [...sortedAndFilteredRegions] as region (region.id)}
			<RegionWeights {region}></RegionWeights>
		{/each}
	</div>
	<div slot="action">

	</div>
</ModalBase>
