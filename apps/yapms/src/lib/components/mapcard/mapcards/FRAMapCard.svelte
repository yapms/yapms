<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'National Assembly',
					route: '/app/fra/assembly/2024181/blank'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Departments',
					route: '/app/fra/departments/2022/blank'
				}
			]
		}
	];

	const imageLinks = [
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

<MapCard name="France" bg="fra" {imageLinks} {groups} />
