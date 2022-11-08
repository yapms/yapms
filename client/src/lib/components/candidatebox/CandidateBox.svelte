<script lang="ts">
	import type Candidate from '$lib/types/Candidate';
	import { calculateLumaHEX } from '$lib/utils/luma';

	export let candidate: Candidate;
	export let selected = false;
	export let onSelect: (candidate: Candidate) => void;
	export let onEdit: (candidate: Candidate) => void;

	let total = 0;

	let buttonStyle: string;
	$: buttonStyle = selected ? 'btn btn-sm' : 'btn btn-xs';

	$: total = candidate.margins.reduce((acc, margin) => acc + margin.count, 0);
</script>

<div class="btn-group p-0.5 pointer-events-auto">
	<button
		class={buttonStyle}
		style:background-color={candidate.margins[0].color}
		style:color={calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white'}
		style:transition_in={'0.15s'}
		style="transition: all 0.15s"
		on:click={() => onSelect(candidate)}
	>
		{candidate.name} - {total}
	</button>
	<button class={buttonStyle} style="transition: all 0.15s" on:click={() => onEdit(candidate)}
		>Edit</button
	>
</div>
