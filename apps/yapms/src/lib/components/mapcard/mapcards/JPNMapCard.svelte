<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'House of Representatives',
			route: '/app/jpn/house_of_representatives/20240101/blank'
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
