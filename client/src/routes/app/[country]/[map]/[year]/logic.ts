import type Candidate from '$lib/types/Candidate';
import { calculateLumaHEX } from '$lib/utils/luma';

function _fillRegion(
	mapBind: HTMLDivElement,
	region: HTMLElement,
	selectedCandidateId: number,
	candidates: Candidate[],
	increment: boolean
) {
	if (region.hasAttribute("disabled")) { //If a region is disabled, do nothing.
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
	if (region.hasAttribute("disabled") == false) { //Margins should not update when region disabled, changes will go into effect when re-enabled
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

function _toggleRegion(
	mapBind: HTMLDivElement,
	region: HTMLElement,
	candidates: Candidate[]
) {
	if (region.hasAttribute("disabled")) { //Currently Disabled (Enable)
		//Update candidate margins
		const value = parseInt(region.getAttribute('value') || '0');
		const defaultCandidate = candidates.find((c) => c.id === -1); //First candidate (Tossup)
		if (defaultCandidate) {
			defaultCandidate.margins[0].count += value;
		}

		//Set to disabled attributes & style
		region.removeAttribute("disabled");
		region.style.fillOpacity = "1";
		region.style.strokeOpacity = "1";

		//Button
		const regionName = region.getAttribute('class') || '';
		const button = mapBind.querySelector(`.region-buttons [for="${regionName}"]`);
		if (button) {
			(button as HTMLElement).style.fillOpacity = "1";
			(button as HTMLElement).style.strokeOpacity = "1";
		}
	} else { //Currently Enabled (Disable)
		//Update candidate margins
		const value = parseInt(region.getAttribute('value') || '0');
		const defaultCandidate = candidates.find((c) => c.id === -1); //First candidate (Tossup)
		if (defaultCandidate) {
			defaultCandidate.margins[0].count -= value;
		}
		_fillRegion(mapBind, region, -1, candidates, false);

		//Set to disabled attributes & style
		region.setAttribute("disabled","true");
		region.style.fillOpacity = "0.25";
		region.style.strokeOpacity = "0.25";
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
			(button as HTMLElement).style.fillOpacity = "0.25";
			(button as HTMLElement).style.strokeOpacity = "0.25";
		}
	}
	return candidates;
}

export { _fillRegion, _refreshRegions, _clearRegions, _editRegion, _toggleRegion};
