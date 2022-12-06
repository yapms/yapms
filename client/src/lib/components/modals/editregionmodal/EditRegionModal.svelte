<script lang="ts">
	import { EditRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/Regions';

	$: open = $EditRegionModalStore.open;
	$: longName = open ? $EditRegionModalStore.region?.longName : undefined;
	$: value = open ? $EditRegionModalStore.region?.value : undefined;
	$: newValue = value ?? 0;

	function close() {
		$EditRegionModalStore.open = false;
	}

	function confirm() {
		const index = $RegionsStore.findIndex(
			(region) => region.id === $EditRegionModalStore.region?.id
		);
		$RegionsStore[index].value = newValue;
		$EditRegionModalStore.open = false;
	}
</script>

<input type="checkbox" class="modal-toggle" checked={open} />

<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Edit State {longName} {value}</h3>
		<div class="flex flex-col pt-3">
			<input
				type="number"
				placeholder="Value"
				class="input input-bordered w-full"
				min="1"
				bind:value={newValue}
			/>
		</div>
		<div class="modal-action">
			<button class="btn" on:click={close}> Close </button>
			<button class="btn" on:click={confirm}> Confirm </button>
		</div>
	</div>
</div>
