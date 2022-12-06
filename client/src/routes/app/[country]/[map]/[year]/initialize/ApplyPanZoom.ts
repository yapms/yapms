import panzoom from 'panzoom';

function applyPanZoom(mapBind: HTMLDivElement) {
	const svg = mapBind?.querySelector('#testing-map') as HTMLElement;
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
