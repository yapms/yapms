<script lang="ts">
	import { EditRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/Regions';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';

	$: open = $EditRegionModalStore.open;
	$: longName = open ? $EditRegionModalStore.region?.longName : undefined;
	$: value = open ? $EditRegionModalStore.region?.permaVal : undefined;
	$: newValue = value ?? 0;

	function close() {
		$EditRegionModalStore.open = false;
	}

	function confirm() {
		const index = $RegionsStore.findIndex(
			(region) => region.id === $EditRegionModalStore.region?.id
		);
		if (!$RegionsStore[index].disabled) {
			//Don't update value if disabled so the state stays disabled!
			$RegionsStore[index].value = newValue;
		}
		$RegionsStore[index].permaVal = newValue;
		$EditRegionModalStore.open = false;
	}
</script>

<input type="checkbox" class="modal-toggle" checked={open} />

<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Edit Region {longName} - {value}" />
		<input
			type="number"
			placeholder="Value"
			class="input input-bordered w-full"
			min="0"
			required
			bind:value={newValue}
		/>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}> No </button>
			<button class="btn btn-success" on:click={confirm} disabled={newValue === null || newValue < 0 || newValue % 1 !== 0}>
				Update
			</button>
		</div>
	</div>
</div>
