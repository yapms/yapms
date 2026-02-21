<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Provinces',
			route: '/app/nld/provinces'
		},
		{
			label: 'House',
			route: '/app/nld/house/2023/blank'
		},
		{
			label: 'Provincial Councils',
			route: '/app/nld/provincial/2023/blank'
		},
		{
			label: 'Provinces',
			route: '/app/nld/provinces'
		},
		{
			label: 'House 2023',
			route: '/app/nld/house/2023/blank'
		},
		{
			label: 'Provincial Councils 2023',
			route: '/app/nld/provincial/2023/blank'
		},
		{
			label: '2023 Provincial Councils Results',
			route: '/app/nld/provincial/2023/results'
		},
		{
			label: 'Gemeente 2023',
			route: '/app/nld/gemeente/2023/blank'
		}
	];
</script>

<MapCard
	name="The Netherlands"
	bg="nld"
	attribution="Photo by Nikodi"
	attributionLink="https://pixabay.com/photos/the-hague-holland-courtyard-993466/"
	{links}
/>
