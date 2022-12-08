import { writable } from 'svelte/store';
/*The map here is a map of keys pressed by code (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code). 
Key presses are set to true when pressed and then deleted from the map when released.*/
export const InteractionStore = writable<Map<string, boolean>>(new Map<string,boolean>);
