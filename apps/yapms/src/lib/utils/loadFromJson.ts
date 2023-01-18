import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
import { RegionsStore } from '$lib/stores/Regions';
import { CandidateSchema } from '$lib/types/Candidate';
import { SavedRegionSchema } from '$lib/types/Region';
import { get } from 'svelte/store';

/**
 * @param files
 * loads first file from FileList
 *
 * @returns void
 */
function loadFromJson(files: FileList): void {
	const fileReader = new FileReader();

	fileReader.onload = function () {
		if (typeof fileReader.result !== 'string') {
			return;
		}
		const fileData = JSON.parse(fileReader.result.toString());
		// parse data from file
		const candidatesData = CandidateSchema.array().parse(fileData.candidates);
		const regionsData = SavedRegionSchema.array().parse(fileData.regions);

		const regionsStoreCurrent = get(RegionsStore);

		// update regions store with loaded data
		const regionsStoreUpdated = regionsStoreCurrent.map((currentRegion) => {
			const loadedRegion = regionsData.find((r) => r.id === currentRegion.id);
			// if region is not in loaded data, use current region
			if (loadedRegion === undefined) {
				return { ...currentRegion };
			}
			return {
				...currentRegion,
				value: loadedRegion.value,
				disabled: loadedRegion.disabled,
				locked: loadedRegion.locked,
				candidates: loadedRegion.candidates.map((c) => {
					// if candidate is not in candidates store, use tossup candidate
					const candidate =
						candidatesData.find((cand) => cand.id === c.id) ?? get(TossupCandidateStore);
					// return the found candidate with the count and margin from the loaded data
					return {
						candidate,
						count: c.count,
						margin: c.margin
					};
				})
			};
		});

		CandidatesStore.set(candidatesData);
		RegionsStore.set(regionsStoreUpdated);
	};

	fileReader.onerror = function () {
		console.error(fileReader.error);
	};

	fileReader.readAsText(files[0]);
}

export default loadFromJson;
