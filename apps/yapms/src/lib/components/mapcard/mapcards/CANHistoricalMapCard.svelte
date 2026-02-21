<script lang="ts">
	import MapCard from '../MapCard.svelte';
	import { CANImageLinks } from './CANMapCard.svelte';

	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: '2025',
					modalLabel: 'House of Commons 2025',
					route: '/app/can/commons/2025118/results'
				},
				{
					label: '2021',
					modalLabel: 'House of Commons 2021',
					route: '/app/can/commons/2021/results'
				},
				{
					label: '2019',
					modalLabel: 'House of Commons 2019',
					route: '/app/can/commons/2019/results'
				},
				{
					label: '2015',
					modalLabel: 'House of Commons 2015',
					route: '/app/can/commons/2015/results'
				},
				{
					label: '2011',
					modalLabel: 'House of Commons 2011',
					route: '/app/can/commons/2011122/results'
				},
				{
					label: '2008',
					modalLabel: 'House of Commons 2008',
					route: '/app/can/commons/2008287/results'
				},
				{
					label: '2006',
					modalLabel: 'House of Commons 2006',
					route: '/app/can/commons/2006023/results'
				},
				{
					label: '2004',
					modalLabel: 'House of Commons 2004',
					route: '/app/can/commons/2004179/results'
				},
				{
					label: '2000',
					modalLabel: 'House of Commons 2000',
					route: '/app/can/commons/2000331/results'
				},
				{
					label: '1997',
					modalLabel: 'House of Commons 1997',
					route: '/app/can/commons/1997153/results'
				},
				{
					label: '1993',
					modalLabel: 'House of Commons 1993',
					route: '/app/can/commons/1993298/results'
				},
				{
					label: '1988',
					modalLabel: 'House of Commons 1988',
					route: '/app/can/commons/1988325/results'
				},
				{
					label: '1984',
					modalLabel: 'House of Commons 1984',
					route: '/app/can/commons/1984247/results'
				},
				{
					label: '1980',
					modalLabel: 'House of Commons 1980',
					route: '/app/can/commons/1980049/results'
				},
				{
					label: '1979',
					modalLabel: 'House of Commons 1979',
					route: '/app/can/commons/1979142/results'
				},
				{
					label: '1974',
					modalLabel: 'House of Commons 1974',
					route: '/app/can/commons/1974189/results'
				},
				{
					label: '1972',
					modalLabel: 'House of Commons 1972',
					route: '/app/can/commons/1972303/results'
				},
				{
					label: '1968',
					modalLabel: 'House of Commons 1968',
					route: '/app/can/commons/1968176/results'
				}
			]
		}
	];

</script>

<MapCard
	name="Canadian Commons Results"
	bg="can"
	{groups}
	imageLinks={CANImageLinks}
/>
