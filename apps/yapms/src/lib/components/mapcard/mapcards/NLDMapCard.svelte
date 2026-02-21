<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'House',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House 2023',
					route: '/app/nld/house/2023/blank'
				}
			]
		},
		{
			label: 'Regions',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Provinces',
					route: '/app/nld/provinces'
				},
				{
					label: 'Gemeente 2023',
					route: '/app/nld/gemeente/2023/blank'
				}
			]
		},
		{
			label: 'Provincial Councils',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Provincial Councils 2023',
					route: '/app/nld/provincial/2023/blank'
				},
				{
					label: '2023 Results',
					modalLabel: '2023 Provincial Councils Results',
					route: '/app/nld/provincial/2023/results'
				}
			]
		}
	]

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="The Netherlands"
	bg="nld"
	{groups}
	{imageLinks}
	full
/>
