import type Candidate from '$lib/types/Candidate';
import _fillRegion from './FillRegion';

function _clearRegions(mapBind: HTMLDivElement, candidates: Candidate[]) {
	const regions = mapBind.querySelector('.regions');
	regions?.childNodes.forEach((region) => {
		const regionDom = region as HTMLElement;
		if (typeof regionDom.getAttribute === 'function') {
			candidates = _fillRegion(mapBind, regionDom, -1, candidates, false);
		}
	});
	return candidates;
}

export default _clearRegions;
