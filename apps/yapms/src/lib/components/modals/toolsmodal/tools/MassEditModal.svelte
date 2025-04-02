<script lang="ts">
	import { MassEditModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import ModalBase from '../../ModalBase.svelte';

	let value = 1;

	function preventNonNumericalInput(e: KeyboardEvent) {
		if (e.key !== 'Enter' && !e.key.match(/^[0-9]+$/)) e.preventDefault();
	}

	function preventNonNumericalPaste(e: ClipboardEvent) {
		const pasteContents = e.clipboardData?.getData(e.clipboardData.types[0]);
		if (!pasteContents?.match(/^[0-9]+$/)) e.preventDefault();
	}

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
