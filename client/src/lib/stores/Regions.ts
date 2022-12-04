import type { Region } from '$lib/types/Region';
import { calculateLumaHEX } from '$lib/utils/luma';
import { get, writable } from 'svelte/store';
import { SelectedCandidateStore, TossupCandidateStore } from './Candidates';

export const RegionsStore = writable<Region[]>([]);

RegionsStore.subscribe((regions) => {
  try {
    const selectedCandidate = get(SelectedCandidateStore);
    regions.forEach((region) => {
      const winner = region.candidates.reduce((prev, current) => (prev.margins[0].count > current.margins[0].count) ? prev : current, get(TossupCandidateStore));
      region.nodes.region.style.fill = winner.margins[0].color;
      if (region.nodes.button)
      region.nodes.button.style.fill = selectedCandidate.margins[0].color;
      if (region.nodes.text)
      region.nodes.text.style.color = calculateLumaHEX(selectedCandidate.margins[0].color) > 0.5 ? 'black' : 'white';
    });
  } catch (e) {
    console.error(e);
  }
});
