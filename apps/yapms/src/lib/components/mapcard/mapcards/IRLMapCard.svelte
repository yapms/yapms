<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Dáil',
			route: '/app/irl/dail/next/blank'
		},
		{
			label: 'Results 2020',
			route: '/app/irl/dail/2020039/results'
		},
		{
			label: 'Counties',
			route: '/app/irl/counties/2019001/blank'
		},
		{
			label: 'Dáil 2020',
			route: '/app/irl/dail/2020039/blank'
		}
	];
</script>

<MapCard
	name="Ireland"
	bg="irl"
	attribution="Photo by Mark Dalton"
	attributionLink="https://www.pexels.com/photo/white-concrete-building-beside-the-body-of-water-962987/"
	{links}
/>
