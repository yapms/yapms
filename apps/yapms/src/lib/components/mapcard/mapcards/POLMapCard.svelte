<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Voivodeships',
			route: '/app/pol/regions/2025045/blank'
		},
		{
			label: 'Powiats',
			route: '/app/pol/powiats/2025045/blank'
		},
		{
			label: 'Sejm',
			route: '/app/pol/sejm/2023288/blank'
		},
		{
			label: 'Voivodeships',
			route: '/app/pol/regions/2025045/blank'
		},
		{
			label: 'Powiats',
			route: '/app/pol/powiats/2025045/blank'
		},
		{
			label: 'Sejm',
			route: '/app/pol/sejm/2023288/blank'
		},
		{
			label: 'Sejm 2023 Results',
			route: '/app/pol/sejm/2023288/results'
		},
		{
			label: 'Senate',
			route: '/app/pol/senate/2023288/blank'
		},
		{
			label: 'Senate 2023 Results',
			route: '/app/pol/senate/2023288/results'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Poland"
	bg="pol"
	{groups}
	{imageLinks}
/>
