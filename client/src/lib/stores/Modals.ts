import { get, writable } from 'svelte/store';
import { TossupCandidateStore } from './Candidates';

export const ModalsStore = writable(1);

export const EditCandidateModalStore = writable({
	candidate: get(TossupCandidateStore),
	open: false
});

export const ClearMapModalStore = writable({
	open: false
});

export const MapModalStore = writable({
	open: false
});
