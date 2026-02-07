// Credit to Jonathan Gamble @ https://dev.to/jdgamble555/svelte-5-and-sortablejs-5h6j

// use-sortable.svelte.ts

import Sortable from 'sortablejs';

export const useSortable = (getter: () => HTMLElement | undefined, options?: Sortable.Options) => {
	$effect(() => {
		const sortableEl = getter();
		const sortable = sortableEl ? Sortable.create(sortableEl, options) : null;
		return () => sortable?.destroy();
	});
};

export function reorder<T>(array: T[], evt: Sortable.SortableEvent) {
	// should have no effect on stores or regular array
	const workArray = $state.snapshot(array);

	// get changes
	const { oldIndex, newIndex } = evt;

	if (oldIndex === undefined || newIndex === undefined) {
		return workArray;
	}
	if (newIndex === oldIndex) {
		return workArray;
	}

	// move elements
	const target = workArray[oldIndex];

	const increment = newIndex < oldIndex ? -1 : 1;

	for (let k = oldIndex; k !== newIndex; k += increment) {
		workArray[k] = workArray[k + increment];
	}
	workArray[newIndex] = target;

	return workArray;
}
