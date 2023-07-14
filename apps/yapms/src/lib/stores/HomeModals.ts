import type { HomeLinkData } from '$lib/types/HomeData';
import { writable } from 'svelte/store';

const MoreMapsModalStore = writable({
	open: false,
	title: '',
	buttons: new Array<HomeLinkData>() //Used to match Titles.json
});

export { MoreMapsModalStore };
