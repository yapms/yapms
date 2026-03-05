<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					route: '/app/aus/act/2024292/blank',
					label: 'ACT',
					modalLabel: 'Australian Capital Territory 2024'
				},
				{
					route: '/app/aus/nsw/2023084/blank',
					label: 'New South Wales',
					modalLabel: 'New South Wales 2023'
				},
				{
					route: '/app/aus/nt/2024326/blank',
					label: 'NT',
					modalLabel: 'Northern Territory 2024'
				},
				{
					route: '/app/aus/qld/2024299/blank',
					label: 'Queensland',
					modalLabel: 'Queensland 2024'
				},
				{
					route: '/app/aus/sa/2026080/blank_v2',
					label: 'South Australia',
					modalLabel: 'South Australia 2026'
				},
				{
					route: '/app/aus/tas_lower/2024082/blank',
					label: 'Tasmania House',
					modalLabel: 'Tasmania House of Assembly 2024'
				},
				{
					route: '/app/aus/tas_upper/2025145/blank',
					label: 'Tasmania Council',
					modalLabel: 'Tasmania Legislative Council 2025'
				},
				{
					route: '/app/aus/vic_lower/2022330/blank',
					label: 'Victoria Assembly',
					modalLabel: 'Victoria Legislative Assembly 2022'
				},
				{
					route: '/app/aus/vic_upper/2022330/blank',
					label: 'Victoria Council',
					modalLabel: 'Victoria Legislative Council 2022'
				},
				{
					route: '/app/aus/wa/2025067/blank',
					label: 'Western Australia',
					modalLabel: 'Western Australia 2025'
				},
				{
					route: '/app/aus/sa/2022078/blank',
					label: 'South Australia 2022'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Brisbane Parliament House by Figaro',
			route: 'https://commons.wikimedia.org/wiki/File:Parliament-House-Brisbane-2.jpg'
		},
		{
			label: 'Melbourne Parliament House by Elekhh',
			route: 'https://commons.wikimedia.org/wiki/File:Parliament_House_Melbourne_2010.jpg'
		},
		{
			label: 'Adelaide Parliament House by Rexness',
			route:
				'https://commons.wikimedia.org/wiki/File:Parliament_House,_Adelaide_on_October_22,_2010.jpg'
		},
		{
			label: 'Perth Parliament House by -wuppertaler',
			route:
				'https://commons.wikimedia.org/wiki/File:AUS_Perth,_Central_Business_District,_Parliament_House_011.jpg'
		}
	];
</script>

<MapCard name="Australian States" bg="aus_states" {groups} {attribution} full />
