<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const links = [
		{
			label: 'President',
			route: '/app/usa/presidential/2024/blank'
		},
		{
			label: 'Senate',
			route: '/app/usa/senate/2024/blank'
		},
		{
			label: 'House',
			route: '/app/usa/house/2024/blank'
		},
		{
			label: 'Presidential 2024',
			route: '/app/usa/presidential/2024/blank'
		},
		{
			label: '2024 Senate',
			route: '/app/usa/senate/2024/blank'
		},
		{
			label: 'House 2024',
			route: '/app/usa/house/2024/blank'
		},
		{
			label: 'Governors 2024',
			route: '/app/usa/governors/2024/blank'
		},
		{
			label: '2022 Senate Results',
			route: '/app/usa/senate/2022/results'
		},
		{
			label: '2022 House Results',
			route: '/app/usa/house/2022/results'
		},
		{
			label: '2022 Gubernatorial Results',
			route: '/app/usa/governors/2022/results'
		},
		{
			label: 'Counties 2023',
			route: '/app/usa/counties/2023/blank'
		},
		{
			label: 'Counties 2020',
			route: '/app/usa/counties/2020/blank'
		},
		{
			label: 'States & Territories',
			route: '/app/usa/states_and_territories/2023001/blank'
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
			label: 'Governors 2022',
			route: '/app/usa/governors/2022/blank'
		},
		{
			label: 'Governors 2023',
			route: '/app/usa/governors/2023/blank'
		},
		{
			label: 'Governors 2024',
			route: '/app/usa/governors/2024/blank'
		},
		{
			label: 'Governors 2025',
			route: '/app/usa/governors/2025/blank'
		},
		{
			label: 'Presidential 2024 Take-All',
			route: '/app/usa/presidential/2024/takeall'
		},
		{
			label: 'Presidential 2024 with Territories',
			route: '/app/usa/presidential/2024/territories'
		},
		{
			label: 'Presidential 2024 Take-All with Territories',
			route: '/app/usa/presidential/2024/takeall_territories'
		}
	];
</script>

<MapCard
	name="United States"
	bg="usa"
	attribution="Photo by Andy Feliciotti"
	{links}
	attributionLink="https://unsplash.com/photos/brown-concrete-building-near-green-trees-during-daytime-6kA9FjqUxhM"
/>
