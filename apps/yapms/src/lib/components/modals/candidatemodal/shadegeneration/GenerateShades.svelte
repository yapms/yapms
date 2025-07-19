<script lang="ts">
	import { generateShades } from '$lib/utils/shades';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import { PresetColorsModalSelectedStore } from '$lib/stores/Modals';

	let generateAmount = $state(4);
	let generateColor = $state('#000000');

	let { colorUpdater }: { colorUpdater: (colors: { color: string }[]) => void } = $props();

	function generateExtraColors() {
		colorUpdater(generateShades(generateColor, generateAmount));
	}

	PresetColorsModalSelectedStore.subscribe((presetColors) => {
		if (presetColors.length !== 0) generateColor = presetColors[0];
	});
</script>

<div class="flex flex-row gap-x-2 items-end">
	<fieldset class="fieldset w-1/2">
		<legend class="fieldset-legend">Base Color</legend>
		<input type="color" class="w-full h-8" bind:value={generateColor} />
	</fieldset>
	<fieldset class="fieldset w-1/2">
		<legend class="fieldset-legend">Number of Shades</legend>
		<input
			type="number"
			min="1"
			step="1"
			class="input input-sm w-full"
			onpaste={preventNonNumericalPaste}
			onkeypress={preventNonNumericalInput}
			bind:value={generateAmount}
		/>
	</fieldset>
	<button
		class="btn btn-sm btn-primary mb-1"
		onclick={generateExtraColors}
		disabled={generateAmount < 1}>Generate Shades</button
	>
</div>
