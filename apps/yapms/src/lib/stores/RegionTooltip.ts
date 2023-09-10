import { writable } from 'svelte/store';

export const RegionTooltipStore = writable({
	enabled: false,
	inRegions: false,
	delayElapsed: false,
	content: '',
	x: 0,
	y: 0
});
