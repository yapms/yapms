<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import Update from './Update.svelte';
	import SocialLinkGrid from '../links/SocialLinkGrid.svelte';

	let updates = $PocketBaseStore.collection('updates').getList(1, 10, { sort: '-created' });
</script>

<div class="md:w-1/3 lg:w-1/5 pl-5 hidden md:flex flex-col h-full justify-between">
	<div class="overflow-y-auto">
		<div class="divider">Updates</div>
		<div class="flex flex-col gap-y-3 items-stretch">
			{#await updates}
				<span class="loading loading-ring loading-lg text-primary self-center"></span>
			{:then updates}
				{#each updates.items as update}
					<Update title={update.title} description={update.description} />
				{/each}
			{/await}
		</div>
	</div>
	<div class="mb-4">
		<div class="divider">Social Links</div>
		<SocialLinkGrid />
	</div>
</div>
