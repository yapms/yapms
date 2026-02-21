<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'House',
			route: '/app/nzl/house/2025220/blank'
		},
		{
			label: 'Māori Electorates',
			route: '/app/nzl/maori/2025220/blank'
		},
		{
			label: 'Regional Councils',
			route: '/app/nzl/regions/2023/blank'
		},
		{
			label: 'House 2026',
			route: '/app/nzl/house/2025220/blank'
		},
		{
			label: 'House 2023',
			route: '/app/nzl/house/2023/blank'
		},
		{
			label: 'Māori Electorates 2026',
			route: '/app/nzl/maori/2025220/blank'
		},
		{
			label: 'Māori Electorates 2023',
			route: '/app/nzl/maori/2023/blank'
		},
		{
			label: '2023 House Results',
			route: '/app/nzl/house/2023303/results'
		},
		{
			label: '2020 House Results',
			route: '/app/nzl/house/2020/results'
		},
		{
			label: 'Regional Councils',
			route: '/app/nzl/regions/2023/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="New Zealand"
	bg="nzl"
	{groups}
	{imageLinks}
/>
