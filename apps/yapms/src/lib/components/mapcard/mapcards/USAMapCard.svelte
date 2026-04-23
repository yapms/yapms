<script lang="ts" context="module">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'Presidential',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Presidential 2028',
					route: '/app/usa/presidential/2028/blank'
				},
				{
					label: '2024 Results',
					modalLabel: '2024 Presidential Results',
					route: '/app/usa/presidential/2024310/results'
				}
			]
		},
		{
			label: 'Senate',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Senate 2026',
					route: '/app/usa/senate/2026/blank'
				},
				{
					label: '2024 Results',
					modalLabel: '2024 Senate Results',
					route: '/app/usa/senate/2024310/results'
				}
			]
		},
		{
			label: 'House',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House 2026',
					route: '/app/usa/house/2026/blank'
				},
				{
					label: 'MO Not Redistricted',
					modalLabel: 'House 2026 (MO Not Redistricted)',
					route: '/app/usa/house/2026112/no_mo_hb1'
				},
				{
					label: 'VA Not Redistricted',
					modalLabel: 'House 2026 (VA Not Redistricted)',
					route: '/app/usa/house/2026112/no_va_hj4'
				},
				{
					label: 'MO & VA Not Redistricted',
					modalLabel: 'House 2026 (MO Not Redistricted, VA Not Redistricted)',
					route: '/app/usa/house/2026112/no_mo_hb1_va_hj4'
				}
			]
		},
		{
			label: 'Governors',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Governors 2026',
					route: '/app/usa/governors/2026/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Gubernatorial Results',
					route: '/app/usa/governors/2022/results'
				}
			]
		},
		{
			label: 'States/Counties',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'States & Territories',
					route: '/app/usa/states_and_territories/2023001/blank'
				},
				{
					label: 'Counties 2023',
					route: '/app/usa/counties/2023/blank'
				}
			]
		},
		{
			label: 'Primaries',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Democratic Primary 2024',
					route: '/app/usa/dem_primary/2024/blank'
				},
				{
					label: 'Republican Primary 2024',
					route: '/app/usa/rep_primary/2024/blank'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Presidential 2028 Take-All',
					route: '/app/usa/presidential/2028/takeall'
				},
				{
					label: 'Presidential 2028 with Territories',
					route: '/app/usa/presidential/2028/territories'
				},
				{
					label: 'Presidential 2028 Take-All with Territories',
					route: '/app/usa/presidential/2028/takeall_territories'
				},
				{
					label: 'Senate',
					route: '/app/usa/senate'
				},
				{
					label: 'Senate Class 1',
					route: '/app/usa/senate_class1'
				},
				{
					label: 'Senate Class 2',
					route: '/app/usa/senate_class2'
				},
				{
					label: 'Senate Class 3',
					route: '/app/usa/senate_class3'
				},
				{
					label: '2022 Senate Results',
					route: '/app/usa/senate/2022/results'
				},
				{
					label: '2024 House Results',
					route: '/app/usa/house/2024310/results'
				},
				{
					label: '2022 House Results',
					route: '/app/usa/house/2022/results'
				},
				{
					label: 'Governors',
					route: '/app/usa/governors'
				},
				{
					label: 'Governors 2025',
					route: '/app/usa/governors/2025/blank'
				},
				{
					label: 'Governors 2024',
					route: '/app/usa/governors/2024/blank'
				},
				{
					label: 'Governors 2023',
					route: '/app/usa/governors/2023/blank'
				},
				{
					label: '2024 Gubernatorial Results',
					route: '/app/usa/governors/2024310/results'
				},
				{
					label: 'Counties 2020',
					route: '/app/usa/counties/2020/blank'
				},
				{
					label: 'New York City Council 2025',
					route: '/app/usa/nyc_council/2025309/blank'
				},
				{
					label: 'DC City Council 2022',
					route: '/app/usa/dc_council/2022001/blank'
				}
			]
		}
	];

	export const USAAttribution = [
		{
			label: 'U.S Capitol by Andi Feliciotti',
			route:
				'https://unsplash.com/photos/brown-concrete-building-near-green-trees-during-daytime-6kA9FjqUxhM'
		},
		{
			label: 'Statue of Liberty by Christian Domingues',
			route: 'https://www.pexels.com/photo/statue-of-liberty-670530/'
		},
		{
			label: 'Mount Rushmore by Tom Fisk',
			route: 'https://www.pexels.com/photo/curved-mount-rushmore-under-the-cloudy-sky-11563790/'
		},
		{
			label: 'Golden Gate Bridge by Vlada Karpovich',
			route: 'https://www.pexels.com/photo/golden-gate-bridge-4449617/'
		}
	];
</script>

<MapCard name="United States" bg="usa" {groups} attribution={USAAttribution} square />
