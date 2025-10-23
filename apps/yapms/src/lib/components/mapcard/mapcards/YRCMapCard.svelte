<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const links = [
		{
			label: 'Fair Map',
			route: '/app/yrc/fair/2025294/blank'
		},
		{
			label: 'Fair Map (2024 Pres)',
			route: '/app/yrc/fair/2025294/2024_pres'
		}
	];
</script>

<MapCard
	name="YAPms Redistricting Council"
	bg="usa"
	attribution="Photo by Andy Feliciotti"
	attributionLink="https://unsplash.com/photos/brown-concrete-building-near-green-trees-during-daytime-6kA9FjqUxhM"
	{links}
/>
