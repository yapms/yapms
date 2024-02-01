import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const FontColor = writable<'auto' | 'white' | 'black'>('auto');

if (browser) {
	let fontColor = localStorage.getItem('FontColor');
	if (fontColor === 'auto' ||
		fontColor === 'white' ||
		fontColor === 'black') {
		FontColor.set(fontColor);
	}
	FontColor.subscribe((value) => {
		localStorage.setItem('AutoFontColor', value);
	});
}
