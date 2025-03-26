import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';

export const RegionStrokeColorStore = writable<'background' | 'contrast' | 'white' | 'black'>(
	'background'
);

const colorsByKey = {
	background: 'var(--color-base-100)',
	contrast: 'var(--color-base-content)',
	white: '#ffffff',
	black: '#000000'
};

if (browser) {
	const strokeColor = localStorage.getItem('RegionStrokeColor');
	if (
		strokeColor === 'background' ||
		strokeColor === 'contrast' ||
		strokeColor === 'white' ||
		strokeColor === 'black'
	) {
		RegionStrokeColorStore.set(strokeColor);
	}
	RegionStrokeColorStore.subscribe((value) => {
		localStorage.setItem('RegionStrokeColor', value);
		const mapSVG = document.getElementById('map-div')?.querySelector('svg');
		if (mapSVG) {
			mapSVG.style.setProperty('--region-stroke-color', colorsByKey[value]);
		}
	});
}

//This exists because map-div/SVG is not defined when the above code runs.
export function setRegionStrokeColor(node: SVGElement) {
	node.style.setProperty('--region-stroke-color', colorsByKey[get(RegionStrokeColorStore)]);
}
