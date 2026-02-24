import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
import { ImportModalStore } from '$lib/stores/Modals';
import rewind from '@turf/rewind';
import { geoBounds, geoCentroid, geoPath, geoProjection, type GeoRawProjection } from 'd3';
import * as shapefile from 'shapefile';
import { degreesToRadians, type AllGeoJSON, radiansToDegrees } from '@turf/helpers';
import { get } from 'svelte/store';
import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
import { RegionsStore } from '$lib/stores/regions/Regions';
import fileSaver from 'file-saver';
import DOMPurify from 'dompurify';
import type { SavedRegionCandidates } from '$lib/types/Region';
import proj4 from 'proj4';
import { safeJsonParse } from './safeJsonParse';
import z from 'zod';

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
		'for-region',
		'candidates',
		'tossup-candidate',
		'default-mode',
		'auto-border-stroke-width',
		'auto-border-stroke-width-limit',
		'map-type',
		'title',
		'original-source',
		'action-groups'
	]
};

async function importFromShapefiles(files: FileList): Promise<void> {
	ImportedSVGStore.set({
		...get(ImportedSVGStore),
		loaded: false,
		content: ''
	});
	const districtShapes = await shapefile.read(await files[0].arrayBuffer());
	districtShapes.features = [];

	const unresolvedFeatures = [];
	for (const file of files) {
		unresolvedFeatures.push(shapefile.read(await file.arrayBuffer()));
	}

	const resolvedFeatures = await Promise.all(unresolvedFeatures);

	for (const collection of resolvedFeatures) {
		districtShapes.features = districtShapes.features.concat(collection.features);
	}
	geoJsonToSVG(districtShapes);
}

