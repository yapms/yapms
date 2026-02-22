<script lang="ts">
	import MapCard from '../MapCard.svelte';
	
	const groups = [
		{
			label: 'House',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House 2026',
					route: '/app/nzl/house/2025220/blank'
				},
				{
					label: 'Māori Electorates',
					modalLabel: 'Māori Electorates 2026',
					route: '/app/nzl/maori/2025220/blank'
				}
			]
		},
		{
			label: 'House Results',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: '2023 Results',
					modalLabel: '2023 House Results',
					route: '/app/nzl/house/2023303/results'
				},
				{
					label: '2020 Results',
					modalLabel: '2020 House Results',
					route: '/app/nzl/house/2020/results'
				}
			]
		},
		{
			label: '',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Regional Councils',
					route: '/app/nzl/regions/2023/blank'
				},
				{
					label: 'House 2023',
					route: '/app/nzl/house/2023/blank'
				},
				{
					label: 'Māori Electorates 2023',
					route: '/app/nzl/maori/2023/blank'
				},
			]
		}
	];

	const attribution = [
		{
			label: 'Beehive Building by 飞谢',
			route: 'https://www.pexels.com/photo/the-beehive-building-in-wellington-new-zealand-10116189/'
		},
		{
			label: 'Auckland by Psuedopanax',
			route: 'https://commons.wikimedia.org/wiki/File:Auckland_CBD_skyline_from_Waitemata_Harbour_entrance.jpg'
		}
	];

</script>

<MapCard
	name="New Zealand"
	bg="nzl"
	{groups}
	{attribution}
/>
