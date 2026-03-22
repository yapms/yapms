<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/hun/assembly/2026102/blank'
		},
		{
			label: 'Counties',
			route: '/app/hun/counties/2026102/blank'
		}
	];
</script>

<MapCard
	name="Hungary"
	bg="hun"
	attribution="Photo by Pierre Blaché"
	attributionLink="https://commons.wikimedia.org/wiki/File:Hungarian_Parliament_Building_2023-9.jpg"
	{links}
/>
