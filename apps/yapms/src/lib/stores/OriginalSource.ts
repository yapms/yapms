import { writable } from 'svelte/store';

const OriginalSourceStore = writable<string[]>([]);

export { OriginalSourceStore };
