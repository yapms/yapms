<script>
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
</script>

<fieldset class="fieldset">
	<legend class="fieldset-legend">GeoJSON Properties</legend>

	<label class="fieldset-label">Short Name - Used as the region tooltip.</label>
	<input type="text" class="input w-full" bind:value={$ImportedSVGStore.options.shortNameProp} />

	<label class="fieldset-label">Long Name - Shown when editing or splitting a region.</label>
	<input type="text" class="input w-full" bind:value={$ImportedSVGStore.options.longNameProp} />

	<label class="fieldset-label">Value - The value of the region, must be numeric.</label>
	<input type="text" class="input w-full" bind:value={$ImportedSVGStore.options.valueProp} />
</fieldset>
