<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Chamber of Deputies',
			route: '/app/bra/deputies/2022/blank'
		},
		{
			label: 'Senate',
			route: '/app/bra/senate/2022/blank'
		},
		{
			label: 'Federative Units',
			route: '/app/bra/regions/2023/blank'
		},
		{
			label: 'Chamber of Deputies 2022',
			route: '/app/bra/deputies/2022/blank'
		},
		{
			label: 'Senate 2022',
			route: '/app/bra/senate/2022/blank'
		},
		{
			label: 'Senate',
			route: '/app/bra/senate'
		},
		{
			label: 'Federative Units',
			route: '/app/bra/regions/2023/blank'
		}
	];
</script>

<MapCard name="Brazil" bg="bra" attribution="Photo by Magali Guimarães" {links} />
