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
	import ExportSvgButton from './ExportSVGButton.svelte';

	let geoJsonFiles: FileList;
	let shapeFiles: FileList;
	let svgFiles: FileList;

	let loadError = false;
	let loading = false;

	const multipleFilesTooltip =
		'Select multiple files to upload and they will be automatically merged.';

	async function loadGeoJson() {
		loading = true;
		try {
			ImportedSVGStore.set({ loaded: false, content: '' });
			await importFromGeoJson(geoJsonFiles);
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

	async function loadShapeFiles() {
		loading = true;
		try {
			ImportedSVGStore.set({ loaded: false, content: '' });
			await importFromShapefiles(shapeFiles);
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

	async function loadSVG() {
		loading = true;
		try {
			ImportedSVGStore.set({ loaded: false, content: '' });
			ImportedSVGStore.set({
				loaded: true,
				content: DOMPurify.sanitize(await svgFiles[0].text(), DOMPurifyConfig)
			});
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
				<div class="flex flex-col gap-2">
					<div class="flex gap-x-1">
						<h3 class="font-light text-lg">Open from GeoJson</h3>
						<div class="tooltip" data-tip={multipleFilesTooltip}>
							<DocumentDuplicate class="w-6" />
						</div>
					</div>
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
							disabled={!geoJsonFiles || geoJsonFiles.length < 1 || loading}
						>
							<ArrowUpTray class="w-5 h-5" />
							<span>Load</span>
						</button>
					</div>
				</div>

				<div class="divider divider-vertical mt-1 -mb-1" />

				<div class="flex flex-col gap-2">
					<div class="flex gap-x-1">
						<h3 class="font-light text-lg">Open from Shapefiles</h3>
						<div class="tooltip" data-tip={multipleFilesTooltip}>
							<DocumentDuplicate class="w-6" />
						</div>
					</div>
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
							disabled={!shapeFiles || shapeFiles.length < 1 || loading}
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
							disabled={!svgFiles || svgFiles.length < 1 || loading}
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
		<ExportSvgButton />
	</div>
</ModalBase>
