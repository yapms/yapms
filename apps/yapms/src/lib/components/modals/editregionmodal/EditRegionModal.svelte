<script lang="ts">
	import { EditRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import ModalBase from '../ModalBase.svelte';

	$: open = $EditRegionModalStore.open;
	$: longName = open ? $EditRegionModalStore.region?.longName : undefined;
	$: value = open ? $EditRegionModalStore.region?.permaVal : undefined;
	$: newValue = value ?? 0;

	$: negativeNumError = newValue < 0;

	function confirm() {
		if (newValue === null) {
			newValue = 0;
		}
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
		<div class="form-control w-full flex flex-col gap-3">
			<h3 class="font-light text-lg">Region Value</h3>
			<form on:submit={confirm}>
				<input
					id="editRegionInput"
					type="number"
					placeholder="Value"
					class="input input-bordered w-full"
					min="0"
					bind:value={newValue}
				/>
				<label class="label" for="editRegionInput">
					<span class="label-text text-error" class:hidden={!negativeNumError}
						>Please enter a positive number.</span
					>
				</label>
			</form>
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-success" on:click={confirm} disabled={negativeNumError}>Confirm</button>
	</div>
</ModalBase>
