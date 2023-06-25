<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { onMount } from 'svelte';

	let newMapName = '';
	let maps: Array<Record<any, any>> = [];

	async function getMaps() {
		return $PocketBaseStore.collection('named_maps').getFullList();
	}

	async function createMap() {
		await $PocketBaseStore
			.collection('named_maps')
			.create({ name: newMapName, user: $PocketBaseStore.authStore.model?.id });
		maps = await getMaps();
		newMapName = '';
	}

	async function deleteMap(id: string) {
		await $PocketBaseStore.collection('named_maps').delete(id);
		maps = await getMaps();
	}

	onMount(async () => {
		maps = await getMaps();
	});
</script>

<div class="flex flex-col gap-2 p-4">
	<div class="join">
		<input
			type="text"
			class="input input-sm overflow-hidden join-item"
			bind:value={newMapName}
			placeholder="map name"
		/>
		<button class="btn btn-sm btn-primary join-item" on:click={createMap}
			><PlusCircle class="w-6 h-6" /></button
		>
	</div>
	{#each maps as map}
		<div class="join">
			<button class="btn btn-sm flex-shrink flex-grow join-item overflow-hidden">{map.name}</button>
			<button
				class="btn btn-sm btn-error flex-shrink join-item"
				on:click={async () => {
					await deleteMap(map.id);
				}}><MinusCircle class="w-6 h-6" /></button
			>
		</div>
	{/each}
</div>
