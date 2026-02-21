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
					route: '/app/can/ab/2023/blank',
					label: 'Alberta',
					modalLabel: 'Alberta 2023'
				},
				{
					route: '/app/can/bc/2023107/blank',
					label: 'British Columbia',
					modalLabel: 'British Columbia 2024'
				},
				{
					route: '/app/can/mb/2023/blank',
					label: 'Manitoba',
					modalLabel: 'Manitoba 2023'
				},
				{
					route: '/app/can/nb/2024264/blank',
					label: 'New Brunswick',
					modalLabel: 'New Brunswick 2024'
				},
				{
					route: '/app/can/nl/2021/blank',
					label: 'Newfoundland & Lab',
					modalLabel: 'Newfoundland & Labrador 2021'
				},
				{
					route: '/app/can/ns/2021/blank',
					label: 'Nova Scotia',
					modalLabel: 'Nova Scotia 2021'
				},
				{
					route: '/app/can/nt/2023/blank',
					label: 'NWT',
					modalLabel: 'Northwestern Territories 2023'
				},
				{
					route: '/app/can/on/2022/blank',
					label: 'Ontario',
					modalLabel: 'Ontario 2022'
				},
				{
					route: '/app/can/pe/2023/blank',
					label: 'PEI',
					modalLabel: 'Prince Edward Island 2023'
				},
				{
					route: '/app/can/qc/2022/blank',
					label: 'Quebec',
					modalLabel: 'Quebec 2022'
				},
				{
					route: '/app/can/sk/2024/blank',
					label: 'Saskatchewan',
					modalLabel: 'Saskatchewan 2024'
				},
				{
					route: '/app/can/yt/2024283/blank',
					label: 'Yukon',
					modalLabel: 'Yukon Territory 2025'
				},
				{
					route: '/app/can/bc/2020/blank',
					label: 'British Columbia 2020'
				},
				{
					route: '/app/can/nb/2020/blank',
					label: 'New Brunswick 2020'
				},
				{
					route: '/app/can/yt/2021/blank',
					label: 'Yukon Territory 2021'
				},
			]
		}
	];

	const imageLinks = [
		{
			label: 'Queens Park by Charles Hoffman',
			route: 'https://commons.wikimedia.org/wiki/File:Ontario_Provincial_Parliament,_Queens_Park,_Toronto.jpg'
		},
		{
			label: 'Assemblée nationale du Québec by Wilfredor',
			route: 'https://commons.wikimedia.org/wiki/File:Assembl%C3%A9e_nationale_du_Qu%C3%A9bec_(5587688724).jpg'
		},
		{
			label: 'Alberta Legislature Building by D. Benjamin Miller',
			route: 'https://commons.wikimedia.org/wiki/File:Alberta_Legislature_Building,_June_7,_2024.jpg'
		},
		{
			label: 'British Columbia Parliament Buildings by Thomson M',
			route: 'https://commons.wikimedia.org/wiki/File:British_Columbia_Parliament_Buildings_-_panoramio.jpg'
		}
	]

</script>

<MapCard
	name="Canadian Provinces"
	bg="can_provinces"
	{groups}
	{imageLinks}
	full
/>
