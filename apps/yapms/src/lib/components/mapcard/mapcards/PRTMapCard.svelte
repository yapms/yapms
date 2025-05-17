<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Assembly 2025',
			route: '/app/prt/assembly/2025138/blank'
		},
		{
			label: '2024 Results',
			route: '/app/prt/assembly/2024070/results'
		},
		{
			label: 'Districts',
			route: '/app/prt/districts/2021093/blank'
		},
		{
			label: 'Municipalities',
			route: '/app/prt/municipalities/2018316/blank'
		}
	];
</script>

<MapCard
	name="Portugal"
	bg="prt"
	attribution="Photo by Max Avans"
	attributionLink="https://www.pexels.com/photo/white-concrete-building-under-blue-sky-5072289/"
	{links}
/>
