<script lang="ts" context="module">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'House of Commons',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House of Commons',
					route: '/app/can/commons/next/blank'
				},
				{
					label: '2025 Results',
					modalLabel: '2025 Commons Results',
					route: '/app/can/commons/2025118/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Provinces',
					route: '/app/can/provinces'
				},
				{
					label: 'Senate',
					route: '/app/can/senate'
				}
			]
		}
	];

	export const CANAttribution = [
		{
			label: 'Parliament Hill by Tetyana Kovyrina',
			route: 'https://www.pexels.com/photo/photo-of-beige-and-green-castle-1045915/'
		},
		{
			label: 'Toronto by Andre Furtado',
			route: 'https://www.pexels.com/photo/high-rise-buildings-photo-800694/'
		}
	];
</script>

<MapCard name="Canada" bg="can" {groups} attribution={CANAttribution} />
