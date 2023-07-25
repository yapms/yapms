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

const EditTossupModalStore = writable<{
	open: boolean;
}>({
	open: false
});

const ClearMapModalStore = writable({
	open: false
});

const EditRegionModalStore = writable<{
	region: Region | null;
	open: boolean;
}>({
	region: null,
	open: false
});

const SplitRegionModalStore = writable<{
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

const ChartOptionsModalStore = writable({
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

const LoadingErrorModalStore = writable({
	open: false
});

const ThemeModalStore = writable({
	open: false
});

const BetaModalStore = writable({
	open: true
});

const ImportModalStore = writable({
	open: false
});

const ShareDisabledModalStore = writable({
	open: false
});

export {
	EditCandidateModalStore,
	EditTossupModalStore,
	ClearMapModalStore,
	EditRegionModalStore,
	SplitRegionModalStore,
	AddCandidateModalStore,
	PresetColorsModalStore,
	ChartOptionsModalStore,
	ModeModalStore,
	StyleModalStore,
	ShareModalStore,
	LoginModalStore,
	LoadingErrorModalStore,
	ThemeModalStore,
	BetaModalStore,
	ImportModalStore,
	ShareDisabledModalStore
};
