<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'Fair Map',
					route: '/app/yrc/fair/2025294/blank'
				},
				{
					label: 'Fair Map (2024 Pres)',
					route: '/app/yrc/fair/2025294/2024_pres'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="YAPms Redistricting Council"
	bg="usa"
	{groups}
	{imageLinks}
/>
