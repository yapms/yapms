<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Saskatchewan',
			route: '/app/can/sk/2024/blank'
		},
		{
			label: 'Manitoba',
			route: '/app/can/mb/2023/blank'
		},
		{
			route: '/app/can/bc/2023107/blank',
			label: 'British Columbia'
		},
		{
			route: '/app/can/ab/2023/blank',
			label: 'Alberta 2023'
		},
		{
			route: '/app/can/bc/2023107/blank',
			label: 'British Columbia 2024'
		},
		{
			route: '/app/can/bc/2020/blank',
			label: 'British Columbia 2020'
		},
		{
			route: '/app/can/mb/2023/blank',
			label: 'Manitoba 2023'
		},
		{
			route: '/app/can/nb/2020/blank',
			label: 'New Brunswick 2020'
		},
		{
			route: '/app/can/nl/2021/blank',
			label: 'Newfoundland & Labrador 2021'
		},
		{
			route: '/app/can/ns/2021/blank',
			label: 'Nova Scotia 2021'
		},
		{
			route: '/app/can/nt/2023/blank',
			label: 'Northwestern Territories 2023'
		},
		{
			route: '/app/can/on/2022/blank',
			label: 'Ontario 2022'
		},
		{
			route: '/app/can/pe/2023/blank',
			label: 'Prince Edward Island 2023'
		},
		{
			route: '/app/can/qc/2022/blank',
			label: 'Quebec 2022'
		},
		{
			route: '/app/can/sk/2024/blank',
			label: 'Saskatchewan 2024'
		},
		{
			route: '/app/can/yt/2021/blank',
			label: 'Yukon Territory 2021'
		}
	];
</script>

<MapCard
	name="Canadian Provinces"
	bg="canlegassem"
	attribution="Photo by Jermaine W from Pixabay"
	{links}
/>
