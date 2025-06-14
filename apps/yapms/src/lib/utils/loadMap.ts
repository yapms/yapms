import { goto } from '$app/navigation';
import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
import { RegionsStore } from '$lib/stores/regions/Regions';
import { CandidateSchema } from '$lib/types/Candidate';
import { SavedRegionSchema } from '$lib/types/Region';
import { get } from 'svelte/store';
import { z } from 'zod';
import safeJsonParse from './safeJsonParse';

/**
 * @param files
 * loads first file from FileList
 *
 * @returns void
 */
function loadFromFile(files: FileList): void {
	const fileReader = new FileReader();

	fileReader.onload = async function() {
		if (typeof fileReader.result !== 'string') {
			return;
		}
		const fileData = JSON.parse(fileReader.result.toString());
		await loadFromJson(fileData);
	};

	fileReader.onerror = function() {
		console.error(fileReader.error);
	};

	fileReader.readAsText(files[0]);
}

/**
 * @param files
 * Loads the first TCT fiel from the FileList
 *
 * @returns void
 */
function loadFromTCTFile(files: FileList): void {
	const fileReader = new FileReader();

	fileReader.onload = () => {
		if (typeof fileReader.result !== 'string') {
			return;
		}

		const fileData = fileReader.result.toString();
		const reverseFileData = fileData.split('').reverse().join('');
		const decodedFileData = atob(reverseFileData);
		const jsonData = safeJsonParse(decodedFileData);
		console.log(decodedFileData);
		console.log(jsonData);
		if (jsonData.isOk()) {
			const yapmsData = convertTCTtoYapms(jsonData.value);
			loadFromJson(yapmsData);
		} else {
			console.log("failed to parse");
		}
	};

	fileReader.onerror = () => { };

	fileReader.readAsText(files[0]);
}

/**
 * @param mapData
 * json data to load into the stores
 *
 * @returns void
 */
async function loadFromJson(mapData: unknown) {
	const parser = z.object({
		map: z.object({
			country: z.string(),
			type: z.string(),
			year: z.string(),
			variant: z.string()
		}),
		tossup: CandidateSchema,
		candidates: CandidateSchema.array(),
		regions: SavedRegionSchema.array()
	});
	const parsedMapData = parser.parse(mapData);
	console.log("TEST 2");

	const country = parsedMapData.map.country;
	const type = parsedMapData.map.type;
	const year = parsedMapData.map.year;
	const variant = parsedMapData.map.variant;

	const url = ['/app', country, type, year, variant].filter((path) => path !== undefined).join('/');

	await goto(url);

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

function convertTCTtoYapms(tct: unknown) {
	const parsedData = FileSchema_TCT.safeParse(tct);
	console.log(parsedData.success);
	if (parsedData.success === false) {
		console.log(parsedData.error.issues);
		return;
	}
	const yapmsData = {
		map: {
			country: 'usa',
			type: 'presidential',
			year: '2024312',
			variant: 'blank'
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
		candidates: [
			{
				id: '300',
				name: 'Democrat',
				defaultCount: 0,
				margins: [
					{
						color: '#0000ff'
					}
				]
			},
			{
				id: '301',
				name: 'Republican',
				defaultCount: 0,
				margins: [
					{
						color: '#ff0000'
					}
				]
			}
		],
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

	const candidates: {
		id: string;

		name: string;
		defaultCount: number;
		margins: number;
	}[] = [];

	console.log(candidates);

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

		if (state.abbr === "NE") {
			["ne-01", "ne-02", "ne-03", "ne-al"].forEach((abbr) => {
				yapmsData.regions.push({
					id: abbr,
					value: value,
					permaVal: value,
					locked: false,
					permaLocked: false,
					disabled: false,
					candidates: candidates
				});
			});
		} else if (state.abbr == "ME") {
			["me-01", "me-02", "me-al"].forEach((abbr) => {
				yapmsData.regions.push({
					id: abbr,
					value: value,
					permaVal: value,
					locked: false,
					permaLocked: false,
					disabled: false,
					candidates: candidates
				});
			});
		} else {
			yapmsData.regions.push({
				id: state.abbr.toLowerCase(),
				value: value,
				permaVal: value,
				locked: false,
				permaLocked: false,
				disabled: false,
				candidates: candidates
			});
		}
	}

	return yapmsData;
}

export { loadFromJson, loadFromFile, loadFromTCTFile };

const FileSchema_TCT = z.object({
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
