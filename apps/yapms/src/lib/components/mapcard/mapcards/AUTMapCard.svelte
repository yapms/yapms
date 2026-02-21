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

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard
	name="Austria"
	bg="aut"
	{groups}
	{imageLinks}
/>
