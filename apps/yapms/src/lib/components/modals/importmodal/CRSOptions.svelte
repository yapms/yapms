<script lang="ts">
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';

	let files = $state<FileList>();

	$effect(() => {
		if (files && files[0]) {
			files[0].text().then((res) => {
				$ImportedSVGStore.options.crsDefinition = res;
			});
		} else {
			$ImportedSVGStore.options.crsDefinition = '';
		}
	});
</script>

<fieldset class="fieldset">
	<legend class="fieldset-legend">CRS Definition</legend>
	<input type="file" accept=".prj" class="file-input w-full" bind:files />
	<p class="fieldset-label">
		Having trouble with your map? Try uploading the .prj file that came with your .shp here.
	</p>
</fieldset>
