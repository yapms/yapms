<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Commons 2024',
			route: '/app/gbr/commons/2024/blank'
		},
		{
			label: 'Commons 2019',
			route: '/app/gbr/commons/2019/blank'
		},
		{
			label: '2024 Results',
			route: '/app/gbr/commons/2024185/results'
		},
		{
			label: 'House of Commons 2024',
			route: '/app/gbr/commons/2024/blank'
		},
		{
			label: 'House of Commons 2019',
			route: '/app/gbr/commons/2019/blank'
		},
		{
			label: '2024 House of Commons Results',
			route: '/app/gbr/commons/2024185/results'
		},
		{
			label: 'Scottish Parliament 2026',
			route: '/app/gbr/scotland/2025121/blank'
		},
		{
			label: '2021 Scottish Parliament Results',
			route: '/app/gbr/scotland/2021126/results'
		},
		{
			label: 'Welsh Senedd 2026',
			route: '/app/gbr/senedd/2025070/blank'
		},
		{
			label: '2021 Welsh Senedd Results',
			route: '/app/gbr/senedd/2021121/results'
		},
		{
			label: 'Northern Irish Assembly',
			route: '/app/gbr/ni_assembly/2025001/blank'
		},
		{
			label: '2022 Northern Irish Assembly Results',
			route: '/app/gbr/ni_assembly/2022125/results'
		},
		{
			label: '2024 London Assembly Results',
			route: '/app/gbr/ldn_assembly/2024122/results'
		},
		{
			label: 'European Electoral Regions 2018',
			route: '/app/gbr/european_regions/2018001/blank'
		},
		{
			label: 'Historic Counties',
			route: '/app/gbr/counties/1844/blank'
		},
		{
			label: 'Counties and Unitary Authorities',
			route: '/app/gbr/counties/2023/blank'
		},
		{
			label: 'Ceremonial Counties',
			route: '/app/gbr/ceremonial_counties/2025001/blank'
		},
	];
</script>

<MapCard
	name="United Kingdom"
	bg="gbr"
	attribution="Photo by derwiki"
	attributionLink="https://pixabay.com/photos/palace-london-parliament-big-ben-530055/"
	{links}
/>
