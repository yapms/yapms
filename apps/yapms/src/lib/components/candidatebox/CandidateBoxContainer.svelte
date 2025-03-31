<script lang="ts">
	import CandidateBox from './CandidateBox.svelte';
	import { TossupCandidateStore, CandidatesStore } from '$lib/stores/Candidates';
	export let selectable = true;
	export let transitions = true;
	export let margins = false;
</script>

<div
	class="flex flex-row flex-wrap items-start justify-center relative pointer-events-none gap-1 h-0 z-10"
	class:mx-14={margins}
>
	<CandidateBox candidate={$TossupCandidateStore} {selectable} {transitions} />
	{#each $CandidatesStore as candidate}
		<CandidateBox {candidate} {selectable} {transitions} />
	{/each}
</div>
