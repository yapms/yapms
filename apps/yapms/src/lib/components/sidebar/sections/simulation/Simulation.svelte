<script lang="ts">
	import {
		CandidatesStore,
		CandidatesTable,
		TossupCandidateStore,
		isTossupCandidate
	} from '$lib/stores/Candidates';
	import { DefaultModeStore } from '$lib/stores/DefaultMode';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import { SvelteMap } from 'svelte/reactivity';
	import { get } from 'svelte/store';

	// track if user has interacted with the weights and preserve their changes on candidate addition/deletion if so
	let weightsTouched = $state(false);

	// determine if we want to split regions or fill them when simulating
	// DefaultModeStore only set on map load, so this reads what the default for any given map is.
	let splitRegions = $derived($DefaultModeStore === 'split');

	const weights = $state(new SvelteMap<string, number>());

	// Add new candidates
	$effect(() => {
		for (const candidate of [$TossupCandidateStore, ...$CandidatesStore]) {
			if (!weights.has(candidate.id)) {
				weights.set(candidate.id, 0);
			}
		}

		// if no changes have been made to weights, distribute weight equally among candidates, not including tossup.
		if (!weightsTouched) {
			equallyRedistributeWeights();
		}
	});

	// Remove deleted candidates
	$effect(() => {
		for (const [candidateId, weight] of weights) {
			if (!isTossupCandidate(candidateId) && $CandidatesTable.get(candidateId) === undefined) {
				weights.set($TossupCandidateStore.id, weights.get($TossupCandidateStore.id)! ?? 0 + weight);
				weights.delete(candidateId);
			}
		}

		// if no changes have been made to weights, distribute weight equally among candidates, not including tossup.
		if (!weightsTouched) {
			equallyRedistributeWeights();
		}
	});

	function equallyRedistributeWeights() {
		weights.set($TossupCandidateStore.id, 0);
		for (const [candidateId, _] of weights) {
			if (!isTossupCandidate(candidateId)) {
				weights.set(candidateId, 100 / $CandidatesStore.length);
			}
		}
	}

	function updateCandidateWeight(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		candidateId: string
	) {
		if (!weightsTouched) {
			weightsTouched = true;
		}

		const curWeight = weights.get(candidateId) ?? 0;
		const tossupWeight = weights.get($TossupCandidateStore.id) ?? 0;

		const requestedNewValue = Number(event.currentTarget.value);
		const requestedDiff = requestedNewValue - curWeight;

		const actualNewValue = curWeight + Math.min(requestedDiff, tossupWeight);
		const actualDiff = actualNewValue - curWeight;

		weights.set(candidateId, actualNewValue);
		weights.set($TossupCandidateStore.id, tossupWeight - actualDiff);

		event.currentTarget.value = String(actualNewValue);
	}

	function getCandidateIdFromRandom(randNum: number): string {
		let accumulator = 0;
		for (const [candidateId, weight] of weights) {
			accumulator += weight;
			if (randNum < accumulator) {
				return candidateId;
			}
		}
		// fallback to first candidate if floating point screwery
		return [...weights.keys()][0];
	}

	function simulate() {
		const regions = get(RegionsStore);
		for (const region of regions) {
			if (splitRegions) {
				// assign each value in a region to a candidate
				const rolls = Array.from({ length: region.value }, () =>
					getCandidateIdFromRandom(Math.random() * 100)
				);

				const candidateCounts = rolls.reduce((acc, candidateId) => {
					acc.set(candidateId, (acc.get(candidateId) ?? 0) + 1);
					return acc;
				}, new Map<string, number>());

				region.candidates = [...candidateCounts].map(([candidateId, count]) => ({
					candidate: $CandidatesTable.get(candidateId) ?? $TossupCandidateStore,
					count,
					margin: 0
				}));
			} else {
				const candidateId = getCandidateIdFromRandom(Math.random() * 100);
				region.candidates = [
					{
						candidate: $CandidatesTable.get(candidateId) ?? $TossupCandidateStore,
						count: region.value,
						margin: 0
					}
				];
			}
		}
		RegionsStore.set(regions);
	}
</script>

<div class="divider">Simulation</div>
<div class="flex flex-col w-full space-y-2 p-2">
	<div class="flex flex-row space-x-2 items-center">
		<button class="btn btn-md grow" onclick={simulate}>Simulate</button>

		<fieldset class="fieldset">
			<label class="fieldset-label">
				<input type="checkbox" class="toggle" bind:checked={splitRegions} />
				Split Regions
			</label>
		</fieldset>
	</div>

	<div class="collapse collapse-arrow bg-base-300 border border-base-300">
		<input type="checkbox" />

		<div class="collapse-title text-center font-semibold py-2.5 px-0 text-sm">Weights</div>

		<div class="collapse-content flex flex-col text-sm gap-2">
			{#each [...weights] as [candidateId, weight]}
				<label class="flex flex-col w-full gap-y-1">
					<div class="flex w-full justify-between">
						{#if isTossupCandidate(candidateId)}
							<span class="truncate font-medium">{$TossupCandidateStore.name}</span>
						{:else}
							<span class="truncate font-medium"
								>{$CandidatesTable.get(candidateId)?.name ?? ''}</span
							>
						{/if}
						<div class="flex space-x-0 font-thin font-mono">
							<span class="px-0"></span>
							{#if isTossupCandidate(candidateId)}
								<span>{weight.toFixed(2)}</span>
							{:else}
								<input
									onchange={(event) => updateCandidateWeight(event, candidateId)}
									onkeypress={(e) => {
										preventNonNumericalInput(e, true);
									}}
									onpaste={(e) => {
										preventNonNumericalPaste(e, true);
									}}
									value={weight.toFixed(2)}
									class="rounded-md px-1 text-end resizing-input-split"
								/>
							{/if}
							<span>%</span>
						</div>
					</div>
					<input
						type="range"
						class="range w-full"
						min="0"
						max="100"
						step="1"
						value={weight.toFixed(2)}
						oninput={(event) => updateCandidateWeight(event, candidateId)}
						disabled={isTossupCandidate(candidateId)}
					/>
				</label>
			{/each}
		</div>
	</div>
</div>
