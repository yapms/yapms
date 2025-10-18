<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [{ label: 'States', route: '/app/aut/states/2025291/blank' }];
</script>

<MapCard
	name="Austria"
	bg="aut"
	attribution="Photo by Jean Fonseca"
	attributionLink="https://commons.wikimedia.org/wiki/File:WienParlament.jpg"
	{links}
/>
