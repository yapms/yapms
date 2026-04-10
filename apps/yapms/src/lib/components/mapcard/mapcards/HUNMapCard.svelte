<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'National Assembly',
					route: '/app/hun/assembly/2026102/blank'
				},
				{
					label: 'Counties',
					route: '/app/hun/counties/2026102/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Hungarian Parliament by Pierre Blaché',
			route: 'https://commons.wikimedia.org/wiki/File:Hungarian_Parliament_Building_2023-9.jpg'
		},
		{
			label: 'Balaton Landscape by txd',
			route: 'https://commons.wikimedia.org/wiki/File:Balaton_Hungary_Landscape.jpg'
		}
	];
</script>

<MapCard name="Hungary" bg="hun" {attribution} {groups} />
