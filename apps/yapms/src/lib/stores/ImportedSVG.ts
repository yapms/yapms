import { writable } from 'svelte/store';
import type { ImportedSVG } from '$lib/types/ImportedSVG';
import { geoMercator } from 'd3';

/**
 * Stores the state of all regions.
 */
export const ImportedSVGStore = writable<ImportedSVG>({
	loaded: false,
	content: '',
	options: {
		projectionFunction: geoMercator,
		rotateAndCenter: true,
		crsDefinition: '',
		customProjectionDefinition: '',
		shortNameProp: '',
		longNameProp: '',
		valueProp: ''
	}
});
