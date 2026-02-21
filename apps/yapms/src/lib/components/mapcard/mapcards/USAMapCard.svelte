<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	
	// These type annotations can go away once this is actually populated
	const groups = [
		{
			label: 'Presidential',
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
			routes: [
				{
					label: 'House 2026',
					route: '/app/usa/house/2026/blank'
				},
				{
					label: 'MO Redistricted',
					modalLabel: 'House 2026 (MO Redistricted)',
					route: '/app/usa/house/2026037/mo_hb1'
				},
				{
					label: 'VA Redistricted',
					modalLabel: 'House 2026 (VA Redistricted)',
					route: '/app/usa/house/2026037/va_hj4'
				},
				{
					label: 'MO & VA Redistricted',
					modalLabel: 'House 2026 (MO Redistricted, VA Redistricted)',
					route: '/app/usa/house/2026037/mo_hb1_va_hj4'
				}
			]
		},
		{
			label: 'Governors',
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
			label: '',
			routes: [
				{
					label: '2024 House Results',
					route: '/app/usa/house/2024310/results'
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
					label: 'New York City Council 2025',
					route: '/app/usa/nyc_council/2025309/blank'
				},
				{
					label: '2022 Senate Results',
					route: '/app/usa/senate/2022/results'
				},
				{
					label: '2022 House Results',
					route: '/app/usa/house/2022/results'
				}
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="United States"
	bg="usa"
	{groups}
	{imageLinks}
	square
/>
