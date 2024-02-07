import type { GeoProjection } from 'd3';

export type ImportedSVG = {
	loaded: boolean;
	content: string;
	options: {
		projectionFunction: () => GeoProjection;
		customProjectionDefinition: string;
	};
};
