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
      (prev, current) => (prev.count > current.count) ? prev : current,
      region.candidates[0]
    );
    region.nodes.region.style.fill = winner.candidate.margins[0].color;
    if (region.nodes.button)
    region.nodes.button.style.fill = winner.candidate.margins[0].color;
    if (region.nodes.text)
    region.nodes.text.style.color = calculateLumaHEX(winner.candidate.margins[0].color) > 0.5 ? 'black' : 'white';
  });
});

/**
  When the region store changes,
  create a derived store that contains the count of each candidate.

  Candidates will be undefined if they are not in the region store
 */
export const CandidateCounts = derived(
  RegionsStore,
  ($RegionStore) => {
    console.log("update derived");
    const candidates = new Map<string, number>();
    $RegionStore.forEach((region) => {
      region.candidates.forEach((candidate) => {
        if (candidates.has(candidate.candidate.id)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          candidates.set(candidate.candidate.id, candidates.get(candidate.candidate.id)! + candidate.count);
        } else {
          candidates.set(candidate.candidate.id, candidate.count);
        }
      });
    });
    return candidates;
  }
);