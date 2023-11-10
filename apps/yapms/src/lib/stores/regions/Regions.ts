import type Region from '$lib/types/Region';
import { blendHexColors, calculateLumaHEX } from '$lib/utils/luma';
import { derived, writable, get } from 'svelte/store';
import { TossupCandidateStore, CandidatesStore } from '../Candidates';
import { ModeStore } from '../Mode';
import {
	disableRegion,
	editRegion,
	fillRegion,
	fillGroup,
	lockRegion,
	splitRegion,
	disableGroup,
	lockGroup
} from './regionActions';
import { InteractionStore } from '../Interaction';
import { makePattern, removeAllPatterns } from '$lib/utils/patterns';
import { RegionTooltipStore } from '../RegionTooltip';
import { SelectedActionGroup } from '../ActionGroups';

/**
 * Stores the state of all regions.
 */
export const RegionsStore = writable<Region[]>([]);

/**
  When the region store changes,
  update the colors of the regions in the DOM
*/
RegionsStore.subscribe((regions) => {
	removeAllPatterns();

	regions.forEach((region) => {
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

		// get the winner(s) of the district
		const maxValue = region.candidates.reduce(
			(prev, current) => (prev > current.count ? prev : current.count),
			region.candidates[0].count
		);
		const winners = region.disabled
			? [
					{
						candidate: get(TossupCandidateStore),
						count: 0,
						margin: 0
					}
			  ]
			: region.candidates.filter((candidate) => candidate.count === maxValue);

		// set the margin of the new winner
		let marginIndex = winners[0].margin ?? 0;
		if (marginIndex >= winners[0].candidate.margins.length) {
			marginIndex = winners[0].candidate.margins.length - 1;
		} else if (marginIndex < 0) {
			marginIndex = 0;
		}

		let fill = '';
		let lumaColor = '';
		if (winners.length === 1) {
			fill = winners[0].candidate.margins[marginIndex]?.color;
			lumaColor = fill;
		} else {
			fill = makePattern(winners);
			const colors = winners.map((winner) => winner.candidate.margins[0].color);
			lumaColor = blendHexColors(colors);
		}

		region.nodes.region.style.fill = fill;

		if (region.visible === true) {
			region.nodes.region.style.visibility = 'visible';
			if (region.nodes.text) region.nodes.text.style.visibility = 'visible';
		} else {
			region.nodes.region.style.visibility = 'hidden';
			if (region.nodes.text) region.nodes.text.style.visibility ??= 'hidden';
		}

		if (region.disabled || region.locked || region.permaLocked) {
			region.nodes.region.style.fillOpacity = '0.25';
		} else {
			region.nodes.region.style.fillOpacity = '1';
		}

		if (region.nodes.text) {
			region.nodes.text.style.color = calculateLumaHEX(lumaColor) > 0.5 ? 'black' : 'white';
			const valueText = region.nodes.text.querySelector('[map-type="value-text"]');
			if (valueText) {
				valueText.innerHTML = region.value.toString();
			}
			if (region.permaLocked === true) {
				region.nodes.text.style.visibility = 'hidden';
			} else {
				region.nodes.text.style.visibility = 'visible';
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
	let delayElapse: NodeJS.Timeout | undefined;
	const regions = get(RegionsStore);
	for (const region of regions) {
		if (region.permaLocked) {
			continue;
		}

		region.nodes.region.onclick = () => {
			const currentMode = get(ModeStore);
			const interactions = get(InteractionStore);
			if (interactions.has('KeyG')) {
				const group = get(SelectedActionGroup);
				if (group === undefined) return;
				const subgroup = region.actionGroups.at(group);
				if (subgroup === undefined) return;
				switch (currentMode) {
					case 'fill':
						fillGroup(group, subgroup);
						break;
					case 'disable':
						disableGroup(group, subgroup);
						break;
					case 'lock':
						lockGroup(group, subgroup);
						break;
				}
			} else {
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
		};

		region.nodes.region.onmousemove = (e: MouseEvent) => {
			if (get(RegionTooltipStore).enabled) {
				RegionTooltipStore.set({
					...get(RegionTooltipStore),
					delayElapsed: false,
					content: region.shortName,
					x: e.clientX,
					y: e.clientY
				});

				clearTimeout(delayElapse);

				delayElapse = setTimeout(() => {
					RegionTooltipStore.set({
						...get(RegionTooltipStore),
						delayElapsed: true
					});
				}, 400);
			}

			const currentMode = get(ModeStore);
			const currentInteractions = get(InteractionStore);
			if (currentMode === 'fill' && currentInteractions.has('KeyF')) {
				fillRegion(region.id, false);
			}
		};

		region.nodes.region.onmouseleave = () => {
			if (get(RegionTooltipStore).enabled) {
				RegionTooltipStore.set({
					...get(RegionTooltipStore),
					inRegions: false
				});
			}
		};

		region.nodes.region.onmouseenter = () => {
			if (get(RegionTooltipStore).enabled) {
				RegionTooltipStore.set({
					...get(RegionTooltipStore),
					inRegions: true
				});
			}
		};

		if (region.nodes.button !== null) {
			region.nodes.button.onpointerdown = region.nodes.region.onpointerdown;
			region.nodes.button.onmousedown = region.nodes.region.onmousedown;
		}
	}
};

export const setTransitionStyle = (): void => {
	const regions = get(RegionsStore);
	for (const region of regions) {
		region.nodes.region.style.transition = 'fill 0.2s ease-in-out';
		if (region.nodes.text !== null) {
			for (const child of region.nodes.text.children) {
				(child as HTMLElement).style.transition = 'color 0.2s ease-in-out';
			}
			region.nodes.text.style.transition = 'fill 0.2s ease-in-out';
		}
		if (region.nodes.button !== null) {
			region.nodes.button.style.transition = 'fill 0.2s ease-in-out';
		}
	}
};

export const setCursorStyle = (): void => {
	const regions = get(RegionsStore);
	for (const region of regions) {
		region.nodes.region.style.cursor = 'pointer';
		if (region.nodes.text !== null) {
			region.nodes.text.style.pointerEvents = 'none';
		}
		if (region.nodes.button !== null) {
			region.nodes.button.style.cursor = 'pointer';
		}
	}
};
