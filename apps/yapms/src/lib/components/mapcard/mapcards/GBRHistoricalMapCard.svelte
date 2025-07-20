<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: '2024',
			route: '/app/gbr/commons/2024185/results'
		},
		{
			label: '2019',
			route: '/app/gbr/commons/2019/results'
		},
		{
			label: '2017',
			route: '/app/gbr/commons/2017159/results'
		},
		{
			label: 'House of Commons 2024',
			route: '/app/gbr/commons/2024185/results'
		},
		{
			label: 'House of Commons 2019',
			route: '/app/gbr/commons/2019/results'
		},
		{
			label: 'House of Commons 2017',
			route: '/app/gbr/commons/2017159/results'
		},
		{
			label: 'House of Commons 2015',
			route: '/app/gbr/commons/2015127/results'
		},
		{
			label: 'House of Commons 2010',
			route: '/app/gbr/commons/2010126/results'
		},
		{
			label: 'House of Commons 2005',
			route: '/app/gbr/commons/2005125/results'
		},
		{
			label: 'House of Commons 2001',
			route: '/app/gbr/commons/2001158/results'
		},
		{
			label: 'House of Commons 1997',
			route: '/app/gbr/commons/1997121/results'
		}
	];
</script>

<MapCard
	name="UK Commons Results"
	bg="gbr"
	attribution="Photo by derwiki"
	attributionLink="https://pixabay.com/photos/palace-london-parliament-big-ben-530055/"
	{links}
/>
