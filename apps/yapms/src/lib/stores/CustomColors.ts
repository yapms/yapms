import type { CustomColor } from '$lib/types/CustomColor';
import { persisted } from 'svelte-local-storage-store';

export const CustomColorsStore = persisted<CustomColor[]>('custom-colors', []);
