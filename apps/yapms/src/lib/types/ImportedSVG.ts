import type { GeoProjection } from 'd3';

export type ImportedSVG = {
	loaded: boolean;
	content: string;
	options: {
		projectionFunction: () => GeoProjection;
		rotateAndCenter: boolean;
		customProjectionDefinition: string;
		crsDefinition: string;
		shortNameProp: string;
		longNameProp: string;
		valueProp: string;
	};
};
