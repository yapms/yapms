<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'Chamber of Deputies',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Chamber of Deputies',
					route: '/app/ita/deputies/2022/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Chamber of Deputies Results',
					route: '/app/ita/deputies/2022/results'
				}
			]
		},
		{
			label: 'Senate',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Senate 2022',
					route: '/app/ita/senate/2022/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Senate Results',
					route: '/app/ita/senate/2022/results'
				}
			]
		},
		{
			label: 'Regions',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Regions',
					route: '/app/ita/regions/2023/blank'
				},
				{
					label: 'Provinces',
					route: '/app/ita/provinces/2023/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Italy"
	bg="ita"
	{groups}
	{imageLinks}/>
