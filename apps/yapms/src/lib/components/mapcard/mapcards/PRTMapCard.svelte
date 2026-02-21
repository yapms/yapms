<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Assembly 2025',
			route: '/app/prt/assembly/2025138/blank'
		},
		{
			label: '2024 Results',
			route: '/app/prt/assembly/2024070/results'
		},
		{
			label: 'Districts',
			route: '/app/prt/districts/2021093/blank'
		},
		{
			label: 'Municipalities',
			route: '/app/prt/municipalities/2018316/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Portugal"
	bg="prt"
	{groups}
	{imageLinks}
/>
