import { writable } from 'svelte/store';
import type ImportedSVG from '$lib/types/ImportedSVG';

/**
 * Stores the state of all regions.
 */
export const ImportedSVGStore = writable<ImportedSVG>({
	loaded: false,
	content: ''
});
