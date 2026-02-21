<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'House of Commons', routes: [
				{
					label: 'House of Commons',
					route: '/app/can/commons/next/blank'
				},
				{
					label: '2025 Results',
					modalLabel: '2025 Commons Results',
					route: '/app/can/commons/2025118/results'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Provinces',
					route: '/app/can/provinces'
				},
				{
					label: 'Senate',
					route: '/app/can/senate'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Canada"
	bg="can"
	{groups}
	{imageLinks}
/>
