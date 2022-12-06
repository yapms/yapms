import { writable } from 'svelte/store';
/*The array here is an array of keys pressed by code (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code). 
Limited to key presses relevant to functionality through checks where the store is modified.*/
export const InteractionStore = writable<Array<String>>([]);
