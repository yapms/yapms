<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
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
				},
			]
		}
	];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Australian States"
	bg="auslegassem"
	{groups}
	{imageLinks}
	full
/>
