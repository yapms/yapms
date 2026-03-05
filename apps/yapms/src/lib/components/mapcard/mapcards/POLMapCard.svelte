<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'Sejm',
			showOnCard: true,
			showInModal: true,
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
			showOnCard: true,
			showInModal: true,
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
			showOnCard: true,
			showInModal: true,
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

	const attribution = [
		{
			label: 'Sejm Building by Piotr VaGla Waglowski',
			route: 'https://commons.wikimedia.org/wiki/File:20070131_sejm_widok_od_ul_matejki.jpg'
		},
		{
			label: 'Poznan Old Town by Radek Kucharski',
			route:
				'https://commons.wikimedia.org/wiki/File:Pozna%C5%84_Old_Town_-_Flickr_-_Radek.Kucharski.jpg'
		}
	];
</script>

<MapCard name="Poland" bg="pol" {groups} {attribution} />
