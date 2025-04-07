<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Municipalities',
			route: '/app/ken/municipalities/20240101/blank'
		}
	];
</script>

<MapCard
	name="Kenya"
	bg="ken"
	attribution="Photo by Zulina Media"
	attributionLink="https://www.pexels.com/photo/low-angle-shot-of-a-clock-tower-under-the-sky-8374093/"
	{links}
/>
