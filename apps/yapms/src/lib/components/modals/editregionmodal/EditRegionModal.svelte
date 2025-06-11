<script lang="ts">
	import { EditRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import ModalBase from '../ModalBase.svelte';

	$: displayName = $EditRegionModalStore.region?.longName ?? '';
	$: displayValue = $EditRegionModalStore.region?.value ?? 0;

	let valueInput: HTMLInputElement;
	let valueBind = 0;

	$: if ($EditRegionModalStore.open) {
		setInput();
		focusInput();
	}

	function focusInput() {
		if (valueInput) {
			valueInput.focus();
		}
	}

	function setInput() {
		valueBind = $EditRegionModalStore.region?.value ?? 0;
	}

	function confirm() {
		const index = $RegionsStore.findIndex(
			(region) => region.id === $EditRegionModalStore.region?.id
		);
		if (!$RegionsStore[index].disabled) {
			//Don't update value if disabled so the state stays disabled!
			$RegionsStore[index].value = valueBind;
		}
		$RegionsStore[index].permaVal = valueBind;
		$EditRegionModalStore.open = false;
	}
</script>

<ModalBase title="Edit Region {displayName} - {displayValue}" store={EditRegionModalStore}>
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
					bind:value={valueBind}
					bind:this={valueInput}
				/>
			</form>
		</fieldset>
	</div>
	<div slot="action">
		<button class="btn btn-success" on:click={confirm}>Confirm</button>
	</div>
</ModalBase>
