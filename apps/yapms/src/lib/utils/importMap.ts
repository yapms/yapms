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
import DOMPurify from 'dompurify';

//This config allows all attributes used by the app to pass through DOMPurify without change.
//If you are adding an attribute imported maps might need, add it here.
export const DOMPurifyConfig = {
	ADD_ATTR: [
		'region',
		'short-name',
		'long-name',
		'value',
		'locked',
		'permalocked',
		'disabled',
		'candidate-id',
		'candidate-margin',
		'for',
		'candidates',
		'tossup-candidate',
		'default-mode',
		'auto-border-stroke-width',
		'auto-border-stroke-width-limit'
	]
};

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

	districtShapes.features = districtShapes.features.filter((feature) => feature.geometry !== null);

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
	ImportedSVGStore.set({ loaded: true, content: DOMPurify.sanitize(output, DOMPurifyConfig) });
}

function newImportedMap(): void {
	ImportModalStore.set({ open: true });
}

function exportImportAsSVG(): void {
	const svg = document.getElementById('map-div')?.querySelector<SVGElement>('svg');
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
		saveAs(
			new Blob([DOMPurify.sanitize(svg.outerHTML, DOMPurifyConfig)], { type: 'text/svg' }),
			'YapmsMap.svg'
		);
	}
}

export { importFromGeoJson, importFromShapefiles, newImportedMap, exportImportAsSVG };
