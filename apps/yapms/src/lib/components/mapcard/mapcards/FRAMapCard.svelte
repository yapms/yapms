<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'National Assembly',
					route: '/app/fra/assembly/2024181/blank'
				},
				{
					label: 'Departments',
					route: '/app/fra/departments/2026001/blank'
				}
			]
		},
		{
			label: 'Senate',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Senate 2026',
					route: '/app/fra/senate/2026001/blank'
				},
				{
					label: 'Senate 2023',
					route: '/app/fra/senate/2023267/blank'
				}
			]
		}
	];

	const attribution = [
		{
			label: 'Palais Bourbon by DXR',
			route: 'https://en.m.wikipedia.org/wiki/File:Palais_Bourbon,_Paris_7e,_NW_View_140402_1.jpg'
		},
		{
			label: 'Eiffel Tower by Yovan Verma',
			route: 'https://www.pexels.com/photo/eiffel-tower-2082103/'
		}
	];
</script>

<MapCard name="France" bg="fra" {groups} {attribution} />
