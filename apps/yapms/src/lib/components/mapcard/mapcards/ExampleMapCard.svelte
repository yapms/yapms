<script lang="ts">
	// Set script to have context="module" if you want to share imageLinks between cards using the same bg string
	// Then you can export and import in another file like normal
	import MapCard from '../MapCard.svelte';

	// Groups is an array of type HomeGroupData[]
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

	// imageLinks is an array of type HomeLinkData[]
	const imageLinks = [
		{
			label: 'Christiansborg Palace by merkulos',
			route: 'https://pixabay.com/photos/christiansborg-palace-copenhagen-3700331/'
		},
		{
			label: 'Copenhagen by Efrem Efre',
			route: 'https://www.pexels.com/photo/scenic-view-of-nyhavn-canal-in-copenhagen-denmark-31400921/'
		}
	];
</script>

<!-- Name property is the country name, bg property specifies which directory from src/lib/assets/images/countries to look for blended.webp in -->
<!-- To create blended.webp for a given directory, you must find 2 or 4 800x600 images, and set their names to one.jpg thru four.jpg. -->
<!-- You then need to run blend2.py or blend4.py with the bg string as an argument using Python. That script repeats these instructions. -->
<MapCard name="Denmark" bg="dnk" {groups} {imageLinks} />
