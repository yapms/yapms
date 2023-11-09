<script lang="ts">
	import { RegionsStore } from '$lib/stores/regions/Regions';

	$: search = '';

	$: {
		const lowerSearch = search.toLowerCase().trim();

		const regions = $RegionsStore.map((region) => {
			if (
				(region.longName.toLowerCase().trim().includes(lowerSearch) ||
					region.shortName.toLowerCase().trim().includes(lowerSearch)) &&
				lowerSearch !== ''
			) {
				region.nodes.region.style['stroke'] = 'yellow';
				region.nodes.region.style['stroke-width'] = '0.5';
			} else {
				region.nodes.region.style['stroke'] = '';
				region.nodes.region.style['stroke-width'] = '0';
			}
			return region;
		});

		$RegionsStore = regions;
	}
</script>

<div class="divider">Search</div>
<div class="p-4">
	<input type="text" class="input input-bordered w-full" bind:value={search} />
</div>
