<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { generateJson } from '$lib/utils/saveMap';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import { page } from '$app/stores';

	export let disabled = false;
	export let onSubmitted: () => void;

	let submitting = false;
	let newMapName = '';

	async function createMap() {
		if (newMapName === '') {
			return;
		}
		if ($PocketBaseStore.authStore.model === null) {
			return;
		}
		submitting = true;
		const form = new FormData();
		const newMapData = new File([JSON.stringify(generateJson())], 'data.json', {
			type: 'application/json'
		});
		form.append('data', newMapData);
		form.append('name', newMapName);
		form.append('user', $PocketBaseStore.authStore.model.id);
		await $PocketBaseStore.collection('user_maps').create(form);
		submitting = false;
		newMapName = '';
		onSubmitted();
	}
	console.log($page.url.pathname.split('/').at(2));
</script>

<div class="join">
	<input
		type="text"
		class="input input-bordered input-sm flex-grow overflow-hidden join-item"
		bind:value={newMapName}
		placeholder="Map Name"
		disabled={disabled || submitting || $page.url.pathname === '/app/imported'}
	/>
	<div class="tooltip" data-tip="Create">
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
