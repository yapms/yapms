<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Countries (UN)',
			route: '/app/glb/countries/2020078/blank'
		},
		{
			label: 'Countries (NE)',
			route: '/app/glb/countries/2020078/natural_earth'
		},
		{
			label: 'European Parliament',
			route: '/app/glb/eu_parliament/2024158/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="World"
	bg="glb"
	{groups}
	{imageLinks}
/>
