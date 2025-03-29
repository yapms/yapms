<script lang="ts">
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import { ImportModalStore } from '$lib/stores/Modals';
	import { DOMPurifyConfig, importFromGeoJson, importFromShapefiles } from '$lib/utils/importMap';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import ModalBase from '../ModalBase.svelte';
	import DocumentDuplicate from '$lib/icons/DocumentDuplicate.svelte';
	import DOMPurify from 'dompurify';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { exportImportAsSVG } from '$lib/utils/importMap';
	import ImportOptions from './ImportOptions.svelte';

	let geoJsonFiles: FileList;
	let shapeFiles: FileList;
	let svgFiles: FileList;

	let loadError = false;
	let loading = false;

	const multipleFilesTooltip =
		'Select multiple files to upload and they will be automatically merged.';

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

	function close() {
		$ImportModalStore.open = false;
		if ($page.url.pathname === '/app/imported' && $ImportedSVGStore.loaded === false) {
			goto('/');
		}
	}
</script>

<ModalBase title="Import Map" store={ImportModalStore} onClose={close}>
	<div slot="content">
		<div class="flex flex-col gap-y-2">
			<div class="alert alert-error justify-start" class:hidden={!loadError}>
				<span class="flex gap-x-2"
					><ExclamationCircle class="w-6 h-6" />There was an error loading your map, please try
					again.</span
				>
			</div>
			<div class="alert alert-info justify-start" class:hidden={!loading}>
				<span class="flex gap-x-2"><ArrowUpTray class="w-6 h-6" />Loading Map...</span>
			</div>
			<div class="flex flex-col gap-y-2">
				<fieldset class="fieldset w-full flex gap-x-2">
					<legend class="fieldset-legend flex gap-x-1">
						<p class="text-lg">Open From GeoJson</p>
						<div class="tooltip tooltip-bottom" data-tip={multipleFilesTooltip}>
							<DocumentDuplicate class="w-6" />
						</div>
					</legend>
					<input
						multiple
						type="file"
						accept=".geojson, .json"
						class="file-input file-input-primary w-full"
						bind:files={geoJsonFiles}
					/>
					<button
						class="btn btn-secondary gap-1 flex-nowrap"
						on:click={() => {
							load(importFromGeoJson, geoJsonFiles);
						}}
						disabled={!geoJsonFiles || geoJsonFiles.length < 1 || loading}
					>
						<ArrowUpTray class="w-5 h-5" />
						<span>Load</span>
					</button>
				</fieldset>

				<div class="divider divider-vertical mt-1 -mb-2"></div>

				<fieldset class="fieldset w-full flex gap-x-2">
					<legend class="fieldset-legend flex gap-x-1">
						<p class="text-lg">Open From Shapefiles</p>
						<div class="tooltip" data-tip={multipleFilesTooltip}>
							<DocumentDuplicate class="w-6" />
						</div>
					</legend>
					<input
						multiple
						type="file"
						accept=".shp"
						class="file-input file-input-primary w-full"
						bind:files={shapeFiles}
					/>
					<button
						class="btn btn-secondary gap-1 flex-nowrap"
						on:click={() => {
							load(importFromShapefiles, shapeFiles);
						}}
						disabled={!shapeFiles || shapeFiles.length < 1 || loading}
					>
						<ArrowUpTray class="w-5 h-5" />
						<span>Load</span>
					</button>
				</fieldset>

				<div class="divider divider-vertical mt-1 -mb-2"></div>

				<fieldset class="fieldset w-full flex gap-x-2">
					<legend class="fieldset-legend">
						<p class="text-lg">
							Open from SVG
							<a
								class="underline italic text-sm font-light"
								href="https://github.com/yapms/yapms/wiki/Map-SVG-Format"
								>Works only with YAPms format</a
							>
						</p>
					</legend>
					<input
						type="file"
						accept=".svg"
						class="file-input file-input-primary w-full"
						bind:files={svgFiles}
					/>
					<button
						class="btn btn-secondary gap-1 flex-nowrap"
						on:click={() => {
							load(loadSVG, svgFiles);
						}}
						disabled={!svgFiles || svgFiles.length < 1 || loading}
					>
						<ArrowUpTray class="w-5 h-5" />
						<span>Load</span>
					</button>
				</fieldset>

				<div class="divider divider-vertical mt-1 mb-1"></div>

				<ImportOptions />
			</div>
		</div>
	</div>

	<div slot="action">
		<button class="btn btn-primary" disabled={false} on:click={exportImportAsSVG}>
			Export SVG
		</button>
	</div>
</ModalBase>
