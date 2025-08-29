<script lang="ts">
	import { TossupCandidateStore } from '$lib/stores/Candidates';
	import { ClearMapModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { get } from 'svelte/store';
	import ModalBase from '../ModalBase.svelte';

	let clearLocks = $state(true);

	function confirm() {
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
		$ClearMapModalStore.open = false;
	}
</script>

<ModalBase title="Clear Map" store={ClearMapModalStore}>
	<div slot="content">
		<p>Clearing the map will result in all of your progress being cleared. Are you sure?</p>
	</div>
	<div slot="action" class="flex flex-row items-center w-full">
		<label class="label">
			<input type="checkbox" bind:checked={clearLocks} class="checkbox" />
			Clear Locks
		</label>
		<div class="flex flex-grow"></div>
		<button class="btn btn-error" onclick={confirm}>Clear</button>
	</div>
</ModalBase>
