<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Chamber of Deputies',
			route: '/app/ita/deputies/2022/blank'
		},
		{
			label: 'Senate',
			route: '/app/ita/senate/2022/blank'
		},
		{
			label: 'Regions',
			route: '/app/ita/regions/2023/blank'
		},
		{
			label: 'Chamber of Deputies 2022',
			route: '/app/ita/deputies/2022/blank'
		},
		{
			label: 'Senate 2022',
			route: '/app/ita/senate/2022/blank'
		},
		{
			label: 'Regions',
			route: '/app/ita/regions/2023/blank'
		},
		{
			label: 'Provinces',
			route: '/app/ita/provinces/2023/blank'
		},
		{
			label: '2022 Chamber of Deputies Results',
			route: '/app/ita/deputies/2022/results'
		},
		{
			label: '2022 Senate Results',
			route: '/app/ita/senate/2022/results'
		}
	];
</script>

<MapCard name="Italy" bg="ita" attribution="Photo by Enzo Abramo" {links} />
