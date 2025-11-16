<script lang="ts">
	import { EditRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import ModalBase from '../ModalBase.svelte';

	const displayName = $derived($EditRegionModalStore.region?.longName ?? '');
	const displayValue = $derived($EditRegionModalStore.region?.value ?? 0);

	let valueInput: HTMLInputElement;
	let valueBind = $state(0);

	$effect(() => {
		if ($EditRegionModalStore.open) {
			setInput();
			focusInput();
		}
	});

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
			<form onsubmit={confirm}>
				<input
					type="number"
					class="input input-bordered w-full"
					min="0"
					onkeypress={preventNonNumericalInput}
					onpaste={preventNonNumericalPaste}
					bind:value={valueBind}
					bind:this={valueInput}
				/>
			</form>
		</fieldset>
	</div>
	<div slot="action">
		<button class="btn btn-success" onclick={confirm}>Confirm</button>
	</div>
</ModalBase>
