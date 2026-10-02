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
	import { untrack } from 'svelte';
	import { SimulationWeightsStore } from '$lib/stores/SimulationWeights';
	import { get } from 'svelte/store';
	import { PerRegionWeightModalStore } from '$lib/stores/Modals';

	// track if user has interacted with the weights and preserve their changes on candidate addition/deletion if so
	let weightsTouched = $state(false);

	// determine if we want to split regions or fill them when simulating
	// DefaultModeStore only set on map load, so this reads what the default for any given map is.
	let splitRegions = $derived($DefaultModeStore === 'split');

	// Key our each on this array to keep tossup candidate first
	const candidateIds = $derived([$TossupCandidateStore, ...$CandidatesStore].map((c) => c.id));

	// Add new candidates
	$effect(() => {
		const candidates = $CandidatesStore;

		untrack(() => {
			for (const candidate of [$TossupCandidateStore, ...candidates]) {
				if ($SimulationWeightsStore[candidate.id] === undefined) {
					$SimulationWeightsStore[candidate.id] = 0;

					for (const region of $RegionsStore) {
						if (
							Object.keys(region.simWeights).length !== 0 &&
							region.simWeights[candidate.id] === undefined
						) {
							region.simWeights[candidate.id] = 0;
						}
					}
				}
			}

			// if no changes have been made to weights, distribute weight equally among candidates, not including tossup.
			if (!weightsTouched) {
				equallyRedistributeGlobalWeights();
			}
		});
	});

	// Remove deleted candidates
	$effect(() => {
		const candidates = $CandidatesTable;

		untrack(() => {
			for (const [candidateId, weight] of Object.entries($SimulationWeightsStore)) {
				if (!isTossupCandidate(candidateId) && candidates.get(candidateId) === undefined) {
					$SimulationWeightsStore[$TossupCandidateStore.id] =
						($SimulationWeightsStore[$TossupCandidateStore.id]! ?? 0) + weight;

					// Delete old candidate weight
					const { [candidateId]: _, ...newWeights } = $SimulationWeightsStore;
					$SimulationWeightsStore = newWeights;
				}
			}

			for (const region of $RegionsStore) {
				for (const [candidateId, weight] of Object.entries(region.simWeights)) {
					if (!isTossupCandidate(candidateId) && candidates.get(candidateId) === undefined) {
						region.simWeights[$TossupCandidateStore.id] =
							(region.simWeights[$TossupCandidateStore.id]! ?? 0) + weight;

						// Delete old candidate weight
						const { [candidateId]: _, ...newWeights } = region.simWeights;
						region.simWeights = newWeights;
					}
				}
			}

			// if no changes have been made to weights, distribute weight equally among candidates, not including tossup.
			if (!weightsTouched) {
				equallyRedistributeGlobalWeights();
			}
		});
	});

	function equallyRedistributeGlobalWeights() {
		$SimulationWeightsStore[$TossupCandidateStore.id] = 0;
		for (const candidateId of Object.keys($SimulationWeightsStore)) {
			if (!isTossupCandidate(candidateId)) {
				$SimulationWeightsStore[candidateId] = 100 / $CandidatesStore.length;
			}
		}
	}

	function updateGlobalCandidateWeight(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		candidateId: string
	) {
		if (!weightsTouched) {
			weightsTouched = true;
		}

		const curWeight = $SimulationWeightsStore[candidateId] ?? 0;
		const tossupWeight = $SimulationWeightsStore[$TossupCandidateStore.id] ?? 0;

		const requestedNewValue = Number(event.currentTarget.value);
		const requestedDiff = requestedNewValue - curWeight;

		const actualNewValue = curWeight + Math.min(requestedDiff, tossupWeight);
		const actualDiff = actualNewValue - curWeight;

		$SimulationWeightsStore[candidateId] = actualNewValue;
		$SimulationWeightsStore[$TossupCandidateStore.id] = tossupWeight - actualDiff;

		event.currentTarget.value = String(actualNewValue);
	}

	function getCandidateIdFromRandom(randNum: number, weights: Record<string, number>): string {
		let accumulator = 0;
		for (const [candidateId, weight] of Object.entries(weights)) {
			accumulator += weight;
			if (randNum < accumulator) {
				return candidateId;
			}
		}
		// fallback to first candidate if floating point screwery
		return Object.keys($SimulationWeightsStore)[0];
	}

	function simulate() {
		const regions = get(RegionsStore);
		for (const region of regions) {
			const weights =
				Object.keys(region.simWeights).length !== 0 ? region.simWeights : $SimulationWeightsStore;
			if (splitRegions) {
				// assign each value in a region to a candidate
				const rolls = Array.from({ length: region.value }, () =>
					getCandidateIdFromRandom(Math.random() * 100, weights)
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
				const candidateId = getCandidateIdFromRandom(Math.random() * 100, weights);
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

	function openRegionWeights() {
		$PerRegionWeightModalStore.open = true;
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

		<div class="collapse-content flex flex-col text-sm gap-4">
			<div class="flex flex-col gap-2">
				{#each candidateIds as candidateId}
					{@const weight = $SimulationWeightsStore[candidateId] ?? 0}
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
										onchange={(event) => updateGlobalCandidateWeight(event, candidateId)}
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
							oninput={(event) => updateGlobalCandidateWeight(event, candidateId)}
							disabled={isTossupCandidate(candidateId)}
						/>
					</label>
				{/each}
			</div>
			<button onclick={openRegionWeights} class="btn btn-neutral">Set per-Region Weights</button>
		</div>
	</div>
</div>
