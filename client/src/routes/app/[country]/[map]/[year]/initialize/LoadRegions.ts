import { get } from 'svelte/store';
import { ModeStore } from '$lib/stores/Mode';
import { RegionsStore } from '$lib/stores/Regions';
import {
	TossupCandidateStore,
	SelectedCandidateStore,
	CandidatesStore,
	CandidateStoreSchema
} from '$lib/stores/Candidates';
import { EditRegionModalStore } from '$lib/stores/Modals';
import type Region from '$lib/types/Region';
import { InteractionStore } from '$lib/stores/Interaction';

function fillRegion(regionID: string, increment: boolean) {
	const regions = get(RegionsStore);
	const region = regions.find((region) => region.id === regionID);
	if (region && !(region.disabled || region.locked)) {
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
		} else {
			//Currently Enabled (Disable)
			region.disabled = true;
			//Set Region value to 0, save current val for when enabled again.
			region.value = 0;
		}
		RegionsStore.set(regions);
	}
}

/* Locks a region if currently enabled, unlocks if currently locked.
Locked regions are resistant to filling.
*/
function lockRegion(regionID: string) {
	const regions = get(RegionsStore);
	const region = regions.find((region) => region.id === regionID);
	if (region) {
		//Lock if unlocked, unlock if locked
		region.locked = !region.locked;
		RegionsStore.set(regions);
	}
}

function loadRegions(node: HTMLDivElement): void {
	/*Load Candidates from SVG, Candidates are defined in using the "candidates" property of the SVG document:
	See usa.svg for a map that implements this. Please note that you must use &quot; instead of ". 
	Edit the property in Inkscape to use double quotes. Inkspace will compress this to one line.
	<svg
	...
   	candidates="[ 
   		{&quot;id&quot;:&quot;0&quot;, &quot;name&quot;:&quot;Joe Custo Biden&quot;, &quot;margins&quot;: [{ &quot;color&quot;: &quot;#000055&quot; }, { &quot;color&quot;: &quot;#000099&quot; }, { &quot;color&quot;: &quot;#0000ff&quot; }]},
   		{&quot;id&quot;:&quot;1&quot;, &quot;name&quot;:&quot;Donald Trump&quot;, &quot;margins&quot;: [{ &quot;color&quot;: &quot;#550000&quot; }, { &quot;color&quot;: &quot;#990000&quot; }, { &quot;color&quot;: &quot;#ff0000&quot; }]} 
   	]"
	*/
	const candidatesStringified = node.querySelector('svg')?.getAttribute('candidates'); //This doesn't return SVG other than the map SVG
	const candidates = candidatesStringified != null ? JSON.parse(candidatesStringified) : null; //If candidate property not set, set candidates to null so the next check knows to use default candidates.
	if (candidates !== null) CandidatesStore.set(CandidateStoreSchema.parse(candidates)); //If no candidates are defined in SVG, use generics defined in stores/Candidates.ts

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
			value: childHTML.hasAttribute('disabled') ? 0 : value,
			permaVal: value,
			disabled: childHTML.hasAttribute('disabled'),
			locked: childHTML.hasAttribute('locked'),
			candidates: childHTML.hasAttribute('candidate-id') //God bless our linting overlords.
				? [
						//If the region has candidate-id defined, set the candidate appropriately, if not, default to the tossup candidate at margin 0
						//See predetermined_regions_example.svg for an example of how to implement candidate-id and candidate-margin attributes.
						{
							candidate: get(CandidatesStore)[Number(childHTML.getAttribute('candidate-id'))],
							count: value,
							margin: childHTML.hasAttribute('candidate-margin')
								? //If the region has candidate-margin defined, set the margin appropriately, if not, default to 0 (Safe)
								  Number(childHTML.getAttribute('candidate-margin'))
								: 0
						}
				  ]
				: [{ candidate: tossupCandidate, count: value, margin: 0 }],
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
				case 'disable':
					disableRegion(newRegion.id);
					break;
				case 'lock':
					lockRegion(newRegion.id);
					break;
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
