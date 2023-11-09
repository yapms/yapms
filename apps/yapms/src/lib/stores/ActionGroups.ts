import { writable } from 'svelte/store';

export const ActionGroups = writable<string[]>([]);

export const SelectedActionGroup = writable<number | undefined>(undefined);

function loadActionGroups(node: SVGElement) {
	const fillGroupsAttribute = node.getAttribute('action-groups') ?? '';
	if (fillGroupsAttribute.trim() === '') {
		ActionGroups.set([]);
		SelectedActionGroup.set(undefined);
	} else {
		const fillGroups = fillGroupsAttribute.split(',').map((group) => group.trim());
		ActionGroups.set(fillGroups);
		SelectedActionGroup.set(0);
	}
}

export { loadActionGroups };
