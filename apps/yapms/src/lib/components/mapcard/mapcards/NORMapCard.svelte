<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'Storting',
			routes: [
				{
				label: 'Storting 2021',
				route: '/app/nor/storting/2021256/blank'
				},
				{
					label: 'Storting 2017',
					route: '/app/nor/storting/2017254/results'
				}
			]
			
		},
		{
			label: 'Regions',
			routes: [
				{
					label: 'Regions 2024',
					route: '/app/nor/regions/2024001/blank'
				},
				
				{
					label: 'Regions 2020',
					route: '/app/nor/regions/2020001/blank'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: '2021 Storting Results',
					route: '/app/nor/storting/2021256/results'
				}
			]
		}		
	];
</script>

<MapCard
	name="Norway"
	bg="nor"
	attribution="Photo by gcardinal"
	attributionLink="https://commons.wikimedia.org/wiki/File:Stortinget,_Oslo,_Norway.jpg"
	{groups}
/>
