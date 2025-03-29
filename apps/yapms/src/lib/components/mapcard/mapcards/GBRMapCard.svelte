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
			label: '2019 House of Commons Results',
			route: '/app/gbr/commons/2019/results'
		},
		{
			label: 'Historic Counties',
			route: '/app/gbr/counties/1844/blank'
		},
		{
			label: 'Counties and Unitary Authorities',
			route: '/app/gbr/counties/2023/blank'
		}
	];
</script>

<MapCard
	name="United Kingdom"
	bg="gbr"
	attribution="Photo by derwiki"
	attributionLink="https://pixabay.com/photos/palace-london-parliament-big-ben-530055/"
	{links}
/>
