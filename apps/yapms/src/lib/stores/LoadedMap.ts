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
import { safeATOB, safeJsonParse } from '$lib/utils/safeJsonParse';
import { err, ok } from 'neverthrow';

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
	return new Promise<undefined>((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.onload = function () {
			if (typeof fileReader.result !== 'string') {
				return reject('Failed to read file.');
			}

			const rawData = fileReader.result.toString();
			const isJSON = safeJsonParse(rawData).isOk();
			const data = isJSON ? ok(rawData) : decodeTCTData(rawData);

			if (data.isErr()) {
				return reject(data.error);
			}

			const parsedData = safeJsonParse(data.value);
			if (parsedData.isErr()) {
				return reject('Failed to read file.');
			}

			const yapmsData = convertTCTJsontoYapmsJson(parsedData.value);
			if (yapmsData.isErr()) {
				return reject(yapmsData.error);
			}

			setLoadedMapFromJson(yapmsData.value);
			return resolve(undefined);
		};

		fileReader.onerror = function () {
			console.error(fileReader.error);
			reject(undefined);
		};

		fileReader.readAsText(files[0]);
	});
}

function decodeTCTData(data: string) {
	const reversedData = data.split('').reverse().join('');
	const decodedData = safeATOB(reversedData);
	return decodedData;
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
	const nct = FileSchema_NCT.safeParse(tct);
	const showcase = FileSchema_ShowCase.safeParse(tct);

	if (nct.success === false && showcase.success === false) {
		return err('File data does not match a supported format.');
	}

	const country = 'usa';
	const type = 'presidential';
	const year = '2028';
	let variant = 'takeall';

	if (nct.success) {
		variant = getVariantFromNCT(nct.data);
	} else if (showcase.success) {
		variant = getVariantFromShowcase(showcase.data);
	}

	const yapmsData = {
		map: {
			country: country,
			type: type,
			year: year,
			variant: variant
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

	if (nct.success) {
		yapmsData.candidates = getCandidatesFromNCT(nct.data);
		yapmsData.regions = getRegionsFromNCT(nct.data);
	} else if (showcase.success) {
		yapmsData.candidates = getCandidatesFromShowcase(showcase.data);
		yapmsData.regions = getRegionsFromShowCase(showcase.data);
	}

	// Check if there is an invalid state in the file
	for (const region of yapmsData.regions) {
		const found =
			stateCodes.findIndex((state) => {
				return region.id === state;
			}) !== -1;

		if (found === false) {
			return err(`This TCT map is not supported. Region: ${region.id}`);
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

	return ok(yapmsData);
}

function getVariantFromNCT(data: z.infer<typeof FileSchema_NCT>) {
	for (const state of data.state_results) {
		console.log(state.abbr);
		if (['m1', 'm2', 'n1', 'n2', 'n3'].includes(state.abbr.toLowerCase())) {
			return 'blank';
		}
	}
	return 'takeall';
}

function getCandidatesFromNCT(data: z.infer<typeof FileSchema_NCT>) {
	const candidates = new Map<string, { color: string; name: string }>();
	for (const candidate of data.overall_results) {
		candidates.set(candidate.candidate.toString(), {
			name: candidate.candidate_name ?? '',
			color:
				candidate.candidate_color ??
				'#' +
					Math.trunc(Math.random() * 16777215)
						.toString(16)
						.padStart(6, '0')
		});
	}

	return candidates
		.entries()
		.map((candidate) => {
			const key = candidate[0];
			const value = candidate[1];
			return {
				id: key,
				name: value.name,
				defaultCount: 0,
				margins: [
					{
						color: value.color
					}
				]
			};
		})
		.toArray();
}

function getRegionsFromNCT(data: z.infer<typeof FileSchema_NCT>) {
	const regions = [];
	const variant = getVariantFromNCT(data);
	for (const state of data.state_results) {
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

		let abbr = state.abbr.toLowerCase();
		if (variant === 'blank') {
			switch (abbr) {
				case 'me':
					abbr = 'me-al';
					break;
				case 'm1':
					abbr = 'me-01';
					break;
				case 'm2':
					abbr = 'me-02';
					break;
				case 'ne':
					abbr = 'ne-al';
					break;
				case 'n1':
					abbr = 'ne-01';
					break;
				case 'n2':
					abbr = 'ne-02';
					break;
				case 'n3':
					abbr = 'ne-03';
					break;
			}
		} else if (variant === 'takeall') {
			switch (abbr) {
				case 'me':
					abbr = 'ME';
					break;
				case 'ne':
					abbr = 'NE';
					break;
			}
		}
		regions.push({
			id: abbr,
			value: value,
			permaVal: value,
			locked: false,
			permaLocked: false,
			disabled: false,
			candidates: candidates
		});
	}
	return regions;
}

function getVariantFromShowcase(data: z.infer<typeof FileSchema_ShowCase>) {
	for (const state of data.results) {
		if (['m1', 'm2', 'n1', 'n2', 'n3'].includes(state.state.toLowerCase())) {
			return 'blank';
		}
	}
	return 'takeall';
}

function getCandidatesFromShowcase(data: z.infer<typeof FileSchema_ShowCase>) {
	const candidates = new Map<string, { color: string; name: string }>();
	for (const state of data.results) {
		for (const result of state.results) {
			candidates.set(result.candidate_name, {
				name: result.candidate_name,
				color:
					'#' +
					Math.trunc(Math.random() * 16777215)
						.toString(16)
						.padStart(6, '0')
			});
		}
	}

	return candidates
		.entries()
		.map((candidate) => {
			const key = candidate[0];
			const value = candidate[1];
			return {
				id: key,
				name: value.name,
				defaultCount: 0,
				margins: [
					{
						color: value.color
					}
				]
			};
		})
		.toArray();
}

function getRegionsFromShowCase(data: z.infer<typeof FileSchema_ShowCase>) {
	const regions = [];
	const variant = getVariantFromShowcase(data);
	for (const result of data.results) {
		const value = result.results.reduce((prev, curr) => {
			return prev + curr.electoral_votes;
		}, 0);

		const candidates = result.results.map((candidate) => {
			return {
				id: candidate.candidate_name,
				count: candidate.electoral_votes,
				margin: 0
			};
		});

		let abbr = result.state.toLowerCase();
		if (variant === 'blank') {
			switch (abbr) {
				case 'me':
					abbr = 'me-al';
					break;
				case 'm1':
					abbr = 'me-01';
					break;
				case 'm2':
					abbr = 'me-02';
					break;
				case 'ne':
					abbr = 'ne-al';
					break;
				case 'n1':
					abbr = 'ne-01';
					break;
				case 'n2':
					abbr = 'ne-02';
					break;
				case 'n3':
					abbr = 'ne-03';
					break;
			}
		} else if (variant === 'takeall') {
			switch (abbr) {
				case 'me':
					abbr = 'ME';
					break;
				case 'ne':
					abbr = 'NE';
					break;
			}
		}
		regions.push({
			id: abbr,
			value: value,
			permaVal: value,
			locked: false,
			permaLocked: false,
			disabled: false,
			candidates: candidates
		});
	}
	return regions;
}

const FileSchema_NCT = z.object({
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

const FileSchema_ShowCase = z.object({
	results: z.array(
		z.object({
			state: z.string(),
			results: z.array(
				z.object({
					candidate_name: z.string(),
					electoral_votes: z.number(),
					popular_votes: z.number(),
					vote_percentage: z.number()
				})
			)
		})
	)
});
