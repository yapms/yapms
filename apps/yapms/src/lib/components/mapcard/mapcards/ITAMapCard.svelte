<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'Chamber of Deputies',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Chamber of Deputies',
					route: '/app/ita/deputies/2022/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Chamber of Deputies Results',
					route: '/app/ita/deputies/2022/results'
				}
			]
		},
		{
			label: 'Senate',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Senate 2022',
					route: '/app/ita/senate/2022/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Senate Results',
					route: '/app/ita/senate/2022/results'
				}
			]
		},
		{
			label: 'Regions',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Regions',
					route: '/app/ita/regions/2023/blank'
				},
				{
					label: 'Provinces',
					route: '/app/ita/provinces/2023/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Palazzo Montecitorio by Enzo Abramo',
			route:
				'https://www.publicdomainpictures.net/en/view-image.php?image=118762&picture=palazzo-montecitorio-in-rome'
		},
		{
			label: 'Venice by Syced',
			route: 'https://commons.wikimedia.org/wiki/File:March_2009_Venezia_38.jpg'
		}
	];
</script>

<MapCard name="Italy" bg="ita" {groups} {attribution} />
