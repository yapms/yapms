import { writable } from 'svelte/store';

const MoreMapsModalStore = writable({
	open: false,
	title: '',
	prefix: '',
	keys: [''] //Used to match Titles.json
});

export { MoreMapsModalStore };
