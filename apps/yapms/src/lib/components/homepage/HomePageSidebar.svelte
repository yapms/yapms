<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import SideBarUpdate from './SideBarUpdate.svelte';
	import ExternalLinkGrid from '../links/ExternalLinkGrid.svelte';
	import { getLinks } from '$lib/utils/getLinks';


	let updates = $PocketBaseStore.collection('updates').getList(1, 10, { sort: '-created' });
</script>

<div class="lg:w-1/5 pl-5 hidden md:flex flex-col h-full justify-between">
	<div class="overflow-y-auto">
		<div class="divider">Updates</div>
		<div class="flex flex-col gap-y-3 items-stretch">
			{#await updates}
				<span class="loading loading-ring loading-lg text-primary self-center"></span>
			{:then updates}
				{#each updates.items as update}
					<SideBarUpdate title={update.title} description={update.description} />
				{/each}
			{/await}
		</div>
	</div>
	<div class="mb-4">
		<div class="divider">Social Links</div>
		<ExternalLinkGrid linkPromise={getLinks('social')} />
	</div>
</div>
