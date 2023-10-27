import { TossupCandidateStore, CandidatesStore } from '$lib/stores/Candidates';
import { get } from 'svelte/store';
import { saveAs } from 'file-saver';
import { RegionsStore } from '$lib/stores/regions/Regions';
import { MapIdentifier } from '$lib/stores/MapIdentifier';

/**
 * Generates a JSON object with the current state of the map
 *
 * @returns The current state of the map
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function generateJson() {
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

	const map = {
		country: get(MapIdentifier)?.country,
		type: get(MapIdentifier)?.type,
		year: get(MapIdentifier)?.date,
		variant: get(MapIdentifier)?.variant
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
