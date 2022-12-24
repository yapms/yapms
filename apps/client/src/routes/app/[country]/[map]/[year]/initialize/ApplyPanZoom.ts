import panzoom, { type PanZoom } from 'panzoom';

function applyPanZoom(mapBind: HTMLDivElement): PanZoom | undefined {
	const svg = mapBind.querySelector<SVGElement>('#testing-map');
	if (svg) {
		return panzoom(svg, {
			minZoom: 0.5,
			maxZoom: 2,
			smoothScroll: false,
			autocenter: true,
			zoomDoubleClickSpeed: 1
		});
	}
}

export default applyPanZoom;
