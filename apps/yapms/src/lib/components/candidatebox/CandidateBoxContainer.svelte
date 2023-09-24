<script lang="ts">
	import CandidateBox from './CandidateBox.svelte';
	import { TossupCandidateStore, CandidatesStore } from '$lib/stores/Candidates';
	export let selectable = true;
	export let transitions = true;
</script>

<div class="flex flex-row flex-wrap justify-center relative pointer-events-none gap-1 h-0 z-10">
	<CandidateBox candidate={$TossupCandidateStore} {selectable} {transitions} />
	{#each $CandidatesStore as candidate}
		<CandidateBox {candidate} {selectable} {transitions} />
	{/each}
</div>
