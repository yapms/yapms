<script>
	import '$lib/styles/global.css';
	import { PUBLIC_UMAMI_URI, PUBLIC_UMAMI_DATA_WEBSITE_ID } from '$env/static/public';
</script>

<svelte:head>
	<script async src={PUBLIC_UMAMI_URI} data-website-id={PUBLIC_UMAMI_DATA_WEBSITE_ID}></script>
</svelte:head>

<slot />
