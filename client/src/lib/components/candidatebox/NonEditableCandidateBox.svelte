<script lang="ts">
	import { SelectedCandidateStore } from '$lib/stores/Candidates';
	import { CandidateCounts } from '$lib/stores/Regions';

	import { calculateLumaHEX } from '$lib/utils/luma';
	import type Candidate from '$lib/types/Candidate';

	export let candidate: Candidate;

	$: selected = $SelectedCandidateStore.id === candidate.id;
	$: buttonStyle = selected ? 'btn btn-sm' : 'btn btn-xs';

	function updateSelectedCandidate() {
		SelectedCandidateStore.set(candidate);
	}
</script>

<div class="btn-group p-0.5 pointer-events-auto">
	<button
		class={buttonStyle + ' no-animation'}
		style:background-color={candidate.margins[0].color}
		style:color={calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white'}
		style="transition: all 0.25s"
		on:click={updateSelectedCandidate}
	>
		{candidate.name} - {$CandidateCounts.get(candidate.id) ?? 0}
	</button>
</div>
