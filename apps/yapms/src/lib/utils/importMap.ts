import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
import { ImportModalStore } from '$lib/stores/Modals';
import rewind from '@turf/rewind';
import { geoMercator, geoPath } from 'd3';
import * as shapefile from 'shapefile';
import type { AllGeoJSON } from '@turf/helpers';
import { get } from 'svelte/store';
import { CandidatesStore } from '$lib/stores/Candidates';
import { RegionsStore } from '$lib/stores/regions/Regions';
import { saveAs } from 'file-saver';

async function importFromShapefiles(files: FileList): Promise<void> {
	let districtShapes = await shapefile.read(files[0].stream());
	districtShapes.features = [];

	for (const file of files) {
		districtShapes.features = districtShapes.features.concat(
			(await shapefile.read(file.stream())).features
		);
	}
	console.log(districtShapes);
	geoJsonToSVG(districtShapes);
}

async function importFromGeoJson(files: FileList): Promise<void> {
	const districtShapes = JSON.parse(await files[0].text());
	districtShapes.features = [];

	for (const file of files) {
		districtShapes.features = districtShapes.features.concat(
			JSON.parse(await file.text()).features
		);
	}

	geoJsonToSVG(districtShapes);
}

function geoJsonToSVG(districtShapes: GeoJSON.FeatureCollection) {
	console.log(districtShapes);
	const width = 1000,
		height = 1000;

	districtShapes.features = districtShapes.features.map(
		(feature: GeoJSON.Feature) =>
			rewind(feature as AllGeoJSON, { reverse: true }) as GeoJSON.Feature
	);

	const projection = geoMercator().fitSize([width, height], districtShapes);

	const render = geoPath().projection(projection);

	const paths = districtShapes.features.map(
		(feature: GeoJSON.Feature, i: number) =>
			`<path region="${i}" short-name="${i}" long-name="District ${i}" value="1" d="${render(
				feature
			)}"/>`
	);

	const output = `<svg id="importedSVG" width="${width}" height="${height}">
    <g class="regions">
    ${paths.join('\n')}
    </g>
    </svg>`;
	ImportedSVGStore.set({ loaded: true, content: output });
}

function newImportedMap() {
	ImportedSVGStore.set({ loaded: false, content: '' });
	ImportModalStore.set({ open: true });
}

function exportImportAsSVG() {
	const svg = document.getElementById('importedSVG');
	if (svg) {
		const regions = get(RegionsStore);
		svg.setAttribute('candidates', JSON.stringify(get(CandidatesStore)));
		for (const region of regions) {
			region.nodes.region.setAttribute('candidate-id', region.candidates[0].candidate.id);
		}
		saveAs(new Blob([svg.outerHTML], { type: 'text/svg' }), 'YapmsMap.svg');
	}
}

export { importFromGeoJson, importFromShapefiles, newImportedMap, exportImportAsSVG };
