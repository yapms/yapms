<script lang="ts">
	import CandidateBox from './CandidateBox.svelte';
	import NonEditableCandidateBox from './NonEditableCandidateBox.svelte';
	import { TossupCandidateStore, CandidatesStore } from '$lib/stores/Candidates';
</script>

<div class="flex flex-row flex-wrap justify-center relative pointer-events-none h-0 z-10">
	<NonEditableCandidateBox candidate={$TossupCandidateStore} />
	{#each $CandidatesStore as candidate}
		<CandidateBox {candidate} />
	{/each}
</div>
