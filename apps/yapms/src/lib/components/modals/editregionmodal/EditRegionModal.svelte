<script lang="ts">
	import { EditRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import ModalBase from '../ModalBase.svelte';

	$: open = $EditRegionModalStore.open;
	$: longName = open ? $EditRegionModalStore.region?.longName : undefined;
	$: value = open ? $EditRegionModalStore.region?.permaVal : undefined;
	$: newValue = value ?? 0;

	$: if (newValue < 0 || newValue === null) {
		newValue = 0;
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

<ModalBase title="Edit Region {longName} - {value}" store={EditRegionModalStore}>
	<div slot="content">
		<input
			type="number"
			placeholder="Value"
			class="input input-bordered w-full"
			min="0"
			bind:value={newValue}
			required
		/>
	</div>
	<div slot="action">
		<button class="btn btn-success" on:click={confirm}>Confirm</button>
	</div>
</ModalBase>
