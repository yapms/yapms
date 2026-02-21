<script lang="ts">
	import type { HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Parliament',
					route: '/app/grc/parliament/2023001/blank'
				},
				{
					label: 'Results June 2023',
					modalLabel: 'June 2023 Parliament Results',
					route: '/app/grc/parliament/2023176/results'
				},
				{
					label: 'Regions',
					route: '/app/grc/regions/2011001/blank'
				},
				{
					label: 'Results May 2023',
					modalLabel: 'May 2023 Parliament Results',
					route: '/app/grc/parliament/2023142/results'
				}
			]
		}
	]

	const imageLinks = [
		{
			label: 'Hellenic Parliament by NikosLikomitros',
			route: 'https://commons.wikimedia.org/wiki/File:Hellenic_Parliament,_general_view.jpg'
		},
		{
			label: 'Parthenon by George E. Koronaios',
			route: 'https://commons.wikimedia.org/wiki/File:East_Facade_of_the_Parthenon_on_July_30,_2019.jpg'
		}
	]

</script>

<MapCard
	name="Greece"
	bg="grc"
	{groups}
	{imageLinks}
/>
