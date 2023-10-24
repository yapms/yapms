export function entries() {
	const maps = import.meta.glob('$lib/assets/maps/*/*.svg');

	const result = [];
	for (const key in maps) {
		const params = key.split('/').pop()?.split('.').at(0)?.split('-');
		if (params === undefined || params.length !== 4) {
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
}

export const prerender = true;
