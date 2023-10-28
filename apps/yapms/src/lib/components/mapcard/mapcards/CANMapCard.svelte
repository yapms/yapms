<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Provinces',
			route: '/app/can/provinces'
		},
		{
			label: 'House of Commons',
			route: '/app/can/commons/next/blank'
		},
		{
			label: '2021 Results',
			route: '/app/can/commons/2021/results'
		},
		{
			label: 'Provinces',
			route: '/app/can/provinces'
		},
		{
			label: 'House of Commons',
			route: '/app/can/commons/next/blank'
		},
		{
			label: 'Senate',
			route: '/app/can/senate'
		},
		{
			label: '2021 House of Commons Results',
			route: '/app/can/commons/2021/results'
		},
		{
			label: '2019 House of Commons Results',
			route: '/app/can/commons/2019/results'
		},
		{
			label: '2015 House of Commons Results',
			route: '/app/can/commons/2015/results'
		}
	];
</script>

<MapCard name="Canada" bg="can" attribution="canada" {links} />
