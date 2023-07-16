import { writable } from 'svelte/store';

export const InteractionStore = writable(new Map<string, boolean>());
