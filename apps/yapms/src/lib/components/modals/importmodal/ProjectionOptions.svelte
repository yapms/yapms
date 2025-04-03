<script>
	import {
		geoAlbers,
		geoAlbersUsa,
		geoConicConformal,
		geoConicEqualArea,
		geoConicEquidistant,
		geoMercator,
		geoTransverseMercator
	} from 'd3';
	import { proj4ToProjection } from '$lib/utils/importMap';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';

	const projectionOptions = [
		{ label: 'Mercator', projectionFunction: geoMercator },
		{ label: 'Albers', projectionFunction: geoAlbers },
		{ label: 'Albers USA', projectionFunction: geoAlbersUsa },
		{ label: 'Conic Equal Area', projectionFunction: geoConicEqualArea },
		{ label: 'Conic Conformal', projectionFunction: geoConicConformal },
		{ label: 'Conic Equidistant', projectionFunction: geoConicEquidistant },
		{ label: 'Transverse Mercator', projectionFunction: geoTransverseMercator },
		{ label: 'Custom', projectionFunction: proj4ToProjection }
	];
</script>

<fieldset class="fieldset">
	<legend class="fieldset-legend">Map Projection</legend>
	<select
		class="select select-bordered w-full capitalize"
		bind:value={$ImportedSVGStore.options.projectionFunction}
	>
		{#each projectionOptions as projection}
			<option value={projection.projectionFunction}>{projection.label}</option>
		{/each}
	</select>
	{#if $ImportedSVGStore.options.projectionFunction == proj4ToProjection}
		<input
			type="text"
			class="input input-bordered w-full"
			placeholder="Enter projection here."
			bind:value={$ImportedSVGStore.options.customProjectionDefinition}
		/>
		<p class="fieldset-label block break-keep whitespace-break-spaces">
			YAPms uses PROJ.4 definitions. You can find many of these options at
			<a class="link" href="https://epsg.io" target="_blank">https://epsg.io/</a>
		</p>
	{/if}
</fieldset>
