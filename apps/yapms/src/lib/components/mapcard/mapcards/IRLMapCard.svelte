<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'Dáil',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Dáil',
					route: '/app/irl/dail/next/blank'
				},
				
				{
					label: '2020 Results',
					modalLabel: '2020 Dáil Results',
					route: '/app/irl/dail/2020039/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Dáil 2020',
					route: '/app/irl/dail/2020039/blank'
				},
				{
					label: 'Counties',
					route: '/app/irl/counties/2019001/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Ireland"
	bg="irl"
	{groups}
	{imageLinks}
/>
