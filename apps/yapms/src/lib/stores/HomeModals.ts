import { writable } from 'svelte/store';

const MoreMapsModalStore = writable({
	open: false,
	key: '' //Used to search MapList.json
});

export { MoreMapsModalStore };
