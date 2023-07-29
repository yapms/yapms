<script lang="ts">
	import ArrowDownCircle from '$lib/icons/ArrowDownCircle.svelte';
	import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { CandidateCounts, CandidateCountsMargins } from '$lib/stores/regions/Regions';
	import BattleChartLabel from './BattleChartLabel.svelte';

	/**
	 * 1. Store the first candidate name, count and color
	 * 2. Store the tossup candidate name, count and color
	 * 3. Store the second candidate name, count and color
	 */
	$: counts =
		$CandidatesStore.length === 2
			? [
					...($CandidatesStore.at(0)?.margins.map((_margin, index) => ({
						name: $CandidatesStore.at(0)?.name ?? '',
						count: $CandidateCountsMargins.get($CandidatesStore.at(0)?.id ?? '')?.at(index) ?? 0,
						color: $CandidatesStore.at(0)?.margins.at(index)?.color ?? '#000000'
					})) ?? []),
					{
						name: $TossupCandidateStore.name,
						count: $CandidateCounts.get($TossupCandidateStore.id) ?? 0,
						color: $TossupCandidateStore.margins.at(0)?.color ?? '#000000'
					},
					...($CandidatesStore.at(1)?.margins.map((_margin, index) => ({
						name: $CandidatesStore.at(1)?.name ?? '',
						count: $CandidateCountsMargins.get($CandidatesStore.at(1)?.id ?? '')?.at(index) ?? 0,
						color: $CandidatesStore.at(1)?.margins.at(index)?.color ?? '#000000'
					})) ?? [])
			  ]
			: [
					{
						name: $TossupCandidateStore.name,
						count: $CandidateCounts.get($TossupCandidateStore.id) ?? 0,
						color: $TossupCandidateStore.margins.at(0)?.color ?? '#000000'
					},
					...$CandidatesStore
						.map((candidate) => {
							return candidate.margins.map((margin, index) => ({
								name: candidate.name ?? '',
								count: $CandidateCountsMargins.get(candidate.id ?? '')?.at(index) ?? 0,
								color: margin.color
							}));
						})
						.flat()
			  ];

	/**
	 * Sum the total number of votes
	 */
	$: total = counts.reduce((total, count) => total + count.count, 0);

	/**
	 * Calculate the percentage of votes for each candidate
	 */
	$: percentages = counts.map((count) => count.count / total);

	/**
	 * Calculate the color of the candidate with over half the votes
	 */
	$: winningColor = $CandidatesStore.reduce(
		(current, candidate) => {
			const nextWinner = $CandidateCounts.get(candidate.id) ?? 0;
			if (nextWinner > total / 2) {
				return candidate.margins.at(0)?.color ?? '#000000';
			} else {
				return current;
			}
		},
		$TossupCandidateStore.margins.at(0)?.color ?? '#000000'
	);
</script>

<div
	class="flex w-full h-full justify-center"
	class:flex-col={$ChartPositionStore === 'bottom'}
	class:flex-row-reverse={$ChartPositionStore === 'left'}
>
	{#if $CandidatesStore.length === 2}
		<div class="flex items-center justify-center" class:rotate-90={$ChartPositionStore === 'left'}>
			<ArrowDownCircle class="w-6 h-6" style="color: {winningColor};" />
		</div>
	{/if}
	<div
		class="flex rounded-md overflow-hidden min-w-fit min-h-fit"
		class:flex-col={$ChartPositionStore === 'left'}
		class:flex-row={$ChartPositionStore === 'bottom'}
		class:w-16={$ChartPositionStore === 'left'}
		class:h-16={$ChartPositionStore === 'bottom'}
	>
		{#each counts as count, index}
			<BattleChartLabel
				name={count.name}
				count={count.count}
				color={count.color}
				percentage={percentages[index]}
				displayName={false}
			/>
		{/each}
	</div>
</div>
