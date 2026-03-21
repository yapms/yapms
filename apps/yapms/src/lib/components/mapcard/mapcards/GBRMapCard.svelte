<script lang="ts" context="module">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'House of Commons',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House of Commons',
					route: '/app/gbr/commons/next/blank'
				},
				{
					label: '2024 Results',
					modalLabel: '2024 House of Commons Results',
					route: '/app/gbr/commons/2024185/results'
				}
			]
		},
		{
			label: 'Counties',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: '2026 Counties',
					modalLabel: '2026 Counties and Unitary Authorities',
					route: '/app/gbr/counties/2026026/blank'
				},
				{
					label: '2023 Counties',
					modalLabel: '2023 Counties and Unitary Authorities',
					route: '/app/gbr/counties/2023/blank'
				}
			]
		},
		{
			label: 'Devolved Legislatures',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Scottish Parliament',
					modalLabel: 'Scottish Parliament 2026',
					route: '/app/gbr/scotland/2025121/blank'
				},
				{
					label: 'Welsh Senedd',
					modalLabel: 'Welsh Senedd 2026',
					route: '/app/gbr/senedd/2025070/blank'
				},
				{
					label: 'Northern Irish Assembly',
					route: '/app/gbr/ni_assembly/2025001/blank'
				},
				{
					label: 'London Assembly',
					modalLabel: '2024 London Assembly Results',
					route: '/app/gbr/ldn_assembly/2024122/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Historic Counties',
					route: '/app/gbr/counties/1844/blank'
				},
				{
					label: 'Ceremonial Counties',
					route: '/app/gbr/ceremonial_counties/2025001/blank'
				},
				{
					label: '2021 Scottish Parliament Results',
					route: '/app/gbr/scotland/2021126/results'
				},
				{
					label: '2021 Welsh Senedd Results',
					route: '/app/gbr/senedd/2021121/results'
				},
				{
					label: '2022 Northern Irish Assembly Results',
					route: '/app/gbr/ni_assembly/2022125/results'
				},
				{
					label: 'European Electoral Regions 2018',
					route: '/app/gbr/european_regions/2018001/blank'
				},
				{
					label: 'House of Commons 2024',
					route: '/app/gbr/commons/2024/blank'
				},
				{
					label: 'House of Commons 2019',
					route: '/app/gbr/commons/2019/blank'
				}
			]
		}
	];

	export const GBRAttribution = [
		{
			label: 'Palace of Westminster by derwiki',
			route: 'https://pixabay.com/photos/palace-london-parliament-big-ben-530055/'
		},
		{
			label: 'Tower Bridge by Kaique Rocha',
			route: 'https://www.pexels.com/photo/view-of-people-near-bayside-1563230/'
		},
		{
			label: 'Stonehenge by Bernd Feurich',
			route:
				'https://www.pexels.com/photo/photo-of-the-stonehenge-historical-landmark-in-england-2497520/'
		},
		{
			label: 'Edinburgh Castle by Frederick Adegoke Snr.',
			route: 'https://www.pexels.com/photo/edinburgh-castle-on-the-mountain-14643999/'
		}
	];
</script>

<MapCard name="United Kingdom" bg="gbr" {groups} attribution={GBRAttribution} square />
