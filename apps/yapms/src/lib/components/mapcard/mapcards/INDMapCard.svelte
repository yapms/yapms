<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Lok Sabha',
					route: '/app/ind/lok_sabha/2024109/blank'
				},
				{
					label: 'States',
					route: '/app/ind/states/2024001/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="India"
	bg="ind"
	{groups}
	{imageLinks}
/>
