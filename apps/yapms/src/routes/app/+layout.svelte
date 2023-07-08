<script lang="ts">
	import { page } from '$app/stores';
	import '$lib/styles/global.css';
	import '$lib/styles/roboto-swap.css';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { loadMap } from '$lib/stores/LoadedMap';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const url = get(page).url;

		if (url.searchParams.has('m')) {
			const map = encodeURIComponent(url.searchParams.get('m') ?? '');
			await loadMap('maps', 'm', map);
		} else if (url.searchParams.has('um')) {
			const map = encodeURIComponent(url.searchParams.get('um') ?? '');
			await loadMap('user_maps', 'um', map);
		} else {
			goto('/app/usa/presidential/2024');
		}
	});
</script>

<slot />
