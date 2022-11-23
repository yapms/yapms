import type Candidate from '$lib/types/Candidate';
import type State from '$lib/types/State';
import { calculateLumaHEX } from '$lib/utils/luma';
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

function initializeMap(mapBind: HTMLDivElement, candidates: Candidate[]) {
	const candidatesCopy = candidates;
	const candidate = candidatesCopy.find((c) => c.id === -1);

	const texts = mapBind?.querySelector('.region-texts');
	const buttons = mapBind?.querySelector('.region-buttons');
	const regions = mapBind?.querySelector('.regions');
	buttons?.childNodes.forEach((child) => {
		const childHTML = child as HTMLElement;
		if (childHTML) {
			if (childHTML.style) {
				if (candidate) {
					childHTML.style.fill = candidate.margins[0].color;
					childHTML.style.cursor = 'pointer';
					childHTML.setAttribute('stroke', 'black');
				}
			}
		}
	});
	regions?.childNodes.forEach((child) => {
		const childHTML = child as HTMLElement;
		if (childHTML.setAttribute) {
			childHTML.style.transition = 'all 0.15s linear';
			childHTML.setAttribute('stroke', 'black');
			childHTML.setAttribute('candidate', '-1');
			if (candidate) {
				childHTML.style.fill = candidate.margins[0].color;
				childHTML.style.cursor = 'pointer';
				const value = parseInt(childHTML.getAttribute('value') || '0');
				candidate.margins[0].count += value;

				const regionName = childHTML.getAttribute('class') || '';
				const text = mapBind.querySelector(`.region-texts [for="${regionName}"]`);
				if (text) {
					const luma = calculateLumaHEX(candidate.margins[0].color);
					(text as HTMLElement).style.color = luma > 0.5 ? 'black' : 'white';
				}
			}

			if (texts) {
				(texts as HTMLElement).style.pointerEvents = 'none';
				const shortName = childHTML.getAttribute('short-name');
				const b = texts.querySelector(`[for="${shortName}"] .bottom`);
				if (b) {
					b.textContent = childHTML.getAttribute('value');
				}
			}
		}
	});
	return candidatesCopy;
}

function setupRegions(
	mapBind: HTMLDivElement,
	fillRegion: (region: HTMLElement) => void,
	getMode: () => string,
	openEditStateModal: (state: State) => void
) {
	const regions = mapBind.querySelector('.regions');
	if (regions === null) return;
	regions.childNodes.forEach((region) => {
		const regionDom = region as HTMLElement;
		regionDom.onclick = () => {
			if (getMode() === 'fill') {
				fillRegion(regionDom);
			} else if (getMode() === 'edit') {
				const shortName = regionDom.getAttribute('short-name') ?? '';
				const longName = regionDom.getAttribute('short-name') ?? '';
				const value = regionDom.getAttribute('value') ?? '0';
				openEditStateModal({
					shortName: shortName,
					longName: longName,
					value: parseInt(value, 10)
				});
			}
		};
	});
}

function setupButtons(
	mapBind: HTMLDivElement,
	fillRegion: (a: HTMLElement) => void,
	getMode: () => string
) {
	const buttons = mapBind.querySelector('.region-buttons');
	if (buttons === null) return;
	buttons.childNodes.forEach((button) => {
		const buttonDom = button as HTMLElement;
		buttonDom.onclick = () => {
			const forRegion = buttonDom.getAttribute('for');
			const region = mapBind.querySelector(`[short-name="${forRegion}"]`);
			if (region && getMode() === 'fill') {
				fillRegion(region as HTMLElement);
			}
		};
	});
}

export { applyPanZoom, initializeMap, setupRegions, setupButtons };
