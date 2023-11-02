import { get, writable } from 'svelte/store';
import type Region from '$lib/types/Region';
import type Candidate from '$lib/types/Candidate';
import { TossupCandidateStore } from './Candidates';

const CandidateModalStore = writable({
	open: false
});

const AddCandidateModalStore = writable({
	open: false,
	newColors: ['#000000']
});

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

const NavigateHomeModalStore = writable({
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
	open: boolean;
	region: Region | null;
}>({
	region: null,
	open: false
});

const PresetColorsModalStore = writable({
	open: false
});

const AddCustomColorModalStore = writable({
	open: false,
	newColors: ['#000000']
});

const EditCustomColorModalStore = writable({
	open: false,
	customColor: ['#000000'],
	customColorIndex: 0
});

const OptionsModalStore = writable({
	open: false
});

const ModeModalStore = writable({
	open: false
});

const ShareModalStore = writable({
	open: false
});

const AuthModalStore = writable({
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
	CandidateModalStore,
	EditCandidateModalStore,
	EditTossupModalStore,
	ClearMapModalStore,
	NavigateHomeModalStore,
	EditRegionModalStore,
	SplitRegionModalStore,
	AddCandidateModalStore,
	PresetColorsModalStore,
	AddCustomColorModalStore,
	EditCustomColorModalStore,
	OptionsModalStore,
	ModeModalStore,
	ShareModalStore,
	AuthModalStore,
	LoadingErrorModalStore,
	ThemeModalStore,
	BetaModalStore,
	ImportModalStore,
	ShareDisabledModalStore
};
