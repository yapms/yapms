import { goto } from '$app/navigation';
import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
import type { SavedMap } from '$lib/types/SavedMap';
import { SavedMapSchema } from '$lib/types/SavedMap';
import { get, writable } from 'svelte/store';
import { RegionsStore } from './regions/Regions';
import { CandidatesStore, TossupCandidateStore } from './Candidates';
import { page } from '$app/state';

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

export function tctFileToYapmsData(files: FileList) {
	return new Promise((resolve) => {
		const fileReader = new FileReader();

		fileReader.onload = () => {
			if (typeof fileReader.result !== 'string') {
				return;
			}

			const fileData = fileReader.result.toString();
			const reverseFileData = fileData.split('').reverse().join();
			const decodedFileData = atob(reverseFileData);
		};
		resolve(1);
	});
	const fileReader = new FileReader();

	fileReader.onload = () => {
		if (typeof fileReader.result !== 'string') {
			return;
		}
	};
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
