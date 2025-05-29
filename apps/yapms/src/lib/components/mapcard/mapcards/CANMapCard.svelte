<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Provinces',
			route: '/app/can/provinces'
		},
		{
			label: 'House of Commons',
			route: '/app/can/commons/next/blank'
		},
		{
			label: '2025 Results',
			route: '/app/can/commons/2025118/results'
		},
		{
			label: 'Senate',
			route: '/app/can/senate'
		}
	];
</script>

<MapCard
	name="Canada"
	bg="can"
	attribution="Photo by Tetyana Kovyrina"
	attributionLink="https://www.pexels.com/photo/parliament-hill-in-ottawa-canada-15715832/"
	{links}
/>
