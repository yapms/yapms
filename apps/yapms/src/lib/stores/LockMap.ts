import { writable } from 'svelte/store';

export const LockMapStore = writable<boolean>(false);
