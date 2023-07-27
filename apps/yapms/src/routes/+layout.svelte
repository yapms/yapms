<script>
	import '$lib/styles/global.css';
	import { PUBLIC_UMAMI_URI, PUBLIC_UMAMI_DATA_WEBSITE_ID } from '$env/static/public';
	import { browser } from '$app/environment';
	import { themeChange } from 'theme-change';

	if (browser) {
		themeChange(false);
	}
</script>

<svelte:head>
	<script async src={PUBLIC_UMAMI_URI} data-website-id={PUBLIC_UMAMI_DATA_WEBSITE_ID}></script>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
		defer
	></script>
</svelte:head>

<slot />
