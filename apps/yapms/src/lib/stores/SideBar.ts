import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import { z } from 'zod';

export const SideBarStore = writable({
	open: false,
	title: 'YAPms',
	sources: [] as string[]
});

function loadSidebarTitle(node: SVGElement) {
	const title = node.getAttribute('title');
	if (title !== null) {
		SideBarStore.set({
			open: get(SideBarStore).open,
			title,
			sources: get(SideBarStore).sources
		});
	}
}

function loadSidebarSources(node: SVGElement) {
	let sources = [] as string[];
	const attribute = node.getAttribute('original-source') ?? '';
	try {
		sources = z.string().array().parse(JSON.parse(attribute));
	} catch (error) {
		console.error('error parsing original-source attribute:\n\n' + error);
	}
	SideBarStore.set({
		open: get(SideBarStore).open,
		title: get(SideBarStore).title,
		sources
	});
}

export { loadSidebarTitle, loadSidebarSources };
