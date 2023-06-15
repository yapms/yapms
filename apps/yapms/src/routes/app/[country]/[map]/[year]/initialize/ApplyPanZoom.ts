import panzoom, { type PanZoom } from 'panzoom';

function applyPanZoom(mapBind: HTMLDivElement): PanZoom | undefined {
	const svg = mapBind.querySelector<SVGElement>('svg'); //We can do this since the only child of node is the map svg itself.
	if (svg) {
		const panzoomInstance = panzoom(svg, {
			minZoom: 0.5,
			maxZoom: 100,
			smoothScroll: false,
			autocenter: true,
			zoomDoubleClickSpeed: 1
		});
		if (svg.classList.contains('autoBorders')) {
			adjustStroke(svg, panzoomInstance.getTransform().scale);
			panzoomInstance.on('zoom', function (e: PanZoom) {
				adjustStroke(svg, e.getTransform().scale);
			});
		}
		return panzoomInstance;
	}
}

function adjustStroke(svg: SVGElement, scale: number) {
	const initStroke = svg.hasAttribute('auto-border-stroke')
		? Number(svg.getAttribute('auto-border-stroke'))
		: 0.5;
	const strokeUpper = Number(svg.getAttribute('auto-border-upper'));
	const newStroke = initStroke / scale;
	if (strokeUpper && newStroke > strokeUpper) {
		svg.style.setProperty('--imported-stroke-width', `${strokeUpper}px`);
	} else {
		svg.style.setProperty('--imported-stroke-width', `${newStroke}px`);
	}
}

export default applyPanZoom;
