<script lang="ts">
	import { TossupCandidateStore } from '$lib/stores/Candidates';
	import { ClearMapModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { get } from 'svelte/store';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';

	function clearMap() {
		const regions = get(RegionsStore);
		regions.forEach((region) => {
			region.candidates = [
				{
					candidate: $TossupCandidateStore,
					margin: 0,
					count: region.value
				}
			];
		});
		RegionsStore.set(regions);
	}

	function close() {
		ClearMapModalStore.set({
			...$ClearMapModalStore,
			open: false
		});
	}

	function confirm() {
		clearMap();
		ClearMapModalStore.set({
			...$ClearMapModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$ClearMapModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Clear Map" />
		<p>Clearing the map will result in all your progress being cleared. Are you sure?</p>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}> No </button>
			<button class="btn btn-error" on:click={confirm}> Clear </button>
		</div>
	</div>
</div>
