<script lang="ts">
	import SocialLinkGrid from '../links/SocialLinkGrid.svelte';
	import Updates from './sections/Updates.svelte';

	import { onMount } from 'svelte';

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	let ads: any;
	onMount(async () => {
		ads = (await import('$lib/components/updatessidebar/sections/UpdatesAds.svelte')).default;
	});
</script>

<div class="md:w-1/3 lg:w-1/5 pl-5 hidden md:flex flex-col h-full justify-between">
	<svelte:component this={ads} />
	<div class="overflow-y-auto">
		<div class="divider">Updates</div>
		<Updates />
	</div>
	<div class="mb-4">
		<div class="divider">Social Links</div>
		<SocialLinkGrid />
	</div>
</div>
