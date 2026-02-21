<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
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
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Japan"
	bg="jpn"
	{groups}
	{imageLinks}
/>
