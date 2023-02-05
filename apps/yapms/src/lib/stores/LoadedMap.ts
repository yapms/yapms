import type SavedMap from '$lib/types/SavedMap';
import { writable } from 'svelte/store';

export const LoadedMapStore = writable<SavedMap | null>(null);
