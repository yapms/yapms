<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Parliament',
			route: '/app/grc/parliament/2023001/blank'
		},
		{
			label: 'Results June 2023',
			route: '/app/grc/parliament/2023176/results'
		},
		{
			label: 'Results May 2023',
			route: '/app/grc/parliament/2023142/results'
		},
		{
			label: 'Regions',
			route: '/app/grc/regions/2011001/blank'
		}
	];
</script>

<MapCard
	name="Greece"
	bg="grc"
	attribution="Photo by NikosLikomitros"
	attributionLink="https://commons.wikimedia.org/wiki/File:Hellenic_Parliament,_general_view.jpg"
	{links}
/>
