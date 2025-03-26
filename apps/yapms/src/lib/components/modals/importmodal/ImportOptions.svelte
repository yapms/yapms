<script lang="ts">
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import { proj4ToProjection } from '$lib/utils/importMap';
	import {
		geoAlbers,
		geoAlbersUsa,
		geoConicConformal,
		geoConicEqualArea,
		geoConicEquidistant,
		geoMercator,
		geoTransverseMercator
	} from 'd3';

	const customProjectionDefinitionTooltip =
		'Projection definitions are used to describe different map projections. YAPms uses PROJ.4 definitions. You can find many of these on https://epsg.io/';
	const propertySettingsTooltip =
		'If you are importing from a GeoJSON file with properties, you can use those properties for the name or value of the regions in YAPms.';
	const shortNameTooltip = 'The "short name" is used as region tooltip.';
	const longNameTooltip = 'The "long name" is shown when editing or splitting a region.';
	const valueTooltip = 'Make sure to use a property that is a numeric value for this property.';

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

<details class="collapse bg-base-200">
	<summary class="collapse-title text-xl font-medium">Import Options</summary>
	<div class="collapse-content">
		<div class="flex flex-col">
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
			</fieldset>

			{#if $ImportedSVGStore.options.projectionFunction == proj4ToProjection}
				<fieldset class="fieldset">
					<legend class="fieldset-legend flex gap-x-1">
						Custom Projection Definition
						<div class="tooltip" data-tip={customProjectionDefinitionTooltip}>
							<QuestionMarkCircle class="w-5" />
						</div>
					</legend>
					<input
						type="text"
						class="input input-bordered w-full"
						bind:value={$ImportedSVGStore.options.customProjectionDefinition}
					/>
				</fieldset>
			{/if}

			<span class="divider my-2"></span>

			<div class="flex gap-x-1 items-center">
				GeoJSON Properties (Advanced)
				<div class="tooltip" data-tip={propertySettingsTooltip}>
					<QuestionMarkCircle class="w-5" />
				</div>
			</div>

			<fieldset class="fieldset">
				<legend class="fieldset-legend flex gap-x-1">
					<span class="label-text">Short Name</span>
					<div class="tooltip tooltip-right before:max-w-[12rem]!" data-tip={shortNameTooltip}>
						<QuestionMarkCircle class="w-5" />
					</div>
				</legend>
				<input
					type="text"
					class="input input-bordered w-full"
					bind:value={$ImportedSVGStore.options.shortNameProp}
				/>
			</fieldset>

			<fieldset class="fieldset">
				<legend class="fieldset-legend flex gap-x-1">
					<span class="label-text">Long Name</span>
					<div class="tooltip tooltip-right before:max-w-[12rem]!" data-tip={longNameTooltip}>
						<QuestionMarkCircle class="w-5" />
					</div>
				</legend>
				<input
					type="text"
					class="input input-bordered w-full"
					bind:value={$ImportedSVGStore.options.longNameProp}
				/>
			</fieldset>

			<fieldset class="fieldset">
				<legend class="fieldset-legend flex gap-x-1">
					<span class="label-text">Value</span>
					<div class="tooltip tooltip-right before:max-w-[12rem]!" data-tip={valueTooltip}>
						<ExclamationCircle class="w-5" />
					</div>
				</legend>
				<input
					type="text"
					class="input input-bordered w-full"
					bind:value={$ImportedSVGStore.options.valueProp}
				/>
			</fieldset>
		</div>
	</div>
</details>
