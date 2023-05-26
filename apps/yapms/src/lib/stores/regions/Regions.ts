import type Region from '$lib/types/Region';
import { calculateLumaHEX } from '$lib/utils/luma';
import { derived, writable, get } from 'svelte/store';
import { TossupCandidateStore, CandidatesStore } from '../Candidates';
import { ModeStore } from '../Mode';
import { disableRegion, editRegion, fillRegion, lockRegion, splitRegion } from './regionActions';
import { InteractionStore } from '../Interaction';

/**
 * Stores the state of all regions.
 */
export const RegionsStore = writable<Region[]>([]);

/**
  When the region store changes,
  update the colors of the regions in the DOM
*/
RegionsStore.subscribe((regions) => {
	// reduce extra counts
	regions.forEach((region) => {
		// get the winner of the district
		const winner = region.disabled
			? {
					candidate: get(TossupCandidateStore),
					count: 0,
					margin: 0
			  }
			: region.candidates.reduce(
					(prev, current) => (prev.count > current.count ? prev : current),
					region.candidates[0]
			  );

		// set the margin of the new winner
		let marginIndex = winner.margin ?? 0;
		if (marginIndex >= winner.candidate.margins.length) {
			marginIndex = winner.candidate.margins.length - 1;
		} else if (marginIndex < 0) {
			marginIndex = 0;
		}

		// reduce extra counts
		let totalVotes = region.candidates.reduce(
			(totalVotes, candidate) => totalVotes + candidate.count,
			0
		);
		const maxVotes = region.value;
		if (totalVotes < maxVotes) {
			// if there are less votes than the max, add the difference the tossup candidate
			region.candidates[0].count += region.value - totalVotes;
		} else if (totalVotes > region.value) {
			while (totalVotes > region.value) {
				for (const candidate of region.candidates) {
					if (candidate.count > 0) {
						candidate.count--;
						totalVotes--;
					}
					if (totalVotes <= region.value) {
						break;
					}
				}
			}
		}

		region.nodes.region.style.fill = winner.candidate.margins[marginIndex]?.color;
		region.disabled || region.locked || region.permaLocked
			? (region.nodes.region.style.fillOpacity = '0.25')
			: (region.nodes.region.style.fillOpacity = '1'); //Transparent if disabled
		region.disabled || region.locked || region.permaLocked
			? (region.nodes.region.style.strokeOpacity = '0.25')
			: (region.nodes.region.style.strokeOpacity = '1'); //Transparent if disabled
		if (region.nodes.button) {
			region.nodes.button.style.fill = winner.candidate.margins[marginIndex]?.color;
			region.disabled || region.locked || region.permaLocked
				? (region.nodes.button.style.fillOpacity = '0.25')
				: (region.nodes.button.style.fillOpacity = '1'); //Transparent if disabled
			region.disabled || region.locked || region.permaLocked
				? (region.nodes.button.style.strokeOpacity = '0.25')
				: (region.nodes.button.style.strokeOpacity = '1'); //Transparent if disabled
		}
		if (region.nodes.text) {
			region.nodes.text.style.color =
				calculateLumaHEX(winner.candidate.margins[marginIndex]?.color) > 0.5 ? 'black' : 'white';
			const bottomText = region.nodes.text.querySelector('.bottom');
			if (bottomText) {
				bottomText.innerHTML = region.value.toString();
			}
			region.permaLocked
				? (region.nodes.text.style.opacity = '0')
				: (region.nodes.text.style.opacity = '1');
		}
	});
});

/**
  When the region store changes,
  create a derived store that contains the count of each candidate.

  Candidates will be undefined if they are not in the region store
 */
export const CandidateCounts = derived(RegionsStore, ($RegionStore) => {
	const candidates = new Map<string, number>(); //Use default counts if included in map
	for (const candidate of get(CandidatesStore)) {
		candidates.set(candidate.id, candidate.defaultCount);
	}
	$RegionStore.forEach((region) => {
		region.candidates.forEach((candidate) => {
			const currentCount = candidates.get(candidate.candidate.id);
			if (currentCount !== undefined) {
				candidates.set(candidate.candidate.id, currentCount + candidate.count);
			} else {
				candidates.set(candidate.candidate.id, candidate.count);
			}
		});
	});
	return candidates;
});

/**
 * When the region store changes,
 * create a derived store that contains the count of each candidate for each margin.
 *
 * Candidates will be undefined if they are not in the region store.
 */
export const CandidateCountsMargins = derived(RegionsStore, ($RegionStore) => {
	const candidates = new Map<string, number[]>();
	for (const candidate of get(CandidatesStore)) {
		//Account for default counts
		candidates.set(candidate.id, [candidate.defaultCount]);
	}
	$RegionStore.forEach((region) => {
		region.candidates.forEach((candidate) => {
			const currentCount = candidates.get(candidate.candidate.id);
			if (currentCount !== undefined) {
				if (currentCount[candidate.margin] === undefined) {
					currentCount[candidate.margin] = candidate.count;
				} else {
					currentCount[candidate.margin] += candidate.count;
				}
				candidates.set(candidate.candidate.id, currentCount);
			} else {
				const newCounts: number[] = [];
				newCounts[candidate.margin] = candidate.count;
				candidates.set(candidate.candidate.id, newCounts);
			}
		});
	});
	return candidates;
});

export const setPointerEvents = (): void => {
	const regions = get(RegionsStore);
	for (const region of regions) {
		if (region.permaLocked) {
			continue;
		}

		region.nodes.region.onpointerdown = () => {
			const currentMode = get(ModeStore);
			switch (currentMode) {
				case 'fill':
					fillRegion(region.id, true);
					break;
				case 'split':
					splitRegion(region.id);
					break;
				case 'edit':
					editRegion(region.id);
					break;
				case 'disable':
					disableRegion(region.id);
					break;
				case 'lock':
					lockRegion(region.id);
					break;
			}
		}

		region.nodes.region.onmousemove = () => {
			const currentMode = get(ModeStore);
			const currentInteractions = get(InteractionStore);
			if (currentMode === 'fill' && currentInteractions.has('KeyF')) {
				fillRegion(region.id, false);
			}
		}

		if (region.nodes.button !== null) {
			region.nodes.button.onpointerdown = region.nodes.region.onpointerdown;
			region.nodes.button.onmousedown = region.nodes.region.onmousedown;
		}
	}
}