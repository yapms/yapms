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
					label: 'National Assembly',
					route: '/app/svn/assembly/2022114/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 National Assembly Results',
					route: '/app/svn/assembly/2022114/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Administrative Units',
					route: '/app/svn/administrative_units/2024001/blank'
				},
				{
					label: 'Municipalities',
					route: '/app/svn/municipalities/2024001/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Slovenia"
	bg="svn"
	{groups}
	{imageLinks}
/>
