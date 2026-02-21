<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: "Chamber of Deputies '24",
			route: '/app/mex/deputies/2024001/blank'
		},
		{
			label: 'Senate 2024',
			route: '/app/mex/senate/2024001/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Mexico"
	bg="mex"
	{groups}
	{imageLinks}
/>
