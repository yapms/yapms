import titles from '$lib/assets/other/Titles.json';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return titles.map((title) => {
		let path = title.path;
		path = path.replace('/app/', '');
		const country = path.match(/.+?(?=\/)/)?.[0];
		path = path.replace(`${country}/`, '');
		const map = path.match(/.+?(?=\/)/)?.[0];
		const year = path.replace(`${map}/`, '');
		if (country === undefined || map === undefined) {
			return { country: 'usa', map: 'presidential', year: '2022' };
		}
		return { country, map, year };
	});
}

export const prerender = true;
