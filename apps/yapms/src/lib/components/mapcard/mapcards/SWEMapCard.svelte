<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'Riksdag',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Riksdag 2026',
					route: '/app/swe/riksdag/2026117/blank'
				},
				{
					label: '2022 Results',
					route: '/app/swe/riksdag/2022254/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Counties 2026',
					route: '/app/swe/counties/2026001/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Riksdagshuset by Leonhard Lenz',
			route:
				'https://commons.wikimedia.org/wiki/File:Riksdagshuset_Stockholm_seen_from_Str%C3%B6mbron_2022-09-20_01.jpg'
		},
		{
			label: 'Snow Forest Winter Gäddede by Jon Flobrant',
			route:
				'https://commons.wikimedia.org/wiki/File:Snow_Forest_Winter_Gäddede_(Unsplash_3BWzjqbMlDk).jpg'
		}
	];
</script>

<MapCard name="Sweden" bg="swe" {groups} {attribution} />
