import { writable } from "svelte/store";

export const LoadedMapStore = writable<string | null>(null);