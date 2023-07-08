<script lang="ts">
	import { page } from '$app/stores';
	import '$lib/styles/global.css';
	import '$lib/styles/roboto-swap.css';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { loadPublicMap, loadUserMap } from '$lib/stores/LoadedMap';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const url = get(page).url;

		const publicMapKey = url.searchParams.get('m');
		const userMapKey = url.searchParams.get('um');

		if (publicMapKey !== null) {
			await loadPublicMap(publicMapKey);
		} else if (userMapKey !== null) {
			await loadUserMap(userMapKey);
		} else {
			goto('/app/usa/presidential/2024');
		}
	});
</script>

<slot />
