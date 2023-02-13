import type { PageServerLoadEvent } from './$types';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: PageServerLoadEvent) {
	return params;
}
