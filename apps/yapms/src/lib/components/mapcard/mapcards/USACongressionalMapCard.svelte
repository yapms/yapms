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
					label: '2024',
					modalLabel: 'House 2024',
					route: '/app/usa/house/2024/blank'
				},
				{
					label: '2022',
					modalLabel: 'House 2022',
					route: '/app/usa/house/2022/blank'
				},
				{
					label: '2020',
					modalLabel: 'House 2020',
					route: '/app/usa/house/2020/blank'
				},
				{
					label: '2018',
					modalLabel: 'House 2018',
					route: '/app/usa/house/2018/blank'
				},
				{
					label: '2016',
					modalLabel: 'House 2016',
					route: '/app/usa/house/2016/blank'
				},
				{
					label: '2014',
					modalLabel: 'House 2014',
					route: '/app/usa/house/2014/blank'
				},
				{
					label: '2012',
					modalLabel: 'House 2012',
					route: '/app/usa/house/2012/blank'
				},
				{
					label: '2010',
					modalLabel: 'House 2010',
					route: '/app/usa/house/2010/blank'
				},
				{
					label: '2008',
					modalLabel: 'House 2008',
					route: '/app/usa/house/2008/blank'
				},
				{
					label: '2006',
					modalLabel: 'House 2006',
					route: '/app/usa/house/2006/blank'
				},
				{
					label: '2004',
					modalLabel: 'House 2004',
					route: '/app/usa/house/2004/blank'
				},
				{
					label: '2002',
					modalLabel: 'House 2002',
					route: '/app/usa/house/2002/blank'
				},
				{
					label: '2000',
					modalLabel: 'House 2000',
					route: '/app/usa/house/2000/blank'
				},
				{
					label: '1998',
					modalLabel: 'House 1998',
					route: '/app/usa/house/1998/blank'
				},
				{
					label: '1996',
					modalLabel: 'House 1996',
					route: '/app/usa/house/1996/blank'
				},
				{
					label: '1994',
					modalLabel: 'House 1994',
					route: '/app/usa/house/1994/blank'
				},
				{
					label: '1992',
					modalLabel: 'House 1992',
					route: '/app/usa/house/1992/blank'
				},
				{
					label: '1990',
					modalLabel: 'House 1990',
					route: '/app/usa/house/1991003/blank'
				},
				{
					label: '1988',
					modalLabel: 'House 1988',
					route: '/app/usa/house/1989003/blank'
				},
				{
					label: '1986',
					modalLabel: 'House 1986',
					route: '/app/usa/house/1987003/blank'
				},
				{
					label: '1984',
					modalLabel: 'House 1984',
					route: '/app/usa/house/1985003/blank'
				},
				{
					label: '1992',
					modalLabel: 'House 1982',
					route: '/app/usa/house/1983003/blank'
				},
				{
					label: '1990',
					modalLabel: 'House 1980',
					route: '/app/usa/house/1981003/blank'
				},
				{
					label: '1978',
					modalLabel: 'House 1978',
					route: '/app/usa/house/1979003/blank'
				},
				{
					label: '1976',
					modalLabel: 'House 1976',
					route: '/app/usa/house/1977003/blank'
				},
				{
					label: '1974',
					modalLabel: 'House 1974',
					route: '/app/usa/house/1975003/blank'
				},
				{
					label: '1972',
					modalLabel: 'House 1972',
					route: '/app/usa/house/1973003/blank'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: 'House Floor by Lawrence Jackson',
			route: 'https://keating.house.gov/policy-work/floor'
		},
		{
			label: 'U.S Capitol by Andi Feliciotti',
			route: 'https://unsplash.com/photos/brown-concrete-building-near-green-trees-during-daytime-6kA9FjqUxhM'
		}
	];

</script>

<MapCard
	name="Historical USA House"
	bg="usa_house"
	{groups}
	{imageLinks}
/>
