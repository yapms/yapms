<script>
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';

	let { disabled = false } = $props();
</script>

<fieldset class="fieldset">
	<legend class="fieldset-legend">GeoJSON Properties</legend>

	<p class="fieldset-label">
		Let YAPms know what the names of your GeoJSON properties are so they can be displayed in the
		application.
	</p>

	<p class="fieldset-label">Short Name - Used as the region tooltip.</p>
	<input
		type="text"
		class="input w-full"
		{disabled}
		bind:value={$ImportedSVGStore.options.shortNameProp}
	/>

	<p class="fieldset-label">Long Name - Shown when editing or splitting a region.</p>
	<input
		type="text"
		class="input w-full"
		{disabled}
		bind:value={$ImportedSVGStore.options.longNameProp}
	/>

	<p class="fieldset-label">Value - The value of the region, must be numeric.</p>
	<input
		type="text"
		class="input w-full"
		{disabled}
		bind:value={$ImportedSVGStore.options.valueProp}
	/>
</fieldset>
