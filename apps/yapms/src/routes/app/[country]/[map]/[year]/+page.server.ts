import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = ({ params }: PageServerLoadEvent) => {
	return params;
}
