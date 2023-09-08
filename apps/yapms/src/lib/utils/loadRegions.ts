import { get } from 'svelte/store';
import { ModeStore } from '$lib/stores/Mode';
import {
	RegionsStore,
	setPointerEvents,
	setTransitionStyle,
	setCursorStyle
} from '$lib/stores/regions/Regions';
import {
	TossupCandidateStore,
	CandidatesStore,
	CandidateStoreSchema,
	CandidatesStoreDefault,
	TossupCandidateStoreDefault,
	SelectedCandidateStore
} from '$lib/stores/Candidates';
import { OriginalSourceStore } from '$lib/stores/OriginalSource';
import type Region from '$lib/types/Region';
import { ModeSchema } from '$lib/types/Mode';
import { CandidateSchema } from '$lib/types/Candidate';
import { SavedRegionCandidatesSchema } from '$lib/types/Region';
import { z } from 'zod';

function createDefaultModeStore(node: HTMLDivElement) {
	const defaultModeAttribute = node.querySelector('svg')?.getAttribute('default-mode');
	const defaultMode = ModeSchema.safeParse(defaultModeAttribute);
	if (defaultMode.success) {
		ModeStore.set(defaultMode.data);
	} else {
		console.error('Error Parsing defaultMode attribute from Map:\n\n' + defaultMode.error);
		ModeStore.set('fill');
	}
}

function createCandidateStore(node: HTMLDivElement) {
	try {
		const candidatesStringified = node.querySelector('svg')?.getAttribute('candidates'); //This doesn't return SVG other than the map SVG
		const candidates = candidatesStringified != null ? JSON.parse(candidatesStringified) : null; //If candidate property not set, set candidates to null so the next check knows to use default candidates.
		if (candidates !== null) {
			////If no candidates are defined in SVG, use generics defined in stores/Candidates.ts
			CandidatesStore.set(CandidateStoreSchema.parse(candidates));
		} else {
			CandidatesStore.set(CandidatesStoreDefault);
		}
	} catch (error) {
		console.error('Error Parsing Candidate Data from Map:\n\n' + error);
	}
}

function createTossupCandidateStore(node: HTMLDivElement) {
	try {
		const tossupStringified = node.querySelector('svg')?.getAttribute('tossup-candidate');
		const tossup = tossupStringified != null ? JSON.parse(tossupStringified) : null;
		if (tossup !== null) {
			TossupCandidateStore.set(CandidateSchema.parse(tossup));
		} else {
			TossupCandidateStore.set(TossupCandidateStoreDefault);
		}
	} catch (error) {
		console.error('Error Parsing Tossup Candidate Data from Map:\n\n' + error);
	}
}

function createSelectedCandidateStore() {
	SelectedCandidateStore.set(get(TossupCandidateStore));
}

function findCandidate(id: string) {
	const candidate = get(CandidatesStore).find((candidate) => candidate.id === id);
	if (candidate === undefined) {
		return get(TossupCandidateStore);
	} else {
		return candidate;
	}
}

function getCandidatesForRegion(candidateStr: string, value: number) {
	try {
		const SavedRegionCandidates = SavedRegionCandidatesSchema.parse(JSON.parse(candidateStr));
		let totCount = 0;
		const candidateArr = [];
		SavedRegionCandidates.forEach((candidate) => {
			totCount += candidate.count;
			candidateArr.push({
				...candidate,
				candidate: findCandidate(candidate.candidate)
			});
		});
		if (totCount !== value) {
			if (totCount < value) {
				candidateArr.push({
					candidate: get(TossupCandidateStore),
					count: value - totCount,
					margin: 0
				});
			} else if (totCount > value) {
				console.error(
					`Error parsing candidates attribute from region. Candidate counts within region with value ${value} add to ${totCount}. Region wil be marked as a Tossup.`
				);
				return [{ candidate: get(TossupCandidateStore), count: value, margin: 0 }];
			}
		}
		return candidateArr;
	} catch (err) {
		console.error('Error Parsing candidates attribute from region:\n\n' + err);
		return [{ candidate: get(TossupCandidateStore), count: value, margin: 0 }];
	}
}

function createRegionStore(node: HTMLDivElement) {
	const regionsForStore = Array<Region>();
	const regions = node.querySelector<HTMLElement>('[regions]');
	const texts = node.querySelector<HTMLElement>('[region-texts]');
	const tossupCandidate = get(TossupCandidateStore);

	if (regions === null) return;
	for (const child of regions.childNodes) {
		const childHTML = child as HTMLElement;
		if (childHTML.getAttribute === undefined) {
			continue;
		}

		const value = Number(childHTML.getAttribute('value'));
		const candidateString = childHTML.getAttribute('candidates');
		const newRegion: Region = {
			id: childHTML.getAttribute('region') ?? '',
			shortName: childHTML.getAttribute('short-name') ?? '',
			longName: childHTML.getAttribute('long-name') ?? '',
			value: childHTML.hasAttribute('disabled') ? 0 : value,
			permaVal: value,
			disabled: childHTML.hasAttribute('disabled'),
			locked: childHTML.hasAttribute('locked'),
			permaLocked: childHTML.hasAttribute('permalocked'),
			candidates:
				candidateString !== null //God bless our linting overlords.
					? getCandidatesForRegion(candidateString, value)
					: [{ candidate: tossupCandidate, count: value, margin: 0 }],
			nodes: {
				region: childHTML,
				button: null,
				text:
					texts?.querySelector(`[for-region="${childHTML.getAttribute('region') ?? ''}"]`) ?? null
			}
		};
		regionsForStore.push(newRegion);
	}

	RegionsStore.set(regionsForStore);
}

function createOriginalSourceStore(node: HTMLDivElement) {
	const svg = node.querySelector<SVGElement>('svg');

	if (svg === null) {
		return;
	}
	const originalSource = svg.getAttribute('original-source');
	if (originalSource === null) {
		return;
	}
	try {
		const result = z.string().array().parse(JSON.parse(originalSource));
		OriginalSourceStore.set(result);
	} catch (error) {
		console.error('error parsing original-source attribute:\n\n' + error);
		OriginalSourceStore.set([]);
	}
}

export function loadRegionsForApp(node: HTMLDivElement): void {
	createCandidateStore(node);
	createTossupCandidateStore(node);
	createSelectedCandidateStore();
	createDefaultModeStore(node);
	createRegionStore(node);
	createOriginalSourceStore(node);
	setCursorStyle();
	setTransitionStyle();
	setPointerEvents();
}

export function loadRegionsForView(node: HTMLDivElement): void {
	createCandidateStore(node);
	createTossupCandidateStore(node);
	createRegionStore(node);
}
