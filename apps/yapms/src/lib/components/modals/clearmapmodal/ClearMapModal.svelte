<script lang="ts">
	import { TossupCandidateStore } from '$lib/stores/Candidates';
	import { ClearMapModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { get } from 'svelte/store';
	import ModalBase from '../ModalBase.svelte';

	function clearMap(clearLocks: boolean) {
		const regions = get(RegionsStore);
		for (const region of regions) {
			if (clearLocks === false && region.locked === true) {
				continue;
			}
			region.locked = region.permaLocked;
			region.candidates = [
				{
					candidate: $TossupCandidateStore,
					margin: 0,
					count: region.value
				}
			];
		}
		RegionsStore.set(regions);
	}

	function confirm(clearLocks: boolean) {
		clearMap(clearLocks);
		$ClearMapModalStore.open = false;
	}
</script>

<ModalBase title="Clear Map" store={ClearMapModalStore}>
	<div slot="content">
		<p>Clearing the map will result in all of your progress being cleared. Are you sure?</p>
	</div>
	<div slot="action">
		<button class="btn btn-error" on:click={() => confirm(true)}>Clear Locks</button>
		<button class="btn btn-error" on:click={() => confirm(false)}>Clear</button>
	</div>
</ModalBase>
