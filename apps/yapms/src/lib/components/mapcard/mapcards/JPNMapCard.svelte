<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'House 2026',
			route: '/app/jpn/house/2026019/blank'
		},
		{
			label: 'House 2024',
			route: '/app/jpn/house/2022330/blank'
		},
		{
			label: 'House 2021',
			route: '/app/jpn/house/2021305/blank'
		}
	];
</script>

<MapCard
	name="Japan"
	bg="jpn"
	attribution="Photo by Kakidai"
	attributionLink="https://en.wikipedia.org/wiki/National_Diet_Building#/media/File:National_Diet_Building_02.jpg"
	{links}
/>
