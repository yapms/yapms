<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'Sejm',
			routes: [
				{
					label: 'Sejm',
					route: '/app/pol/sejm/2023288/blank'
				},
				{
					label: '2023 Results',
					modalLabel: '2023 Sejm Results',
					route: '/app/pol/sejm/2023288/results'
				}
			]
		},
		{
			label: 'Senate',
			routes: [
				{
					label: 'Senate',
					route: '/app/pol/senate/2023288/blank'
				},
				{
					label: '2023 Results',
					modalLabel: '2023 Senate Results',
					route: '/app/pol/senate/2023288/results'
				}
			]
		},
		{
			label: 'Regions',
			routes: [
				{
					label: 'Voivodeships',
					route: '/app/pol/regions/2025045/blank'
				},
				{
					label: 'Powiats',
					route: '/app/pol/powiats/2025045/blank'
				}
			]
		}
	];
</script>

<MapCard
	name="Poland"
	bg="pol"
	attribution="Photo by Piotr VaGla Waglowski"
	attributionLink="https://commons.wikimedia.org/wiki/File:20070131_sejm_widok_od_ul_matejki.jpg"
	{groups}
/>
