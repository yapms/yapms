import type Region from '$lib/types/Region';
import { calculateLumaHEX } from '$lib/utils/luma';
import { derived, writable, get } from 'svelte/store';
import { TossupCandidateStore } from './Candidates';

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
		let marginIndex = winner.margin ?? 0;
		if (marginIndex >= winner.candidate.margins.length) {
			marginIndex = winner.candidate.margins.length - 1;
		} else if (marginIndex < 0) {
			marginIndex = 0;
		}
		let countSum = region.candidates.reduce((prev, current) => prev + current.count, 0);
		if (countSum < region.value) {
			region.candidates[0].count += region.value - countSum;
		} else if (countSum > region.value) {
			while (countSum > region.value) {
				for (const candidate of region.candidates) {
					if (candidate.count > 0) {
						candidate.count--;
						countSum--;
					}
					if (countSum <= region.value) {
						break;
					}
				}
			}
		}

		region.nodes.region.style.fill = winner.candidate.margins[marginIndex]?.color;
		region.disabled
			? (region.nodes.region.style.fillOpacity = '0.25')
			: (region.nodes.region.style.fillOpacity = '1'); //Transparent if disabled
		region.disabled
			? (region.nodes.region.style.strokeOpacity = '0.25')
			: (region.nodes.region.style.strokeOpacity = '1'); //Transparent if disabled
		if (region.nodes.button) {
			region.nodes.button.style.fill = winner.candidate.margins[marginIndex]?.color;
			region.disabled
				? (region.nodes.button.style.fillOpacity = '0.25')
				: (region.nodes.button.style.fillOpacity = '1'); //Transparent if disabled
			region.disabled
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
		}
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
