import { writable } from 'svelte/store';

export const ChartPositionStore = writable<'bottom' | 'left'>('bottom');
