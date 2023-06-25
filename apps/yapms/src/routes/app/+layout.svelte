<script lang="ts">
	import '$lib/styles/global.css';
	import '$lib/styles/roboto-swap.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { LoadedMapStore } from '$lib/stores/LoadedMap';
	import { SavedMapSchema } from '$lib/types/SavedMap';
	import { onMount } from 'svelte';
	import { LoadingErrorModalStore } from '$lib/stores/Modals';
	import { PUBLIC_POCKETBASE_URI } from '$env/static/public';

	async function loadMap(collection: 'maps' | 'user_maps', key: string, value: string) {
		const data = await fetch(
			`${PUBLIC_POCKETBASE_URI}/api/files/${collection}/${value}/data.json.gz`
		);
		const jsonData = await data.json();
		const savedFile = SavedMapSchema.safeParse(jsonData);

		if (!savedFile.success) {
			LoadingErrorModalStore.set({
				open: true
			});
			await goto('/app/usa/presidential/2022');
			return;
		}

		LoadedMapStore.set(savedFile.data);

		const country = encodeURIComponent(savedFile.data.map.country);
		const type = encodeURIComponent(savedFile.data.map.type);
		const year = encodeURIComponent(savedFile.data.map.year);

		await goto(`/app/${country}/${type}/${year}?${key}=${value}`);
	}

	onMount(async () => {
		const url = get(page).url;

		if (url.searchParams.has('m')) {
			const map = encodeURIComponent(url.searchParams.get('m') ?? '');
			await loadMap('maps', 'm', map);
		} else if (url.searchParams.has('um')) {
			const map = encodeURIComponent(url.searchParams.get('um') ?? '');
			await loadMap('user_maps', 'um', map);
		} else {
			await goto('/app/usa/presidential/2022');
		}
	});
</script>

<slot />
