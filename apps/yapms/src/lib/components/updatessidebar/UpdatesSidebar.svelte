<script lang="ts">
	import { onMount } from 'svelte';
	import SocialLinkGrid from '../links/SocialLinkGrid.svelte';
	import Updates from './sections/Updates.svelte';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let adsbygoogle: unknown;
	onMount(() => {
		(adsbygoogle = window.adsbygoogle || []).push({});
	});
</script>

<div class="hidden lg:flex flex-row w-full md:max-w-sm xl:max-w-sm 2xl:max-w-md">
	<div class="w-full flex flex-col h-full justify-between">
		<ins
			class="adsbygoogle"
			style="display:block;width:100%;max-height:280px;height:280px"
			data-ad-client="ca-pub-1660456925957249"
			data-ad-slot="5242761073"
			data-full-width-responsive="true"
		></ins>
		<div class="overflow-y-auto flex-grow">
			<div class="divider">Updates</div>
			<Updates />
		</div>
		<div class="mb-4">
			<div class="divider">Social Links</div>
			<SocialLinkGrid />
		</div>
	</div>
	<div class="divider divider-horizontal p-0 m-0 w-0!"></div>
</div>
