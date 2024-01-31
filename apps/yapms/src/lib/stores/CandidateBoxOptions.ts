import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const CandidateBoxOptions = writable({
	fontSize: 1
});

if (browser) {
	let fontSize = Number(localStorage.getItem("CandidateBoxOptions.fontSize") ?? "1");
	if (isNaN(fontSize)) {
		fontSize = 1;
	}
	CandidateBoxOptions.set({
		fontSize: fontSize
	});
	CandidateBoxOptions.subscribe((value) => {
		localStorage.setItem("CandidateBoxOptions.fontSize", value.fontSize.toString());
	});
}
