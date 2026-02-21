<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Parliament',
			route: '/app/grc/parliament/2023001/blank'
		},
		{
			label: 'Results June 2023',
			route: '/app/grc/parliament/2023176/results'
		},
		{
			label: 'Results May 2023',
			route: '/app/grc/parliament/2023142/results'
		},
		{
			label: 'Regions',
			route: '/app/grc/regions/2011001/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Greece"
	bg="grc"
	{groups}
	{imageLinks}
/>
