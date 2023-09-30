<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { generateJson } from '$lib/utils/saveMap';
	import PlusCircle from '$lib/icons/PlusCircle.svelte';

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
</script>

<div class="join">
	<input
		type="text"
		class="input input-bordered input-sm flex-grow overflow-hidden join-item"
		bind:value={newMapName}
		placeholder="Map Name"
		disabled={disabled || submitting}
	/>
	<div class="tooltip" data-tip="Create">
		<button
			class="btn btn-sm btn-primary join-item"
			on:click={createMap}
			disabled={disabled || submitting}
		>
			{#if submitting}
				<span class="loading loading-dots loading-sm" />
			{:else}
				<PlusCircle class="w-6 h-6" />
			{/if}
		</button>
	</div>
</div>
