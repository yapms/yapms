<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { createEventDispatcher } from 'svelte';
	import { loadMap } from '$lib/stores/LoadedMap';

	export let mapName: string;
	export let mapId: string;

	const dispatch = createEventDispatcher();

	const submitted = () => dispatch('submitted');

	let submitting = false;

	async function deleteMap() {
		submitting = true;
		await $PocketBaseStore.collection('user_maps').delete(mapId);
		submitting = false;
		submitted();
	}

	async function openMap() {
		await loadMap('user_maps', 'um', mapId);
	}
</script>

<div class="join">
	<button
		class="btn btn-sm flex-shrink flex-grow join-item overflow-hidden"
		on:click={openMap}
		disabled={submitting}
	>
		{mapName}
	</button>
	<button
		class="btn btn-sm btn-error flex-shrink join-item"
		on:click={deleteMap}
		disabled={submitting}
	>
		<MinusCircle class="w-6 h-6" />
	</button>
</div>
