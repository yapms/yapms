<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'States',
			route: '/app/aus/states/2023/blank'
		},
		{
			label: 'House',
			route: '/app/aus/house/2025001/blank'
		},
		{
			label: 'Senate',
			route: '/app/aus/senate/2022/blank'
		},
		{
			label: 'States & Territories',
			route: '/app/aus/states/2023/blank'
		},
		{
			label: 'House of Representatives 2025',
			route: '/app/aus/house/2025001/blank'
		},
		{
			label: 'Senate 2022',
			route: '/app/aus/senate/2022/blank'
		},
		{
			label: 'House of Representatives 2022',
			route: '/app/aus/house/2022/blank'
		},
		{
			label: '2022 House of Representatives Results',
			route: '/app/aus/house/2022/results'
		},
		{
			label: '2022 Senate Results',
			route: '/app/aus/senate/2022/results'
		},
		{
			label: 'Senate',
			route: '/app/aus/senate'
		}
	];
</script>

<MapCard
	name="Australia"
	bg="aus"
	attribution="Photo by Josh Withers"
	attributionLink="https://www.pexels.com/@hellojoshwithers/"
	{links}
/>
