<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/svn/assembly/2022114/blank'
		},
		{
			label: 'Results 2022',
			route: '/app/svn/assembly/2022114/results'
		},
		{
			label: 'Administrative Units',
			route: '/app/svn/administrative_units/2024001/blank'
		},
		{
			label: 'Municipalities',
			route: '/app/svn/municipalities/2024001/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Slovenia"
	bg="svn"
	{groups}
	{imageLinks}
/>
