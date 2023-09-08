import { browser } from '$app/environment';
import type { RegionCandidate } from '$lib/types/Region';

export function removeAllPatterns() {
	if (browser) {
		const patterns = document
			?.getElementById('map-div')
			?.querySelector('svg')
			?.querySelectorAll('pattern');
		patterns?.forEach((pattern) => pattern.remove());
	}
}

export function makePattern(winners: Array<RegionCandidate>) {
	const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
	pattern.setAttribute('patternUnits', 'userSpaceOnUse');
	pattern.setAttribute('width', `${10 * winners.length}`);
	pattern.setAttribute('height', '10');
	pattern.setAttribute('patternTransform', 'rotate(45)');
	let name = 'repeat';
	winners.forEach((winner, i: number) => {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		line.setAttribute('stroke', winner.candidate.margins[0].color);
		line.setAttribute('x1', `${5 + 10 * i}`);
		line.setAttribute('x2', `${5 + 10 * i}`);
		line.setAttribute('y1', '0');
		line.setAttribute('y2', '10');
		line.setAttribute('stroke-width', `10`);
		pattern.appendChild(line);
		name += `-${winner.candidate.id}`;
	});
	pattern.setAttribute('id', name);
	const mapSVG = document?.getElementById('map-div')?.querySelector('svg');
	mapSVG?.appendChild(pattern);
	return `url(#${name})`;
}
