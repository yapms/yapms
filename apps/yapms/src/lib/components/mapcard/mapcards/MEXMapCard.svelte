<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: "Chamber of Deputies '24",
			route: '/app/mex/deputies/2024001/blank'
		},
		{
			label: 'Senate 2024',
			route: '/app/mex/senate/2024001/blank'
		}
	];
</script>

<MapCard
	name="Mexico"
	bg="mex"
	attribution="Photo by Thelmadatter on Wikimedia"
	attributionLink="https://commons.wikimedia.org/wiki/File:LegPalaceDF.JPG"
	{links}
/>
