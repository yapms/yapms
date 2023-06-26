<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	export let mapName: string;
	export let mapId: string;

	const dispatch = createEventDispatcher();

	const submitted = () => dispatch('submitted');

	let submitting = false;

	async function deleteMap(id: string) {
		submitting = true;
		await $PocketBaseStore.collection('user_maps').delete(id);
		submitting = false;
		submitted();
	}

	async function openMap(id: string) {
		await goto(`/app?um${id}`);
	}
</script>

<div class="join">
	<button
		class="btn btn-sm flex-shrink flex-grow join-item overflow-hidden"
		on:click={() => openMap(mapId)}
		disabled={submitting}
	>
		{mapName}
	</button>
	<button
		class="btn btn-sm btn-error flex-shrink join-item"
		on:click={async () => {
			await deleteMap(mapId);
		}}
		disabled={submitting}
	>
		<MinusCircle class="w-6 h-6" />
	</button>
</div>
