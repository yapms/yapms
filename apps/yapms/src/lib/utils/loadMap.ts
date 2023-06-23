import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
import { RegionsStore } from '$lib/stores/regions/Regions';
import { CandidateSchema } from '$lib/types/Candidate';
import { SavedRegionSchema } from '$lib/types/Region';
import { get } from 'svelte/store';
import { z } from 'zod';

/**
 * @param files
 * loads first file from FileList
 *
 * @returns void
 */
function loadFromFile(files: FileList): void {
	const fileReader = new FileReader();

	fileReader.onload = function () {
		if (typeof fileReader.result !== 'string') {
			return;
		}
		const fileData = JSON.parse(fileReader.result.toString());
		loadFromJson(fileData);
	};

	fileReader.onerror = function () {
		console.error(fileReader.error);
	};

	fileReader.readAsText(files[0]);
}

/**
 * @param mapData
 * json data to load into the stores
 *
 * @returns void
 */
function loadFromJson(mapData: unknown): void {
	const parser = z.object({
		tossup: CandidateSchema,
		candidates: CandidateSchema.array(),
		regions: SavedRegionSchema.array()
	});
	const parsedMapData = parser.parse(mapData);

	const tossupData = parsedMapData.tossup;
	const candidatesData = parsedMapData.candidates;
	const regionsData = parsedMapData.regions;

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
			permaLocked: loadedRegion.permaLocked,
			candidates: loadedRegion.candidates.map((c) => {
				// if candidate is not in candidates store, use tossup candidate
				const candidate = candidatesData.find((cand) => cand.id === c.id) ?? tossupData;
				// return the found candidate with the count and margin from the loaded data
				return {
					candidate,
					count: c.count,
					margin: c.margin
				};
			})
		};
	});

	TossupCandidateStore.set(tossupData);
	CandidatesStore.set(candidatesData);
	RegionsStore.set(regionsStoreUpdated);
}

export { loadFromJson, loadFromFile };
