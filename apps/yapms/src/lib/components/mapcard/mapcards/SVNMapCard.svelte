<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'National Assembly',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'National Assembly',
					route: '/app/svn/assembly/2022114/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 National Assembly Results',
					route: '/app/svn/assembly/2022114/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Administrative Units',
					route: '/app/svn/administrative_units/2024001/blank'
				},
				{
					label: 'Municipalities',
					route: '/app/svn/municipalities/2024001/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Zgradba Državnega zbora by Philippe Hässig',
			route: 'https://en.wikipedia.org/wiki/File:Zgradba_Dr%C5%BEavnega_zbora.jpg'
		},
		{
			label: 'Bled Castle by frl1988',
			route: 'https://commons.wikimedia.org/wiki/File:Bled-1071453.jpg'
		}
	];
</script>

<MapCard name="Slovenia" bg="svn" {groups} {attribution} />