async function importFromGeoJson(files: FileList): Promise<void> {
	ImportedSVGStore.set({
		...get(ImportedSVGStore),
		loaded: false,
		content: ''
	});

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

async function importFromSVG(files: FileList): Promise<void> {
	ImportedSVGStore.set({
		...get(ImportedSVGStore),
		loaded: false,
		content: ''
	});
	const importedSVGStore = get(ImportedSVGStore);
	ImportedSVGStore.set({
		...importedSVGStore,
		loaded: true,
		content: DOMPurify.sanitize(await files[0].text(), DOMPurifyConfig)
	});
}

function reprojectCoordinates(
	features: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[],
	crsFrom: string,
	crsTo: string
) {
	const projection = proj4(crsFrom, crsTo);
	features.map((feature: GeoJSON.Feature) => {
		if (feature.geometry.type === 'Polygon') {
			let coordinateArray = feature.geometry.coordinates;
			coordinateArray = coordinateArray.map((subArrayOne) =>
				subArrayOne.map((coordinatePair) => projection.forward(coordinatePair as number[]))
			);
			feature.geometry.coordinates = coordinateArray;
		}

		if (feature.geometry.type === 'MultiPolygon') {
			let coordinateArray = feature.geometry.coordinates;
			coordinateArray = coordinateArray.map((subArrayOne) =>
				subArrayOne.map((subArrayTwo) =>
					subArrayTwo.map((coordinatePair) => projection.forward(coordinatePair as number[]))
				)
			);
			feature.geometry.coordinates = coordinateArray;
		}

		return feature;
	});
	return features;
}

function geoJsonToSVG(districtShapes: GeoJSON.FeatureCollection) {
	const width = 1000,
		height = 1000;

	districtShapes.features = districtShapes.features.filter((feature) => feature.geometry !== null);

	districtShapes.features = districtShapes.features.map(
		(feature: GeoJSON.Feature) =>
			rewind(feature as AllGeoJSON, { reverse: true }) as GeoJSON.Feature
	);

	const importOptions = get(ImportedSVGStore).options;

	if (importOptions.crsDefinition !== '') {
		districtShapes.features = reprojectCoordinates(
			districtShapes.features,
			importOptions.crsDefinition,
			'WGS84'
		);
	}

	let projection = importOptions.projectionFunction();

	if (importOptions.rotateAndCenter && importOptions.projectionFunction !== proj4ToProjection && projection.rotate !== undefined && projection.center !== undefined) {
		const centroid = geoCentroid(districtShapes);
		projection = projection.rotate([-centroid[0], 0]);
	}

	projection = projection.fitSize([width, height], districtShapes);

	const render = geoPath().projection(projection);

	const paths = districtShapes.features.map((feature: GeoJSON.Feature, i: number) => {
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('region', i.toString());
		path.setAttribute(
			'short-name',
			importOptions.shortNameProp !== '' && feature.properties
				? feature.properties[importOptions.shortNameProp]
				: i.toString()
		);
		path.setAttribute(
			'long-name',
			importOptions.longNameProp !== '' && feature.properties
				? feature.properties[importOptions.longNameProp]
				: i.toString()
		);
		path.setAttribute(
			'value',
			importOptions.valueProp !== '' && feature.properties
				? feature.properties[importOptions.valueProp]
				: '1'
		);
		path.setAttribute('d', render(feature) ?? '');
		return path;
	});

	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
	svg.setAttribute('auto-border-stroke-width', '1');
	svg.setAttribute('auto-border-stroke-width-limit', '0.1');

	const regions = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	regions.setAttribute('map-type', 'regions');

	paths.forEach((path) => {
		regions.appendChild(path);
	});

	svg.appendChild(regions);

	ImportedSVGStore.set({
		...get(ImportedSVGStore),
		loaded: true,
		content: DOMPurify.sanitize(svg, DOMPurifyConfig)
	});
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
			const candidateAttr: SavedRegionCandidates = [];
			region.candidates.forEach((elem) => {
				candidateAttr.push({
					...elem,
					candidate: elem.candidate.id
				});
			});
			region.nodes.region.setAttribute('candidates', JSON.stringify(candidateAttr));
			region.nodes.region.setAttribute('value', region.permaVal.toString());
			region.nodes.region.setAttribute('short-name', region.shortName.toString());
			region.nodes.region.setAttribute('long-name', region.longName.toString());
			if (region.disabled) {
				region.nodes.region.setAttribute('disabled', region.disabled.toString());
			}
			if (region.locked) {
				region.nodes.region.setAttribute('locked', region.locked.toString());
			}
		}
		fileSaver.saveAs(
			new Blob([DOMPurify.sanitize(svg.outerHTML, DOMPurifyConfig)], { type: 'text/svg' }),
			'YapmsMap.svg'
		);
	}
}

function proj4ToProjection() {
	const proj4Projection = proj4(get(ImportedSVGStore).options.customProjectionDefinition);

	const project = function (lambda: number, phi: number) {
		return proj4Projection.forward([lambda, phi].map(radiansToDegrees));
	};

	project.invert = function (x: number, y: number) {
		return proj4Projection.inverse([x, y]).map(degreesToRadians);
	};

	return geoProjection(project as GeoRawProjection);
}

async function getGeoJsonProperties(files: FileList): Promise<Set<string>> {
	const parser = z.object({
		features: z.array(
			z.object({
				properties: z.any()
			})
		)
	});

	const properties: Set<string> = new Set<string>();

	const unresolvedTexts = [];
	for (const file of files) {
		unresolvedTexts.push(file.text());
	}

	const resolvedTexts = await Promise.all(unresolvedTexts);
	for (const text of resolvedTexts) {
		const json = safeJsonParse(text);
		if (json.isErr()) {
			console.error(json.error);
			continue;
		}

		const parsedJson = parser.safeParse(json.value);
		if (parsedJson.success === false) {
			console.error(parsedJson.error);
			continue;
		}

		Object.keys(parsedJson.data.features[0].properties).forEach((property) =>
			properties.add(property)
		);
	}

	return properties;
}

export {
	importFromGeoJson,
	importFromShapefiles,
	importFromSVG,
	newImportedMap,
	exportImportAsSVG,
	proj4ToProjection,
	getGeoJsonProperties
};
