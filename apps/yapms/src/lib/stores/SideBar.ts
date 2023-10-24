import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const SideBarStore = writable({
	open: false,
	title: 'YAPms'
});

function loadSidebarTitle(node: SVGElement) {
	const title = node.getAttribute('title');
	if (title !== null) {
		SideBarStore.set({
			open: get(SideBarStore).open,
			title
		});
	}
}

export { loadSidebarTitle };
