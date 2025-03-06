<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Voivodeships',
			route: '/app/pol/regions/2025045/blank'
		},
		{
			label: 'Powiats',
			route: '/app/pol/powiats/2025045/blank'
		},
		{
			label: 'Sejm',
			route: '/app/pol/sejm/2023288/blank'
		},
		{
			label: 'Voivodeships',
			route: '/app/pol/regions/2025045/blank'
		},
		{
			label: 'Powiats',
			route: '/app/pol/powiats/2025045/blank'
		},
		{
			label: 'Sejm',
			route: '/app/pol/sejm/2023288/blank'
		},
		{
			label: 'Sejm 2023 Results',
			route: '/app/pol/sejm/2023288/results'
		},
		{
			label: 'Senate',
			route: '/app/pol/senate/2023288/blank'
		},
		{
			label: 'Senate 2023 Results',
			route: '/app/pol/senate/2023288/results'
		}
	];
</script>

<MapCard
	name="Poland"
	bg="pol"
	attribution="Photo by Piotr VaGla Waglowski"
	{links}
	attributionLink="https://commons.wikimedia.org/wiki/File:20070131_sejm_widok_od_ul_matejki.jpg"
/>
