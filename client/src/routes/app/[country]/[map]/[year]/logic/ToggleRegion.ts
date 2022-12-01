import type Candidate from '$lib/types/Candidate';
import { calculateLumaHEX } from '$lib/utils/luma';
import _fillRegion from './FillRegion';

function _toggleRegion(mapBind: HTMLDivElement, region: HTMLElement, candidates: Candidate[]) {
	if (region.hasAttribute('disabled')) {
		//Currently Disabled (Enable)
		//Update candidate margins
		const value = parseInt(region.getAttribute('value') || '0');
		const defaultCandidate = candidates.find((c) => c.id === -1); //First candidate (Tossup)
		if (defaultCandidate) {
			defaultCandidate.margins[0].count += value;
		}

		//Set to disabled attributes & style
		region.removeAttribute('disabled');
		region.style.fillOpacity = '1';
		region.style.strokeOpacity = '1';

		//Button
		const regionName = region.getAttribute('class') || '';
		const button = mapBind.querySelector(`.region-buttons [for="${regionName}"]`);
		if (button) {
			(button as HTMLElement).style.fillOpacity = '1';
			(button as HTMLElement).style.strokeOpacity = '1';
		}
	} else {
		//Currently Enabled (Disable)
		//Update candidate margins
		const value = parseInt(region.getAttribute('value') || '0');
		const defaultCandidate = candidates.find((c) => c.id === -1); //First candidate (Tossup)
		if (defaultCandidate) {
			defaultCandidate.margins[0].count -= value;
		}
		_fillRegion(mapBind, region, -1, candidates, false);

		//Set to disabled attributes & style
		region.setAttribute('disabled', 'true');
		region.style.fillOpacity = '0.25';
		region.style.strokeOpacity = '0.25';
		if (defaultCandidate) {
			region.style.fill = defaultCandidate.margins[0].color;
		}

		//Text
		const regionName = region.getAttribute('class') || '';
		const text = mapBind.querySelector(`.region-texts [for="${regionName}"]`);
		if (defaultCandidate && text) {
			const luma = calculateLumaHEX(defaultCandidate.margins[0].color);
			(text as HTMLElement).style.color = luma > 0.5 ? 'black' : 'white';
		}

		//Button
		const button = mapBind.querySelector(`.region-buttons [for="${regionName}"]`);
		if (button) {
			(button as HTMLElement).style.fillOpacity = '0.25';
			(button as HTMLElement).style.strokeOpacity = '0.25';
		}
	}
	return candidates;
}

export default _toggleRegion;
