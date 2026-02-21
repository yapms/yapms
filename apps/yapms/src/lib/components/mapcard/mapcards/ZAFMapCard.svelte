<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/zaf/assembly/2019128/blank'
		},
		{
			label: '2019 Results',
			route: '/app/zaf/assembly/2019128/results'
		},
		{
			label: 'Provinces',
			route: '/app/zaf/provinces'
		},
		{
			label: 'Municipalities',
			route: '/app/zaf/municipalities/2019275/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="South Africa"
	bg="zaf"
	{groups}
	{imageLinks}
/>
