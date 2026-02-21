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

	const imageLinks = [
		{
			label: 'National Congress by João Pavese',
			route: 'https://www.pexels.com/photo/national-congress-of-brazil-under-blue-skies-30179016/'
		},
		{
			label: 'Christ the Redeemer by Joao Ricardo Januzzi',
			route: 'https://www.pexels.com/photo/statue-of-jesus-with-the-moon-in-the-background-9229056/'
		}
	];

</script>

<MapCard
	name="Brazil"
	bg="bra"
	{groups}
	{imageLinks}
/>
