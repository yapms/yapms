<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import Update from './Update.svelte';

	let updates = $PocketBaseStore.collection('updates').getList(1, 10, { sort: '-created' });
</script>

<div class="flex flex-col gap-y-3 items-stretch">
	{#await updates}
		<span class="loading loading-ring loading-lg text-primary self-center"></span>
	{:then updates}
		{#each updates.items as update}
			<Update title={update.title} description={update.description} />
		{/each}
	{/await}
</div>
