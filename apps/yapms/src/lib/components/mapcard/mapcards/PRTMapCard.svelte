<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Assembly 2024',
			route: '/app/prt/assembly/2024070/blank'
		},
		{
			label: 'Districts',
			route: '/app/prt/districts/2021093/blank'
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
