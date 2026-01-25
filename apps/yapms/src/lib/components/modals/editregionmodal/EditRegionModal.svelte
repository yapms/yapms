<script lang="ts">
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';
	import { EditRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import ModalBase from '../ModalBase.svelte';

	const displayName = $derived($EditRegionModalStore.region?.longName ?? '');
	const displayValue = $derived($EditRegionModalStore.region?.value ?? 0);

	let valueInput: HTMLInputElement;
	let valueBind = $state(0);

	let shortNameBind = $state('');
	let longNameBind = $state('');

	const shortNameTooltip = 'Name used in the region tooltip';
	const longNameTooltip = 'Name used in the edit, split, and region table modals';

	$effect(() => {
		if ($EditRegionModalStore.open) {
			setInputs();
			focusValueInput();
		}
	});

	function focusValueInput() {
		if (valueInput) {
			valueInput.focus();
		}
	}

	function setInputs() {
		valueBind = $EditRegionModalStore.region?.value ?? 0;
		shortNameBind = $EditRegionModalStore.region?.shortName ?? '';
		longNameBind = $EditRegionModalStore.region?.longName ?? '';
	}

	function confirm() {
		const index = $RegionsStore.findIndex(
			(region) => region.id === $EditRegionModalStore.region?.id
		);
		if (!$RegionsStore[index].disabled) {
			//Don't update value if disabled so the state stays disabled!
			$RegionsStore[index].value = valueBind;
		}
		$RegionsStore[index] = {
			...$RegionsStore[index],
			permaVal: valueBind,
			shortName: shortNameBind,
			longName: longNameBind
		};
		$EditRegionModalStore.open = false;
	}
</script>

<ModalBase title="Edit Region {displayName} - {displayValue}" store={EditRegionModalStore}>
	<div slot="content">
		<form onsubmit={confirm}>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Region Value</legend>
				<input
					type="number"
					class="input input-bordered w-full"
					min="0"
					onkeypress={preventNonNumericalInput}
					onpaste={preventNonNumericalPaste}
					bind:value={valueBind}
					bind:this={valueInput}
				/>

				<div class="md:flex gap-x-2">
					<div class="w-full">
						<legend class="fieldset-legend flex justify-start gap-x-1">
							Short Name
							<div class="tooltip tooltip-top before:max-w-[24ch]" data-tip={shortNameTooltip}>
								<QuestionMarkCircle class="w-5" />
							</div>
						</legend>
						<input type="text" class="input input-bordered w-full" bind:value={shortNameBind} />
					</div>

					<div class="w-full">
						<legend class="fieldset-legend flex justify-start gap-x-1">
							Long Name
							<div class="tooltip tooltip-top before:max-w-[24ch]" data-tip={longNameTooltip}>
								<QuestionMarkCircle class="w-5" />
							</div>
						</legend>
						<input type="text" class="input input-bordered w-full" bind:value={longNameBind} />
					</div>
				</div>

				<!-- Hidden button so you can hit enter to submit form -->
				<button type="submit" hidden>Submit</button>
			</fieldset>
		</form>
	</div>
	<div slot="action">
		<button class="btn btn-success" onclick={confirm}>Confirm</button>
	</div>
</ModalBase>
