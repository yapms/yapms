import panzoom, { type PanZoom } from 'panzoom';
import z from 'zod';

let panzoomInstance: PanZoom;
let svg: SVGElement;

function storeSVGForPan(mapBind: HTMLDivElement) {
	const foundSVG = mapBind.querySelector<SVGElement>('svg'); //We can do this since the only child of node is the map svg itself.
	if (foundSVG !== null) {
		svg = foundSVG; //We can do this since the only child of node is the map svg itself.
	}
}

function applyPanZoom(): PanZoom | undefined {
	panzoomInstance = panzoom(svg, {
		minZoom: 0.5,
		maxZoom: 100,
		smoothScroll: false,
		autocenter: true,
		zoomDoubleClickSpeed: 1,
		onTouch: function () {
			return false;
		}
	});
	if (svg.hasAttribute('auto-border-stroke-width')) {
		const inputParser = z.number().positive().finite();

		const initStroke = Number(svg.getAttribute('auto-border-stroke-width'));
		const initStrokeValid = inputParser.safeParse(initStroke).success;
		if (initStrokeValid) {
			let strokeUpper: number | null = Number(svg.getAttribute('auto-border-stroke-width-limit'));
			const strokeUpperValid = inputParser.safeParse(strokeUpper).success;
			if (!strokeUpperValid) {
				strokeUpper = null;
			}

			adjustStroke(svg, initStroke, strokeUpper, panzoomInstance.getTransform().scale);
			panzoomInstance.on('zoom', (e: PanZoom) => {
				adjustStroke(svg, initStroke, strokeUpper, e.getTransform().scale);
			});
		}
	}
	return panzoomInstance;
}

function reapplyPanZoom(): PanZoom | undefined {
	if (panzoomInstance.getTransform().scale <= 1.1) {
		panzoomInstance.dispose();
		setTimeout(applyPanZoom, 0);
	}
	return panzoomInstance;
}

function adjustStroke(
	svg: SVGElement,
	initStroke: number,
	strokeUpper: number | null,
	scale: number
) {
	const newStroke = initStroke / scale;
	if (strokeUpper !== null && newStroke > strokeUpper) {
		svg.style.setProperty('--auto-border-stroke-width', `${strokeUpper}px`);
	} else {
		const newStroke = initStroke / scale;
		svg.style.setProperty('--auto-border-stroke-width', `${newStroke}px`);
	}
}

export { storeSVGForPan, applyPanZoom, reapplyPanZoom };
