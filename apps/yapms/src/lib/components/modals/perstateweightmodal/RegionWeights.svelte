<script lang="ts">
	import Star from '$lib/icons/Star.svelte';
	import {
		CandidatesStore,
		CandidatesTable,
		isTossupCandidate,
		TossupCandidateStore
	} from '$lib/stores/Candidates';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { SimulationWeightsStore } from '$lib/stores/SimulationWeights';
	import type { SimWeights } from '$lib/types/Region';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';

	const {
		regionId,
		regionName,
		simWeights
	}: {
		regionId: string;
		regionName: string;
		simWeights: SimWeights;
	} = $props();

	const regionHasWeights = $derived(Object.keys(simWeights).length !== 0);

	const weightsToUse = $derived(regionHasWeights ? simWeights : $SimulationWeightsStore);

	const tossupWeight = $derived(weightsToUse[$TossupCandidateStore.id] ?? 0);

	// Key our each on this array to keep tossup candidate first
	const candidateIds = $derived([$TossupCandidateStore, ...$CandidatesStore].map((c) => c.id));

	function updateRegionCandidateWeight(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		candidateId: string
	) {
		const curWeight = weightsToUse[candidateId] ?? 0;

		const requestedNewValue = Number(event.currentTarget.value);
		const requestedDiff = requestedNewValue - curWeight;

		const actualNewValue = curWeight + Math.min(requestedDiff, tossupWeight);
		const actualDiff = actualNewValue - curWeight;

		const regionIndex = $RegionsStore.findIndex((r) => r.id === regionId);
		const newWeights = structuredClone(weightsToUse);
		newWeights[candidateId] = actualNewValue;
		newWeights[$TossupCandidateStore.id] = tossupWeight - actualDiff;

		// Write back to trigger reactive update
		$RegionsStore[regionIndex] = { ...$RegionsStore[regionIndex], simWeights: newWeights };

		event.currentTarget.value = String(actualNewValue);
	}

	// Reset region weights back to global weights
	function resetWeights(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget.checked === false) {
			const regionIndex = $RegionsStore.findIndex((r) => r.id === regionId);
			$RegionsStore[regionIndex] = { ...$RegionsStore[regionIndex], simWeights: {} };
		} else {
			const regionIndex = $RegionsStore.findIndex((r) => r.id === regionId);
			$RegionsStore[regionIndex] = { ...$RegionsStore[regionIndex], simWeights: structuredClone(weightsToUse) };
		}
	}

	function guaranteeCandidate(candidateId: string) {
		const regionIndex = $RegionsStore.findIndex((r) => r.id === regionId);
		const newWeights = structuredClone(weightsToUse);

		for (const key of Object.keys(newWeights)) {
			newWeights[key] = 0;
		}

		newWeights[candidateId] = 100;

		// Write back to trigger reactive update
		$RegionsStore[regionIndex] = { ...$RegionsStore[regionIndex], simWeights: newWeights };
	}
</script>

<div class="collapse collapse-arrow bg-base-300 border border-base-300">
	<input type="checkbox" />
	<div class="collapse-title font-semibold flex items-center justify-between">
		{regionName}
		<fieldset class="fieldset z-50">
			<label class="fieldset-label">
				Override Global
				<input class="toggle" type="checkbox" onchange={resetWeights} checked={regionHasWeights} />
			</label>
		</fieldset>
	</div>
	<div class="collapse-content text-sm">
		<div class="flex flex-col gap-2">
			{#each candidateIds as candidateId}
				{@const weight = weightsToUse[candidateId]}
				<label class="flex flex-col w-full gap-y-1">
					<div class="flex w-full justify-between">
						<div class="flex space-x-1 items-center">
							{#if isTossupCandidate(candidateId)}
								<span class="truncate font-medium">{$TossupCandidateStore.name}</span>
							{:else}
								<span class="truncate font-medium"
									>{$CandidatesTable.get(candidateId)?.name ?? ''}</span
								>
							{/if}

							<button
								class="btn btn-xs btn-circle btn-ghost"
								onclick={() => guaranteeCandidate(candidateId)}
							>
								<Star class="size-4"></Star>
							</button>
						</div>

						<div class="flex space-x-0 font-thin font-mono">
							<span class="px-0"></span>
							{#if isTossupCandidate(candidateId)}
								<span>{weight.toFixed(2)}</span>
							{:else}
								<input
									onchange={(event) => updateRegionCandidateWeight(event, candidateId)}
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
						oninput={(event) => updateRegionCandidateWeight(event, candidateId)}
						disabled={isTossupCandidate(candidateId)}
					/>
				</label>
			{/each}
		</div>
	</div>
</div>
