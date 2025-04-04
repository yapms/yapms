<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'Dáil',
					route: '/app/irl/dail/next/blank'
				},
				{
					label: 'Dáil 2020',
					route: '/app/irl/dail/2020039/blank'
				},
				{
					label: '2020 Results',
					modalLabel: '2020 Dáil Results',
					route: '/app/irl/dail/2020039/results'
				},
				{
					label: 'Counties',
					route: '/app/irl/counties/2019001/blank'
				}
			]
		}
	];
</script>

<MapCard
	name="Ireland"
	bg="irl"
	attribution="Photo by Mark Dalton"
	attributionLink="https://www.pexels.com/photo/white-concrete-building-beside-the-body-of-water-962987/"
	{groups}
/>
