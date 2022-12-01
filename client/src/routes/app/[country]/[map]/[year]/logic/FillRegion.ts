import type Candidate from '$lib/types/Candidate';
import { calculateLumaHEX } from '$lib/utils/luma';

function _fillRegion(
	mapBind: HTMLDivElement,
	region: HTMLElement,
	selectedCandidateId: number,
	candidates: Candidate[],
	increment: boolean
) {
	if (region.hasAttribute('disabled')) {
		//If a region is disabled, do nothing.
		return candidates;
	}
	const selectedCandidate = candidates.find((candidate) => candidate.id === selectedCandidateId);
	if (selectedCandidate === undefined) {
		return candidates;
	}
	const currentCandidateID = parseInt(region.getAttribute('candidate') || '-2', 10);
	const currentCandidate = candidates.find((candidate) => candidate.id === currentCandidateID);
	if (currentCandidate === undefined) {
		return candidates;
	}

	const currentCandidateColor = parseInt(region.getAttribute('candidate-color') || '0', 10);
	let nextCandidateColor = currentCandidateColor;
	if (
		region.hasAttribute('candidate-color') === false ||
		selectedCandidateId !== currentCandidateID
	) {
		nextCandidateColor = 0;
	} else if (increment === true) {
		nextCandidateColor =
			currentCandidateColor + 1 >= selectedCandidate.margins.length ? 0 : currentCandidateColor + 1;
	}

	const value = parseInt(region.getAttribute('value') || '0');
	currentCandidate.margins[0].count -= value;
	selectedCandidate.margins[0].count += value;

	const regionName = region.getAttribute('short-name');

	if (regionName) {
		const text = mapBind.querySelector(`.region-texts [for="${regionName}"]`);
		if (text) {
			console.log(selectedCandidate);
			console.log(nextCandidateColor);
			const luma = calculateLumaHEX(selectedCandidate.margins[nextCandidateColor].color);
			(text as HTMLElement).style.color = luma > 0.5 ? '#000000' : '#ffffff';
		}

		const button = mapBind.querySelector(`.region-buttons [for="${regionName}"]`);
		if (button) {
			(button as HTMLElement).style.fill = selectedCandidate.margins[nextCandidateColor].color;
		}
	}

	region.style.fill = selectedCandidate.margins[nextCandidateColor].color;
	region.setAttribute('candidate-color', nextCandidateColor.toString());
	region.setAttribute('candidate', selectedCandidate.id.toString());

	return candidates;
}

export default _fillRegion;
