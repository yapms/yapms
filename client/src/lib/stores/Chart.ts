import type { ChartType } from '$lib/types/ChartType';
import { writable } from 'svelte/store';

export const ChartPositionStore = writable<'bottom' | 'left'>('bottom');

export const ChartTypeStore = writable<ChartType>('battle');
