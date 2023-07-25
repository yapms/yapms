import panzoom, { type PanZoom } from 'panzoom';
import z from 'zod';

let panzoomInstance: PanZoom | undefined;
let savedSVG: SVGElement | undefined;

function applyPanZoom(svg: SVGElement) {
	savedSVG = svg;
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
				if (svg !== undefined) {
					adjustStroke(svg, initStroke, strokeUpper, e.getTransform().scale);
				}
			});
		}
	}
}

function reapplyPanZoom() {
	if (panzoomInstance === undefined || savedSVG === undefined) {
		return;
	}
	panzoomInstance.dispose();
	applyPanZoom(savedSVG);
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

export { applyPanZoom, reapplyPanZoom };
