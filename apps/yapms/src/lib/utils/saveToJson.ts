import { TossupCandidateStore, CandidatesStore } from '$lib/stores/Candidates';
import { RegionsStore } from '$lib/stores/Regions';
import { get } from 'svelte/store';

import { saveAs } from 'file-saver';

/**
 * Downloads a JSON file with the current state of the map
 *
 * @returns void
 */
function saveToJson(): void {
	const tossupStore = get(TossupCandidateStore);
	const candidateStore = get(CandidatesStore);
	const regionStore = get(RegionsStore).map((region) => ({
		id: region.id,
		value: region.value,
		permaVal: region.permaVal,
		locked: region.locked,
		disabled: region.disabled,
		candidates: region.candidates.map((candidate) => ({
			id: candidate.candidate.id,
			count: candidate.count,
			margin: candidate.margin
		}))
	}));

	const data = {
		tossup: tossupStore,
		candidates: candidateStore,
		regions: regionStore
	};

	saveAs(
		new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' }),
		'YapmsMap.json'
	);
}

export default saveToJson;
