<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'States',
					route: '/app/usa_can/states/2024001/blank'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="United States & Canada"
	bg="usacan"
	{groups}
	{imageLinks}
/>
