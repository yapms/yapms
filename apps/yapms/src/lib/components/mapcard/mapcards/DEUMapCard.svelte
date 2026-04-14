<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'Bundestag',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Bundestag 2025',
					route: '/app/deu/bundestag/2025055/blank'
				},
				{
					label: '2025 Results',
					modalLabel: 'Bundestag Results 2025',
					route: '/app/deu/bundestag/2025055/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'States',
					route: '/app/deu/states/2023001/blank'
				},
				{
					label: 'Counties',
					route: '/app/deu/counties/2022135/blank'
				},
				{
					label: 'Bundesrat',
					route: '/app/deu/bundesrat/2023001/blank'
				}
			]
		},
		{
			label: '2021 Elections',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Bundestag 2021',
					route: '/app/deu/bundestag/2021269/blank'
				},
				{
					label: '2021 Results',
					modalLabel: 'Bundestag Results 2021',
					route: '/app/deu/bundestag/2021269/results'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Reichstag by Guy Percival',
			route:
				'https://www.publicdomainpictures.net/en/view-image.php?image=307270&picture=reichstag-building-in-berlin'
		},
		{
			label: 'Neuschwanstein Castle by Kylene Hashimoto',
			route: 'https://www.pexels.com/photo/white-castle-surrounded-by-trees-1334441/'
		}
	];
</script>

<MapCard name="Germany" bg="deu" {groups} {attribution} />
