<script lang="ts">
	import { ImportModalStore } from '$lib/stores/Modals';
	import {
		importFromGeoJson,
		importFromShapefiles,
		importFromSVG,
		getGeoJsonProperties
	} from '$lib/utils/importMap';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { exportImportAsSVG } from '$lib/utils/importMap';
	import GeoJsonOptions from './GeoJSONOptions.svelte';
	import ProjectionOptions from './ProjectionOptions.svelte';
	import CrsOptions from './CRSOptions.svelte';

	let files = $state<FileList>();
	let errorLoading = $state<boolean>(false);
	let isLoading = $state<boolean>(false);

	let fileType = $derived(
		Array.from(files || []).reduce((accu, curr) => {
			let extension = curr.name.split('.').at(-1);

			if (extension === undefined) {
				return 'invalid';
			}

			if (extension === 'json') {
				extension = 'geojson';
			}

			if (accu === '' || accu === extension) {
				return extension;
			}

			return 'invalid';
		}, '')
	);

	let geoJsonProperties = $derived(
		files && fileType === 'geojson' ? getGeoJsonProperties(files) : []
	);

	let fileTypeIsInvalid = $derived(
		files && files.length > 0 && ['geojson', 'shp', 'svg'].includes(fileType) === false
	);

	let noFilesSelected = $derived(files === undefined || files.length === 0);

	async function load(importFunc: (files: FileList) => Promise<void>, files: FileList) {
		isLoading = true;
		try {
			await importFunc(files);
			close();
			if (page.url.pathname !== '/app/imported') {
				await goto('/app/imported');
			}
		} catch (error) {
			console.error(error);
			errorLoading = true;
		}
		isLoading = false;
	}

	function loadCustomMap() {
		if (noFilesSelected || fileTypeIsInvalid || files === undefined) {
			return;
		}

		if (fileType === 'geojson') {
			load(importFromGeoJson, files);
		} else if (fileType === 'shp') {
			load(importFromShapefiles, files);
		} else if (fileType === 'svg') {
			load(importFromSVG, files);
		}
	}

	function close() {
		$ImportModalStore.open = false;
		if (page.url.pathname === '/app/imported' && $ImportedSVGStore.loaded === false) {
			goto('/');
		}
	}
</script>

<ModalBase title="Custom Map" store={ImportModalStore} onClose={close}>
	<div slot="content">
		<div class="flex flex-col gap-y-2">
			<div class="flex flex-col gap-y-2">
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Map Files</legend>
					<div class="flex gap-x-2">
						<input
							multiple
							type="file"
							accept=".geojson, .json, .svg, .shp"
							class="file-input w-full"
							class:file-input-error={errorLoading || fileTypeIsInvalid}
							disabled={isLoading}
							bind:files
							onchange={() => (errorLoading = false)}
						/>
					</div>
					{#if errorLoading === true}
						<div class="alert alert-error mt-2">
							<ExclamationCircle class="w-6 h-6" />
							<span>There was an error loading your map, please try again.</span>
						</div>
					{/if}

					{#if fileTypeIsInvalid}
						<div class="alert alert-error mt-2">
							<ExclamationCircle class="w-6 h-6" />
							<span>Please select a set of GeoJSONs, a set of ShapeFiles or a single SVG.</span>
						</div>
					{/if}

					<p class="fieldset-label block">
						Select multiple geojson or shape files and they will be merged. Only one SVG may be
						loaded. SVGs must follow YAPms standards, learn how at
						<a
							class="link"
							href="https://github.com/yapms/yapms/wiki/Map-SVG-Format"
							target="_blank"
						>
							github.com
						</a>.
					</p>
				</fieldset>

				{#if fileType === 'geojson' || fileType === 'shp'}
					<ProjectionOptions disabled={isLoading} />
				{/if}

				{#if fileType === 'geojson'}
					<GeoJsonOptions disabled={isLoading} properties={geoJsonProperties} />
				{/if}

				{#if fileType === 'shp'}
					<CrsOptions />
				{/if}

				<fieldset class="fieldset">
					<legend class="fieldset-legend">Export</legend>
					<button class="btn" disabled={isLoading} onclick={exportImportAsSVG}>
						Export Current Map As SVG
					</button>
				</fieldset>
			</div>
		</div>
	</div>

	<div slot="action">
		<button
			class="btn btn-primary"
			disabled={noFilesSelected || fileTypeIsInvalid || isLoading}
			onclick={loadCustomMap}
		>
			{#if isLoading === true}
				Loading Custom Map
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				Load Custom Map
			{/if}
		</button>
	</div>
</ModalBase>
