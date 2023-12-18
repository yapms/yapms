<script lang="ts">
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	const projectionOptions = [
		{label: "Mercator (WGS 84)", definition: "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs"}
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
						bind:value={$ImportedSVGStore.options.projection}
					>
						{#each projectionOptions as projection}
							<option value={projection.definition}>{projection.label}</option>
						{/each}
					</select>
				</label>
			</div>
		</div>
	</div>
</details>