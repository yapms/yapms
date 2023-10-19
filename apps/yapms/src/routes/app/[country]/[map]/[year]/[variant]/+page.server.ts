/** @type {import('./$types').EntryGenerator} */
export function entries() {
	const maps = import.meta.glob('$lib/assets/maps/*/*.svg');

	const result = [];
	for (const key in maps) {
		const filename = key.split('/').pop();
		if (filename === undefined) {
			continue;
		}
		const params = filename.split('-');
		if (params.length !== 4) {
			continue;
		}
		result.push({
			country: params[0],
			map: params[1],
			year: params[2],
			variant: params[3]
		});
	}
	return result;

	/*
	return titles.map((title) => {
		const params = title.path.split('/');
		if (
			params[2] === undefined ||
			params[3] === undefined ||
			params[4] === undefined ||
			params[5] === undefined
		) {
			return { country: 'usa', map: 'presidential', year: '2024', variant: 'blank' };
		}
		return { country: params[2], map: params[3], year: params[4], variant: params[5] };
	});
	*/
}

export const prerender = true;
