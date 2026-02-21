<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'National Assembly',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: "National Assembly '20",
					route: '/app/kor/assembly/2020001/blank'
				},
				{
					label: "National Assembly '24",
					route: '/app/kor/assembly/2024101/blank'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Municipalities',
					route: '/app/kor/municipalities/2018001/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="South Korea"
	bg="kor"
	{groups}
	{imageLinks}
/>
