<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/zaf/national_assembly/2019128/blank'
		},
		{
			label: '2019 Results',
			route: '/app/zaf/national_assembly/2019128/results'
		},
		{
			label: 'Provinces',
			route: '/app/zaf/provinces'
		},
		{
			label: '2019 National Assembly',
			route: '/app/zaf/national_assembly/2019128/blank'
		},
		{
			label: '2019 National Assembly Results',
			route: '/app/zaf/national_assembly/2019128/results'
		},
		{
			label: 'Provinces',
			route: '/app/zaf/provinces'
		},
		{
			label: 'Municipalities',
			route: '/app/zaf/municipalities/2019275/blank'
		}
	];
</script>

<MapCard name="South Africa" bg="saf" attribution="Photo by Clayton" {links} />
