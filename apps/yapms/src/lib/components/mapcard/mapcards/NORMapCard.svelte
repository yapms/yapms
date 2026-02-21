<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [
		{
			label: 'Storting',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Storting 2021',
					route: '/app/nor/storting/2021256/blank'
				},
				{
					label: 'Storting 2017',
					route: '/app/nor/storting/2017254/results'
				},
				{
					label: '2021 Results',
					modalLabel: '2021 Storting Results',
					route: '/app/nor/storting/2021256/results'
				},
			]
		},
		{
			label: 'Regions',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Regions 2024',
					route: '/app/nor/regions/2024001/blank'
				},
				{
					label: 'Regions 2020',
					route: '/app/nor/regions/2020001/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Norway"
	bg="nor"
	{groups}
	{imageLinks}
/>
