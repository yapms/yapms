import type { Candidate } from '$lib/types/Candidate';
import { CandidateSchema } from '$lib/types/Candidate';
import { keyCodeToNumber } from '$lib/utils/keyCodeToNumber';
import { derived, get, writable } from 'svelte/store';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const TossupCandidateStoreDefault: Candidate = {
	id: '',
	name: 'Tossup',
	defaultCount: 0,
	margins: [{ color: '#cccccc' }]
};

export const TossupCandidateStore = writable<Candidate>(TossupCandidateStoreDefault);

export const CandidatesStoreDefault: Candidate[] = [
	{
		id: uuidv4(),
		name: 'Democrat',
		defaultCount: 0,
		margins: [
			{ color: '#1C408C' },
			{ color: '#577CCC' },
			{ color: '#8AAFFF' },
			{ color: '#949BB3' }
		]
	},
	{
		id: uuidv4(),
		name: 'Republican',
		defaultCount: 0,
		margins: [
			{ color: '#BF1D29' },
			{ color: '#FF5865' },
			{ color: '#FF8B98' },
			{ color: '#CF8980' }
		]
	}
];

export const CandidatesStore = writable<Candidate[]>(CandidatesStoreDefault);

export const CandidatesTable = derived(CandidatesStore, (candidates) => {
	return candidates.reduce((prev, next) => {
		return prev.set(next.id, next);
	}, new Map<string, Candidate>());
	const data = new Map<string, Candidate>();
	for (const candidate of candidates) {
		data.set(candidate.id, candidate);
	}
	return data;
});

export function isTossupCandidate(candidateID: string): boolean {
	return candidateID === get(TossupCandidateStore).id;
}

export const SelectedCandidateStore = writable<Candidate>(get(TossupCandidateStore));

//Schema
export const CandidateStoreSchema = z.array(CandidateSchema);

export function handleCandidateSelectionShortcut(keycode: string) {
	const digit = keyCodeToNumber(keycode);
	if (digit !== null && digit < get(CandidatesStore).length + 1) {
		if (digit === 0) {
			SelectedCandidateStore.set(get(TossupCandidateStore));
		} else {
			SelectedCandidateStore.set(get(CandidatesStore)[digit - 1]);
		}
	}
}
