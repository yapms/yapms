import { writable } from 'svelte/store';

export const SimulationWeightsStore = writable<Record<string, number>>({});
