<script lang="ts">
	import CandidateBox from './CandidateBox.svelte';
	import { TossupCandidateStore, CandidatesStore } from '$lib/stores/Candidates';
	export let editable = true;
	export let selectable = true;
</script>

<div class="flex flex-row flex-wrap justify-center relative pointer-events-none h-0 z-10">
	<CandidateBox candidate={$TossupCandidateStore} {editable} {selectable} />
	{#each $CandidatesStore as candidate}
		<CandidateBox {candidate} {editable} {selectable} />
	{/each}
</div>
