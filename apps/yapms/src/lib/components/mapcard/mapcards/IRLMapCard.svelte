<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Dáil',
			route: '/app/irl/dail/next/blank'
		},
		{
			label: 'Results 2020',
			route: '/app/irl/dail/2020039/results'
		},
		{
			label: 'Counties',
			route: '/app/irl/counties/2019001/blank'
		},
		{
			label: 'Dáil 2020',
			route: '/app/irl/dail/2020039/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Ireland"
	bg="irl"
	{groups}
	{imageLinks}
/>
