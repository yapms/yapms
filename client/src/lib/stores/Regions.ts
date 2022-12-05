import type { Region } from '$lib/types/Region';
import { calculateLumaHEX } from '$lib/utils/luma';
import { derived, writable } from 'svelte/store';

/**
 * Stores the state of all regions.
 */
export const RegionsStore = writable<Region[]>([]);

/**
  When the region store changes,
  update the colors of the regions in the DOM
*/
RegionsStore.subscribe((regions) => {
	regions.forEach((region) => {
		const winner = region.candidates.reduce(
			(prev, current) => (prev.count > current.count ? prev : current),
			region.candidates[0]
		);
		let marginIndex = winner.margin ?? 0;
		if (marginIndex >= winner.candidate.margins.length) {
			marginIndex = winner.candidate.margins.length - 1;
		} else if (marginIndex < 0) {
			marginIndex = 0;
		}
		region.nodes.region.style.fill = winner.candidate.margins[marginIndex]?.color;
		if (region.nodes.button)
			region.nodes.button.style.fill = winner.candidate.margins[marginIndex]?.color;
		if (region.nodes.text)
			region.nodes.text.style.color =
				calculateLumaHEX(winner.candidate.margins[marginIndex]?.color) > 0.5 ? 'black' : 'white';
	});
});

/**
  When the region store changes,
  create a derived store that contains the count of each candidate.

  Candidates will be undefined if they are not in the region store
 */
export const CandidateCounts = derived(RegionsStore, ($RegionStore) => {
	const candidates = new Map<string, number>();
	$RegionStore.forEach((region) => {
		region.candidates.forEach((candidate) => {
			if (candidates.has(candidate.candidate.id)) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				candidates.set(
					candidate.candidate.id,
					candidates.get(candidate.candidate.id)! + candidate.count
				);
			} else {
				candidates.set(candidate.candidate.id, candidate.count);
			}
		});
	});
	return candidates;
});
