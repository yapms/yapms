<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Lok Sabha',
					route: '/app/ind/lok_sabha/2024109/blank'
				},
				{
					label: 'States',
					route: '/app/ind/states/2024001/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'New Parliament Building by the Ministry of Parliamentary Affairs',
			route: 'https://commons.wikimedia.org/wiki/File:Glimpse_of_the_new_Parliament_Building,_in_New_Delhi.jpg'
		},
		{
			label: 'Taj Mahal by Almbauer',
			route: 'https://commons.wikimedia.org/wiki/File:Taj_Mahal_2018.jpg'
		}
	]

</script>

<MapCard
	name="India"
	bg="ind"
	{groups}
	{attribution}
/>
