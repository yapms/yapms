<script lang="ts">
	import { MassEditModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import ModalBase from '../../ModalBase.svelte';

	let value = 1;

	function confirm() {
		if (value === null) {
			return;
		}
		$RegionsStore.forEach((region) => {
			if (!region.disabled && !region.permaLocked) {
				region.value = value;
			}
			region.permaVal = value;
		});
		$MassEditModalStore.open = false;
		$RegionsStore = $RegionsStore;
	}
</script>

<ModalBase title="Edit All Regions" store={MassEditModalStore}>
	<div slot="content">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Region Value</legend>
			<form on:submit={confirm}>
				<input
					type="number"
					class="input input-bordered w-full"
					min="0"
					on:keypress={preventNonNumericalInput}
					on:paste={preventNonNumericalPaste}
					bind:value
				/>
			</form>
		</fieldset>
	</div>
	<div slot="action">
		<button class="btn btn-success" on:click={confirm}>Confirm</button>
	</div>
</ModalBase>
