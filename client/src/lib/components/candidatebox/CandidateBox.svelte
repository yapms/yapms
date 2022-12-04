<script lang="ts">
	import { SelectedCandidateStore } from '$lib/stores/Candidates';

	import { calculateLumaHEX } from '$lib/utils/luma';
	import type { Candidate } from '$lib/types/Candidate';

	export let candidate: Candidate;

	$: selected = $SelectedCandidateStore.id === candidate.id;
	$: buttonStyle = selected ? 'btn btn-sm' : 'btn btn-xs';

	function updateSelectedCandidate() {
		SelectedCandidateStore.set(candidate);
	}
</script>

<div class="btn-group p-0.5 pointer-events-auto">
	<button
		class={buttonStyle}
		style:background-color={candidate.margins[0].color}
		style:color={calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white'}
		style:transition_in={'0.15s'}
		style="transition: all 0.15s"
		on:click={updateSelectedCandidate}
	>
		{candidate.name} - {candidate.margins.reduce((a, b) => a + b.count, 0)}
	</button>
	<button class={buttonStyle} style="transition: all 0.15s">Edit</button>
</div>
