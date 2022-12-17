import { get } from 'svelte/store';
import { ModeStore } from '$lib/stores/Mode';
import { RegionsStore } from '$lib/stores/Regions';
import { TossupCandidateStore, SelectedCandidateStore } from '$lib/stores/Candidates';
import { EditRegionModalStore } from '$lib/stores/Modals';
import type Region from '$lib/types/Region';
import { InteractionStore } from '$lib/stores/Interaction';

function fillRegion(regionID: string, increment: boolean) {
	const regions = get(RegionsStore);
	const region = regions.find((region) => region.id === regionID);
	if (region && !region.disabled) {
		const selectedCandidate = get(SelectedCandidateStore);
		const currentCandidate = region.candidates[0];
		const newCandidate = {
			candidate: selectedCandidate,
			count: region.value,
			margin: 0
		};
		if (currentCandidate.candidate.id === selectedCandidate.id && increment) {
			newCandidate.margin =
				currentCandidate.margin + 1 >= selectedCandidate.margins.length
					? 0
					: currentCandidate.margin + 1;
		}
		region.candidates = [newCandidate];
		RegionsStore.set(regions);
	}
}

function editRegion(regionID: string) {
	const region = get(RegionsStore).find((region) => region.id === regionID);
	EditRegionModalStore.set({
		region: region ?? null,
		open: region !== undefined
	});
}

/* Disables a region if currently enabled, enables if currently disabled.
Disabled regions are resistant to filling, have a displayed value of 0, and use the tossup candidate color.
When a region is reenabled, it will go back to the candidate who had it last.
*/
function disableRegion(regionID: string) {
	const regions = get(RegionsStore);
	const region = regions.find((region) => region.id === regionID);
	if (region) {
		if (region?.disabled) {
			//Currently Disabled (Enable)
			region.disabled = false;
			//Set Region value back to OG value
			region.value = region.permaVal;

			//Set to disabled attributes & style
			region.nodes.region.style.fillOpacity = '1';
			region.nodes.region.style.strokeOpacity = '1';

			//Button
			const button = region.nodes.button;
			if (button) {
				button.style.fillOpacity = '1';
				button.style.strokeOpacity = '1';
			}
		} else {
			//Currently Enabled (Disable)
			region.disabled = true;
			//Set Region value to 0, save current val for when enabled again.
			region.permaVal = region.value;
			region.value = 0;

			//Set to disabled attributes & style
			region.nodes.region.style.fillOpacity = '0.25';
			region.nodes.region.style.strokeOpacity = '0.25';

			//Button
			const button = region.nodes.button;
			if (button) {
				button.style.fillOpacity = '0.25';
				button.style.strokeOpacity = '0.25';
			}
		}
		RegionsStore.set(regions);
	}
}

function loadRegions(node: HTMLDivElement): void {
	const regionsForStore: Region[] = [];
	const regions = node.querySelector('.regions');
	const buttons = node.querySelector('.region-buttons');
	const texts = node.querySelector('.region-texts');
	const tossupCandidate = get(TossupCandidateStore);

	// set cursor & pointer styles
	(regions as HTMLElement).style.cursor = 'pointer';
	(buttons as HTMLElement).style.cursor = 'pointer';
	(texts as HTMLElement).style.pointerEvents = 'none';

	regions?.childNodes.forEach((childNode) => {
		const childHTML = childNode as HTMLElement;
		if (childHTML.getAttribute === undefined) {
			return;
		}

		const value = parseInt(childHTML.getAttribute('value') || '0', 10);
		const newRegion: Region = {
			id: childHTML.getAttribute('class') ?? '',
			shortName: childHTML.getAttribute('short-name') ?? '',
			longName: childHTML.getAttribute('long-name') ?? '',
			value,
			permaVal: value,
			disabled: childHTML.hasAttribute('disabled'),
			candidates: [{ candidate: tossupCandidate, count: value, margin: 0 }],
			nodes: {
				region: childHTML,
				button: buttons?.querySelector(`[for="${childHTML.getAttribute('class') ?? ''}"]`) ?? null,
				text: texts?.querySelector(`[for="${childHTML.getAttribute('class') ?? ''}"]`) ?? null
			}
		};

		newRegion.nodes.region.onclick = () => {
			const currentMode = get(ModeStore);
			switch (currentMode) {
				case 'fill':
					fillRegion(newRegion.id, true);
					break;
				case 'edit':
					editRegion(newRegion.id);
					break;
				case 'disable': {
					disableRegion(newRegion.id);
					break;
				}
			}
		};

		newRegion.nodes.region.onmousemove = () => {
			const currentMode = get(ModeStore);
			const currentInteractions = get(InteractionStore);

			if (currentMode === 'fill' && currentInteractions.has('KeyF')) {
				fillRegion(newRegion.id, false);
			}
		};

		if (newRegion.nodes.button !== null) {
			newRegion.nodes.button.onclick = newRegion.nodes.region.onclick;
			newRegion.nodes.button.onmousemove = newRegion.nodes.region.onmousemove;
		}

		newRegion.nodes.region.style.fill = tossupCandidate.margins[0].color;

		if (newRegion.nodes.button) {
			newRegion.nodes.button.style.fill = tossupCandidate.margins[0].color;
		}

		if (newRegion.nodes.text) {
			const bottom = newRegion.nodes.text.querySelector('.bottom');
			if (bottom) {
				bottom.textContent = newRegion.value.toString();
			}
		}

		regionsForStore.push(newRegion);
	});

	RegionsStore.set(regionsForStore);
}

export default loadRegions;
