<script lang="ts">
	import { SelectedCandidateStore } from '$lib/stores/Candidates';
	import { CandidateCounts } from '$lib/stores/regions/Regions';

	import { calculateLumaHEX } from '$lib/utils/luma';
	import type Candidate from '$lib/types/Candidate';

	export let candidate: Candidate;
	export let selectable: boolean;

	$: selected = selectable && $SelectedCandidateStore.id === candidate.id;

	function updateSelectedCandidate() {
		SelectedCandidateStore.set(candidate);
	}
</script>

<div class="btn-group p-0.5 pointer-events-auto">
	<button
		class="btn no-animation overflow-hidden p-0"
		class:btn-sm={selected}
		class:btn-xs={!selected}
		style:background-color={candidate.margins[0].color}
		style:color={calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white'}
		style="transition: all 0.25s"
		on:click={updateSelectedCandidate}
	>
		<div class="flex flex-col gap-0">
			<div class="pt-1 pb-1 pl-2 pr-2">
				{candidate.name}
				{$CandidateCounts.get(candidate.id) ?? 0}
			</div>
			{#if candidate.margins.length > 1}
				<div class="flex flex-row w-full">
					{#each candidate.margins as margin}
						<div class="w-full min-h-6" style:background-color={margin.color} />
					{/each}
				</div>
			{/if}
		</div>
	</button>
</div>
