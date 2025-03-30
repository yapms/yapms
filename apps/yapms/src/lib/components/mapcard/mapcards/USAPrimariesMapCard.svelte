<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const links = [
		{
			label: 'Democratic Primary 2024',
			route: '/app/usa/dem_primary/2024/blank'
		},
		{
			label: 'Republican Primary 2024',
			route: '/app/usa/rep_primary/2024/blank'
		}
	];
</script>

<MapCard
	name="United States Primaries"
	bg="usaprimaries"
	attribution="Photo by Whoisjohngalt"
	attributionLink="https://en.wikipedia.org/wiki/United_States_presidential_primary#/media/File:Super_Tuesday_Ballots_in_Massachusetts.jpg"
	{links}
/>
