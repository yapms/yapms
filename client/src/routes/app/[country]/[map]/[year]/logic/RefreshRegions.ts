import type Candidate from '$lib/types/Candidate';
import _fillRegion from './FillRegion';

function _refreshRegions(mapBind: HTMLDivElement, candidates: Candidate[]) {
	const regions = mapBind.querySelector('.regions');
	regions?.childNodes.forEach((region) => {
		const regionDom = region as HTMLElement;
		if (typeof regionDom.getAttribute === 'function') {
			_fillRegion(
				mapBind,
				region as HTMLElement,
				parseInt(regionDom.getAttribute('candidate') || '-2', 10),
				candidates,
				false
			);
		}
	});
}

export default _refreshRegions;
