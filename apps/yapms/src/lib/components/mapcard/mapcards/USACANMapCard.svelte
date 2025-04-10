<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'States',
					route: '/app/usa_can/states/2024001/blank'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: 'Blue Water Bridge by Yihan Wang',
			route: 'https://www.pexels.com/photo/blue-water-bridge-connecting-usa-and-canada-30402414/'
		},
		{
			label: 'Niagara Falls by Anthony Rodriguez',
			route: 'https://www.pexels.com/photo/waterfalls-under-blue-sky-and-white-clouds-3490963/'
		}
	];
</script>

<MapCard name="United States & Canada" bg="usa_can" {imageLinks} {groups} />
