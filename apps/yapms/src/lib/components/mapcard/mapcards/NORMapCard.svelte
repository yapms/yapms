<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Storting',
			route: '/app/nor/storting/2021256/blank'
		},
		{
			label: '2021 Results',
			route: '/app/nor/storting/2021256/results'
		},
		{
			label: 'Regions',
			route: '/app/nor/regions/2024001/blank'
		},
		{
			label: 'Storting 2021',
			route: '/app/nor/storting/2021256/blank'
		},
		{
			label: 'Storting 2021 Results',
			route: '/app/nor/storting/2021256/results'
		},
		{
			label: 'Regions 2024',
			route: '/app/nor/regions/2024001/blank'
		},
		{
			label: 'Storting 2017',
			route: '/app/nor/storting/2017254/results'
		},
		{
			label: 'Regions 2020',
			route: '/app/nor/regions/2020001/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Norway"
	bg="nor"
	{groups}
	{imageLinks}
/>
