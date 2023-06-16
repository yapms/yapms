import { writable } from 'svelte/store';

export const LogoStore = writable<string | null>(null);
