import { goto } from '$app/navigation';
import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
import type { SavedMap } from '$lib/types/SavedMap';
import { SavedMapSchema } from '$lib/types/SavedMap';
import { get, writable } from 'svelte/store';
import { RegionsStore } from './regions/Regions';
import { CandidatesStore, TossupCandidateStore } from './Candidates';
import { page } from '$app/state';
import { stateCodes } from '$lib/utils/stateCodes';
import { z } from 'zod';
import { safeJsonParse } from '$lib/utils/safeJsonParse';

export const LoadedMapStore = writable<SavedMap | null>(null);

export async function getMap(id: string) {
	const data = await fetch(`${PUBLIC_POCKETBASE_URI}/api/files/maps/${id}/data.json.gz`);
	const jsonData = await data.json();
	const parsedData = SavedMapSchema.safeParse(jsonData);

	if (parsedData.success === false) {
		return;
	}

	return parsedData.data;
}

export async function getUserMap(id: string) {
	const data = await fetch(`${PUBLIC_POCKETBASE_URI}/api/files/user_maps/${id}/data.json.gz`);
	const jsonData = await data.json();
	const parsedData = SavedMapSchema.safeParse(jsonData);

	if (parsedData.success === false) {
		return;
	}

	return parsedData.data;
}

export async function setLoadedMapFromTCTFile(files: FileList) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.onload = async function () {
			if (typeof fileReader.result !== 'string') {
				return reject("Failed to parse file data.");
			}
			const fileData = fileReader.result.toString();
			const reverseFileData = fileData.split('').reverse().join('');
			const decodedFileData = atob(reverseFileData);
			const jsonData = safeJsonParse(decodedFileData);
			if (jsonData.isErr()) {
				return reject("Failed to parse file data.");
			}
			try {
				const yapmsData = convertTCTJsontoYapmsJson(jsonData.value);
				setLoadedMapFromJson(yapmsData);
			} catch (error) {
				return reject(error);
			}
			resolve(undefined);
		};

		fileReader.onerror = function () {
			console.error(fileReader.error);
			reject(undefined);
		};

		fileReader.readAsText(files[0]);
	});
}

export async function setLoadedMapFromFile(files: FileList) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.onload = async function () {
			if (typeof fileReader.result !== 'string') {
				return;
			}
			const fileData = JSON.parse(fileReader.result.toString());
			setLoadedMapFromJson(fileData);
			resolve(undefined);
		};

		fileReader.onerror = function () {
			console.error(fileReader.error);
			reject(undefined);
		};

		fileReader.readAsText(files[0]);
	});
}

export function setLoadedMapFromJson(data: unknown) {
	const parsedData = SavedMapSchema.safeParse(data);
	if (parsedData.success === false) {
		LoadedMapStore.set(null);
	} else {
		LoadedMapStore.set(parsedData.data);
	}
}

/**
 * Goto the required url for the loaded user_maps
 * Providing an option will override the current data in the URL.
 */
export async function gotoLoadedMap(
	options:
		| {
				m?: string | undefined;
				um?: string | undefined;
				s?: boolean | undefined;
		  }
		| undefined = undefined
) {
	const data = get(LoadedMapStore);
	if (data === null) {
		return;
	}
	const { country, type, year, variant } = data.map;
	const neededPath = ['/app', country, type, year, variant]
		.filter((path) => path !== undefined)
		.join('/');
	const currentPath = page.url.pathname;
	if (currentPath.valueOf() !== neededPath.valueOf()) {
		const newSearchParams = new URLSearchParams();
		const m = options ? options.m : page.url.searchParams.get('m');
		const um = options ? options.um : page.url.searchParams.get('um');
		const s = options ? options.s : page.url.searchParams.has('s');
		if (m) {
			newSearchParams.set('m', m);
		} else if (um) {
			newSearchParams.set('um', um);
		} else if (s) {
			newSearchParams.set('s', '');
		}
		const newPath = `${neededPath}?${newSearchParams.toString()}`;
		await goto(newPath);
	}
}

export async function drawLoadedMap() {
	const data = get(LoadedMapStore);
	if (data === null) {
		return;
	}

	const tossupData = data.tossup;
	const candidatesData = data.candidates;
	const regionsData = data.regions;

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

function convertTCTJsontoYapmsJson(tct: unknown) {
	const parsedData = FileSchema_TCT.safeParse(tct);
	if (parsedData.success === false) {
		throw "Failed to parse file data.";
	}

	const yapmsData = {
		map: {
			country: 'usa',
			type: 'presidential',
			year: '2028',
			variant: 'takeall'
		},
		tossup: {
			id: '',
			name: 'Tossup',
			defaultCount: 0,
			margins: [
				{
					color: '#cccccc'
				}
			]
		},
		candidates: Array<{
			id: string;
			name: string;
			defaultCount: number;
			margins: { color: string }[];
		}>(),
		regions: Array<{
			id: string;
			value: number;
			permaVal: number;
			locked: boolean;
			permaLocked: boolean;
			disabled: boolean;
			candidates: { id: string; count: number; margin: number }[];
		}>()
	};

	// Add all the candidates to the YAPms candidates list.
	for (const candidate of parsedData.data.overall_results) {
		yapmsData.candidates.push({
			id: candidate.candidate.toString(),
			name: candidate.candidate_name ?? candidate.candidate.toString(),
			defaultCount: 0,
			margins: [
				{
					color:
						candidate.candidate_color ??
						'#' +
							Math.trunc(Math.random() * 16777215)
								.toString(16)
								.padStart(6, '0')
				}
			]
		});
	}

	// Add all the state results to the YAPms regions.
	for (const state of parsedData.data.state_results) {
		const value = state.result.reduce((prev, curr) => {
			return prev + curr.electoral_votes;
		}, 0);

		const candidates = state.result.map((candidate) => {
			return {
				id: candidate.candidate.toString(),
				count: candidate.electoral_votes,
				margin: 0
			};
		});

		const abbr = ['NE', 'ME'].includes(state.abbr) ? state.abbr : state.abbr.toLowerCase();
		yapmsData.regions.push({
			id: abbr,
			value: value,
			permaVal: value,
			locked: false,
			permaLocked: false,
			disabled: false,
			candidates: candidates
		});
	}

	for (const region of yapmsData.regions) {
		const found = stateCodes.findIndex((state) => {
			return region.id === state;
		}) !== -1;

		if (found === false) {
			throw "This map is not supported.";
		}
	}

	// Any state results that didn't exist should be disabled in the YAPms regions.
	for (const stateCode of stateCodes) {
		const stateExists =
			yapmsData.regions.findIndex((region) => {
				return region.id === stateCode;
			}) !== -1;

		if (stateExists === false) {
			yapmsData.regions.push({
				id: stateCode,
				value: 0,
				permaVal: 0,
				locked: false,
				permaLocked: false,
				disabled: true,
				candidates: []
			});
		}
	}

	return yapmsData;
}

const FileSchema_TCT = z.object({
	overall_results: z.array(
		z.object({
			candidate_name: z.string().optional(),
			candidate_color: z.string().optional(),
			candidate: z.number(),
			electoral_votes: z.number(),
			popular_votes: z.number()
		})
	),
	state_results: z.array(
		z.object({
			state: z.number(),
			result: z.array(
				z.object({
					candidate: z.number(),
					result: z.number(),
					percent: z.number(),
					votes: z.number(),
					electoral_votes: z.number()
				})
			),
			abbr: z.string(),
			result_time: z.number()
		})
	)
});
