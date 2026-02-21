<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	
	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House 2026',
					route: '/app/jpn/house/2026019/blank'
				},
				{
					label: 'House 2024',
					route: '/app/jpn/house/2022330/blank'
				},
				{
					label: 'House 2021',
					route: '/app/jpn/house/2021305/blank'
				}
			]
		}
	]

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Japan"
	bg="jpn"
	{groups}
	{imageLinks}
/>
