import type { GeoProjection } from 'd3';

type ImportedSVG = {
	loaded: boolean;
	content: string;
	options: {
		projectionFunction: () => GeoProjection;
		customProjectionDefinition: string;
	};
};

export default ImportedSVG;
