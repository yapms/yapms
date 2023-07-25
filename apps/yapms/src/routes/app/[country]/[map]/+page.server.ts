import titles from '$lib/assets/other/Titles.json';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return titles.map((title) => {
		const params = title.path.split('/');
		if (params[2] === undefined || params[3] === undefined) {
			return { country: 'usa', map: 'governors' };
		}
		return { country: params[2], map: params[3] };
	});
}

export const prerender = true;
