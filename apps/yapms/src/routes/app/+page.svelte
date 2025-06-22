<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
	import { getMap, getUserMap, gotoLoadedMap, setLoadedMapFromJson } from '$lib/stores/LoadedMap';

	const mapID = page.url.searchParams.get('m');
	const imageURI =
		mapID !== null ? `${PUBLIC_POCKETBASE_URI}/api/files/maps/${mapID}/screenshot.png` : '';

	if (browser) {
		const userMapID = page.url.searchParams.get('um');

		if (mapID) {
			getMap(mapID)
				.then(setLoadedMapFromJson)
				.then(() => gotoLoadedMap());
		} else if (userMapID) {
			getUserMap(userMapID)
				.then(setLoadedMapFromJson)
				.then(() => gotoLoadedMap());
		}
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
	<meta name="robots" content="noindex" />
</svelte:head>
