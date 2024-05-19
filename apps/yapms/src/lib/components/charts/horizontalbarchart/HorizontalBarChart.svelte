<script lang="ts">
	import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { ChartLeansStore } from '$lib/stores/ChartLeansStore';
	import { CandidateCounts, CandidateCountsMargins } from '$lib/stores/regions/Regions';
	import BattleChartLabel from '../battlechart/BattleChartLabel.svelte';

	export let transitions: boolean = true;

	$: tossupCounts = {
		name: $TossupCandidateStore.name,
		total: $CandidateCounts.get($TossupCandidateStore.id) ?? 0,
		counts: [
			{
				count: $CandidateCounts.get($TossupCandidateStore.id) ?? 0,
				color: $TossupCandidateStore.margins.at(0)?.color ?? '#000000',
				percentage: 1
			}
		]
	};

	$: candidatesWithLeans = $CandidatesStore.map((candidate) => {
		return {
			name: candidate.name,
			total: $CandidateCounts.get(candidate.id) ?? 0,
			counts: candidate.margins.map((margin, index) => ({
				count: $CandidateCountsMargins.get(candidate.id)?.at(index) ?? 0,
				color: margin.color,
				percentage:
					$CandidateCountsMargins.get(candidate.id)?.at(index) ??
					0 / ($CandidateCounts.get(candidate.id) ?? 0)
			}))
		};
	});

	$: countsWithNoLeans = $CandidatesStore.map((candidate) => {
		return {
			name: candidate.name,
			total: $CandidateCounts.get(candidate.id) ?? 0,
			counts: [
				{
					count: $CandidateCounts.get(candidate.id) ?? 0,
					color: candidate.margins[0].color,
					percentage: 1
				}
			]
		};
	});

	$: choosenChartData = $ChartLeansStore.enabled ? candidatesWithLeans : countsWithNoLeans;

	$: finalChartData = [tossupCounts].concat(choosenChartData);

	/**
	 * Find the votes for the highest vote-getter
	 */
	$: maxCandidateTotal = finalChartData.reduce(
		(max, candidate) => Math.max(max, candidate.total),
		0
	);

	/**
	 * Calculate the percentage of votes for each candidate in terms of the max total.
	 */
	$: percentages = finalChartData.map((candidate) => (candidate.total / maxCandidateTotal) * 100);

	/**
	 * Find the length of the longest-named candidate so all bars can start at the same point.
	 */
	$: maxCandidateNameLength = finalChartData.reduce(
		(max, candidate) => Math.max(max, candidate.name.length),
		0
	);
</script>

<div
	class="w-full items-center justify-center space-y-1 overflow-y-auto"
	class:grid={$ChartPositionStore === 'bottom'}
	class:h-full={$ChartPositionStore === 'bottom'}
	class:h-fit={$ChartPositionStore === 'left'}
	style="grid-template-columns: {maxCandidateNameLength + 1}ch calc(100% - {maxCandidateNameLength +
		1}ch)"
>
	{#each finalChartData as candidate, index}
		<p>{candidate.name}</p>
		<div
			class="flex flex-row transition-all ease-linear duration-200"
			style="width:{percentages[index]}%"
		>
			{#each candidate.counts as count}
				<BattleChartLabel
					count={count.count}
					color={count.color}
					percentage={count.percentage}
					{transitions}
				/>
			{/each}
		</div>
	{/each}
</div>
