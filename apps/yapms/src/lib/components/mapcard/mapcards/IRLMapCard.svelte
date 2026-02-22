<script lang="ts">
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

	const attribution = [
		{
			label: 'Dublin River by Robzle',
			route: 'https://commons.wikimedia.org/wiki/File:Dublin_River_Liffey3.jpg'
		},
		{
			label: 'Cliffs of Moher by Malte Baumann',
			route: 'https://commons.wikimedia.org/wiki/File:Cliffs_of_Moher_-_Unsplash.jpeg'
		}
	];

</script>

<MapCard
	name="Ireland"
	bg="irl"
	{groups}
	{attribution}
/>
