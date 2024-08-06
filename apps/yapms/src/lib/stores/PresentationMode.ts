import { writable } from "svelte/store";

export const PresentationModeStore = writable({
	enabled: false
});
