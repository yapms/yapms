<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';

	const links = [
		{
			label: 'Democratic Primary 2024',
			route: '/app/usa/dem_primary/2024/blank'
		},
		{
			label: 'Republican Primary 2024',
			route: '/app/usa/rep_primary/2024/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="United States Primaries"
	bg="usaprimaries"
	{groups}
	{imageLinks}
/>
