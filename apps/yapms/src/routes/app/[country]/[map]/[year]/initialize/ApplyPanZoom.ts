import panzoom, { type PanZoom } from 'panzoom';

function applyPanZoom(mapBind: HTMLDivElement): PanZoom | undefined {
	const svg = mapBind.querySelector<SVGElement>('svg'); //We can do this since the only child of node is the map svg itself.
	if (svg) {
		return panzoom(svg, {
			minZoom: 0.5,
			maxZoom: 100,
			smoothScroll: false,
			autocenter: true,
			zoomDoubleClickSpeed: 1
		});
	}
}

export default applyPanZoom;
