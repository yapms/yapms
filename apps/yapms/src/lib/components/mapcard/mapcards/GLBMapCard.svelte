<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Countries (UN)',
			route: '/app/glb/countries/2020078/blank'
		},
		{
			label: 'Countries (NE)',
			route: '/app/glb/countries/2020078/natearth'
		}
	];
</script>

<MapCard name="World" bg="glb" attribution="Photo by hallidayfineart on Pixabay" {links} />
