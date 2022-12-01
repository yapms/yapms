import type Candidate from '$lib/types/Candidate';

function _editRegion(
	mapBind: HTMLDivElement,
	region: HTMLElement,
	candidates: Candidate[],
	newValue: number
) {
	/* Update value */
	const currentValue = parseInt(region.getAttribute('value') || '0');
	region.setAttribute('value', newValue.toString());

	/* Update candidate margins */
	if (region.hasAttribute('disabled') == false) {
		//Margins should not update when region disabled, changes will go into effect when re-enabled
		const currentCandidateID = parseInt(region.getAttribute('candidate') || '-2', 10);
		const currentCandidate = candidates.find((c) => c.id === currentCandidateID);
		if (currentCandidate) {
			currentCandidate.margins[0].count -= currentValue;
			currentCandidate.margins[0].count += newValue;
		}
	}

	/* Update text */
	const shortName = region.getAttribute('short-name');
	const text = mapBind.querySelector(`.region-texts [for="${shortName}"] .bottom`);
	if (text) {
		text.innerHTML = newValue.toString();
	}
	return candidates;
}

export default _editRegion;
