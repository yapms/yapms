<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'Folketing',
			routes: [
				{
					label: 'Folketing',
					modalLabel: '2022 Folketing',
					route: '/app/dnk/folketing/2022/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Folketing Results',
					route: '/app/dnk/folketing/2022/results'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Municipalities',
					route: '/app/dnk/municipalities/2021/blank'
				},
				{
					label: 'Regions',
					route: '/app/dnk/regions/2021/blank'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: "Christiansborg Palace by merkulos",
			route: 'https://pixabay.com/photos/christiansborg-palace-copenhagen-3700331/'
		},
		{
			label: "Copenhagen by Efrem Efre",
			route: 'https://www.pexels.com/photo/scenic-view-of-nyhavn-canal-in-copenhagen-denmark-31400921/'
		}
	]
</script>

<MapCard
	name="Denmark"
	bg="dnk"
	{imageLinks}
	{groups}
/>
