<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Parliament',
					route: '/app/grc/parliament/2023001/blank'
				},
				{
					label: 'Results June 2023',
					modalLabel: 'June 2023 Parliament Results',
					route: '/app/grc/parliament/2023176/results'
				},
				{
					label: 'Regions',
					route: '/app/grc/regions/2011001/blank'
				},
				{
					label: 'Results May 2023',
					modalLabel: 'May 2023 Parliament Results',
					route: '/app/grc/parliament/2023142/results'
				}
			]
		}
	]

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Greece"
	bg="grc"
	{groups}
	{imageLinks}
/>
