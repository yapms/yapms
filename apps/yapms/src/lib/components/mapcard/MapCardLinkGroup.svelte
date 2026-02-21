<script lang="ts">
	import type { HomeLinkData } from "$lib/types/HomeData";

	export let label: string | undefined;
	export let links: HomeLinkData[];

	const nCols = Math.ceil(links.length / 2);

	let columns: HomeLinkData[][] = [];
	if (label === undefined) {
		// Breaks array into chunks of two, ex:
		// [ [links[0], links[1] ], [ links[2] ] ]
		columns = Array.from({ length: Math.ceil(links.length/2) }, (_, i) =>
			links.slice(i*2, (i+1)*2)
		);
	}
</script>

{#if label === undefined}
	<!-- Display each column as a seperate div so each column can show one by one instead of needing space for all -->
	{#each columns as col}
		<div class="flex flex-col items-center">
			<div class="text-lg">
				<br/>
			</div>
			<div class="grid grid-cols-1 gap-x-4">
				{#each col as link}
					<!-- hidden links will be prerendered -->
					<a href={link.route} class="text-lg text-center text-blue-300 underline">
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/each}
{:else}
	<div class="flex flex-col items-center">
		<h1 class="font-semibold text-lg text-white block">
			{label}
		</h1>
		<div class="grid gap-x-4" style="grid-template-columns: repeat({nCols}, minmax(0, 1fr));">
			{#each links as link}
				<!-- hidden links will be prerendered -->
				<a href={link.route} class="text-lg text-center text-blue-300 underline">
					{link.label}
				</a>
			{/each}
			{#if links.length === 1}
				<!-- Add empty "bottom link" spacing to ensure group label is at same height-->
				<div class="text-lg">
					<br/>
				</div>
			{/if}
		</div>
	</div>
{/if}
