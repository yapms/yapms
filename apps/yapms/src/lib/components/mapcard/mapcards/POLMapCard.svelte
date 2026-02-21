<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	
	const groups = [
		{
			label: 'Sejm',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Sejm',
					route: '/app/pol/sejm/2023288/blank'
				},
				{
					label: '2023 Results',
					modalLabel: '2023 Sejm Results',
					route: '/app/pol/sejm/2023288/results'
				}
			]
		},
		{
			label: 'Senate',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Senate',
					route: '/app/pol/senate/2023288/blank'
				},
				{
					label: '2023 Results',
					modalLabel: '2023 Senate Results',
					route: '/app/pol/senate/2023288/results'
				}
			]
		},
		{
			label: 'Regions',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Voivodeships',
					route: '/app/pol/regions/2025045/blank'
				},
				{
					label: 'Powiats',
					route: '/app/pol/powiats/2025045/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Poland"
	bg="pol"
	{groups}
	{imageLinks}
/>
