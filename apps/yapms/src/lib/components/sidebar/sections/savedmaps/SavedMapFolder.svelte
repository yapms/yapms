<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { updateSavedMapFolder } from '$lib/utils/savedMaps';
	import { useSortable } from '$lib/utils/sortableHook.svelte';
	import type { RecordModel } from 'pocketbase';
	import SavedMap from './SavedMap.svelte';

	let {
		folderName,
		folderID,
		open,
		onUpdated,
		onToggle
	}: {
		folderName: string;
		folderID: string;
		open: boolean;
		onUpdated: () => void;
		onToggle: (folderID: string) => void;
	} = $props();

	let maps = $state<Promise<RecordModel[]>>(
		open
			? $PocketBaseStore.collection('user_maps').getFullList({
					filter: `folder = '${folderID}'`,
					requestKey: null
				})
			: Promise.resolve([])
	);

	let submitting = $state(false);

	async function deleteFolder() {
		submitting = true;
		await $PocketBaseStore.collection('user_map_folders').delete(folderID);
		submitting = false;
		onUpdated();
	}

	let mapList = $state<HTMLDivElement | undefined>(undefined);

	$effect(() => {
		useSortable(() => mapList, {
			animation: 140,
			dragoverBubble: true,
			delay: 250,
			delayOnTouchOnly: true,
			group: 'user-maps',
			sort: false,
			disabled: !open,
			ghostClass: 'z-10',
			async onAdd(evt) {
				await updateSavedMapFolder(evt, folderID);
				onUpdated();
			}
		});
	});

	function onCheck() {
		if (open) {
			maps = $PocketBaseStore.collection('user_maps').getFullList({
				filter: `folder = '${folderID}'`,
				requestKey: null
			});
		}
		onToggle(folderID);
	}
</script>

<div class="collapse collapse-arrow bg-base-300 border-base-300 rounded-r-none">
	<input type="checkbox" bind:checked={open} onchange={onCheck} />
	<div
		class="truncate collapse-title join p-0 flex items-center transition-[padding] after:mr-10 after:-mt-3.5"
		class:pb-2={open}
	>
		<p class="truncate text-xs font-semibold pr-8 pl-4 grow text-center">{folderName}</p>
		<div class="tooltip tooltip-left z-10" data-tip="Delete">
			<button
				class="btn btn-sm btn-error flex-shrink join-item"
				class:rounded-br-none={open}
				class:rounded-bl-sm={open}
				onclick={deleteFolder}
				disabled={submitting}
			>
				<MinusCircle class="w-6 h-6" />
			</button>
		</div>
	</div>

	<div class="collapse-content">
		<div class="flex flex-col gap-2 min-h-8" bind:this={mapList}>
			{#await maps}
				<div class="flex justify-center">
					<span class="loading loading-dots loading-lg"></span>
				</div>
			{:then maps}
				<div
					class="absolute w-[calc(100%-8*var(--spacing))] h-8 rounded-md border-2 border-dashed border-opacity-20 border-base-content/30 z-10"
				></div>
				{#each maps.sort((a, b) => a.name.localeCompare(b.name)) as map}
					<SavedMap mapName={map.name} mapID={map.id} {onUpdated} />
				{/each}
			{/await}
		</div>
	</div>
</div>
