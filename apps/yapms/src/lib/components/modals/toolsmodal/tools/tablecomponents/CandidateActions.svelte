<script lang="ts">
	import type { Region } from '$lib/types/Region';

	import { get } from 'svelte/store';
	import { TossupCandidateStore } from '$lib/stores/Candidates';
	import { CandidatesStore } from '$lib/stores/Candidates';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { makePatternCSS } from '$lib/utils/patterns';
	import { splitRegion } from '$lib/stores/regions/regionActions';
	import Sliders from '$lib/icons/Sliders.svelte';

	export let region: Region;

	$: maxValue = region.candidates.reduce(
		(prev, current) => (prev > current.count ? prev : current.count),
		region.candidates[0].count
	);

	$: winners = region.disabled
		? [
				{
					candidate: $TossupCandidateStore,
					count: 0,
					margin: 0
				}
			]
		: region.candidates.filter((candidate) => candidate.count === maxValue);

	function getWinnerId(region: Region) {
		//if region is split, then select value is "split"
		if (checkIfSplit(region)) {
			return 'split';
		}

		return winners[0].candidate.id;
	}

	function checkIfSplit(region: Region) {
		for (const candidate of region.candidates) {
			if (candidate.count == region.value) {
				return false;
			}
		}
		return true;
	}

	function getWinningColor(region: Region) {
		// if the region fill is a pattern, get the corresponding CSS gradient.
		if (region.nodes.region.style.fill.substring(0, 3) === 'url') {
			return makePatternCSS(winners);
		}
		return region.nodes.region.style.fill;
	}

	function changeWinner(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		const newWinnerId = event.currentTarget.value;

		const candidates = get(CandidatesStore);
		let newWinner = candidates.find((candidate) => candidate.id === newWinnerId);

		const tossupCandidate = get(TossupCandidateStore);
		if (newWinnerId == tossupCandidate.id) {
			newWinner = tossupCandidate;
		}

		if (newWinner) {
			const newCandidate = {
				candidate: newWinner,
				count: region.value,
				margin: 0
			};
			region.candidates = [newCandidate];
			$RegionsStore = $RegionsStore;
		}
	}

	function cycleWinnerMargin(event: MouseEvent) {
		if (winners.length != 1) {
			return;
		}

		const candidateToBeEdited = winners[0];

		const currentCandidateMargin = winners[0].margin;

		if (!event.ctrlKey) {
			candidateToBeEdited.margin =
				currentCandidateMargin === candidateToBeEdited.candidate.margins.length - 1
					? 0
					: candidateToBeEdited.margin + 1;
		} else {
			candidateToBeEdited.margin =
				currentCandidateMargin === 0
					? candidateToBeEdited.candidate.margins.length - 1
					: candidateToBeEdited.margin - 1;
		}

		region.candidates = [candidateToBeEdited];
		$RegionsStore = $RegionsStore;
	}
</script>

{#if region}
	<div class="flex space-x-2 items-center truncate grow">
		<button
			on:click={cycleWinnerMargin}
			style="background:{getWinningColor(region)};"
			class="w-5 h-5 rounded-md aspect-square"
		/>
		{#if region.disabled}
			<select class="select select-bordered select-sm w-full grow" disabled>
				<option value="disabled">Region Disabled</option>
			</select>
		{:else}
			<select
				class="select select-bordered select-sm w-full grow"
				value={getWinnerId(region)}
				on:change={changeWinner}
			>
				{#if checkIfSplit(region)}
					<option value="split">Split</option>
				{/if}
				<option value={$TossupCandidateStore.id}>{$TossupCandidateStore.name}</option>
				{#each $CandidatesStore as candidate}
					<option value={candidate.id}>{candidate.name}</option>
				{/each}
			</select>
		{/if}
		<div class="tooltip" data-tip="Split Region">
			<button on:click={() => splitRegion(region.id)} class="btn btn-xs btn-neutral mx-2"
				><Sliders class="w-4 h-4" /></button
			>
		</div>
	</div>
{/if}
