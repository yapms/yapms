<script lang="ts">
	export let name: string;
	export let links: { label: string; route: string }[];

	const cols = Math.ceil(links.length / 2);
</script>

<div class="flex flex-col items-center">
	<h1 class="font-semibold text-lg text-white block underline">
		{#if name === ''}
			<br />
		{:else}
			{name}
		{/if}
	</h1>
	<div class="grid grid-cols-{cols} gap-x-4" class:grid-cols-4={cols >= 4}>
		{#each links as link}
			<!-- hidden links will be prerendered -->
			<a href={link.route} class="text-lg text-center">
				{link.label}
			</a>
		{/each}
	</div>
</div>
