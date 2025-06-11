<script lang="ts">
	import { CandidatesStore, isTossupCandidate, TossupCandidateStore } from '$lib/stores/Candidates';
	import { SplitRegionModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import type { Candidate } from '$lib/types/Candidate';
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import ModalBase from '../ModalBase.svelte';

	interface SplitRegionCandidate {
		candidate: Candidate;
		count: number;
		margin: number;
	}

	$: candidatesInRegion =
		$SplitRegionModalStore.region?.candidates.map<SplitRegionCandidate>((candidate) => {
			return candidate;
		}) ?? [];

	$: candidatesInStore = [...$CandidatesStore, $TossupCandidateStore]
		.map<SplitRegionCandidate>((candidate) => {
			return {
				candidate,
				count: 0,
				margin: 0
			};
		})
		.filter((candidate) => {
			return !candidatesInRegion.some(
				(regionCandidate) => regionCandidate.candidate.id === candidate.candidate.id
			);
		});

	function keepTossupAtTop(left: SplitRegionCandidate, right: SplitRegionCandidate) {
		if (left.candidate.id === $TossupCandidateStore.id) {
			return -1;
		} else if (right.candidate.id === $TossupCandidateStore.id) {
			return 1;
		}
		return left.candidate.name.localeCompare(right.candidate.name);
	}

	$: candidates = candidatesInRegion.concat(candidatesInStore).sort(keepTossupAtTop);

	$: tossupCandidate = candidates.find(
		(candidate) => candidate.candidate.id === $TossupCandidateStore.id
	) ?? {
		candidate: $TossupCandidateStore,
		count: 0,
		margin: 0
	};

	function convertToRegionCandidate(splitRegionCandidate: SplitRegionCandidate) {
		const candidate = $CandidatesStore.find(
			(candidate) => candidate.id === splitRegionCandidate.candidate.id
		);
		if (candidate === undefined) {
			return {
				candidate: $TossupCandidateStore,
				count: splitRegionCandidate.count,
				margin: splitRegionCandidate.margin
			};
		}
		return {
			candidate,
			count: splitRegionCandidate.count,
			margin: splitRegionCandidate.margin
		};
	}

	function calculateRequestedRegionValue(
		requestedCandidateCount: number,
		candidateToBeEdited: SplitRegionCandidate
	) {
		return candidates.reduce((acc, candidate) => {
			if (candidate.candidate.id === candidateToBeEdited.candidate.id) {
				return acc + requestedCandidateCount;
			}
			return acc + candidate.count;
		}, 0);
	}

	function generateCandidates() {
		return candidates.map((candidate) => {
			return convertToRegionCandidate(candidate);
		});
	}

	function getChangedCounts(requestedCandidateCount: number) {
		return {
			newTossupCount: tossupCandidate.count,
			newCandidateCount: requestedCandidateCount,
			newSliderValue: requestedCandidateCount.toString()
		};
	}

	function getUnchangedCounts(currentCandidateCount: number) {
		return {
			newTossupCount: tossupCandidate.count,
			newCandidateCount: currentCandidateCount,
			newSliderValue: currentCandidateCount.toString()
		};
	}

	function getChangedCountsFromTossup(data: {
		requestedRegionValue: number;
		maxRegionValue: number;
		currentCandidateCount: number;
	}) {
		const difference = data.requestedRegionValue - data.maxRegionValue;
		let maxDifference = difference;
		if (difference > tossupCandidate.count) {
			maxDifference = tossupCandidate.count;
		}
		const newTossupCount = tossupCandidate.count - maxDifference;
		const newCandidateCount = data.currentCandidateCount + maxDifference;
		const newSliderValue = newCandidateCount.toString();
		return {
			newTossupCount,
			newCandidateCount,
			newSliderValue
		};
	}

	function updateCandidateCount(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		candidateToBeEdited: { candidate: Candidate; count: number; margin: number },
		tossupCandidate: { candidate: Candidate; count: number; margin: number }
	) {
		if ($SplitRegionModalStore.region === null) {
			return;
		}

		const currentCandidateCount = candidateToBeEdited.count;
		const requestedCandidateCount = Number(event.currentTarget.value);
		const requestedRegionValue = calculateRequestedRegionValue(
			requestedCandidateCount,
			candidateToBeEdited
		);
		const maxRegionValue = $SplitRegionModalStore.region.value;

		let newCountData = {
			newTossupCount: tossupCandidate.count,
			newCandidateCount: candidateToBeEdited.count,
			newSliderValue: candidateToBeEdited.count.toString()
		};

		if (requestedRegionValue <= maxRegionValue) {
			newCountData = getChangedCounts(requestedCandidateCount);
		} else if (requestedRegionValue > maxRegionValue && tossupCandidate.count <= 0) {
			newCountData = getUnchangedCounts(currentCandidateCount);
		} else if (requestedRegionValue > maxRegionValue) {
			newCountData = getChangedCountsFromTossup({
				requestedRegionValue,
				maxRegionValue,
				currentCandidateCount
			});
		}

		tossupCandidate.count = newCountData.newTossupCount;
		candidateToBeEdited.count = newCountData.newCandidateCount;
		event.currentTarget.value = newCountData.newSliderValue;
		$SplitRegionModalStore.region.candidates = generateCandidates();
		$RegionsStore = $RegionsStore;
	}

	function updateCandidateMargin(
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
		candidateToBeEdited: { candidate: Candidate; count: number; margin: number }
	) {
		if ($SplitRegionModalStore.region === null) {
			return;
		}

		const currentCandidateMargin = candidateToBeEdited.margin;

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

		$SplitRegionModalStore.region.candidates = generateCandidates();
		$RegionsStore = $RegionsStore;
	}
</script>

<ModalBase title="Split {$SplitRegionModalStore.region?.longName}" store={SplitRegionModalStore}>
	<div slot="content" class="flex flex-col gap-4">
		{#each candidates as candidate}
			<label class="flex flex-col w-full gap-2">
				<div class="flex justify-between">
					<div class="flex items-center gap-x-1">
						<span class="font-medium">{candidate.candidate.name}</span>
						<button
							style="background-color:{candidate.candidate.margins.at(candidate.margin)?.color};"
							class="w-5 h-5 rounded-md"
							class:hidden={isTossupCandidate(candidate.candidate.id)}
							on:click={(event) => updateCandidateMargin(event, candidate)}
							aria-label="candidate-fill-color"
						></button>
					</div>
					<div class="flex space-x-0 font-thin font-mono">
						<span class="px-0">(</span>
						{#if isTossupCandidate(candidate.candidate.id)}
							<span>{candidate.count}</span>
						{:else}
							<input
								on:change={(event) => updateCandidateCount(event, candidate, tossupCandidate)}
								on:keypress={preventNonNumericalInput}
								on:paste={preventNonNumericalPaste}
								value={candidate.count}
								class="rounded-md px-1 text-end resizing-input-split"
							/>
						{/if}
						<span
							>/{$SplitRegionModalStore.region?.value})
							{((candidate.count / ($SplitRegionModalStore.region?.value ?? 1)) * 100).toFixed(
								2
							)}%</span
						>
					</div>
				</div>
				<input
					type="range"
					class="range w-full"
					min="0"
					max={$SplitRegionModalStore.region?.value}
					value={candidate.count}
					on:input={(event) => updateCandidateCount(event, candidate, tossupCandidate)}
					disabled={isTossupCandidate(candidate.candidate.id)}
				/>
			</label>
		{/each}
	</div>
</ModalBase>
