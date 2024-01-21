<script lang="ts">
	import '$lib/styles/global.css';
	import '@fontsource/roboto/400.css';
	import { PUBLIC_UMAMI_URI, PUBLIC_UMAMI_DATA_WEBSITE_ID } from '$env/static/public';
</script>

<svelte:head>
	<script async src={PUBLIC_UMAMI_URI} data-website-id={PUBLIC_UMAMI_DATA_WEBSITE_ID}></script>
	<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
</svelte:head>

<slot />
