<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Folketing',
			route: '/app/dnk/folketing/2022/blank'
		},
		{
			label: '2022 Results',
			route: '/app/dnk/folketing/2022/results'
		},
		{
			label: 'Municipalities',
			route: '/app/dnk/municipalities/2021/blank'
		},
		{
			label: 'Regions',
			route: '/app/dnk/regions/2021/blank'
		}
	];
</script>

<MapCard name="Denmark" bg="dnk" attribution="Photo by merkulos on Pixabay" {links} />
