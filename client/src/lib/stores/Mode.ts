import type { Mode } from '$lib/types/Mode';
import { writable } from 'svelte/store';

export const ModeStore = writable<Mode>('fill');
