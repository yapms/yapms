<script lang="ts">
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import { ImportModalStore } from '$lib/stores/Modals';
	import { DOMPurifyConfig, importFromGeoJson, importFromShapefiles } from '$lib/utils/importMap';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import ModalBase from '../ModalBase.svelte';
	import DOMPurify from 'dompurify';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { exportImportAsSVG } from '$lib/utils/importMap';
	import GeoJsonOptions from './GeoJSONOptions.svelte';
	import ProjectionOptions from './ProjectionOptions.svelte';

	let geoJsonFiles: FileList;
	let shapeFiles: FileList;
	let svgFiles: FileList;

	let loadError = false;
	let loading = false;

	async function load(importFunc: (files: FileList) => Promise<void>, files: FileList) {
		loading = true;
		try {
			ImportedSVGStore.set({
				...$ImportedSVGStore,
				loaded: false,
				content: ''
			});
			await importFunc(files);
			close?.();
			if ($page.url.pathname !== '/app/imported') {
				await goto('/app/imported');
			}
		} catch (error) {
			console.error(error);
			loadError = true;
		}
		loading = false;
	}

	async function loadSVG(files: FileList) {
		ImportedSVGStore.set({
			...$ImportedSVGStore,
			loaded: true,
			content: DOMPurify.sanitize(await files[0].text(), DOMPurifyConfig)
		});
	}

	function loadCustomMap() {
		if (geoJsonFiles && geoJsonFiles.length > 0) {
			load(importFromGeoJson, geoJsonFiles);
		} else if (shapeFiles && shapeFiles.length > 0) {
			load(importFromShapefiles, shapeFiles);
		} else if (svgFiles && svgFiles.length > 0) {
			load(loadSVG, svgFiles);
		}
	}

	function close() {
		$ImportModalStore.open = false;
		if ($page.url.pathname === '/app/imported' && $ImportedSVGStore.loaded === false) {
			goto('/');
		}
	}
</script>

<ModalBase title="Custom Map" store={ImportModalStore} onClose={close}>
	<div slot="content">
		<div class="flex flex-col gap-y-2">
			<div class="alert alert-error justify-start" class:hidden={!loadError}>
				<span class="flex gap-x-2">
					<ExclamationCircle class="w-6 h-6" />
					There was an error loading your map, please try again.
				</span>
			</div>
			<div class="alert alert-info justify-start" class:hidden={!loading}>
				<span class="flex gap-x-2"><ArrowUpTray class="w-6 h-6" />Loading Map...</span>
			</div>
			<div class="flex flex-col gap-y-2">
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend"> Open From GeoJSONs </legend>
					<div class="flex gap-x-2">
						<input
							multiple
							type="file"
							accept=".geojson, .json"
							class="file-input w-full"
							bind:files={geoJsonFiles}
						/>
					</div>
					<p class="fieldset-label">Select multiple files and they will be merged.</p>
				</fieldset>

				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend"> Open From Shapefiles </legend>
					<div class="flex gap-x-2">
						<input
							multiple
							type="file"
							accept=".shp"
							class="file-input w-full"
							bind:files={shapeFiles}
						/>
					</div>
					<p class="fieldset-label">Select multiple files and they will be merged.</p>
				</fieldset>

				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend"> Open from SVG </legend>
					<input type="file" accept=".svg" class="file-input w-full" bind:files={svgFiles} />
					<a
						class="fieldset-label link"
						href="https://github.com/yapms/yapms/wiki/Map-SVG-Format"
						target="_blank"
					>
						Works only with a YAPms formatted SVG
					</a>
				</fieldset>

				<ProjectionOptions />
				{#if geoJsonFiles && geoJsonFiles.length > 0}
					<GeoJsonOptions />
				{/if}
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Advanced</legend>
					<button class="btn btn-secondar" on:click={exportImportAsSVG}>Export Current SVG</button>
				</fieldset>
			</div>
		</div>
	</div>

	<div slot="action">
		<button
			class="btn btn-primary"
			disabled={svgFiles &&
				geoJsonFiles &&
				shapeFiles &&
				svgFiles.length === 0 &&
				geoJsonFiles.length === 0 &&
				shapeFiles.length === 0}
			on:click={loadCustomMap}
		>
			Load Custom Map
		</button>
	</div>
</ModalBase>
