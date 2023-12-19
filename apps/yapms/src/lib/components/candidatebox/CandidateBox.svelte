<script lang="ts">
	import { SelectedCandidateStore } from '$lib/stores/Candidates';
	import { CandidateCounts } from '$lib/stores/regions/Regions';

	import { calculateLumaHEX } from '$lib/utils/luma';
	import type Candidate from '$lib/types/Candidate';
	import { CandidateBoxOptions } from '$lib/stores/CandidateBoxOptions';

	export let candidate: Candidate;
	export let selectable: boolean;
	export let transitions = true;

	$: selected = selectable && $SelectedCandidateStore.id === candidate.id;
	$: textColor = calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white';
	$: backgroundColor = candidate.margins[0].color;
	$: transitionSpeed = transitions ? '150ms' : '0ms';

	function updateSelectedCandidate() {
		SelectedCandidateStore.set(candidate);
	}
</script>

<button
	class="overflow-hidden transition-all m-0.5 pointer-events-auto cursor-pointer font-bold rounded border-double"
	class:text-xs={$CandidateBoxOptions.fontSize === 0}
	class:text-sm={$CandidateBoxOptions.fontSize === 1}
	class:text-md={$CandidateBoxOptions.fontSize === 2}
	class:text-lg={$CandidateBoxOptions.fontSize === 3}
	class:text-xl={$CandidateBoxOptions.fontSize === 4}
	class:border-4={selected}
	class:border-white={textColor === 'white'}
	class:border-black={textColor !== 'white'}
	style:transition-duration={transitionSpeed}
	style:background-color={backgroundColor}
	style:color={textColor}
	on:click={updateSelectedCandidate}
>
	<div class="flex flex-col justify-between h-full">
		<div class="px-2 py-1">
			{candidate.name}
			{$CandidateCounts.get(candidate.id) ?? 0}
		</div>
		{#if candidate.margins.length > 1}
			<div class="flex flex-row w-full h-2">
				{#each candidate.margins as margin}
					<div class="w-full" style:background-color={margin.color} />
				{/each}
			</div>
		{/if}
	</div>
</button>
