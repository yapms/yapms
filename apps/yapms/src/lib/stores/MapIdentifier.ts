import { writable } from 'svelte/store';

export const MapIdentifier = writable<{
	country: string | undefined;
	type: string | undefined;
	date: string | undefined;
	variant: string | undefined;
} | null>(null);

function loadMapIdentifier(svg: SVGElement) {
	const country = svg.getAttribute('country') ?? undefined;
	const type = svg.getAttribute('type') ?? undefined;
	const date = svg.getAttribute('date') ?? undefined;
	const variant = svg.getAttribute('variant') ?? undefined;

	MapIdentifier.set({
		country,
		type,
		date,
		variant
	});
}

export { loadMapIdentifier };
