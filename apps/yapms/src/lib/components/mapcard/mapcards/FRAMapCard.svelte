<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/fra/assembly/2024181/blank'
		},
		{
			label: 'Departments',
			route: '/app/fra/departments/2022/blank'
		}
	];
</script>

<MapCard
	name="France"
	bg="fra"
	attribution="Photo by DXR"
	attributionLink="https://en.m.wikipedia.org/wiki/File:Palais_Bourbon,_Paris_7e,_NW_View_140402_1.jpg"
	{links}
/>
