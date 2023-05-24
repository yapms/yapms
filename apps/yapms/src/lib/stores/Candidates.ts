import type Candidate from '$lib/types/Candidate';
import { CandidateSchema } from '$lib/types/Candidate';
import { get, writable } from 'svelte/store';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const TossupCandidateStore = writable<Candidate>({
	id: '',
	name: 'Tossup',
	defaultCount: 0,
	margins: [{ color: '#cccccc' }]
});

export const CandidatesStore = writable<Candidate[]>([
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
]);

export function isTossupCandidate(candidateID: string): boolean {
	return candidateID === get(TossupCandidateStore).id;
}

export const SelectedCandidateStore = writable<Candidate>(get(TossupCandidateStore));

//Schema
export const CandidateStoreSchema = z.array(CandidateSchema);
