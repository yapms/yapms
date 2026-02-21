<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Bundestag',
			route: '/app/deu/bundestag/2025055/blank'
		},
		{
			label: 'Results 2025',
			route: '/app/deu/bundestag/2025055/results'
		},
		{
			label: 'Bundesrat',
			route: '/app/deu/bundesrat/2023001/blank'
		},
		{
			label: 'Bundestag 2025',
			route: '/app/deu/bundestag/2025055/blank'
		},
		{
			label: 'Bundestag Results 2025',
			route: '/app/deu/bundestag/2025055/results'
		},
		{
			label: 'Bundestag 2021',
			route: '/app/deu/bundestag/2021269/blank'
		},
		{
			label: 'Bundestag Results 2021',
			route: '/app/deu/bundestag/2021269/results'
		},
		{
			label: 'Bundesrat',
			route: '/app/deu/bundesrat/2023001/blank'
		},
		{
			label: 'States',
			route: '/app/deu/states/2023001/blank'
		},
		{
			label: 'Counties',
			route: '/app/deu/counties/2022135/blank'
		}
	];
	
	// These type annotations can go away once this is actually populated
	const groups: HomeGroupData[] = [];

	const imageLinks = [
		{
			label: 'Reichstag by Guy Percival',
			route:
				'https://www.publicdomainpictures.net/en/view-image.php?image=307270&picture=reichstag-building-in-berlin'
		},
		{
			label: 'Neuschwanstein Castle by Kylene Hashimoto',
			route: 'https://www.pexels.com/photo/white-castle-surrounded-by-trees-1334441/'
		}
	];

</script>

<MapCard
	name="Germany"
	bg="deu"
	{groups}
	{imageLinks}
/>
