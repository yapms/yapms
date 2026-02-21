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
					route: '/app/zaf/assembly/2019128/blank'
				},
				{
					label: '2019 Results',
					modalLabel: '2019 National Assembly Results',
					route: '/app/zaf/assembly/2019128/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Provinces',
					route: '/app/zaf/provinces'
				},
				{
					label: 'Municipalities',
					route: '/app/zaf/municipalities/2019275/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="South Africa"
	bg="zaf"
	{groups}
	{imageLinks}
/>
