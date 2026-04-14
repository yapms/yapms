<script lang="ts">
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

	const attribution = [
		{
			label: 'Union Buildings by Clayton',
			route:
				'https://www.pexels.com/photo/the-statue-of-nelson-mandela-on-the-union-buildings-grounds-pretoria-gauteng-south-africa-10527763/'
		},
		{
			label: 'Table Mountatin by KodachromeFan',
			route: 'https://commons.wikimedia.org/wiki/File:Cape_Town,_Table_Mountain,_Table_Cloth.jpg'
		}
	];
</script>

<MapCard name="South Africa" bg="zaf" {groups} {attribution} />
