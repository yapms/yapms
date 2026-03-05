<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'House',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House 2023',
					route: '/app/nld/house/2023/blank'
				}
			]
		},
		{
			label: 'Regions',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Provinces',
					route: '/app/nld/provinces'
				},
				{
					label: 'Gemeente 2023',
					route: '/app/nld/gemeente/2023/blank'
				}
			]
		},
		{
			label: 'Provincial Councils',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Provincial Councils 2023',
					route: '/app/nld/provincial/2023/blank'
				},
				{
					label: '2023 Results',
					modalLabel: '2023 Provincial Councils Results',
					route: '/app/nld/provincial/2023/results'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Binnenhof by Nikodi',
			route: 'https://pixabay.com/photos/the-hague-holland-courtyard-993466/'
		},
		{
			label: 'Amsterdam Centraal by Ibex73',
			route: 'https://commons.wikimedia.org/wiki/File:Amsterdam_Centraal_2024_02.jpg'
		},
		{
			label: 'Dike at Oost-Vlieland by Paul Arps',
			route:
				'https://upload.wikimedia.org/wikipedia/commons/5/5e/Dike_at_Oost-Vlieland_%28Netherlands_2015%29_%2820071244968%29.jpg'
		},
		{
			label: 'Windmill at Kinderdijk by Alf van Beem',
			route: 'https://commons.wikimedia.org/wiki/File:Dutch_windmill_at_Kinderdijk_pic27.JPG'
		}
	];
</script>

<MapCard name="The Netherlands" bg="nld" {groups} {attribution} full />
