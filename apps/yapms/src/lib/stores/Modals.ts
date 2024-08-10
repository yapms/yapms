import { get, writable } from 'svelte/store';
import type { Region } from '$lib/types/Region';
import { TossupCandidateStore } from './Candidates';

export const CandidateModalStore = writable({
	open: false
});

export const AddCandidateModalStore = writable({
	open: false
});

export const EditCandidateModalStore = writable<{
	candidateId: string;
	open: boolean;
}>({
	candidateId: get(TossupCandidateStore).id,
	open: false
});

export const EditTossupModalStore = writable<{
	open: boolean;
}>({
	open: false
});

export const ClearMapModalStore = writable({
	open: false
});

export const NavigateHomeModalStore = writable({
	open: false
});

export const EditRegionModalStore = writable<{
	region: Region | null;
	open: boolean;
}>({
	region: null,
	open: false
});

export const SplitRegionModalStore = writable<{
	open: boolean;
	region: Region | null;
}>({
	region: null,
	open: false
});

export const PresetColorsModalStore = writable({
	open: false
});

export const PresetColorsModalSelectedStore = writable(Array<string>());

export const AddCustomColorModalStore = writable({
	open: false,
	newColors: ['#000000']
});

export const EditCustomColorModalStore = writable({
	open: false,
	customColor: ['#000000'],
	customColorIndex: 0
});

export const OptionsModalStore = writable({
	open: false
});

export const ModeModalStore = writable({
	open: false
});

export const ShareModalStore = writable({
	open: false
});

export const AuthModalStore = writable({
	open: false
});

export const LoadingErrorModalStore = writable({
	open: false
});

export const ThemeModalStore = writable({
	open: false
});

export const BetaModalStore = writable({
	open: true
});

export const ImportModalStore = writable({
	open: false
});

export const ShareDisabledModalStore = writable({
	open: false
});

//Tool modals
export const ToolsModalStore = writable({
	open: false
});

export const MassEditModalStore = writable({
	open: false
});
