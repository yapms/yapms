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
		<div class="flex flex-col gap-0">
			<div class="form-control w-full">
				<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
					<span class="label-text">Map Projection</span>
					<select
						class="select select-bordered w-full capitalize"
						bind:value={$ImportedSVGStore.options.projectionFunction}
					>
						{#each projectionOptions as projection}
							<option value={projection.projectionFunction}>{projection.label}</option>
						{/each}
					</select>
				</label>
				{#if $ImportedSVGStore.options.projectionFunction == proj4ToProjection}
					<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
						<div class="flex gap-x-1 mb-2">
							<span class="label-text">Custom Projection Definition</span>
							<div class="tooltip" data-tip={customProjectionDefinitionTooltip}>
								<QuestionMarkCircle class="w-5" />
							</div>
						</div>
						<input
							type="text"
							class="input input-bordered w-full"
							bind:value={$ImportedSVGStore.options.customProjectionDefinition}
						/>
					</label>
				{/if}
			</div>
			<span class="divider m-2"></span>
			<div class="flex gap-x-1">
				Property Settings (Advanced)
				<div class="tooltip" data-tip={propertySettingsTooltip}>
					<QuestionMarkCircle class="w-5" />
				</div>
			</div>
			<div class="form-control w-full">
				<label class="label flex-col cursor-pointer items-start justify-start">
					<div class="flex gap-x-1 mb-2">
						<span class="label-text">Short Name</span>
						<div class="tooltip tooltip-right before:max-w-[12rem]" data-tip={shortNameTooltip}>
							<QuestionMarkCircle class="w-5" />
						</div>
					</div>
					<input
						type="text"
						class="input input-bordered w-full"
						bind:value={$ImportedSVGStore.options.shortNameProp}
					/>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label flex-col cursor-pointer items-start justify-start">
					<div class="flex gap-x-1 mb-2">
						<span class="label-text">Long Name</span>
						<div class="tooltip tooltip-right before:max-w-[12rem]" data-tip={longNameTooltip}>
							<QuestionMarkCircle class="w-5" />
						</div>
					</div>
					<input
						type="text"
						class="input input-bordered w-full"
						bind:value={$ImportedSVGStore.options.longNameProp}
					/>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label flex-col cursor-pointer items-start justify-start">
					<div class="flex gap-x-1 mb-2">
						<span class="label-text">Value</span>
						<div class="tooltip tooltip-right before:max-w-[12rem]" data-tip={valueTooltip}>
							<ExclamationCircle class="w-5" />
						</div>
					</div>
					<input
						type="text"
						class="input input-bordered w-full"
						bind:value={$ImportedSVGStore.options.valueProp}
					/>
				</label>
			</div>
		</div>
	</div>
</details>
