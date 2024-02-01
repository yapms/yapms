import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const FontColorStore = writable<'auto' | 'white' | 'black'>('auto');

if (browser) {
	let fontColor = localStorage.getItem('FontColor');
	if (fontColor === 'auto' ||
		fontColor === 'white' ||
		fontColor === 'black') {
		FontColorStore.set(fontColor);
	}
	FontColorStore.subscribe((value) => {
		localStorage.setItem('FontColor', value);
	});
}
