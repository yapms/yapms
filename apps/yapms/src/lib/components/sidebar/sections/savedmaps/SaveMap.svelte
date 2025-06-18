<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { generateJson } from '$lib/utils/saveMap';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import { page } from '$app/stores';
	import Folder from '$lib/icons/Folder.svelte';

	export let disabled = false;
	export let onSubmitted: () => void;

	let submitting = false;
	let newMapName = '';

	async function createMap() {
		if (newMapName === '') {
			return;
		}
		if ($PocketBaseStore.authStore.record === null) {
			return;
		}
		submitting = true;
		const form = new FormData();
		const newMapData = new File([JSON.stringify(generateJson())], 'data.json', {
			type: 'application/json'
		});
		form.append('data', newMapData);
		form.append('name', newMapName);
		form.append('user', $PocketBaseStore.authStore.record.id);
		await $PocketBaseStore.collection('user_maps').create(form);
		submitting = false;
		newMapName = '';
		onSubmitted();
	}
	console.log($page.url.pathname.split('/').at(2));

	async function createFolder() {
		if (newMapName === '') {
			return;
		}
		if ($PocketBaseStore.authStore.record === null) {
			return;
		}
		submitting = true;
		await $PocketBaseStore.collection('user_map_folders').create({
			name: newMapName,
			user: $PocketBaseStore.authStore.record.id
		});
		submitting = false;
		newMapName = '';
		onSubmitted();
	}
</script>

<div class="join">
	<input
		type="text"
		class="input input-bordered input-sm flex-grow overflow-hidden join-item"
		bind:value={newMapName}
		placeholder="Map/Folder Name"
		disabled={disabled || submitting || $page.url.pathname === '/app/imported'}
	/>
	<div class="tooltip" data-tip="New Folder">
		<button
			class="btn btn-sm join-item"
			on:click={createFolder}
			disabled={disabled || submitting || $page.url.pathname === '/app/imported'}
		>
			{#if submitting}
				<span class="loading loading-dots loading-sm"></span>
			{:else}
				<Folder class="w-6 h-6" />
			{/if}
		</button>
	</div>
	<div class="tooltip" data-tip="New Map">
		<button
			class="btn btn-sm btn-primary join-item"
			on:click={createMap}
			disabled={disabled || submitting || $page.url.pathname === '/app/imported'}
		>
			{#if submitting}
				<span class="loading loading-dots loading-sm"></span>
			{:else}
				<PlusCircle class="w-6 h-6" />
			{/if}
		</button>
	</div>
</div>
