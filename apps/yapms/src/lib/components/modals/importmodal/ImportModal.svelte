<script lang="ts">
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import { ImportModalStore } from '$lib/stores/Modals';
	import { importFromGeoJson, importFromShapefiles } from '$lib/utils/importMap';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import ModalBase from '../ModalBase.svelte';

	let geoJsonFiles: FileList;
	let shapeFiles: FileList;
	let svgFiles: FileList;

	let loadError = false;

	async function loadGeoJson() {
		try {
			await importFromGeoJson(geoJsonFiles);
			close();
		} catch (error) {
			console.error(error);
			loadError = true;
		}
	}

	async function loadShapeFiles() {
		try {
			await importFromShapefiles(shapeFiles);
			close();
		} catch (error) {
			console.error(error);
			loadError = true;
		}
	}

	async function loadSVG() {
		try {
			ImportedSVGStore.set({ loaded: true, content: await svgFiles[0].text() });
			close();
		} catch (error) {
			console.error(error);
			loadError = true;
		}
	}

	function close() {
		ImportModalStore.set({ ...$ImportModalStore, open: false });
	}
</script>

<ModalBase title="Import Map" open={$ImportModalStore.open}>
	<div slot="content">
		<div class="flex flex-col gap-y-2">
			<div class="alert alert-warning justify-start">
				<span><ExclamationCircle class="w-6 h-6" />Only import files from people you trust!</span>
			</div>
			<div class="alert alert-error justify-start" class:hidden={!loadError}>
				<ExclamationCircle class="w-6 h-6" />
				<span>There was an error loading your map, please try again.</span>
			</div>
			<div class="flex flex-col gap-y-2">
				<div class="flex flex-col gap-2">
					<h3 class="font-light text-lg">Open from GeoJson</h3>
					<div class="flex flex-row gap-x-2">
						<input
							multiple
							type="file"
							accept=".geojson"
							class="file-input file-input-primary w-full"
							bind:files={geoJsonFiles}
						/>
						<button
							class="btn btn-secondary gap-1 flex-nowrap"
							on:click={loadGeoJson}
							disabled={!geoJsonFiles || geoJsonFiles.length < 1}
						>
							<ArrowUpTray class="w-5 h-5" />
							<span>Load</span>
						</button>
					</div>
				</div>

				<div class="divider divider-vertical mt-1 -mb-1" />

				<div class="flex flex-col gap-2">
					<h3 class="font-light text-lg">Open from Shapefiles</h3>
					<div class="flex flex-row gap-x-2">
						<input
							multiple
							type="file"
							accept=".shp"
							class="file-input file-input-primary w-full"
							bind:files={shapeFiles}
						/>
						<button
							class="btn btn-secondary gap-1 flex-nowrap"
							on:click={loadShapeFiles}
							disabled={!shapeFiles || shapeFiles.length < 1}
						>
							<ArrowUpTray class="w-5 h-5" />
							<span>Load</span>
						</button>
					</div>
				</div>

				<div class="divider divider-vertical mt-1 -mb-1" />

				<div class="flex flex-col gap-2">
					<h3 class="font-light text-lg">
						Open from SVG<br /><span class="italic text-sm"
							>Works only with <a
								class="underline"
								href="https://github.com/yapms/yapms/wiki/Map-SVG-Format">YAPms SVGs</a
							></span
						>
					</h3>
					<div class="flex flex-row gap-x-2">
						<input
							type="file"
							accept=".svg"
							class="file-input file-input-primary w-full"
							bind:files={svgFiles}
						/>
						<button
							class="btn btn-secondary gap-1 flex-nowrap"
							on:click={loadSVG}
							disabled={!svgFiles || svgFiles.length < 1}
						>
							<ArrowUpTray class="w-5 h-5" />
							<span>Load</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div slot="action">
		<a href="/" class="btn btn-primary"> Home </a>
	</div>
</ModalBase>
