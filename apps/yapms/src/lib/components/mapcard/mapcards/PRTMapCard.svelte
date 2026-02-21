<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'Assembly',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Assembly 2025',
					route: '/app/prt/assembly/2025138/blank'
				},
				{
					label: '2024 Results',
					route: '/app/prt/assembly/2024070/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Districts',
					route: '/app/prt/districts/2021093/blank'
				},
				{
					label: 'Municipalities',
					route: '/app/prt/municipalities/2018316/blank'
				},
				{
					label: 'Assembly 2024',
					route: '/app/prt/assembly/2024070/blank'
				}
			]
		}
	];
	
	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Portugal"
	bg="prt"
	{groups}
	{imageLinks}
/>
