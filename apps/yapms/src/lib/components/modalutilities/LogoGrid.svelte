<script lang="ts">
	const logos = [
		{ name: 'LTE', image: 'LTEIMAGE' },
		{ name: 'REP', image: 'REDIMAGE' }
	];
</script>

<div class="flex flex-row gap-3 flex-wrap justify-center">
	{#each logos as logo}
		<button class="btn btn-md">{logo.name}</button>
	{/each}
</div>
