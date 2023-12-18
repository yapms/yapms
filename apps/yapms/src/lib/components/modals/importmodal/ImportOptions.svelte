<script lang="ts">
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
		<div class="flex flex-col gap-2">
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
		</div>
	</div>
</details>
