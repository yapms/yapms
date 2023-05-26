import { TossupCandidateStore, CandidatesStore } from '$lib/stores/Candidates';
import { get } from 'svelte/store';
import { saveAs } from 'file-saver';
import { page } from '$app/stores';
import { RegionsStore } from '$lib/stores/regions/Regions';

/**
 * Generates a JSON object with the current state of the map
 *
 * @returns The current state of the map
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function generateJson() {
	console.log(get(page).url.pathname);

	const tossupStore = get(TossupCandidateStore);
	const candidateStore = get(CandidatesStore);
	const regionStore = get(RegionsStore).map((region) => ({
		id: region.id,
		value: region.value,
		permaVal: region.permaVal,
		locked: region.locked,
		permaLocked: region.permaLocked,
		disabled: region.disabled,
		candidates: region.candidates.map((candidate) => ({
			id: candidate.candidate.id,
			count: candidate.count,
			margin: candidate.margin
		}))
	}));

	const urlData = get(page).url.pathname.split('/');
	const map = {
		country: urlData[2],
		type: urlData[3],
		year: urlData[4]
	};

	const data = {
		map,
		tossup: tossupStore,
		candidates: candidateStore,
		regions: regionStore
	};

	return data;
}

/**
 * Downloads a JSON file with the current state of the map
 *
 * @returns void
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function downloadJson() {
	const data = generateJson();
	saveAs(
		new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' }),
		'YapmsMap.json'
	);
}

export { generateJson, downloadJson };
