<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'Parliament',
					route: '/app/grc/parliament/2023001/blank'
				},
				{
					label: 'Regions',
					route: '/app/grc/regions/2011001/blank'
				}
			]
		},
		{
			label: 'Parliament Results',
			routes: [
				{
					label: 'June 2023 Results',
					route: '/app/grc/parliament/2023176/results'
				},
				{
					label: 'May 2023 Results',
					route: '/app/grc/parliament/2023142/results'
				}
			]
		}
	];
</script>

<MapCard
	name="Greece"
	bg="grc"
	attribution="Photo by NikosLikomitros"
	attributionLink="https://commons.wikimedia.org/wiki/File:Hellenic_Parliament,_general_view.jpg"
	{groups}
/>
