import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
import { ImportModalStore } from '$lib/stores/Modals';
import rewind from '@turf/rewind';
import { geoMercator, geoPath } from 'd3';
import * as shapefile from 'shapefile';
import type { AllGeoJSON } from '@turf/helpers';
import { get } from 'svelte/store';
import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
import { RegionsStore } from '$lib/stores/regions/Regions';
import { saveAs } from 'file-saver';

async function importFromShapefiles(files: FileList): Promise<void> {
	const districtShapes = await shapefile.read(files[0].stream());
	districtShapes.features = [];

	const unresolvedFeatures = [];
	for (const file of files) {
		unresolvedFeatures.push(shapefile.read(file.stream()));
	}

	const resolvedFeatures = await Promise.all(unresolvedFeatures);

	for (const collection of resolvedFeatures) {
		districtShapes.features = districtShapes.features.concat(collection.features);
	}
	geoJsonToSVG(districtShapes);
}

async function importFromGeoJson(files: FileList): Promise<void> {
	const districtShapes = JSON.parse(await files[0].text());
	districtShapes.features = [];

	const unresolvedTexts = [];
	for (const file of files) {
		unresolvedTexts.push(file.text());
	}
	const resolvedTexts = await Promise.all(unresolvedTexts);

	for (const text of resolvedTexts) {
		districtShapes.features = districtShapes.features.concat(JSON.parse(text).features);
	}

	geoJsonToSVG(districtShapes);
}

function geoJsonToSVG(districtShapes: GeoJSON.FeatureCollection) {
	const width = 1000,
		height = 1000;

	districtShapes.features = districtShapes.features.filter((feature) => feature.geometry != null);

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

	const output = `<svg id="importedSVG" width="${width}" height="${height}" auto-border-stroke-width="1" auto-border-stroke-width-limit=".1">
    <g class="regions">
    ${paths.join('\n')}
    </g>
    </svg>`;
	ImportedSVGStore.set({ loaded: true, content: output });
}

function newImportedMap(): void {
	ImportedSVGStore.set({ loaded: false, content: '' });
	ImportModalStore.set({ open: true });
}

function exportImportAsSVG(): void {
	const svg = document.getElementById('importedSVG');
	if (svg) {
		const regions = get(RegionsStore);
		svg.setAttribute('candidates', JSON.stringify(get(CandidatesStore)));
		svg.setAttribute('tossup-candidate', JSON.stringify(get(TossupCandidateStore)));
		for (const region of regions) {
			if (region.candidates[0].candidate.id !== '') {
				//If not Tossup
				region.nodes.region.setAttribute('candidate-id', region.candidates[0].candidate.id);
				if (region.candidates[0].margin !== undefined) {
					region.nodes.region.setAttribute(
						'candidate-margin',
						region.candidates[0].margin.toString()
					);
				}
			} else {
				//Remove attributes if imported map had them
				region.nodes.region.removeAttribute('candidate-id');
				region.nodes.region.removeAttribute('candidate-margin');
			}
		}
		saveAs(new Blob([svg.outerHTML], { type: 'text/svg' }), 'YapmsMap.svg');
	}
}

export { importFromGeoJson, importFromShapefiles, newImportedMap, exportImportAsSVG };
