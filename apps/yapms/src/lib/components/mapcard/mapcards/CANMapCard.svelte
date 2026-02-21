<script lang="ts" context="module">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'House of Commons', routes: [
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
			label: '',
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

	export const CANImageLinks = [
		{
			label: 'Parliament Hill by Tetyana Kovyrina',
			route: 'https://www.pexels.com/photo/photo-of-beige-and-green-castle-1045915/'
		},
		{
			label: 'Toronto by Andre Furtado',
			route: 'https://www.pexels.com/photo/high-rise-buildings-photo-800694/'
		}//, // I don't actually use these last two images anymore
		//{
		//	label: 'Montreal by Cyrill',
		//	route: 'https://www.pexels.com/photo/skyscrapers-in-city-at-sunset-19739618/'
		//},
		//{
		//	label: 'Vancouver by Adi K',
		//	route:
		//		'https://www.pexels.com/photo/bird-s-eye-view-photography-of-high-rise-buildings-2382868/'
		//}
	];

</script>

<MapCard
	name="Canada"
	bg="can"
	{groups}
	imageLinks={CANImageLinks}
/>
