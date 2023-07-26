import titles from '$lib/assets/other/Titles.json';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return titles.map((title) => {
		const params = title.path.split('/');
		if (
			params[2] === undefined ||
			params[3] === undefined ||
			params[4] === undefined ||
			params[5] === undefined
		) {
			return { country: 'usa', map: 'presidential', year: '2022', variant: 'blank' };
		}
		return { country: params[2], map: params[3], year: params[4], variant: params[5] };
	});
}

export const prerender = true;
