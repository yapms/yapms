<script lang="ts">
	import { RegionsStore } from '$lib/stores/regions/Regions';

	$: search = '';

	$: {
		const lowerSearch = search.toLowerCase().trim();

		const regions = $RegionsStore.map((region) => {
			if (
				region.longName.toLowerCase().trim().includes(lowerSearch) ||
				region.shortName.toLowerCase().trim().includes(lowerSearch) ||
				lowerSearch === ''
			) {
				region.visible = true;
			} else {
				region.visible = false;
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
