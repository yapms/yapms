<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { loadUserMapFromID } from '$lib/stores/LoadedMap';
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	export let mapName: string;
	export let mapID: string;
	export let onDeleted: () => void;

	let submitting = false;

	async function deleteMap() {
		submitting = true;
		await $PocketBaseStore.collection('user_maps').delete(mapID);
		submitting = false;
		onDeleted();
	}

	async function openMap() {
		loadUserMapFromID(mapID);
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
	<div class="tooltip" data-tip="Delete">
		<button
			class="btn btn-sm btn-error flex-shrink join-item"
			on:click={deleteMap}
			disabled={submitting}
		>
			<MinusCircle class="w-6 h-6" />
		</button>
	</div>
</div>
