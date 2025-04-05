<script lang="ts">
	import { ImportModalStore } from '$lib/stores/Modals';
	import { DOMPurifyConfig, importFromGeoJson, importFromShapefiles } from '$lib/utils/importMap';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import ModalBase from '../ModalBase.svelte';
	import DOMPurify from 'dompurify';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { exportImportAsSVG } from '$lib/utils/importMap';
	import GeoJsonOptions from './GeoJSONOptions.svelte';
	import ProjectionOptions from './ProjectionOptions.svelte';

	let files = $state<FileList | null | undefined>(undefined);
	let loadError = $state<boolean>(false);
	let loading = $state<boolean>(false);

	let fileType = $derived(
		// set the file type to the mime type
		// if a mime type isn't detected, then use the file extension
		Array.from(files || []).reduce((accu, curr) => {
			let type: string | undefined = undefined;

			if (curr.type === 'application/json') {
				type = 'application/geo+json';
			} else if (curr.type !== '') {
				type = curr.type;
			}

			if (type === undefined) {
				const extension = curr.name.split('.').at(-1) ?? '';
				type = extension;
			}

			if (accu === '' || accu === type) {
				return type;
			}

			return 'multiple';
		}, '')
	);

	let fileTypeIsInvalid = $derived(
		files &&
			files.length > 0 &&
			['application/geo+json', 'shp', 'image/svg+xml'].includes(fileType) === false
	);

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
			if (page.url.pathname !== '/app/imported') {
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
		if (files === undefined || files === null) {
			return;
		}

		if (fileType === '' || fileType === 'invalid') {
			return;
		}

		if (fileType === 'application/geo+json') {
			load(importFromGeoJson, files);
		} else if (fileType === 'shp') {
			load(importFromShapefiles, files);
		} else if (fileType === 'image/svg+xml') {
			load(loadSVG, files);
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
							class:file-input-error={loadError || fileTypeIsInvalid}
							disabled={loading}
							bind:files
						/>
					</div>
					{#if loadError === true}
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
						loaded. SVGs must be properly formatted, learn how at
						<a
							class="link"
							href="https://github.com/yapms/yapms/wiki/Map-SVG-Format"
							target="_blank"
						>
							github.com
						</a>.
					</p>
				</fieldset>

				<ProjectionOptions disabled={loading} />

				{#if fileType === 'application/geo+json'}
					<GeoJsonOptions disabled={loading} />
				{/if}

				<fieldset class="fieldset">
					<legend class="fieldset-legend">Export</legend>
					<button class="btn" disabled={loading} onclick={exportImportAsSVG}>
						Export Current Map As SVG
					</button>
				</fieldset>
			</div>
		</div>
	</div>

	<div slot="action">
		<button class="btn btn-primary" disabled={fileTypeIsInvalid || loading} onclick={loadCustomMap}>
			{#if loading === true}
				Loading Custom Map
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				Load Custom Map
			{/if}
		</button>
	</div>
</ModalBase>
