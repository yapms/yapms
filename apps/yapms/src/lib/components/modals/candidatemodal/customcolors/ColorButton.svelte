<script lang="ts">
	import Cog6Tooth from '$lib/icons/Cog6Tooth.svelte';
	import MinusCircle from '$lib/icons/MinusCircle.svelte';

	export let colors: string[] = [];
	export let name: string | undefined = undefined;

	export let onSelect: (colors: string[]) => void;
	export let onEdit: (() => void) | undefined = undefined;
	export let onDelete: (() => void) | undefined = undefined;
</script>

<div class="join">
	{#if onEdit !== undefined}
		<button class="btn btn-lg btn-primary join-item" on:click={onEdit}
			><Cog6Tooth class="w-6 h-6" /></button
		>
	{/if}
	<button
		class="btn btn-lg join-item flex-grow flex-shrink"
		class:h-fit={name !== undefined}
		on:click={() => onSelect(colors)}
	>
		<div class="flex flex-col py-2 items-center gap-1">
			{#if name !== undefined}
				<h3 class="font-semibold">{name}</h3>
			{/if}
			<div class="flex flex-row flex-wrap gap-2">
				{#each colors as color}
					<div
						class="outline outline-1 outline-white w-4 h-4 rounded-full"
						style:background-color={color}
					></div>
				{/each}
			</div>
		</div>
	</button>
	{#if onDelete !== undefined}
		<button class="btn btn-lg btn-error join-item" on:click={onDelete}
			><MinusCircle class="w-6 h-6" /></button
		>
	{/if}
</div>
