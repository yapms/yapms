<script lang="ts">
	import { onMount } from 'svelte';
	import SocialLinkGrid from '../links/SocialLinkGrid.svelte';
	import Updates from './sections/Updates.svelte';
	
	let adsbygoogle: any;
	onMount(() => {
		(adsbygoogle = (window as any).adsbygoogle || []).push({});
	});
</script>

<div class="md:w-1/3 lg:w-1/5 pl-5 hidden md:flex flex-col h-full justify-between">
	<ins
		class="adsbygoogle"
		style="display:block;width:100%;max-height:280px;height:280px"
		data-ad-client="ca-pub-1660456925957249"
		data-ad-slot="5242761073"
		data-ad-format="auto"
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
