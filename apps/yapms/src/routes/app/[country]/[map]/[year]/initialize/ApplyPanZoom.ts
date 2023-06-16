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
		if (svg.hasAttribute('auto-border-stroke-width')) {
			const initStroke = Number(svg.getAttribute('auto-border-stroke-width'));
			const strokeUpper = Number(svg.getAttribute('auto-border-stroke-width-limit'));
			adjustStroke(svg, initStroke, strokeUpper, panzoomInstance.getTransform().scale);
			panzoomInstance.on('zoom', (e: PanZoom) => {
				const initStroke = Number(svg.getAttribute('auto-border-stroke-width'));
				const strokeUpper = Number(svg.getAttribute('auto-border-stroke-width-limit'));
				adjustStroke(svg, initStroke, strokeUpper, e.getTransform().scale);
			});
		}
		return panzoomInstance;
	}
}

function adjustStroke(svg: SVGElement, initStroke: number, strokeUpper: number, scale: number) {
	const newStroke = initStroke / scale;
	if (strokeUpper && newStroke > strokeUpper) {
		svg.style.setProperty('--auto-border-stroke-width', `${strokeUpper}px`);
	} else {
		svg.style.setProperty('--auto-border-stroke-width', `${newStroke}px`);
	}
}

export default applyPanZoom;
