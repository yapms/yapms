import panzoom, { type PanZoom } from 'panzoom';
import z from 'zod';

let originalBounds: DOMRect;
let newBounds: DOMRect;

function applyPanZoom(mapBind: HTMLDivElement): PanZoom | undefined {
	const svg = mapBind.querySelector<SVGElement>('svg'); //We can do this since the only child of node is the map svg itself.
	if (svg) {
		if (svg.classList.contains('insetsHidden')) {
			boundsNoInset(svg);
		}
		const panzoomInstance = panzoom(svg, {
			minZoom: 0.5,
			maxZoom: 100,
			smoothScroll: false,
			autocenter: true,
			zoomDoubleClickSpeed: 1
		});
		if (svg.classList.contains('insetsHidden')) {
			boundsInset(svg);
		}
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

function boundsNoInset(svg: SVGElement) {
	const regions = svg.querySelector('.regions');
	originalBounds = svg.getBoundingClientRect();
	newBounds = regions !== null ? regions.getBoundingClientRect() : originalBounds;
	if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
		svg.setAttribute('width', newBounds.width.toString());
		svg.setAttribute('height', newBounds.height.toString());
	}
}

function boundsInset(svg: SVGElement) {
	if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
		svg.setAttribute('width', originalBounds.width.toString());
		svg.setAttribute('height', originalBounds.height.toString());
	}
}

export default applyPanZoom;
