import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { PUBLIC_POCKETBASE_URI } from '$env/static/public';

export const PocketBaseStore = writable(
  new PocketBase(PUBLIC_POCKETBASE_URI)
);