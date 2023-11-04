<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Countries',
			route: '/app/glb/countries/2020078/blank'
		}
	];
</script>

<MapCard name="World" bg="glb" attribution="Photo by hallidayfineart on Pixabay" {links} />
