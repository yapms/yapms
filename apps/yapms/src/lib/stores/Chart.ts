import type { ChartPosition } from '$lib/types/ChartPosition';
import type { ChartType } from '$lib/types/ChartType';
import { writable } from 'svelte/store';

export const ChartPositionStore = writable<ChartPosition>('bottom');

export const ChartTypeStore = writable<ChartType>('battle');
