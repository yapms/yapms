<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';
	import '$lib/styles/global.css';
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log("Layout Mount");

		const map = $page.url.searchParams.get("map");
		if (map === null) {
			return;
		}

		const response = await fetch(`http://localhost:8080/api/files/maps/${map}/data.json.gz`);
		const mapData = await response.json();
		LoadedMapStore.set(mapData);
		console.log(mapData);
		await goto(`/app/usa/presidential/2022?map=${map}`);
		console.log("NAVIGATED");
	});	

</script>

<slot />
