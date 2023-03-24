import type Candidate from '$lib/types/Candidate';
import { CandidateSchema } from '$lib/types/Candidate';
import { get, readable, writable } from 'svelte/store';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const TossupCandidateStore = readable<Candidate>({
	id: '',
	name: 'Tossup',
	margins: [{ color: '#cccccc' }]
});

export const CandidatesStore = writable<Candidate[]>([
	{
		id: uuidv4(),
		name: 'Joe Biden',
		margins: [{ color: '#000055' }, { color: '#000099' }, { color: '#0000ff' }]
	},
	{
		id: uuidv4(),
		name: 'Donald Trump',
		margins: [{ color: '#550000' }, { color: '#990000' }, { color: '#ff0000' }]
	}
]);

export function isTossupCandidate(candidateID: string): boolean {
	return candidateID === get(TossupCandidateStore).id;
}

export const SelectedCandidateStore = writable<Candidate>(get(TossupCandidateStore));

//Schema
export const CandidateStoreSchema = z.array(CandidateSchema);
