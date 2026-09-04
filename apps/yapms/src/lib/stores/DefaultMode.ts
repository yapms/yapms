import type { Mode } from '$lib/types/Mode';
import { writable } from 'svelte/store';

export const DefaultModeStore = writable<Mode | undefined>(undefined);
