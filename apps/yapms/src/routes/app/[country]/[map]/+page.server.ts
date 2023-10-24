export function entries() {
	const maps = import.meta.glob('$lib/assets/maps/*/*.svg');

	const result = [];
	for (const key in maps) {
		const params = key.split('/').pop()?.split('.').at(0)?.split('-');
		if (params === undefined || params.length !== 2) {
			continue;
		}
		result.push({
			country: params[0],
			map: params[1]
		});
	}
	return result;
}

export const prerender = true;
