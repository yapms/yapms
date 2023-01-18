import { get, writable } from 'svelte/store';
import type Region from '$lib/types/Region';
import type Candidate from '$lib/types/Candidate';
import { TossupCandidateStore } from './Candidates';

const EditCandidateModalStore = writable<{
	candidate: Candidate;
	open: boolean;
}>({
	candidate: get(TossupCandidateStore),
	open: false
});

const ClearMapModalStore = writable({
	open: false
});

const MapModalStore = writable({
	open: false
});

const EditRegionModalStore = writable<{
	region: Region | null;
	open: boolean;
}>({
	region: null,
	open: false
});

const AddCandidateModalStore = writable({
	open: false,
	newColors: ['#000000']
});

const PresetColorsModalStore = writable({
	open: false
});

const ChartTypeModalStore = writable({
	open: false
});

const ModeModalStore = writable({
	open: false
});

const StyleModalStore = writable({
	open: false
});

const ShareModalStore = writable({
	open: false
});

const LoginModalStore = writable({
	open: false
});

export {
	EditCandidateModalStore,
	ClearMapModalStore,
	MapModalStore,
	EditRegionModalStore,
	AddCandidateModalStore,
	PresetColorsModalStore,
	ChartTypeModalStore,
	ModeModalStore,
	StyleModalStore,
	ShareModalStore,
	LoginModalStore
};
