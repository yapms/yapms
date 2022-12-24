<script lang="ts">
	import { TossupCandidateStore } from '$lib/stores/Candidates';
	import { ClearMapModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/Regions';
	import { get } from 'svelte/store';

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
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Clear The Map?</h3>
		<p>Clearing the map will result in all your progress being cleared.</p>
		<p>Are you sure?</p>
		<div class="modal-action">
			<button class="btn" on:click={close}> Close </button>
			<button class="btn" on:click={confirm}> Confirm </button>
		</div>
	</div>
</div>
