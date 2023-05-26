import { get } from 'svelte/store';
import { ModeStore } from '$lib/stores/Mode';
import { RegionsStore, setPointerEvents } from '$lib/stores/regions/Regions';
import {
	TossupCandidateStore,
	CandidatesStore,
	CandidateStoreSchema
} from '$lib/stores/Candidates';
import type Region from '$lib/types/Region';
import { ModeSchema } from '$lib/types/Mode';

function setCursorStyle(node: HTMLDivElement) {
	const regions = node.querySelector<HTMLElement>('.regions');
	const buttons = node.querySelector<HTMLElement>('.region-buttons');
	const texts = node.querySelector<HTMLElement>('.region-texts');

	// set cursor & pointer styles
	if (regions) {
		regions.style.cursor = 'pointer';
	}
	if (buttons) {
		buttons.style.cursor = 'pointer';
	}
	if (texts) {
		texts.style.pointerEvents = 'none';
		for (const child of texts.children) {
			(child as HTMLElement).style.transition = 'color 0.2s ease-in-out';
		}
	}
}

function setTransitionStyle(node: HTMLDivElement) {
	const regions = node.querySelector<HTMLElement>('.regions');
	if (regions === null) return;
	for (const child of regions.childNodes) {
		const childHTML = child as HTMLElement;
		if (childHTML.getAttribute === undefined) {
			continue;
		}
		childHTML.style.transition = 'fill 0.2s ease-in-out';
	}
}

function setDefaultMode(node: HTMLDivElement) {
	const defaultModeAttribute = node.querySelector('svg')?.getAttribute('default-mode');
	const defaultMode = ModeSchema.safeParse(defaultModeAttribute);
	if (defaultMode.success) {
		ModeStore.set(defaultMode.data);
	} else {
		console.error('Error Parsing defaultMode attribute from Map:\n\n' + defaultMode.error);
	}
}

function loadCandidateData(node: HTMLDivElement) {
	try {
		const candidatesStringified = node.querySelector('svg')?.getAttribute('candidates'); //This doesn't return SVG other than the map SVG
		const candidates = candidatesStringified != null ? JSON.parse(candidatesStringified) : null; //If candidate property not set, set candidates to null so the next check knows to use default candidates.
		if (candidates !== null) CandidatesStore.set(CandidateStoreSchema.parse(candidates)); //If no candidates are defined in SVG, use generics defined in stores/Candidates.ts
	} catch (error) {
		console.error('Error Parsing Candidate Data from Map:\n\n' + error);
	}
}

function createRegionStore(node: HTMLDivElement) {
	const regionsForStore = Array<Region>();
	const regions = node.querySelector<HTMLElement>('.regions');
	const buttons = node.querySelector<HTMLElement>('.region-buttons');
	const texts = node.querySelector<HTMLElement>('.region-texts');
	const tossupCandidate = get(TossupCandidateStore);

	if (regions === null) return;
	for (const child of regions.childNodes) {
		const childHTML = child as HTMLElement;
		if (childHTML.getAttribute === undefined) {
			continue;
		}

		const value = Number(childHTML.getAttribute('value'));
		const newRegion: Region = {
			id: childHTML.getAttribute('region') ?? '',
			shortName: childHTML.getAttribute('short-name') ?? '',
			longName: childHTML.getAttribute('long-name') ?? '',
			value: childHTML.hasAttribute('disabled') ? 0 : value,
			permaVal: value,
			disabled: childHTML.hasAttribute('disabled'),
			locked: childHTML.hasAttribute('locked'),
			permaLocked: childHTML.hasAttribute('permalocked'),
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
				button: buttons?.querySelector(`[for="${childHTML.getAttribute('region') ?? ''}"]`) ?? null,
				text: texts?.querySelector(`[for="${childHTML.getAttribute('region') ?? ''}"]`) ?? null
			}
		}

		newRegion.nodes.region.style.fill = tossupCandidate.margins[0].color;

		if (newRegion.nodes.button !== null) {
			newRegion.nodes.button.style.fill = tossupCandidate.margins[0].color;
		}

		if (newRegion.nodes.text !== null) {
			const bottom = newRegion.nodes.text.querySelector('.bottom');
			if (bottom !== null) {
				bottom.textContent = newRegion.value.toString();
			}
		}

		regionsForStore.push(newRegion);
	}

	RegionsStore.set(regionsForStore);
}

export function loadRegionsForApp(node: HTMLDivElement): void {
	loadCandidateData(node);
	setDefaultMode(node);
	setCursorStyle(node);
	createRegionStore(node);
	setTransitionStyle(node);
	setPointerEvents();
}

export function loadRegionsForView(node: HTMLDivElement): void {
	loadCandidateData(node);
	setDefaultMode(node);
	createRegionStore(node);
}
