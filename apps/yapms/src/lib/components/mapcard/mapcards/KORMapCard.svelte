<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: "National Assembly '20",
			route: '/app/kor/assembly/2020001/blank'
		},
		{
			label: "National Assembly '24",
			route: '/app/kor/assembly/2024101/blank'
		},
		{
			label: 'Municipalities',
			route: '/app/kor/municipalities/2018001/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="South Korea"
	bg="kor"
	{groups}
	{imageLinks}
/>
