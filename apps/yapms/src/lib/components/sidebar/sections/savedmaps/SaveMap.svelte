<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { generateJson } from '$lib/utils/saveMap';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import { page } from '$app/stores';
	import Folder from '$lib/icons/Folder.svelte';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';

	let { onSubmitted }: { onSubmitted: () => void } = $props();

	let disabled = $state<boolean>(false);
	let error = $state<string>('');
	let submitting = $state<boolean>(false);
	let newMapName = $state<string>('');

	async function createMap() {
		if (newMapName === '') {
			return;
		}
		if ($PocketBaseStore.authStore.record === null) {
			return;
		}
		submitting = true;
		error = '';
		const form = new FormData();
		const newMapData = new File([JSON.stringify(generateJson())], 'data.json', {
			type: 'application/json'
		});
		form.append('data', newMapData);
		form.append('name', newMapName);
		form.append('user', $PocketBaseStore.authStore.record.id);
		await $PocketBaseStore
			.collection('user_maps')
			.create(form)
			.then(() => {
				submitting = false;
				newMapName = '';
				onSubmitted();
			})
			.catch((e) => {
				console.error(e);
				error = e.message;
				submitting = false;
			});
	}

	async function createFolder() {
		if (newMapName === '') {
			return;
		}
		if ($PocketBaseStore.authStore.record === null) {
			return;
		}
		submitting = true;
		error = '';
		await $PocketBaseStore
			.collection('user_map_folders')
			.create({
				name: newMapName,
				user: $PocketBaseStore.authStore.record.id
			})
			.then(() => {
				submitting = false;
				newMapName = '';
				onSubmitted();
			})
			.catch((e) => {
				console.error(e);
				error = e.message;
				submitting = false;
			});
	}
</script>

{#if error}
	<div class="alert alert-error gap-x-2 p-2">
		<ExclamationCircle class="w-5 h-5" />
		<span>{error}</span>
	</div>
{/if}

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
			class="btn btn-sm btn-primary join-item"
			onclick={createFolder}
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
			onclick={createMap}
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
