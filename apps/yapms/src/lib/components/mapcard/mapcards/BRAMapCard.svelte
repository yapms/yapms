<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'Chamber of Deputies 2022',
					route: '/app/bra/deputies/2022/blank'
				},
				{
					label: 'Federative Units',
					route: '/app/bra/regions/2023/blank'
				}
			]
		},
		{
			label: 'Senate',
			routes: [
				{
					label: 'Senate 2022',
					route: '/app/bra/senate/2022/blank'
				},
				{
					label: 'Senate',
					route: '/app/bra/senate'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Brazil"
	bg="bra"
	{groups}
	{imageLinks}
/>
