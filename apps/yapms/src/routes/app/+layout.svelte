<script>
	import '$lib/styles/global.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';
	import { SavedMapSchema } from '$lib/types/SavedMap';
	import { onMount } from 'svelte';
	import { MalformedSavedMapModalStore } from '$lib/stores/Modals';

	// this layout will will redirect the user to the proper map
	// if they specify the m query parameter
	onMount(async () => {
		const map = encodeURIComponent($page.url.searchParams.get("m") ?? "");
		// if the user is not loading a map, redirect them to the default map
		if (map === "") {
			await goto(`/app/usa/presidential/2022`);
			return;
		}

		// load the requested map from pocketbase
		const data = await fetch(`http://localhost:8080/api/files/maps/${map}/data.json.gz`);
		const savedFile = SavedMapSchema.safeParse(
			await data.json()
		);

		// if the saved map was malformed, redirect the user to the default map
		if (!savedFile.success) {
			MalformedSavedMapModalStore.set({
				open: true,
			});
			await goto(`/app/usa/presidential/2022`);
			return;
		}

		// set the loaded map store
		LoadedMapStore.set(savedFile.data);

		// redirect the user to the map
		const country = encodeURIComponent(savedFile.data.map.country);
		const type = encodeURIComponent(savedFile.data.map.type);
		const year = encodeURIComponent(savedFile.data.map.year);
		await goto(`/app/${country}/${type}/${year}?m=${map}`);
	});	

</script>

<slot />
