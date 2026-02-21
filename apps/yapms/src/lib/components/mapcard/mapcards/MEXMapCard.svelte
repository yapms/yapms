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
					label: "Chamber of Deputies '24",
					route: '/app/mex/deputies/2024001/blank'
				},
				{
					label: 'Senate 2024',
					route: '/app/mex/senate/2024001/blank'
				}
			]
		}
	]

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Mexico"
	bg="mex"
	{groups}
	{imageLinks}
/>
