<script lang="ts">
	import '$lib/styles/global.css';
	import '@fontsource/roboto/400.css';
	import { PUBLIC_UMAMI_URI, PUBLIC_UMAMI_DATA_WEBSITE_ID } from '$env/static/public';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';

	if (browser) {
		window.googletag = window.googletag || { cmd: [] };
		window.googletag.cmd.push(function () {
			window.googletag
				.defineSlot(
					'/21838847269/yapms-sidebar',
					[
						[250, 250],
						[200, 200]
					],
					'div-gpt-ad-1698618618626-0'
				)
				.addService(window.googletag.pubads());
			window.googletag.pubads().enableSingleRequest();
			window.googletag.pubads().collapseEmptyDivs();
			window.googletag.enableServices();
		});

		window.googletag = window.googletag || { cmd: [] };
		window.googletag.cmd.push(function () {
			window.googletag
				.defineSlot(
					'/21838847269/yapms-interstitials',
					[
						[300, 250],
						[320, 480],
						[336, 280]
					],
					'div-gpt-ad-1698625359953-0'
				)
				.addService(window.googletag.pubads());
			window.googletag.enableServices();
		});
	}

	$: if ($navigating) {
		window.googletag.cmd.push(function () {
			window.googletag.display('div-gpt-ad-1698625359953-0');
		});
	}
</script>

<svelte:head>
	<script async src={PUBLIC_UMAMI_URI} data-website-id={PUBLIC_UMAMI_DATA_WEBSITE_ID}></script>
	<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
</svelte:head>

<slot />

<!-- /21838847269/yapms-interstitials -->
<div id="div-gpt-ad-1698625359953-0" style="min-width: 300px; min-height: 250px;" />
