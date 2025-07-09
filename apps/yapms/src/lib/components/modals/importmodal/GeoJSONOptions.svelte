<script lang="ts">
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';

	let { disabled = false, properties } = $props();
</script>

<fieldset class="fieldset">
	<legend class="fieldset-legend">GeoJSON Properties</legend>

	<p class="fieldset-label">
		Let YAPms know what the names of your GeoJSON properties are so they can be displayed in the
		application.
	</p>

	<p class="fieldset-label">Short Name - Used as the region tooltip.</p>
	<select
		class="select select-bordered w-full"
		{disabled}
		bind:value={$ImportedSVGStore.options.shortNameProp}
	>
		{#await properties}
			<option value=''>Loading...</option>
		{:then properties}
			{#each properties as property}
				<option value={property}>{property}</option>
			{/each}
		{/await}
	</select>

	<p class="fieldset-label">Long Name - Shown when editing or splitting a region.</p>
	<select
		class="select select-bordered w-full"
		{disabled}
		bind:value={$ImportedSVGStore.options.longNameProp}
	>
		{#await properties}
			<option value=''>Loading...</option>
		{:then properties}
			{#each properties as property}
				<option value={property}>{property}</option>
			{/each}
		{/await}
	</select>

	<p class="fieldset-label">Value - The value of the region, must be numeric.</p>
	<select
		class="select select-bordered w-full"
		{disabled}
		bind:value={$ImportedSVGStore.options.valueProp}
	>
		{#await properties}
			<option value=''>Loading...</option>
		{:then properties}
			{#each properties as property}
				<option value={property}>{property}</option>
			{/each}
		{/await}
	</select>
</fieldset>
