<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { onMount } from 'svelte';
	import { generateJson } from '$lib/utils/saveMap';
	import { goto } from '$app/navigation';

	let newMapName = '';
	let maps: Array<Record<any, any>> = [];

	async function getMaps() {
		return $PocketBaseStore.collection('account_maps').getFullList();
	}

	async function createMap() {
		const form = new FormData();
		const newMapData = new File([JSON.stringify(generateJson())], 'data.json', {
			type: 'application/json'
		});
		form.append('data', newMapData);
		form.append('name', newMapName);
		form.append('user', $PocketBaseStore.authStore.model?.id || '');
		await $PocketBaseStore.collection('account_maps').create(form);
		maps = await getMaps();
		newMapName = '';
	}

	async function deleteMap(id: string) {
		await $PocketBaseStore.collection('account_maps').delete(id);
		maps = await getMaps();
	}

	async function openMap(id: string) {
		await goto(`/app?am=${id}`, { replaceState: true });
	}

	onMount(async () => {
		maps = await getMaps();
	});
</script>

<div class="divider">Saved Maps ({maps.length}/25)</div>
<div class="flex flex-col gap-2 p-4">
	<div class="join">
		<input
			type="text"
			class="input input-sm flex-grow overflow-hidden join-item"
			bind:value={newMapName}
			placeholder="map name"
		/>
		<button class="btn btn-sm btn-primary join-item" on:click={createMap}
			><PlusCircle class="w-6 h-6" /></button
		>
	</div>
	{#each maps as map}
		<div class="join">
			<button
				class="btn btn-sm flex-shrink flex-grow join-item overflow-hidden"
				on:click={() => openMap(map.id)}>{map.name}</button
			>
			<button
				class="btn btn-sm btn-error flex-shrink join-item"
				on:click={async () => {
					await deleteMap(map.id);
				}}><MinusCircle class="w-6 h-6" /></button
			>
		</div>
	{/each}
</div>
