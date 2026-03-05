<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: "Chamber of Deputies '24",
					route: '/app/mex/deputies/2024001/blank'
				},
				{
					label: 'Senate 2024',
					route: '/app/mex/senate/2024001/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Legislative Palace by Thelmadatter',
			route: 'https://commons.wikimedia.org/wiki/File:LegPalaceDF.JPG'
		},
		{
			label: 'Chichén Itzá by Hollowayvideo',
			route: 'https://commons.wikimedia.org/wiki/File:Chich%C3%A9n_Itz%C3%A1_in_2022.jpg'
		}
	];
</script>

<MapCard name="Mexico" bg="mex" {groups} {attribution} />
