<script lang="ts">
	import Cog6Tooth from '$lib/icons/Cog6Tooth.svelte';
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import Trash from '$lib/icons/Trash.svelte';

	let {
		name,
		colors,
		selected,
		deleteSelected = false,
		hideName = false,
		onSelect = undefined,
		onConfirm = undefined,
		onEdit = undefined,
		onDelete = undefined
	}: {
		name: string;
		colors: string[];
		selected: boolean;
		deleteSelected?: boolean;
		hideName?: boolean;
		onSelect?: ((name: string) => void) | undefined;
		onConfirm?: ((colors: string[]) => void) | undefined;
		onEdit?: (() => void) | undefined;
		onDelete?: (() => void) | undefined;
	} = $props();

	function onSelectColors() {
		onSelect?.(name ?? '');
	}

	function onConfirmColors() {
		onConfirm?.(colors);
	}
</script>

<div class="join">
	{#if onEdit !== undefined}
		<button class="btn btn-lg btn-primary join-item" onclick={onEdit}>
			<Cog6Tooth class="w-6 h-6" />
		</button>
	{/if}
	<button
		class="btn btn-lg join-item flex-grow flex-shrink"
		class:h-fit={name !== undefined && hideName === false}
		onclick={onSelectColors}
	>
		<div class="flex flex-col py-2 items-center gap-1">
			{#if name !== undefined && hideName === false}
				<h3 class="font-semibold">{name}</h3>
			{/if}
			<div class="flex flex-row flex-wrap gap-2">
				{#each colors as color}
					<div
						class="outline-1 outline-white w-4 h-4 rounded-full"
						style:background-color={color}
					></div>
				{/each}
			</div>
		</div>
	</button>
	{#if selected === true}
		<button class="btn btn-primary h-auto join-item" onclick={onConfirmColors}> Confirm </button>
	{/if}
	{#if onDelete !== undefined}
		<button class="btn btn-lg btn-error join-item" onclick={onDelete}>
			{#if deleteSelected}
				<Trash class="w-6 h-6" />
			{:else}
				<MinusCircle class="w-6 h-6" />
			{/if}
		</button>
	{/if}
</div>
