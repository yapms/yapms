<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: '2022',
			route: '/app/usa/house/2022/blank'
		},
		{
			label: '2020',
			route: '/app/usa/house/2020/blank'
		},
		{
			label: '2018',
			route: '/app/usa/house/2018/blank'
		},
		{
			label: 'House 2022',
			route: '/app/usa/house/2022/blank'
		},
		{
			label: 'House 2020',
			route: '/app/usa/house/2020/blank'
		},
		{
			label: 'House 2018',
			route: '/app/usa/house/2018/blank'
		},
		{
			label: 'House 2016',
			route: '/app/usa/house/2016/blank'
		},
		{
			label: 'House 2014',
			route: '/app/usa/house/2014/blank'
		},
		{
			label: 'House 2012',
			route: '/app/usa/house/2012/blank'
		},
		{
			label: 'House 2010',
			route: '/app/usa/house/2010/blank'
		},
		{
			label: 'House 2008',
			route: '/app/usa/house/2008/blank'
		},
		{
			label: 'House 2006',
			route: '/app/usa/house/2006/blank'
		},
		{
			label: 'House 2004',
			route: '/app/usa/house/2004/blank'
		},
		{
			label: 'House 2002',
			route: '/app/usa/house/2002/blank'
		},
		{
			label: 'House 2000',
			route: '/app/usa/house/2000/blank'
		},
		{
			label: 'House 1998',
			route: '/app/usa/house/1998/blank'
		},
		{
			label: 'House 1996',
			route: '/app/usa/house/1996/blank'
		},
		{
			label: 'House 1994',
			route: '/app/usa/house/1994/blank'
		},
		{
			label: 'House 1992',
			route: '/app/usa/house/1992/blank'
		}
	];
</script>

<MapCard
	name="Historical USA House"
	bg="usahouse"
	attribution="Photo by Lawrence Jackson"
	{links}
/>
