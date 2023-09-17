<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
	import { loadMapFromURL } from '$lib/stores/LoadedMap';

	const m = $page.url.searchParams.get('m');
	const imageURI = m !== null ? `${PUBLIC_POCKETBASE_URI}/api/files/maps/${m}/screenshot.png` : '';

	if (browser) {
		loadMapFromURL($page.url);
	}
</script>

<svelte:head>
	<title>YAPms - Yet Another Political Map Simulator</title>
	<meta property="og:site_name" content="YAPms" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="User Generated Map" />
	<meta property="og:description" content="Yet Another Political Map Simulator" />
	<meta property="og:image" content={imageURI} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
