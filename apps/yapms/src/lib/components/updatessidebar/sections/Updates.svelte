<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import Update from './Update.svelte';

	let updates = $PocketBaseStore.collection('updates').getList(1, 10, { sort: '-created' });
</script>

<div class="grow flex flex-col gap-y-4 items-stretch px-4 overflow-y-auto">
	{#await updates}
		<span class="loading loading-ring loading-lg text-primary self-center"></span>
	{:then updates}
		{#each updates.items as update}
			<Update title={update.title} description={update.description} />
		{/each}
	{/await}
</div>
