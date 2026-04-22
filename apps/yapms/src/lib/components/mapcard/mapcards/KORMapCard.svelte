<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'National Assembly',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: "National Assembly '20",
					route: '/app/kor/assembly/2020001/blank'
				},
				{
					label: "National Assembly '24",
					route: '/app/kor/assembly/2024101/blank'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: '2026 Provinces',
					route: '/app/kor/provinces/2026182/blank'
				},
				{
					label: 'Municipalities',
					route: '/app/kor/municipalities/2018001/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'National Assembly by frakorea',
			route: 'https://en.wikipedia.org/wiki/File:Seoul-National.Assembly-02.jpg'
		},
		{
			label: 'Haeundae Skyline, Busan by amanderson2',
			route: 'https://commons.wikimedia.org/wiki/File:Skyline_of_Haeundae_from_Igidae.png'
		}
	];
</script>

<MapCard name="South Korea" bg="kor" {groups} {attribution} />
