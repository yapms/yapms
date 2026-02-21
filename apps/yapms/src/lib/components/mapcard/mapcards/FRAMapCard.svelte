<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'National Assembly',
					route: '/app/fra/assembly/2024181/blank'
				},
				{
					label: 'Departments',
					route: '/app/fra/departments/2022/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="France"
	bg="fra"
	{groups}
	{imageLinks}
/>
