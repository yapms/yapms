<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{ 
			label: '',
			routes: [	
				{ 
					label: 'States',
					route: '/app/aut/states/2025291/blank'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: 'Vienna Parliament by Jean Fonseca',
			route: 'https://commons.wikimedia.org/wiki/File:WienParlament.jpg'
		},
		{
			label: 'Großvenediger by PietJay',
			route: 'https://commons.wikimedia.org/wiki/File:Gro%C3%9Fvenediger.JPG'
		}
	]

</script>

<MapCard
	name="Austria"
	bg="aut"
	{groups}
	{imageLinks}
/>
