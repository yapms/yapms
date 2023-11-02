<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/saf/national_assembly/2019/blank'
		},
		{
			label: '2019 Results',
			route: '/app/saf/national_assembly/2019/results'
		},
		{
			label: 'Provinces',
			route: '/app/saf/provinces'
		},
		{
			label: '2019 National Assembly',
			route: '/app/saf/national_assembly/2019/blank'
		},
		{
			label: '2019 National Assembly Results',
			route: '/app/saf/national_assembly/2019/results'
		},
		{
			label: 'Provinces',
			route: '/app/saf/provinces'
		},
		{
			label: '2023 Municipalities',
			route: '/app/saf/municipalities/2023/blank'
		}
	];
</script>

<MapCard name="South Africa" bg="saf" attribution="Photo by Clayton" {links} />
